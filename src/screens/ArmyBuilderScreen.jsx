import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import ImportListSheet from '../components/ImportListSheet'
import { swUnitsByCategory } from '../data/spacewolves/units'
import { smGenericsByCategory } from '../data/spacewolves/generics'
import { swDetachmentList } from '../data/spacewolves/detachments'
import { smGenericDetachmentList } from '../data/spacewolves/genericDetachments'
import { FACTION_UNITS, FACTION_DETACHMENTS, FACTION_META } from '../data/factionRegistry'
import { opponentProfiles } from '../data/suggestions'

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

function getUnitsByCategory(unitList) {
  const result = {}
  for (const u of unitList) {
    const cat = u.category || 'infantry'
    if (!result[cat]) result[cat] = []
    result[cat].push(u)
  }
  return result
}

function hasMixedWeapons(unit) {
  if (unit.weaponRole) return false  // explicit role set in data; no picker needed
  const weapons = unit.weapons || []
  const hasRanged = weapons.some(w => w.type === 'ranged' && !w.keywords?.includes('PISTOL'))
  const hasMelee  = weapons.some(w => w.type === 'melee')
  return hasRanged && hasMelee
}

const ROLE_OPTIONS = [
  { id: 'ranged', label: '🔫 Ranged' },
  { id: 'mixed',  label: '⚔/🔫 Mixed' },
  { id: 'melee',  label: '⚔ Melee' },
]

const categoryLabels = {
  epicHero: 'Epic Heroes', character: 'Characters', battleline: 'Battleline',
  infantry: 'Infantry', cavalry: 'Cavalry', monster: 'Monsters', vehicle: 'Vehicles',
}

function DetachmentCard({ d, selected, accent, theme, onClick }) {
  const desc = d.detachmentRule?.description || d.detachmentRule?.reminder || ''
  return (
    <button onClick={onClick}
      className="w-full rounded-2xl overflow-hidden text-left transition-all"
      style={{
        border: `2px solid ${selected ? accent : theme.border}`,
        boxShadow: selected ? `0 0 22px ${accent}33` : 'none',
        background: theme.surface,
      }}>

      {/* Coloured accent bar at top */}
      <div className="h-1.5" style={{ background: selected ? accent : `${accent}35` }} />

      <div className="p-4">
        {/* Name + badge row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <p className="font-black text-base leading-tight"
              style={{ color: selected ? accent : theme.textPrimary }}>
              {d.name}
            </p>
            {d.subtitle && (
              <p className="text-xs italic mt-0.5" style={{ color: theme.textSecondary }}>{d.subtitle}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 shrink-0 items-end">
            <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}33` }}>
              {d.stratagems.length} stratagems
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              {d.enhancements.length} enhancements
            </span>
          </div>
        </div>

        {/* Detachment rule highlight */}
        <div className="rounded-xl px-3 py-2.5"
          style={{ background: `${accent}10`, border: `1px solid ${accent}28` }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span style={{ fontSize: 11 }}>⚡</span>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
              {d.detachmentRule.name}
            </p>
          </div>
          {desc && (
            <p className="text-xs leading-relaxed"
              style={{
                color: theme.textSecondary,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              {desc}
            </p>
          )}
        </div>

        {selected && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: accent }}>
              <span style={{ color: '#000', fontSize: 8, fontWeight: 900 }}>✓</span>
            </div>
            <p className="text-xs font-bold" style={{ color: accent }}>Selected — tap Continue below</p>
          </div>
        )}
      </div>
    </button>
  )
}

