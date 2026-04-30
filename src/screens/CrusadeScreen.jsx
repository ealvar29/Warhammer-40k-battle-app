import React, { useState, useEffect } from 'react'
import { useCrusadeStore, getRank, getNextRank } from '../store/crusadeStore'
import TipCard from '../components/TipCard'
import { battleHonours } from '../data/crusade/battleHonours'
import { battleScars } from '../data/crusade/battleScars'
import { agendas as AGENDAS } from '../data/crusade/agendas'
import { rpActions as RP_ACTIONS } from '../data/crusade/rpActions'
import { FACTION_META, FACTION_DETACHMENTS } from '../data/factionRegistry'

// ── Helpers ────────────────────────────────────────────────────────────────

function formatCode(code) {
  if (!code || code.length < 6) return code || '------'
  return `${code.slice(0, 3)}-${code.slice(3)}`
}

function timeAgo(iso) {
  if (!iso) return 'Never synced'
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const h = Math.floor(mins / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const ALLEGIANCE_GROUPS = [
  { id: 'imperium', label: 'Imperium', icon: '⚜️', factionIds: ['spacewolves','spacemarines','darkangels','bloodangels','blacktemplars','greyknights','deathwatch','adeptuscustodes','adeptasororitas','admech','astramilitarum','imperialknights'] },
  { id: 'chaos',    label: 'Chaos',    icon: '💀', factionIds: ['chaosspacemarines','deathguard','emperorschildren','thousandsons','worldeaters','chaosdaemons','chaosknights'] },
  { id: 'xenos',    label: 'Xenos',    icon: '👽', factionIds: ['tyranids','genestealercults','necrons','orks','aeldari','drukhari','tau','leaguesofvotann'] },
]

function getAllegianceFor(factionId) {
  return ALLEGIANCE_GROUPS.find(g => g.factionIds.includes(factionId))?.id || 'imperium'
}

// ── XP Bar ─────────────────────────────────────────────────────────────────

function XpBar({ xp, theme }) {
  const rank = getRank(xp)
  const nextRank = getNextRank(xp)
  const pct = nextRank ? ((xp - rank.xpMin) / (nextRank.xpMin - rank.xpMin)) * 100 : 100
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-bold" style={{ color: theme.secondary }}>{rank.label}</span>
        {nextRank
          ? <span className="text-xs" style={{ color: theme.textSecondary }}>{xp} / {nextRank.xpMin} XP → {nextRank.label}</span>
          : <span className="text-xs" style={{ color: theme.secondary }}>Max Rank</span>
        }
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.border }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: theme.secondary }} />
      </div>
    </div>
  )
}

// ── Dice Roller Modal ───────────────────────────────────────────────────────

const DIE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

