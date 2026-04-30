import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'
import { useListStore } from '../store/listStore'
import { unitLeaderMap, leaderAbilities } from '../data/leaderData'

const CATEGORY_LABELS = {
  epicHero: 'Epic Heroes',
  character: 'Characters',
  battleline: 'Battleline',
  infantry: 'Infantry',
  cavalry: 'Cavalry',
  monster: 'Monsters',
  vehicle: 'Vehicles',
}

const TARGET_PRESETS = [500, 750, 1000, 1250, 1500, 2000]

const PHASE_ICON = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }

const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

// ── Pairing section shown inside a unit row ────────────────────────────────
function PairingSection({ unit, allUnits, inListIds, onAdd, theme }) {
  const unitKey = unit.unitKey || baseId(unit.id)

  // Build pairing rows
  const rows = useMemo(() => {
    if (unit.isLeader) {
      // Leader → show which units it can lead
      return (unit.leadsUnits || []).map(targetId => {
        const targetUnit = allUnits.find(u => (u.unitKey || baseId(u.id)) === targetId || u.id === targetId)
        const abilities = leaderAbilities[`${unitKey}_${targetId}`]?.abilities || []
        return { id: targetId, name: targetUnit?.name || targetId, inList: inListIds.has(targetId), unit: targetUnit, abilities, isUnitRow: true }
      })
    } else {
      // Squad unit → show eligible leaders
      const eligibleIds = unitLeaderMap[unitKey] || []
      return eligibleIds.map(leaderId => {
        const leaderUnit = allUnits.find(u => u.id === leaderId || (u.unitKey || baseId(u.id)) === leaderId)
        const abilities = leaderAbilities[`${leaderId}_${unitKey}`]?.abilities || []
        return { id: leaderId, name: leaderUnit?.name || leaderId, inList: inListIds.has(leaderId), unit: leaderUnit, abilities, isUnitRow: false }
      })
    }
  }, [unit, unitKey, allUnits, inListIds])

  if (rows.length === 0) return null

  const inListCount = rows.filter(r => r.inList).length

  return (
    <div className="border-t px-3 pb-2.5 pt-2" style={{ borderColor: theme.border }}>
      <p className="text-xs font-bold mb-2" style={{ color: theme.secondary }}>
        {unit.isLeader ? '⭐ Can Lead' : '🔗 Leader Pairings'}
        {inListCount > 0 && (
          <span className="ml-2 font-normal" style={{ color: '#22c55e' }}>
            {inListCount} in your list
          </span>
        )}
      </p>
      <div className="space-y-2">
        {rows.map(row => (
          <div key={row.id} className="rounded-xl border overflow-hidden"
            style={{ borderColor: row.inList ? `${theme.secondary}44` : theme.border }}>
            {/* Partner header */}
            <div className="px-2.5 py-2 flex items-center gap-2"
              style={{ background: row.inList ? `${theme.secondary}0d` : theme.surfaceHigh }}>
              <p className="text-xs font-bold flex-1 truncate"
                style={{ color: row.inList ? theme.secondary : theme.textSecondary }}>
                {row.isUnitRow ? '' : '⭐ '}{row.name}
              </p>
              {row.inList ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44', fontSize: 9 }}>
                  ✓ In list
                </span>
              ) : (
                <button
                  onClick={() => row.unit && onAdd(row.unit)}
                  disabled={!row.unit}
                  className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: `${theme.secondary}15`, color: theme.secondary, border: `1px solid ${theme.secondary}33`, opacity: row.unit ? 1 : 0.4 }}>
                  {row.unit ? `+ Add (${row.unit.points}pts)` : 'Not available'}
                </button>
              )}
            </div>
            {/* Abilities */}
            {row.abilities.length > 0 && (
              <div className="px-2.5 pb-2 pt-1.5 space-y-1.5">
                {row.abilities.map((ability, i) => (
                  <div key={i} className="rounded-lg px-2 py-1.5"
                    style={{ background: `${theme.secondary}08`, border: `1px solid ${theme.secondary}18` }}>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontSize: 11 }}>{PHASE_ICON[ability.phase] || '✦'}</span>
                      <p className="text-xs font-bold flex-1" style={{ color: theme.secondary }}>{ability.name}</p>
                      <span className="text-xs font-bold uppercase shrink-0"
                        style={{ color: theme.secondary, opacity: 0.7, fontSize: 8 }}>
                        {ability.phase}
                      </span>
                    </div>
                    {ability.reminder && (
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textPrimary }}>
                        {ability.reminder}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const ALLEGIANCE_GROUPS = [
  {
    id: 'imperium',
    label: 'Imperium',
    icon: '⚜️',
    factionIds: [
      'spacewolves', 'spacemarines', 'darkangels', 'bloodangels', 'blacktemplars',
      'greyknights', 'deathwatch', 'adeptuscustodes', 'adeptasororitas',
      'admech', 'astramilitarum', 'imperialknights',
    ],
  },
  {
    id: 'chaos',
    label: 'Chaos',
    icon: '💀',
    factionIds: [
      'chaosspacemarines', 'deathguard', 'emperorschildren', 'thousandsons',
      'worldeaters', 'chaosdaemons', 'chaosknights',
    ],
  },
  {
    id: 'xenos',
    label: 'Xenos',
    icon: '👽',
    factionIds: [
      'tyranids', 'genestealercults', 'necrons', 'orks',
      'aeldari', 'drukhari', 'tau', 'leaguesofvotann',
    ],
  },
]

function getAllegianceFor(factionId) {
  return ALLEGIANCE_GROUPS.find(g => g.factionIds.includes(factionId))?.id || 'imperium'
}

export default function ListBuilderScreen({ theme }) {
  const { savedLists, saveList, deleteList } = useListStore()

  // ── Active list state ──────────────────────────────────────────────
  const [faction, setFaction]       = useState('spacewolves')
  const [targetPts, setTargetPts]   = useState(1000)
  const [customTarget, setCustomTarget] = useState('')
  const [counts, setCounts]         = useState({}) // { [unitId]: number }
  const [listName, setListName]     = useState('')
  const [activeListId, setActiveListId] = useState(null) // id of loaded list

  // ── UI state ───────────────────────────────────────────────────────
  const [tab, setTab]               = useState('list')  // 'list' | 'add'
  const [catFilter, setCatFilter]   = useState('all')
  const [showFactions, setShowFactions] = useState(false)
  const [allegianceTab, setAllegianceTab] = useState(() => getAllegianceFor('spacewolves'))
  const [showSaved, setShowSaved]   = useState(false)
  const [showSaveSheet, setShowSaveSheet] = useState(false)
  const [showCustomTarget, setShowCustomTarget] = useState(false)
  const [expandedPairings, setExpandedPairings] = useState(new Set())

  // ── Derived ────────────────────────────────────────────────────────
  const allUnits  = useMemo(() => (FACTION_UNITS[faction] || []).filter(u => u.points > 0), [faction])
  const categories = useMemo(() => {
    const cats = [...new Set(allUnits.map(u => u.category || u.type).filter(Boolean))]
    return cats.sort((a, b) => {
      const order = ['epicHero', 'character', 'battleline', 'infantry', 'cavalry', 'monster', 'vehicle']
      return (order.indexOf(a) ?? 99) - (order.indexOf(b) ?? 99)
    })
  }, [allUnits])

  const listEntries = useMemo(() =>
    Object.entries(counts)
      .filter(([, c]) => c > 0)
      .map(([id, count]) => {
        const unit = allUnits.find(u => u.id === id)
        if (!unit) return null
        return { unit, count, subtotal: unit.points * count }
      })
      .filter(Boolean),
    [counts, allUnits]
  )

  const totalPts = listEntries.reduce((s, e) => s + e.subtotal, 0)
  const remaining = targetPts - totalPts
  const pct = Math.min(totalPts / targetPts, 1)
  const isOver = totalPts > targetPts
  const isClose = !isOver && remaining <= 50

  const filteredUnits = useMemo(() =>
    catFilter === 'all' ? allUnits : allUnits.filter(u => (u.category || u.type) === catFilter),
    [allUnits, catFilter]
  )

  // Base IDs of all units currently in the list (for pairing in-list detection)
  const inListIds = useMemo(() =>
    new Set(Object.keys(counts).filter(id => counts[id] > 0).map(id => baseId(id))),
    [counts]
  )

  const togglePairing = (unitId) => setExpandedPairings(prev => {
    const next = new Set(prev)
    next.has(unitId) ? next.delete(unitId) : next.add(unitId)
    return next
  })

  // Whether a unit has any pairing data defined
  const hasPairingData = (unit) => {
    const key = unit.unitKey || baseId(unit.id)
    if (unit.isLeader) return (unit.leadsUnits || []).length > 0
    return (unitLeaderMap[key] || []).length > 0
  }

  // Count how many pairing partners are already in the list
  const pairingInListCount = (unit) => {
    const key = unit.unitKey || baseId(unit.id)
    if (unit.isLeader) {
      return (unit.leadsUnits || []).filter(id => inListIds.has(id)).length
    }
    return (unitLeaderMap[key] || []).filter(id => inListIds.has(id)).length
  }

  const factionMeta = FACTION_META[faction] || { name: faction, icon: '⚔️', color: theme.secondary }

  // ── Handlers ───────────────────────────────────────────────────────
  const adjust = (unitId, delta) => setCounts(prev => {
    const next = Math.max(0, (prev[unitId] || 0) + delta)
    if (next === 0) {
      const { [unitId]: _, ...rest } = prev
      return rest
    }
    return { ...prev, [unitId]: next }
  })

  const clearList = () => {
    setCounts({})
    setActiveListId(null)
    setListName('')
  }

  const handleChangeFaction = (fid) => {
    setFaction(fid)
    setCounts({})
    setActiveListId(null)
    setShowFactions(false)
  }

  const handleSave = () => {
    if (!listName.trim()) return
    const id = activeListId || `list_${Date.now()}`
    saveList({
      id,
      name: listName.trim(),
      faction,
      targetPts,
      units: listEntries.map(e => ({ unitId: e.unit.id, name: e.unit.name, count: e.count, pts: e.unit.points })),
      savedAt: new Date().toISOString(),
    })
    setActiveListId(id)
    setShowSaveSheet(false)
  }

  const handleLoad = (saved) => {
    setFaction(saved.faction)
    setTargetPts(saved.targetPts)
    const c = {}
    saved.units.forEach(e => { c[e.unitId] = e.count })
    setCounts(c)
    setListName(saved.name)
    setActiveListId(saved.id)
    setShowSaved(false)
  }

  const barColor = isOver ? theme.hpLow : isClose ? '#f97316' : '#22c55e'

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>
      <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto min-h-0">

      {/* ── Header ── */}
      <div className="px-4 py-3 border-b shrink-0 flex items-center gap-3"
        style={{ background: theme.navBg, borderColor: theme.border }}>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
            Points Calculator
          </p>
          <h1 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>
            List Builder
          </h1>
        </div>

        {savedLists.length > 0 && (
          <button onClick={() => setShowSaved(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            Saved ({savedLists.length})
          </button>
        )}

        {listEntries.length > 0 && (
          <button onClick={() => setShowSaveSheet(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}33` }}>
            Save
          </button>
        )}
      </div>

      {/* ── Config strip: faction + target ── */}
      <div className="px-3 pt-3 pb-2 flex items-center gap-2 shrink-0">
        {/* Faction button */}
        <button onClick={() => setShowFactions(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
          <span>{factionMeta.icon}</span>
          <span className="truncate max-w-24">{factionMeta.name}</span>
          <span style={{ color: theme.textSecondary, fontSize: 9 }}>▾</span>
        </button>

        {/* Target presets */}
        <div className="flex gap-1 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {TARGET_PRESETS.map(t => (
            <button key={t} onClick={() => { setTargetPts(t); setShowCustomTarget(false) }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0"
              style={{
                background: targetPts === t && !showCustomTarget ? theme.secondary : theme.surfaceHigh,
                color: targetPts === t && !showCustomTarget ? theme.bg : theme.textSecondary,
                border: `1px solid ${targetPts === t && !showCustomTarget ? theme.secondary : theme.border}`,
              }}>
              {t >= 1000 ? `${t / 1000}k` : t}
            </button>
          ))}
          <button onClick={() => setShowCustomTarget(v => !v)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0"
            style={{
              background: showCustomTarget ? theme.secondary : theme.surfaceHigh,
              color: showCustomTarget ? theme.bg : theme.textSecondary,
              border: `1px solid ${showCustomTarget ? theme.secondary : theme.border}`,
            }}>
            Custom
          </button>
        </div>
      </div>

      {/* Custom target input */}
      <AnimatePresence>
        {showCustomTarget && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }}
            className="overflow-hidden px-3 pb-2 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter points limit"
                className="flex-1 px-3 py-2 rounded-xl text-xs font-bold outline-none"
                style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                value={customTarget}
                onChange={e => setCustomTarget(e.target.value)}
              />
              <button
                onClick={() => { if (+customTarget > 0) { setTargetPts(+customTarget); setShowCustomTarget(false) } }}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: theme.secondary, color: theme.bg }}>
                Set
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Points summary bar ── */}
      <div className="mx-3 mb-2 rounded-2xl border px-4 py-3 shrink-0"
        style={{ background: theme.surface, borderColor: isOver ? `${theme.hpLow}55` : isClose ? '#f9731644' : theme.border }}>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-3xl font-black leading-none" style={{ color: isOver ? theme.hpLow : isClose ? '#f97316' : theme.textPrimary }}>
              {totalPts}
            </span>
            <span className="text-sm font-bold ml-1" style={{ color: theme.textSecondary }}>
              / {targetPts} pts
            </span>
          </div>
          <div className="text-right">
            {isOver ? (
              <p className="text-sm font-black" style={{ color: theme.hpLow }}>+{Math.abs(remaining)} over</p>
            ) : remaining === 0 ? (
              <p className="text-sm font-black" style={{ color: '#22c55e' }}>Perfect!</p>
            ) : (
              <p className="text-sm font-bold" style={{ color: isClose ? '#f97316' : theme.textSecondary }}>
                {remaining} remaining
              </p>
            )}
            <p className="text-xs" style={{ color: theme.textSecondary }}>
              {listEntries.reduce((s, e) => s + e.count, 0)} units
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: theme.surfaceHigh }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{ background: barColor }}
          />
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="mx-3 mb-2 flex rounded-xl overflow-hidden shrink-0"
        style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
        {[['list', `Your List (${listEntries.reduce((s,e) => s+e.count,0)})`], ['add', 'Add Units']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex-1 py-2 text-xs font-bold transition-all"
            style={{
              background: tab === id ? theme.secondary : 'transparent',
              color: tab === id ? theme.bg : theme.textSecondary,
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">

        {/* YOUR LIST */}
        {tab === 'list' && (
          <div>
            {listEntries.length === 0 ? (
              <div className="rounded-2xl border p-8 text-center mt-2"
                style={{ background: theme.surface, borderColor: theme.border }}>
                <p className="text-2xl mb-2">📋</p>
                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>Your list is empty</p>
                <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                  Switch to "Add Units" to start building
                </p>
                <button onClick={() => setTab('add')}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.secondary, color: theme.bg }}>
                  Add Units →
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 mt-1">
                {/* Group by category */}
                {Object.entries(
                  listEntries.reduce((groups, entry) => {
                    const cat = entry.unit.category || entry.unit.type || 'other'
                    if (!groups[cat]) groups[cat] = []
                    groups[cat].push(entry)
                    return groups
                  }, {})
                ).map(([cat, entries]) => (
                  <div key={cat}>
                    <p className="text-xs font-black tracking-widest uppercase px-1 mb-1 mt-3 first:mt-0"
                      style={{ color: theme.textSecondary }}>
                      {CATEGORY_LABELS[cat] || cat}
                    </p>
                    {entries.map(({ unit, count, subtotal }) => {
                      const hasPairings = hasPairingData(unit)
                      const inListCount = pairingInListCount(unit)
                      const isExpanded = expandedPairings.has(unit.id)
                      return (
                        <div key={unit.id} className="rounded-2xl border overflow-hidden"
                          style={{ background: theme.surface, borderColor: hasPairings && inListCount > 0 ? `${theme.secondary}44` : theme.border }}>
                          <div className="flex items-center px-3 py-2.5 gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs" style={{ color: theme.textSecondary }}>
                                  {unit.points} pts each
                                  {count > 1 && <span style={{ color: theme.secondary }}> · {subtotal} total</span>}
                                </p>
                                {hasPairings && (
                                  <button onClick={() => togglePairing(unit.id)}
                                    className="text-xs font-bold px-1.5 py-0.5 rounded-lg"
                                    style={{
                                      background: isExpanded ? `${theme.secondary}22` : theme.surfaceHigh,
                                      color: inListCount > 0 ? theme.secondary : theme.textSecondary,
                                      border: `1px solid ${inListCount > 0 ? theme.secondary + '44' : theme.border}`,
                                    }}>
                                    {unit.isLeader ? '⭐' : '🔗'}
                                    {inListCount > 0 ? ` ${inListCount} linked` : ' Pairings'}
                                    {' '}{isExpanded ? '▴' : '▾'}
                                  </button>
                                )}
                              </div>
                            </div>
                            {/* Count stepper */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={() => adjust(unit.id, -1)}
                                className="w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center"
                                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                                −
                              </button>
                              <span className="w-5 text-center text-sm font-black" style={{ color: theme.textPrimary }}>
                                {count}
                              </span>
                              <button onClick={() => adjust(unit.id, 1)}
                                className="w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center"
                                style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                                +
                              </button>
                            </div>
                            {/* Pts badge */}
                            <span className="text-xs font-black shrink-0 w-14 text-right"
                              style={{ color: theme.secondary }}>
                              {subtotal} pts
                            </span>
                          </div>
                          {/* Pairing section */}
                          <AnimatePresence>
                            {isExpanded && hasPairings && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                className="overflow-hidden">
                                <PairingSection
                                  unit={unit}
                                  allUnits={allUnits}
                                  inListIds={inListIds}
                                  onAdd={(u) => adjust(u.id, 1)}
                                  theme={theme}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                ))}

                {/* Totals footer */}
                <div className="rounded-2xl border px-4 py-3 mt-3 flex items-center justify-between"
                  style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
                  <p className="text-sm font-bold" style={{ color: theme.textSecondary }}>
                    {listEntries.reduce((s, e) => s + e.count, 0)} units total
                  </p>
                  <p className="text-xl font-black" style={{ color: isOver ? theme.hpLow : theme.secondary }}>
                    {totalPts} <span className="text-sm font-bold" style={{ color: theme.textSecondary }}>/ {targetPts}</span>
                  </p>
                </div>

                <button onClick={clearList}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-medium"
                  style={{ color: theme.textSecondary }}>
                  Clear list
                </button>
              </div>
            )}
          </div>
        )}

        {/* ADD UNITS */}
        {tab === 'add' && (
          <div>
            {/* Category filter */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3 mt-1" style={{ scrollbarWidth: 'none' }}>
              <button onClick={() => setCatFilter('all')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
                style={{
                  background: catFilter === 'all' ? theme.secondary : theme.surfaceHigh,
                  color: catFilter === 'all' ? theme.bg : theme.textSecondary,
                  border: `1px solid ${catFilter === 'all' ? theme.secondary : theme.border}`,
                }}>
                All
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
                  style={{
                    background: catFilter === cat ? theme.secondary : theme.surfaceHigh,
                    color: catFilter === cat ? theme.bg : theme.textSecondary,
                    border: `1px solid ${catFilter === cat ? theme.secondary : theme.border}`,
                  }}>
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>

            {/* Unit cards */}
            <div className="space-y-1.5">
              {filteredUnits.map(unit => {
                const count = counts[unit.id] || 0
                const wouldExceed = totalPts + unit.points > targetPts + 50
                return (
                  <div key={unit.id} className="rounded-2xl border flex items-center px-3 py-2.5 gap-3"
                    style={{ background: theme.surface, borderColor: count > 0 ? `${theme.secondary}44` : theme.border }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs" style={{ color: theme.textSecondary }}>
                          {CATEGORY_LABELS[unit.category || unit.type] || unit.category || ''}
                          {unit.models > 1 && ` · ${unit.models} models`}
                        </p>
                        {pairingInListCount(unit) > 0 && (
                          <span className="text-xs font-bold px-1.5 py-0.5 rounded-lg"
                            style={{ background: `${theme.secondary}15`, color: theme.secondary, border: `1px solid ${theme.secondary}33`, fontSize: 9 }}>
                            {unit.isLeader ? `⭐ leads ${pairingInListCount(unit)} in list` : `🔗 ${pairingInListCount(unit)} leader${pairingInListCount(unit) > 1 ? 's' : ''} in list`}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-black shrink-0"
                      style={{ color: wouldExceed && count === 0 ? theme.textSecondary : theme.secondary }}>
                      {unit.points} pts
                    </span>
                    {count > 0 ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => adjust(unit.id, -1)}
                          className="w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center"
                          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-black" style={{ color: theme.secondary }}>
                          {count}
                        </span>
                        <button onClick={() => adjust(unit.id, 1)}
                          className="w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center"
                          style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                          +
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => adjust(unit.id, 1)}
                        className="w-8 h-8 rounded-xl font-black text-lg flex items-center justify-center shrink-0"
                        style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}33` }}>
                        +
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      </div>{/* end centered column */}

      {/* ── Faction picker sheet ── */}
      <AnimatePresence>
        {showFactions && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:pl-56"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }} animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }} onClick={() => setShowFactions(false)}>
            <motion.div className="w-full max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden"
              style={{ background: theme.surface, maxHeight: '75vh' }}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              onClick={e => e.stopPropagation()}>
              <div className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: theme.border }}>
                <p className="font-black text-sm" style={{ color: theme.textPrimary }}>Select Faction</p>
                <button onClick={() => setShowFactions(false)}
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(75vh - 56px)' }}>
                {/* Allegiance tabs */}
                <div className="flex border-b" style={{ borderColor: theme.border }}>
                  {ALLEGIANCE_GROUPS.map((g, i) => (
                    <button key={g.id} onClick={() => setAllegianceTab(g.id)}
                      className="flex-1 py-2.5 flex flex-col items-center gap-0.5"
                      style={{
                        background: allegianceTab === g.id ? `${theme.secondary}15` : 'transparent',
                        borderRight: i < ALLEGIANCE_GROUPS.length - 1 ? `1px solid ${theme.border}` : 'none',
                        borderBottom: allegianceTab === g.id ? `2px solid ${theme.secondary}` : '2px solid transparent',
                      }}>
                      <span className="text-lg">{g.icon}</span>
                      <p className="text-xs font-black tracking-wide"
                        style={{ color: allegianceTab === g.id ? theme.secondary : theme.textSecondary }}>
                        {g.label}
                      </p>
                    </button>
                  ))}
                </div>
                {/* Faction grid */}
                <div className="grid grid-cols-3 gap-2 p-3">
                  {ALLEGIANCE_GROUPS.find(g => g.id === allegianceTab)?.factionIds.map(id => {
                    const f = FACTION_META[id]
                    if (!f) return null
                    const selected = faction === id
                    return (
                      <button key={id} onClick={() => handleChangeFaction(id)}
                        className="rounded-2xl border-2 p-3 flex flex-col items-center text-center relative"
                        style={{
                          background: selected ? `${f.color}18` : theme.surface,
                          borderColor: selected ? f.color : theme.border,
                        }}>
                        {selected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: f.color }}>
                            <span style={{ color: '#fff', fontSize: 8, fontWeight: 900, lineHeight: 1 }}>✓</span>
                          </div>
                        )}
                        <span className="text-3xl mb-1">{f.icon}</span>
                        <p className="text-xs font-bold leading-tight"
                          style={{ color: selected ? f.color : theme.textPrimary }}>
                          {f.name}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Saved lists sheet ── */}
      <AnimatePresence>
        {showSaved && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:pl-56"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }} animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }} onClick={() => setShowSaved(false)}>
            <motion.div className="w-full max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden"
              style={{ background: theme.surface, maxHeight: '75vh' }}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              onClick={e => e.stopPropagation()}>
              <div className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: theme.border }}>
                <p className="font-black text-sm" style={{ color: theme.textPrimary }}>Saved Lists</p>
                <button onClick={() => setShowSaved(false)}
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
              </div>
              <div className="overflow-y-auto p-3 space-y-2" style={{ maxHeight: 'calc(75vh - 56px)' }}>
                {savedLists.length === 0 ? (
                  <p className="text-center text-xs py-8" style={{ color: theme.textSecondary }}>No saved lists yet</p>
                ) : savedLists.map(l => {
                  const meta = FACTION_META[l.faction] || { icon: '⚔️', name: l.faction }
                  const total = l.units.reduce((s, u) => s + u.pts * u.count, 0)
                  return (
                    <div key={l.id} className="rounded-2xl border px-3 py-2.5 flex items-center gap-3"
                      style={{ background: theme.surfaceHigh, borderColor: l.id === activeListId ? `${theme.secondary}55` : theme.border }}>
                      <span className="text-xl shrink-0">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{l.name}</p>
                        <p className="text-xs" style={{ color: theme.textSecondary }}>
                          {meta.name} · {total} / {l.targetPts} pts · {l.units.reduce((s,u) => s+u.count,0)} units
                        </p>
                      </div>
                      <button onClick={() => handleLoad(l)}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0"
                        style={{ background: `${theme.secondary}18`, color: theme.secondary }}>
                        Load
                      </button>
                      <button onClick={() => deleteList(l.id)}
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Save sheet ── */}
      <AnimatePresence>
        {showSaveSheet && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:pl-56"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }} animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }} onClick={() => setShowSaveSheet(false)}>
            <motion.div className="w-full max-w-lg rounded-t-3xl md:rounded-3xl p-5 pb-8"
              style={{ background: theme.surface }}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
              <p className="font-black text-base mb-4" style={{ color: theme.textPrimary }}>Save List</p>
              <input
                type="text"
                placeholder="List name (e.g. 1k Wolves)"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none mb-4"
                style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                value={listName}
                onChange={e => setListName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <div className="rounded-xl px-3 py-2 mb-4"
                style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                <p className="text-xs" style={{ color: theme.textSecondary }}>
                  {factionMeta.icon} {factionMeta.name} · {totalPts} / {targetPts} pts · {listEntries.reduce((s,e) => s+e.count,0)} units
                </p>
              </div>
              <button onClick={handleSave} disabled={!listName.trim()}
                className="w-full py-3.5 rounded-2xl font-bold text-sm"
                style={{ background: listName.trim() ? theme.secondary : theme.surfaceHigh, color: listName.trim() ? theme.bg : theme.textSecondary }}>
                {activeListId ? 'Update List' : 'Save List'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