export default function ArmyBuilderScreen({ theme, onNavigate }) {
  const store = useBattleStore()
  const [step, setStep] = useState('faction') // faction → detachment → units → opponent → ready
  const [localFaction, setLocalFaction] = useState(store.faction || 'spacewolves')
  const [localDetachment, setLocalDetachment] = useState(store.detachmentId || null)
  const [unitCounts, setUnitCounts] = useState(() => {
    const counts = {}
    store.selectedUnits.forEach(u => {
      const baseId = u.id.replace(/_\d+$/, '')
      counts[baseId] = (counts[baseId] || 0) + 1
    })
    return counts
  })
  const [localOpponentTags, setLocalOpponentTags] = useState(store.opponentTags)

  const getMaxCount = (unitId) => {
    const u = unitList.find(x => x.id === unitId)
    return u?.category === 'epicHero' ? 1 : 3
  }
  const addUnit = (unitId) =>
    setUnitCounts(prev => {
      const max = getMaxCount(unitId)
      if ((prev[unitId] || 0) >= max) return prev
      return { ...prev, [unitId]: (prev[unitId] || 0) + 1 }
    })
  const removeUnit = (unitId) =>
    setUnitCounts(prev => {
      const next = { ...prev }
      if ((next[unitId] || 0) > 1) next[unitId]--
      else delete next[unitId]
      return next
    })
  const unitCount = (unitId) => unitCounts[unitId] || 0
  const totalUnits = Object.values(unitCounts).reduce((a, b) => a + b, 0)
  const [showImport, setShowImport] = useState(false)
  const [allegianceTab, setAllegianceTab] = useState(() => getAllegianceFor(store.faction || 'spacewolves'))
  const [unitRoleOverrides, setUnitRoleOverrides] = useState({})

  const isSW = localFaction === 'spacewolves'
  const factionMeta = FACTION_META[localFaction] || { name: '', color: '#888' }

  const unitList = FACTION_UNITS[localFaction] || []

  const detachments = isSW
    ? [...swDetachmentList, ...smGenericDetachmentList]
    : Object.values(FACTION_DETACHMENTS[localFaction] || {})

  const unitSections = isSW
    ? [
        { label: 'Space Wolves', byCategory: swUnitsByCategory, accent: theme.secondary },
        { label: 'Space Marines', byCategory: smGenericsByCategory, accent: theme.primary },
      ]
    : [{ label: factionMeta.name, byCategory: getUnitsByCategory(unitList), accent: factionMeta.color }]

  const toggleTag = (tag) =>
    setLocalOpponentTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const startBattle = () => {
    const selectedUnitData = []
    for (const [unitId, count] of Object.entries(unitCounts)) {
      if (!count) continue
      const u = unitList.find(u => u.id === unitId)
      if (!u) continue
      const totalWounds = u.maxWounds ?? (u.models > 1 ? u.W * u.models : u.W)
      for (let i = 0; i < count; i++) {
        selectedUnitData.push({
          ...u,
          id: count > 1 ? `${u.id}_${i + 1}` : u.id,
          type: u.type || u.category,
          maxWounds: totalWounds,
          currentWounds: totalWounds,
          unitKey: u.unitKey || u.id,
          phaseRole: u.weaponRole || unitRoleOverrides[u.id] || null,
        })
      }
    }
    store.resetBattle()
    store.setFaction(localFaction)
    store.setDetachment(localDetachment)
    selectedUnitData.forEach(u => store.addUnit(u))
    store.setOpponentTags(localOpponentTags)
    onNavigate('deploy')
  }

  const handleImportAsMyArmy = (parsed) => {
    const units = parsed.resolvedUnits.map(e => e.resolved)
    const faction = parsed.faction || localFaction
    const detId = parsed.detachment?.id || null
    store.resetBattle()
    store.setFaction(faction)
    store.setDetachment(detId)
    units.forEach(u => store.addUnit({ ...u, currentWounds: u.maxWounds }))
    setShowImport(false)
    onNavigate('deploy')
  }

  const handleImportAsOpponent = (parsed) => {
    const units = parsed.resolvedUnits.map(e => e.resolved)
    store.setOpponentArmy({
      faction: parsed.faction,
      detachmentId: parsed.detachment?.id || null,
      units,
      detachment: parsed.detachment || null,
    })
    setShowImport(false)
    onNavigate('battle')
  }

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <button onClick={() => step === 'faction' ? onNavigate('home') : setStep(
          step === 'detachment' ? 'faction' :
          step === 'units' ? 'detachment' :
          step === 'opponent' ? 'units' : 'opponent'
        )}
          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </button>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
            Army Builder
          </p>
          <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>
            {step === 'faction' ? 'Choose Faction' :
             step === 'detachment' ? 'Choose Detachment' :
             step === 'units' ? 'Select Units' :
             step === 'opponent' ? "Opponent's Profile" : 'Ready to Battle'}
          </p>
        </div>
        {/* Step dots */}
        <div className="flex gap-1.5">
          {['faction','detachment','units','opponent'].map((s, i) => (
            <div key={s} className="w-1.5 h-1.5 rounded-full"
              style={{ background: ['faction','detachment','units','opponent'].indexOf(step) >= i ? theme.secondary : theme.border }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">

        {/* ── Step: Faction ── */}
        {step === 'faction' && (
          <div className="space-y-3">

            {/* Allegiance tabs */}
            <div className="flex rounded-2xl overflow-hidden border" style={{ borderColor: theme.border }}>
              {ALLEGIANCE_GROUPS.map((g, i) => (
                <button key={g.id} onClick={() => setAllegianceTab(g.id)}
                  className="flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-all"
                  style={{
                    background: allegianceTab === g.id ? `${theme.secondary}15` : theme.surface,
                    borderRight: i < ALLEGIANCE_GROUPS.length - 1 ? `1px solid ${theme.border}` : 'none',
                  }}>
                  <span className="text-xl">{g.icon}</span>
                  <p className="text-xs font-black tracking-wide"
                    style={{ color: allegianceTab === g.id ? theme.secondary : theme.textSecondary }}>
                    {g.label}
                  </p>
                  <p style={{ fontSize: 9, color: theme.textSecondary, opacity: 0.7 }}>
                    {g.factionIds.length} armies
                  </p>
                </button>
              ))}
            </div>

            {/* Faction grid — gacha-style portrait cards */}
            <div className="grid grid-cols-2 gap-2">
              {ALLEGIANCE_GROUPS.find(g => g.id === allegianceTab)?.factionIds.map(id => {
                const f = FACTION_META[id]
                if (!f) return null
                const selected = localFaction === id
                return (
                  <div key={id}
                    onClick={() => { setLocalFaction(id); setLocalDetachment(null); setUnitCounts({}); store.setFaction(id) }}
                    className="rounded-2xl overflow-hidden text-left transition-all relative cursor-pointer min-h-[160px] md:min-h-[280px] flex flex-col justify-end"
                    style={{
                      border: `2px solid ${selected ? f.color : 'transparent'}`,
                      boxShadow: selected ? `0 0 20px ${f.color}55` : 'none',
                    }}>

                    {/* Art or gradient background */}
                    <div className="absolute inset-0"
                      style={{
                        backgroundImage: f.artUrl ? `url(${f.artUrl})` : f.gradient,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                      }} />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 100%)' }} />

                    {/* Selected checkmark */}
                    {selected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
                        style={{ background: f.color }}>
                        <span style={{ color: '#000', fontSize: 9, fontWeight: 900 }}>✓</span>
                      </div>
                    )}

                    {/* Bottom label */}
                    <div className="relative z-10 px-3 pb-2.5 pt-6">
                      <div className="flex items-end justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black leading-tight truncate" style={{ color: '#fff' }}>
                            {f.name}
                          </p>
                          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: 600 }}>
                            {(FACTION_UNITS[id] || []).length} units
                          </p>
                        </div>
                        <span className="text-xl ml-1 shrink-0">{f.icon}</span>
                      </div>
                    </div>

                    {/* Continue button — embedded on card, faction-coloured */}
                    {selected && (
                      <button
                        onClick={e => { e.stopPropagation(); setStep('detachment') }}
                        className="relative z-10 w-full py-2.5 font-black text-sm tracking-wide"
                        style={{ background: f.color, color: '#fff' }}>
                        Continue with {f.name} →
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3 py-0.5">
              <div className="h-px flex-1" style={{ background: theme.border }} />
              <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>or</p>
              <div className="h-px flex-1" style={{ background: theme.border }} />
            </div>
            <button onClick={() => setShowImport(true)}
              className="w-full py-3 rounded-2xl font-bold text-sm border"
              style={{ background: 'transparent', borderColor: theme.border, color: theme.textSecondary }}>
              📋 Import from Another App
            </button>
          </div>
        )}

        {/* ── Step: Detachment ── */}
        {step === 'detachment' && (
          <div className="space-y-3">
            {isSW && (
              <>
                {/* Space Wolves chapter detachments */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1" style={{ background: theme.secondary + '40' }} />
                  <p className="text-xs font-black tracking-widest uppercase px-2" style={{ color: theme.secondary }}>Space Wolves</p>
                  <div className="h-px flex-1" style={{ background: theme.secondary + '40' }} />
                </div>
                {swDetachmentList.map(d => (
                  <DetachmentCard key={d.id} d={d} selected={localDetachment === d.id}
                    accent={theme.secondary} theme={theme} onClick={() => setLocalDetachment(d.id)} />
                ))}
                {/* Generic SM detachments */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-px flex-1" style={{ background: theme.primary + '40' }} />
                  <p className="text-xs font-black tracking-widest uppercase px-2" style={{ color: theme.primary }}>Space Marines</p>
                  <div className="h-px flex-1" style={{ background: theme.primary + '40' }} />
                </div>
                {smGenericDetachmentList.map(d => (
                  <DetachmentCard key={d.id} d={d} selected={localDetachment === d.id}
                    accent={theme.primary} theme={theme} onClick={() => setLocalDetachment(d.id)} />
                ))}
              </>
            )}
            {!isSW && detachments.map(d => (
              <DetachmentCard key={d.id} d={d} selected={localDetachment === d.id}
                accent={factionMeta.color} theme={theme} onClick={() => setLocalDetachment(d.id)} />
            ))}
          </div>
        )}

        {/* ── Step: Units ── */}
        {step === 'units' && (
          <div className="space-y-4">
            {(() => {
              const totalPts = Object.entries(unitCounts).reduce((sum, [id, n]) => {
                const u = unitList.find(u => u.id === id)
                return sum + (u?.points || 0) * n
              }, 0)
              return (
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Tap to add · use +/− for multiple squads.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
                      {totalUnits} unit{totalUnits !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                      {totalPts} pts
                    </span>
                  </div>
                </div>
              )
            })()}
            {unitSections.map(section => (
              <div key={section.label} className="space-y-3">
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-px flex-1" style={{ background: section.accent + '40' }} />
                  <p className="text-xs md:text-sm font-black tracking-widest uppercase px-2" style={{ color: section.accent }}>
                    {section.label}
                  </p>
                  <div className="h-px flex-1" style={{ background: section.accent + '40' }} />
                </div>
                {Object.entries(section.byCategory).map(([cat, units]) => units.length === 0 ? null : (
                  <div key={cat}>
                    <p className="text-xs md:text-sm font-bold tracking-widest uppercase mb-2" style={{ color: theme.textSecondary }}>
                      {categoryLabels[cat] || cat}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {units.map(u => {
                        const count = unitCount(u.id)
                        const selected = count > 0
                        const isLegends = !!u.legends
                        const isEpicHero = cat === 'epicHero'
                        const maxCount = isEpicHero ? 1 : 3
                        const atMax = count >= maxCount
                        const handleCardClick = () => {
                          if (isEpicHero && selected) removeUnit(u.id)
                          else if (!atMax) addUnit(u.id)
                        }
                        return (
                          <div key={u.id}
                            onClick={handleCardClick}
                            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-end"
                            style={{
                              minHeight: 'clamp(130px, 18vw, 200px)',
                              border: `2px solid ${selected ? section.accent : 'transparent'}`,
                              boxShadow: selected ? `0 0 14px ${section.accent}44` : 'none',
                              opacity: isLegends ? 0.7 : 1,
                            }}>

                            {/* Background: unit art or faction gradient */}
                            <div className="absolute inset-0"
                              style={{
                                backgroundImage: u.artUrl ? `url(${u.artUrl})` : factionMeta.gradient,
                                backgroundSize: u.artUrl ? 'cover' : '100% 100%',
                                backgroundPosition: u.artPosition || 'center center',
                              }} />

                            {/* Overlay */}
                            <div className="absolute inset-0"
                              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.08) 100%)' }} />

                            {/* Top-left count badge */}
                            {count > 0 && (
                              <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center font-black text-xs z-10"
                                style={{ background: section.accent, color: '#000' }}>
                                ×{count}
                              </div>
                            )}

                            {/* Top-right flags */}
                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                              {isEpicHero && (
                                <span className="px-1.5 py-0.5 rounded font-black"
                                  style={{ background: `${section.accent}cc`, color: '#000', fontSize: 8 }}>
                                  UNIQUE
                                </span>
                              )}
                              {isLegends && (
                                <span className="px-1.5 py-0.5 rounded font-black"
                                  style={{ background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.45)', fontSize: 8 }}>
                                  LEGENDS
                                </span>
                              )}
                            </div>

                            {/* Bottom content */}
                            <div className="relative z-10 px-2.5 pb-2.5">
                              {/* Mini stats */}
                              <div className="flex gap-2 mb-1">
                                {['M','T','Sv','W'].map(stat => (
                                  <span key={stat} className="text-[8px] md:text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    {stat}{u[stat]}
                                  </span>
                                ))}
                              </div>

                              <p className="text-xs md:text-sm font-black leading-tight truncate" style={{ color: '#fff' }}>{u.name}</p>
                              <div className="flex items-center justify-between mt-0.5 mb-1.5">
                                <p className="text-[9px] md:text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                  {categoryLabels[u.category || u.type] || ''}
                                </p>
                                <p className="text-[10px] md:text-xs" style={{ color: section.accent, fontWeight: 800 }}>{u.points}pts</p>
                              </div>

                              {/* Stepper for regular selected units */}
                              {selected && !isEpicHero && (
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                  <button onClick={() => removeUnit(u.id)}
                                    className="flex-1 py-1 rounded-lg font-black text-xs"
                                    style={{ background: 'rgba(0,0,0,0.7)', color: section.accent, border: `1px solid ${section.accent}55` }}>
                                    −
                                  </button>
                                  <span className="text-xs font-black w-5 text-center" style={{ color: section.accent }}>×{count}</span>
                                  <button onClick={e => { e.stopPropagation(); if (!atMax) addUnit(u.id) }}
                                    className="flex-1 py-1 rounded-lg font-black text-xs"
                                    style={{ background: atMax ? 'rgba(255,255,255,0.08)' : section.accent, color: atMax ? 'rgba(255,255,255,0.25)' : '#000' }}>
                                    +
                                  </button>
                                </div>
                              )}

                              {/* Role picker for mixed-weapon units */}
                              {selected && hasMixedWeapons(u) && (
                                <div className="flex gap-1 mt-1" onClick={e => e.stopPropagation()}>
                                  {ROLE_OPTIONS.map(opt => {
                                    const active = (unitRoleOverrides[u.id] || 'mixed') === opt.id
                                    return (
                                      <button key={opt.id}
                                        onClick={() => setUnitRoleOverrides(prev => ({ ...prev, [u.id]: opt.id }))}
                                        className="flex-1 py-0.5 rounded font-bold"
                                        style={{
                                          background: active ? section.accent : 'rgba(0,0,0,0.6)',
                                          color: active ? '#000' : 'rgba(255,255,255,0.45)',
                                          border: `1px solid ${active ? section.accent : 'rgba(255,255,255,0.1)'}`,
                                          fontSize: 8,
                                        }}>
                                        {opt.label}
                                      </button>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── Step: Opponent ── */}
        {step === 'opponent' && (
          <div className="space-y-3">
            <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
              Tag your opponent's army style — the app will suggest the best stratagems for your detachment during battle. You can skip this.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {opponentProfiles.map(p => {
                const active = localOpponentTags.includes(p.id)
                return (
                  <button key={p.id} onClick={() => toggleTag(p.id)}
                    className="rounded-2xl border p-3 text-left transition-all"
                    style={{
                      background: active ? `${theme.secondary}18` : theme.surface,
                      borderColor: active ? theme.secondary : theme.border,
                    }}>
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <p className="text-xs font-bold" style={{ color: active ? theme.secondary : theme.textPrimary }}>
                      {p.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{p.description}</p>
                  </button>
                )
              })}
            </div>
            <button onClick={startBattle}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Begin Battle!
            </button>
            <button onClick={startBattle} className="w-full py-2 text-xs font-medium"
              style={{ color: theme.textSecondary }}>
              Skip — start without profile
            </button>
          </div>
        )}
      </div>

      {/* Sticky Continue footer — only for detachment and units steps */}
      {(step === 'detachment' || step === 'units') && (() => {
        const totalPts = Object.entries(unitCounts).reduce((sum, [id, n]) => {
          const u = unitList.find(u => u.id === id)
          return sum + (u?.points || 0) * n
        }, 0)
        const isDetach = step === 'detachment'
        const enabled = isDetach ? !!localDetachment : totalUnits > 0
        return (
          <div className="px-4 pb-4 pt-2 shrink-0 border-t" style={{ background: theme.surface, borderColor: theme.border }}>
            <button
              onClick={isDetach ? () => localDetachment && setStep('units') : () => totalUnits > 0 && setStep('opponent')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all"
              style={{ background: enabled ? theme.secondary : theme.border, color: enabled ? theme.bg : theme.textSecondary }}>
              {isDetach ? 'Continue →' : `Continue — ${totalUnits} units · ${totalPts} pts →`}
            </button>
          </div>
        )
      })()}

      <AnimatePresence>
        {showImport && (
          <ImportListSheet
            theme={theme}
            onLoadAsMyArmy={handleImportAsMyArmy}
            onLoadAsOpponent={handleImportAsOpponent}
            onClose={() => setShowImport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