function DiceRollerModal({ table, title, onApply, onClose, theme }) {
  const [shown, setShown] = useState(1)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const finalRoll = Math.floor(Math.random() * 6) + 1
    const delays = [60, 80, 110, 150, 200, 260, 330, 410, 500]
    let i = 0
    const tick = () => {
      if (i < delays.length) {
        setShown(Math.floor(Math.random() * 6) + 1)
        setTimeout(tick, delays[i++])
      } else {
        setShown(finalRoll)
        setResult(table.find(r => r.roll === finalRoll) || table[0])
      }
    }
    setTimeout(tick, 40)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="w-full max-w-xs rounded-3xl p-6 space-y-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
        <p className="text-xs font-bold tracking-widest uppercase text-center" style={{ color: theme.secondary }}>{title}</p>

        <div className="flex flex-col items-center gap-1">
          <span className="leading-none" style={{ fontSize: 80 }}>{DIE_FACES[shown - 1]}</span>
          <span className="text-3xl font-black" style={{ color: theme.textPrimary }}>{shown}</span>
        </div>

        {result && (
          <div className="rounded-2xl p-4 text-center" style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
            <p className="font-black text-sm mb-1" style={{ color: theme.secondary }}>{result.name}</p>
            <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>{result.effect}</p>
          </div>
        )}

        <div className="flex gap-2">
          {result && (
            <button onClick={() => onApply(result)} className="flex-1 py-3 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Apply
            </button>
          )}
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl font-bold text-sm"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            {result ? 'Dismiss' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Create Roster Sheet ─────────────────────────────────────────────────────

function CreateRosterSheet({ onClose, onCreate, theme }) {
  const [name, setName] = useState('')
  const [allegianceTab, setAllegianceTab] = useState('imperium')
  const [faction, setFaction] = useState(null)
  const [detachmentId, setDetachmentId] = useState(null)

  const detachments = faction ? Object.values(FACTION_DETACHMENTS[faction] || {}) : []
  const factionMeta = faction ? FACTION_META[faction] : null

  const canCreate = name.trim() && faction

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-sm rounded-t-3xl flex flex-col" style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '92vh' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>New Crusade Force</p>
          <h2 className="text-lg font-black mt-0.5 mb-4" style={{ color: theme.textPrimary }}>Create your Order of Battle</h2>

          {/* Name */}
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. The Ironjaws Warband"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none mb-4"
            style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />

          {/* Allegiance tabs */}
          <div className="flex rounded-xl overflow-hidden border mb-3" style={{ borderColor: theme.border }}>
            {ALLEGIANCE_GROUPS.map((g, i) => (
              <button key={g.id} onClick={() => { setAllegianceTab(g.id); setFaction(null); setDetachmentId(null) }}
                className="flex-1 py-2 text-xs font-black transition-all"
                style={{
                  background: allegianceTab === g.id ? `${theme.secondary}18` : theme.surfaceHigh,
                  color: allegianceTab === g.id ? theme.secondary : theme.textSecondary,
                  borderRight: i < 2 ? `1px solid ${theme.border}` : 'none',
                }}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-3">
          {/* Faction grid */}
          <div className="grid grid-cols-3 gap-2">
            {ALLEGIANCE_GROUPS.find(g => g.id === allegianceTab)?.factionIds.map(id => {
              const f = FACTION_META[id]
              if (!f) return null
              const sel = faction === id
              return (
                <button key={id} onClick={() => { setFaction(id); setDetachmentId(null) }}
                  className="rounded-2xl border-2 p-2.5 flex flex-col items-center text-center transition-all"
                  style={{ background: sel ? `${f.color}18` : theme.surfaceHigh, borderColor: sel ? f.color : theme.border }}>
                  <span className="text-2xl mb-1">{f.icon}</span>
                  <p className="text-xs font-bold leading-tight" style={{ color: sel ? f.color : theme.textPrimary, fontSize: 10 }}>{f.name}</p>
                </button>
              )
            })}
          </div>

          {/* Detachment picker */}
          {detachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>
                Detachment (optional)
              </p>
              {detachments.map(d => (
                <button key={d.id} onClick={() => setDetachmentId(d.id)}
                  className="w-full rounded-xl border p-3 text-left transition-all"
                  style={{
                    background: detachmentId === d.id ? `${factionMeta.color}12` : theme.surfaceHigh,
                    borderColor: detachmentId === d.id ? factionMeta.color : theme.border,
                  }}>
                  <p className="text-xs font-bold" style={{ color: detachmentId === d.id ? factionMeta.color : theme.textPrimary }}>{d.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{d.detachmentRule?.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 pb-8 pt-3 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          <button onClick={() => canCreate && onCreate(name.trim(), faction, detachmentId)}
            className="w-full py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: canCreate ? theme.secondary : theme.border, color: canCreate ? theme.bg : theme.textSecondary }}>
            Create Force
          </button>
          {onClose && (
            <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Spend RP Sheet ──────────────────────────────────────────────────────────

function SpendRPSheet({ order, onClose, theme }) {
  const store = useCrusadeStore()
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')

  const canAfford = selected && order.requisitionPoints >= selected.cost

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-sm rounded-t-3xl flex flex-col" style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Spend Requisition Points</p>
              <p className="text-sm font-black mt-0.5" style={{ color: theme.textPrimary }}>
                Available: <span style={{ color: theme.secondary }}>{order.requisitionPoints} RP</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-2">
          {RP_ACTIONS.map(action => {
            const affordable = order.requisitionPoints >= action.cost
            const sel = selected?.id === action.id
            return (
              <button key={action.id} onClick={() => affordable && setSelected(sel ? null : action)}
                className="w-full rounded-2xl border p-3.5 text-left transition-all"
                style={{
                  background: sel ? `${theme.secondary}12` : theme.surfaceHigh,
                  borderColor: sel ? theme.secondary : affordable ? theme.border : `${theme.border}60`,
                  opacity: affordable ? 1 : 0.45,
                }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-black" style={{ color: sel ? theme.secondary : theme.textPrimary }}>{action.name}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{action.description}</p>
                  </div>
                  <span className="text-xs font-black px-2 py-1 rounded-lg shrink-0"
                    style={{ background: sel ? theme.secondary : theme.border, color: sel ? theme.bg : theme.textSecondary }}>
                    {action.cost} RP
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="px-5 pb-8 pt-3 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          {selected && (
            <input value={note} onChange={e => setNote(e.target.value)}
              placeholder="Note (optional — e.g. which unit)"
              className="w-full rounded-xl px-3 py-2 text-xs outline-none mb-1"
              style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
          )}
          <button onClick={() => { if (canAfford) { store.spendRP(order.id, selected, note); onClose() } }}
            className="w-full py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: canAfford ? theme.secondary : theme.border, color: canAfford ? theme.bg : theme.textSecondary }}>
            {selected ? `Spend ${selected.cost} RP — ${selected.name}` : 'Select an action'}
          </button>
          <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Unit Crusade Card ───────────────────────────────────────────────────────

function UnitCrusadeCard({ unit, orderId, onRollHonour, onRollScar, theme }) {
  const store = useCrusadeStore()
  const [expanded, setExpanded] = useState(false)
  const [addingHonour, setAddingHonour] = useState(false)
  const [addingScar, setAddingScar] = useState(false)
  const [addingRelic, setAddingRelic] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const rank = getRank(unit.xp)

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: theme.unitBg, borderColor: theme.border }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{unit.name}</p>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                {rank.label}
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
              {unit.unitType} · {unit.battlesPlayed} battles · {unit.powerRating} PR
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {(unit.battleScars?.length > 0) && <span className="text-xs" style={{ color: theme.hpLow }}>⚠ {unit.battleScars.length}</span>}
            {(unit.battleHonours?.length > 0) && <span className="text-xs" style={{ color: theme.secondary }}>★ {unit.battleHonours.length}</span>}
            <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: theme.surfaceHigh, color: theme.textPrimary }}>
              {unit.xp} XP
            </span>
            <span style={{ color: theme.textSecondary, fontSize: 9 }}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
        <div className="mt-3"><XpBar xp={unit.xp} theme={theme} /></div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: theme.border }}>

          {/* XP */}
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Add XP:</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(amt => (
                <button key={amt} onClick={() => store.addXp(orderId, unit.id, amt)}
                  className="w-9 h-9 rounded-xl text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Battle Honours */}
          <div>
            <TipCard id="tip_honours" theme={theme}
              body="Roll for a Battle Honour when a unit reaches a new rank milestone. It's a permanent upgrade — or type one in manually from your codex." />
            <div className="flex items-center justify-between mb-2 mt-2">
              <p className="text-xs font-bold" style={{ color: theme.secondary }}>★ Battle Honours</p>
              <div className="flex gap-1.5">
                <button onClick={() => onRollHonour(unit)}
                  className="text-xs px-2 py-1 rounded-lg font-bold"
                  style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                  🎲 Roll
                </button>
                <button onClick={() => { setAddingHonour(!addingHonour); setInputVal('') }}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                  + Manual
                </button>
              </div>
            </div>
            {(unit.battleHonours?.length === 0) && !addingHonour && (
              <p className="text-xs" style={{ color: theme.textSecondary }}>No battle honours yet.</p>
            )}
            {unit.battleHonours?.map((h, i) => (
              <div key={i} className="flex items-center justify-between mb-1">
                <p className="text-xs flex-1" style={{ color: theme.textPrimary }}>★ {h}</p>
                <button onClick={() => store.removeBattleHonour(orderId, unit.id, i)}
                  className="text-xs px-1.5 py-0.5 rounded ml-2"
                  style={{ color: theme.textSecondary, background: theme.surfaceHigh }}>✕</button>
              </div>
            ))}
            {addingHonour && (
              <div className="flex gap-2 mt-1">
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. Fierce Determination"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={() => { if (inputVal) { store.addBattleHonour(orderId, unit.id, inputVal); setInputVal(''); setAddingHonour(false) } }}
                  className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.secondary, color: theme.bg }}>Add</button>
              </div>
            )}
          </div>

          {/* Battle Scars */}
          <div>
            <TipCard id="tip_scars" theme={theme}
              body="Roll a Battle Scar when a unit is destroyed in battle. These are permanent penalties. Use the 'Repair and Recuperate' RP action to remove one between games." />
            <div className="flex items-center justify-between mb-2 mt-2">
              <p className="text-xs font-bold" style={{ color: theme.hpLow }}>⚠ Battle Scars</p>
              <div className="flex gap-1.5">
                <button onClick={() => onRollScar(unit)}
                  className="text-xs px-2 py-1 rounded-lg font-bold"
                  style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
                  🎲 Roll
                </button>
                <button onClick={() => { setAddingScar(!addingScar); setInputVal('') }}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                  + Manual
                </button>
              </div>
            </div>
            {(unit.battleScars?.length === 0) && !addingScar && (
              <p className="text-xs" style={{ color: theme.textSecondary }}>No battle scars.</p>
            )}
            {unit.battleScars?.map((s, i) => (
              <div key={i} className="flex items-center justify-between mb-1">
                <p className="text-xs flex-1" style={{ color: theme.hpLow }}>⚠ {s}</p>
                <button onClick={() => store.removeBattleScar(orderId, unit.id, i)}
                  className="text-xs px-1.5 py-0.5 rounded ml-2"
                  style={{ color: theme.textSecondary, background: theme.surfaceHigh }}>✕</button>
              </div>
            ))}
            {addingScar && (
              <div className="flex gap-2 mt-1">
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. −1 Move"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={() => { if (inputVal) { store.addBattleScar(orderId, unit.id, inputVal); setInputVal(''); setAddingScar(false) } }}
                  className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.hpLow, color: '#fff' }}>Add</button>
              </div>
            )}
          </div>

          {/* Relics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold" style={{ color: theme.cpColor }}>💎 Relics</p>
              <button onClick={() => { setAddingRelic(!addingRelic); setInputVal('') }}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                + Add
              </button>
            </div>
            {(unit.relics?.length === 0) && !addingRelic && (
              <p className="text-xs" style={{ color: theme.textSecondary }}>No relics.</p>
            )}
            {unit.relics?.map((r, i) => (
              <p key={i} className="text-xs mb-1" style={{ color: theme.textPrimary }}>💎 {r}</p>
            ))}
            {addingRelic && (
              <div className="flex gap-2 mt-1">
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. Frostfang"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={() => { if (inputVal) { store.addRelic(orderId, unit.id, inputVal); setInputVal(''); setAddingRelic(false) } }}
                  className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.cpColor, color: theme.bg }}>Add</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Agendas Tab ─────────────────────────────────────────────────────────────

function AgendasTab({ order, theme }) {
  const store = useCrusadeStore()
  const active = order.agendas || []

  const toggle = (id) => {
    if (active.includes(id)) {
      store.setOrderAgendas(order.id, active.filter(a => a !== id))
    } else if (active.length < 3) {
      store.setOrderAgendas(order.id, [...active, id])
    }
  }

  const CATEGORY_COLORS = { Recon: '#00b4d8', Destroy: '#ef4444', Hold: '#22c55e', Achieve: '#a855f7' }

  return (
    <div className="px-4 py-4 space-y-3">
      <TipCard id="tip_agendas" theme={theme}
        body="Pick up to 3 Agendas before you play. Complete the agenda's goal during the battle to earn bonus XP on top of the standard award." />

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>
          Pre-Battle Agendas
        </p>
        <span className="text-xs px-2 py-1 rounded-full font-bold"
          style={{ background: theme.surfaceHigh, color: active.length === 3 ? theme.secondary : theme.textSecondary }}>
          {active.length} / 3 selected
        </span>
      </div>

      {active.length > 0 && (
        <div className="rounded-2xl p-3 space-y-2" style={{ background: `${theme.secondary}10`, border: `1px solid ${theme.secondary}30` }}>
          <p className="text-xs font-bold" style={{ color: theme.secondary }}>Active for next battle:</p>
          {active.map(id => {
            const a = AGENDAS.find(ag => ag.id === id)
            if (!a) return null
            return (
              <div key={id} className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{a.name}</span>
                  <span className="text-xs ml-2 px-1.5 py-0.5 rounded font-bold"
                    style={{ background: `${CATEGORY_COLORS[a.category]}22`, color: CATEGORY_COLORS[a.category], fontSize: 9 }}>
                    {a.category}
                  </span>
                </div>
                <span className="text-xs font-bold" style={{ color: theme.secondary }}>+{a.xpReward} XP</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="space-y-2 pt-1">
        {AGENDAS.map(a => {
          const sel = active.includes(a.id)
          const disabled = !sel && active.length >= 3
          const color = CATEGORY_COLORS[a.category] || theme.secondary
          return (
            <button key={a.id} onClick={() => !disabled && toggle(a.id)}
              className="w-full rounded-2xl border p-3.5 text-left transition-all"
              style={{
                background: sel ? `${color}12` : theme.surfaceHigh,
                borderColor: sel ? color : theme.border,
                opacity: disabled ? 0.4 : 1,
              }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-black" style={{ color: sel ? color : theme.textPrimary }}>{a.name}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                      style={{ background: `${color}18`, color, fontSize: 9 }}>{a.category}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{a.description}</p>
                  {a.unitReward && (
                    <p className="text-xs mt-1 italic" style={{ color: theme.textSecondary }}>
                      Reward: {a.unitReward}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs font-black" style={{ color: sel ? color : theme.textSecondary }}>+{a.xpReward} XP</span>
                  {sel && <span className="text-xs font-bold" style={{ color }}>✓</span>}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── RP Log Tab ──────────────────────────────────────────────────────────────

function RPLogTab({ order, onSpend, theme }) {
  const store = useCrusadeStore()
  const rpLog = order.rpLog || []

  return (
    <div className="px-4 py-4 space-y-3">
      <TipCard id="tip_rp" theme={theme}
        body="You earn 1 Requisition Point after every battle. Spend them between games to upgrade your force — resupply units, recruit reinforcements, or grant relics." />

      {/* RP Balance */}
      <div className="rounded-2xl p-4 flex items-center justify-between"
        style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Requisition Points</p>
          <p className="text-3xl font-black mt-0.5" style={{ color: theme.secondary }}>{order.requisitionPoints}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => store.adjustRP(order.id, -1)}
            className="w-9 h-9 rounded-xl font-black text-lg flex items-center justify-center"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>−</button>
          <button onClick={() => store.adjustRP(order.id, 1)}
            className="w-9 h-9 rounded-xl font-black text-lg flex items-center justify-center"
            style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>+</button>
        </div>
      </div>

      <button onClick={onSpend}
        className="w-full py-3 rounded-2xl font-bold text-sm"
        style={{ background: theme.secondary, color: theme.bg }}>
        Spend Requisition Points →
      </button>

      {/* Log */}
      <p className="text-xs font-bold tracking-widest uppercase pt-1" style={{ color: theme.textSecondary }}>
        Spending History
      </p>
      {rpLog.length === 0 ? (
        <p className="text-xs" style={{ color: theme.textSecondary }}>No RP spent yet.</p>
      ) : (
        <div className="space-y-2">
          {rpLog.map(entry => (
            <div key={entry.id} className="rounded-xl p-3 flex items-start justify-between gap-2"
              style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{entry.actionName}</p>
                {entry.note && <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{entry.note}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black" style={{ color: theme.hpLow }}>−{entry.cost} RP</p>
                <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{formatDate(entry.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Screen ─────────────────────────────────────────────────────────────

const UNIT_TYPES = ['Infantry', 'Character', 'Cavalry', 'Monster', 'Vehicle', 'Battleline', 'Mounted']

export default function CrusadeScreen({ theme }) {
  const store = useCrusadeStore()
  const activeOrder = store.getActiveOrder()

  const [tab, setTab] = useState('roster')
  const [showCreateRoster, setShowCreateRoster] = useState(false)
  const [showSpendRP, setShowSpendRP] = useState(false)
  const [addingUnit, setAddingUnit] = useState(false)
  const [recordingBattle, setRecordingBattle] = useState(false)
  const [newUnitForm, setNewUnitForm] = useState({ name: '', unitType: 'Infantry', powerRating: '1' })
  const [showLoadInput, setShowLoadInput] = useState(false)
  const [loadCodeInput, setLoadCodeInput] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)
  const [diceRoll, setDiceRoll] = useState(null) // { table, title, unit }

  const { syncCode, lastSynced, syncStatus, syncError } = store

  const handleCopyCode = () => {
    navigator.clipboard.writeText(formatCode(syncCode)).catch(() => {})
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  const handleLoadFromCode = async () => {
    const ok = await store.syncFromCloud(loadCodeInput)
    if (ok) { setShowLoadInput(false); setLoadCodeInput('') }
  }

  const handleRollHonour = (unit) => setDiceRoll({ table: battleHonours, title: `${unit.name} — Battle Honour`, unit, type: 'honour' })
  const handleRollScar   = (unit) => setDiceRoll({ table: battleScars,   title: `${unit.name} — Battle Scar`,  unit, type: 'scar'   })

  const handleDiceApply = (result) => {
    if (!diceRoll || !activeOrder) return
    if (diceRoll.type === 'honour') {
      store.addBattleHonour(activeOrder.id, diceRoll.unit.id, result.name)
    } else {
      store.addBattleScar(activeOrder.id, diceRoll.unit.id, result.name)
    }
    setDiceRoll(null)
  }

  // No orders at all — show creation flow
  if (!activeOrder && store.orders.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6 gap-4" style={{ background: theme.bg }}>
        <div className="text-center">
          <p className="text-4xl mb-3">⚔️</p>
          <p className="text-xl font-black mb-1" style={{ color: theme.textPrimary }}>No Crusade Forces</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>Create your first Order of Battle to begin your campaign.</p>
        </div>
        <button onClick={() => setShowCreateRoster(true)}
          className="w-full py-3.5 rounded-2xl font-bold text-sm"
          style={{ background: theme.secondary, color: theme.bg }}>
          + Create Crusade Force
        </button>
        {showCreateRoster && (
          <CreateRosterSheet theme={theme} onClose={() => setShowCreateRoster(false)}
            onCreate={(name, faction, detachmentId) => { store.createOrder(name, faction, detachmentId); setShowCreateRoster(false) }} />
        )}
      </div>
    )
  }

  if (!activeOrder) return null

  const supplyUsed = activeOrder.units.reduce((s, u) => s + (u.powerRating || 0), 0)

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>

      {/* ── Header ── */}
      <div className="shrink-0" style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Crusade Roster</p>
              <h1 className="text-lg font-black truncate mt-0.5" style={{ color: theme.textPrimary }}>{activeOrder.name}</h1>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setShowCreateRoster(true)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                + New
              </button>
              {store.orders.length > 1 && (
                <select value={store.activeOrderId}
                  onChange={e => store.setActiveOrder(e.target.value)}
                  className="px-2 py-1.5 rounded-xl text-xs font-bold outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                  {store.orders.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-3 items-end">
            {[
              { label: 'Battles', value: activeOrder.battlesPlayed },
              { label: 'Wins',    value: activeOrder.battlesWon    },
              { label: 'RP',      value: activeOrder.requisitionPoints },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl font-black" style={{ color: theme.secondary }}>{s.value}</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>{s.label}</p>
              </div>
            ))}
            {/* Supply bar */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <p className="text-xs" style={{ color: theme.textSecondary }}>Supply</p>
                <p className="text-xs font-bold" style={{ color: supplyUsed > activeOrder.supplyLimit ? theme.hpLow : theme.textPrimary }}>
                  {supplyUsed} / {activeOrder.supplyLimit}
                </p>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.border }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (supplyUsed / activeOrder.supplyLimit) * 100)}%`, background: supplyUsed > activeOrder.supplyLimit ? theme.hpLow : theme.secondary }} />
              </div>
            </div>
            <div className="flex gap-1.5 ml-auto shrink-0">
              <button onClick={() => setAddingUnit(true)}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                + Unit
              </button>
              <button onClick={() => setRecordingBattle(true)}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: theme.secondary, color: theme.bg }}>
                + Battle
              </button>
            </div>
          </div>

          {/* Sync panel */}
          <div className="mt-3 rounded-2xl border px-3 py-2.5 space-y-2" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <button onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all"
                style={{
                  background: codeCopied ? `${theme.secondary}22` : `${theme.primary}18`,
                  color: codeCopied ? theme.secondary : theme.primary,
                  border: `1px solid ${codeCopied ? theme.secondary + '55' : theme.primary + '44'}`,
                  letterSpacing: '0.08em',
                }}>
                ☁ {formatCode(syncCode)}
                <span style={{ fontSize: 9, opacity: 0.8 }}>{codeCopied ? '✓ Copied' : 'tap to copy'}</span>
              </button>
              <p className="text-xs flex-1 truncate" style={{ color: theme.textSecondary }}>
                {syncStatus === 'syncing' ? 'Syncing…' : syncStatus === 'success' ? '✓ Synced' : syncStatus === 'error' ? `⚠ ${syncError}` : timeAgo(lastSynced)}
              </p>
              <button onClick={store.syncToCloud} disabled={syncStatus === 'syncing'}
                className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all"
                style={{ background: syncStatus === 'syncing' ? theme.border : theme.secondary, color: syncStatus === 'syncing' ? theme.textSecondary : theme.bg, opacity: syncStatus === 'syncing' ? 0.6 : 1 }}>
                {syncStatus === 'syncing' ? '…' : '↑ Sync'}
              </button>
            </div>
            {!showLoadInput ? (
              <button onClick={() => setShowLoadInput(true)} className="text-xs w-full text-left" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                ↓ Load roster from another device…
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <input value={loadCodeInput} onChange={e => setLoadCodeInput(e.target.value.toUpperCase())}
                  placeholder="ABC-DEF" maxLength={7}
                  className="flex-1 rounded-xl px-3 py-1.5 text-xs font-black tracking-widest outline-none"
                  style={{ background: theme.surface, border: `1px solid ${syncStatus === 'error' ? theme.hpLow : theme.border}`, color: theme.textPrimary }} />
                <button onClick={handleLoadFromCode} disabled={syncStatus === 'syncing'}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
                  style={{ background: theme.primary, color: theme.bg }}>Load ↓</button>
                <button onClick={() => { setShowLoadInput(false); setLoadCodeInput('') }}
                  className="px-2 py-1.5 rounded-xl text-xs font-bold shrink-0"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>✕</button>
              </div>
            )}
          </div>
          <TipCard id="tip_sync" theme={theme}
            body="Your 6-character code keeps this roster backed up in the cloud. Tap the code to copy it — use it on another device to load the same roster." />
        </div>

        {/* Tabs */}
        <div className="flex border-t" style={{ borderColor: theme.border }}>
          {[
            { id: 'roster',  label: `Roster (${activeOrder.units.length})` },
            { id: 'agendas', label: `Agendas (${(activeOrder.agendas || []).length})` },
            { id: 'rplog',   label: `RP Log` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 py-2.5 text-xs font-black transition-all"
              style={{
                color: tab === t.id ? theme.secondary : theme.textSecondary,
                borderBottom: tab === t.id ? `2px solid ${theme.secondary}` : '2px solid transparent',
                background: 'transparent',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'roster' && (
          <div className="px-4 py-4 space-y-2">
            <TipCard id="tip_roster" theme={theme}
              body="Your Order of Battle is your permanent campaign roster. Units earn XP after each battle and level up from Battle Ready all the way to Legendary." />
            {activeOrder.units.length === 0 && (
              <p className="text-xs text-center py-8" style={{ color: theme.textSecondary }}>
                No units yet. Tap + Unit to add your first warrior.
              </p>
            )}
            {activeOrder.units.map(u => (
              <UnitCrusadeCard key={u.id} unit={u} orderId={activeOrder.id}
                onRollHonour={handleRollHonour} onRollScar={handleRollScar} theme={theme} />
            ))}
          </div>
        )}
        {tab === 'agendas' && <AgendasTab order={activeOrder} theme={theme} />}
        {tab === 'rplog'   && <RPLogTab   order={activeOrder} theme={theme} onSpend={() => setShowSpendRP(true)} />}
      </div>

      {/* ── Modals ── */}

      {diceRoll && (
        <DiceRollerModal table={diceRoll.table} title={diceRoll.title} theme={theme}
          onApply={handleDiceApply} onClose={() => setDiceRoll(null)} />
      )}

      {showSpendRP && activeOrder && (
        <SpendRPSheet order={activeOrder} theme={theme} onClose={() => setShowSpendRP(false)} />
      )}

      {showCreateRoster && (
        <CreateRosterSheet theme={theme} onClose={() => setShowCreateRoster(false)}
          onCreate={(name, faction, detachmentId) => { store.createOrder(name, faction, detachmentId); setShowCreateRoster(false) }} />
      )}

      {addingUnit && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-t-3xl p-5 pb-8" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
            <h2 className="font-black text-base mb-1" style={{ color: theme.textPrimary }}>Add Unit to Roster</h2>
            <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>Manually add a unit to your Order of Battle.</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Unit Name</p>
                <input value={newUnitForm.name} onChange={e => setNewUnitForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Wolf Guard"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
              </div>
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Unit Type</p>
                <div className="flex flex-wrap gap-2">
                  {UNIT_TYPES.map(t => (
                    <button key={t} onClick={() => setNewUnitForm(f => ({ ...f, unitType: t }))}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      style={{ background: newUnitForm.unitType === t ? theme.secondary : theme.surfaceHigh, color: newUnitForm.unitType === t ? theme.bg : theme.textSecondary, border: `1px solid ${newUnitForm.unitType === t ? theme.secondary : theme.border}` }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Power Rating</p>
                <div className="flex gap-2 flex-wrap">
                  {[1,2,3,4,5,6,7,8,10,12].map(n => (
                    <button key={n} onClick={() => setNewUnitForm(f => ({ ...f, powerRating: String(n) }))}
                      className="flex-1 min-w-[2.5rem] py-2 rounded-xl text-xs font-bold"
                      style={{ background: newUnitForm.powerRating === String(n) ? theme.secondary : theme.surfaceHigh, color: newUnitForm.powerRating === String(n) ? theme.bg : theme.textSecondary, border: `1px solid ${newUnitForm.powerRating === String(n) ? theme.secondary : theme.border}` }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => {
              if (!newUnitForm.name.trim()) return
              store.addUnit(activeOrder.id, {
                id: `crusade_manual_${Date.now()}`,
                name: newUnitForm.name.trim(),
                unitType: newUnitForm.unitType,
                powerRating: parseInt(newUnitForm.powerRating) || 1,
                xp: 0, battlesPlayed: 0,
                battleHonours: [], battleScars: [], relics: [], notes: '',
              })
              setNewUnitForm({ name: '', unitType: 'Infantry', powerRating: '1' })
              setAddingUnit(false)
            }}
              className="w-full mt-5 py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: newUnitForm.name.trim() ? theme.secondary : theme.border, color: newUnitForm.name.trim() ? theme.bg : theme.textSecondary }}>
              Add to Roster
            </button>
            <button onClick={() => setAddingUnit(false)} className="w-full mt-2 py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Cancel</button>
          </div>
        </div>
      )}

      {recordingBattle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-t-3xl p-5 pb-8" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
            <h2 className="font-black text-base mb-1" style={{ color: theme.textPrimary }}>Record Battle Result</h2>
            <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>Adds 1 Requisition Point and increments battle counts.</p>
            <div className="flex gap-3">
              <button onClick={() => { store.recordBattle(activeOrder.id, true); setRecordingBattle(false) }}
                className="flex-1 py-3 rounded-2xl font-bold text-sm" style={{ background: theme.hpFull, color: '#fff' }}>
                Victory
              </button>
              <button onClick={() => { store.recordBattle(activeOrder.id, false); setRecordingBattle(false) }}
                className="flex-1 py-3 rounded-2xl font-bold text-sm"
                style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                Defeat
              </button>
            </div>
            <button onClick={() => setRecordingBattle(false)} className="w-full mt-2 py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
