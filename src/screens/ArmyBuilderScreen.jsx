import React, { useState } from 'react'
import { useBattleStore } from '../store/battleStore'
import { swUnitList, swUnitsByCategory } from '../data/spacewolves/units'
import { smGenericUnitList, smGenericsByCategory } from '../data/spacewolves/generics'
import { swDetachmentList } from '../data/spacewolves/detachments'
import { smGenericDetachmentList } from '../data/spacewolves/genericDetachments'
import { tyranidUnitList, tyranidUnitsByCategory } from '../data/tyranids/units'
import { tyranidDetachmentList } from '../data/tyranids/detachments'
import { opponentProfiles } from '../data/suggestions'

const factions = [
  { id: 'spacewolves', name: 'Space Wolves', icon: '🐺', color: '#c8d4e0' },
  { id: 'tyranids', name: 'Tyranids', icon: '🦂', color: '#a855f7' },
]

const categoryLabels = {
  character: 'Characters', battleline: 'Battleline',
  infantry: 'Infantry', cavalry: 'Cavalry', monster: 'Monsters', vehicle: 'Vehicles',
}

function DetachmentCard({ d, selected, accent, theme, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full rounded-2xl border-2 p-4 text-left transition-all"
      style={{
        background: selected ? `${accent}12` : theme.surface,
        borderColor: selected ? accent : theme.border,
      }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-bold text-sm" style={{ color: selected ? accent : theme.textPrimary }}>{d.name}</p>
          <p className="text-xs italic mt-0.5" style={{ color: theme.textSecondary }}>{d.subtitle}</p>
          <div className="mt-2 rounded-xl p-2.5 border" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
            <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{d.detachmentRule.name}</p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>{d.detachmentRule.description}</p>
          </div>
          <p className="text-xs mt-2" style={{ color: theme.textSecondary }}>
            {d.stratagems.length} stratagems · {d.enhancements.length} enhancements
          </p>
        </div>
        {selected && <span className="text-lg shrink-0" style={{ color: accent }}>✓</span>}
      </div>
    </button>
  )
}

export default function ArmyBuilderScreen({ theme, onNavigate }) {
  const store = useBattleStore()
  const [step, setStep] = useState('faction') // faction → detachment → units → opponent → ready
  const [localFaction, setLocalFaction] = useState(store.faction || 'spacewolves')
  const [localDetachment, setLocalDetachment] = useState(store.detachmentId || null)
  const [localUnits, setLocalUnits] = useState(store.selectedUnits.map(u => u.id))
  const [localOpponentTags, setLocalOpponentTags] = useState(store.opponentTags)

  const isSW = localFaction === 'spacewolves'
  // For unit lookup during startBattle we need all available units for this faction
  const unitList = isSW ? [...swUnitList, ...smGenericUnitList] : tyranidUnitList
  const detachments = isSW ? [...swDetachmentList, ...smGenericDetachmentList] : tyranidDetachmentList

  // Build grouped unit sections for the units step
  const unitSections = isSW
    ? [
        { label: 'Space Wolves', byCategory: swUnitsByCategory, accent: theme.secondary },
        { label: 'Space Marines', byCategory: smGenericsByCategory, accent: theme.primary },
      ]
    : [
        { label: 'Tyranids', byCategory: tyranidUnitsByCategory, accent: '#a855f7' },
      ]

  const toggleUnit = (unitId) =>
    setLocalUnits(prev => prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId])

  const toggleTag = (tag) =>
    setLocalOpponentTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const startBattle = () => {
    store.setFaction(localFaction)
    store.setDetachment(localDetachment)
    // Clear previous units and add selected ones
    const selectedUnitData = unitList.filter(u => localUnits.includes(u.id)).map(u => {
      // Real units use W (per model) + models count; compute total wounds for the unit
      const totalWounds = u.maxWounds ?? (u.models > 1 ? u.W * u.models : u.W)
      return {
        ...u,
        type: u.type || u.category,       // normalise: real units use 'category'
        maxWounds: totalWounds,
        currentWounds: totalWounds,
        unitKey: u.unitKey || u.id,       // normalise unitKey for leader lookups
      }
    })
    // Reset and re-add
    store.resetBattle()
    store.setFaction(localFaction)
    store.setDetachment(localDetachment)
    selectedUnitData.forEach(u => store.addUnit(u))
    store.setOpponentTags(localOpponentTags)
    store.startBattle()
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
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        {/* ── Step: Faction ── */}
        {step === 'faction' && (
          <div className="space-y-3">
            {factions.map(f => (
              <button key={f.id} onClick={() => { setLocalFaction(f.id); setLocalDetachment(null); setLocalUnits([]) }}
                className="w-full rounded-2xl border-2 p-5 text-left transition-all"
                style={{
                  background: localFaction === f.id ? `${f.color}12` : theme.surface,
                  borderColor: localFaction === f.id ? f.color : theme.border,
                }}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{f.icon}</span>
                  <div>
                    <p className="font-black text-lg" style={{ color: localFaction === f.id ? f.color : theme.textPrimary }}>
                      {f.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
                      10th Edition · {f.id === 'spacewolves' ? swUnitList.length + smGenericUnitList.length : tyranidUnitList.length} units
                    </p>
                  </div>
                  {localFaction === f.id && (
                    <span className="ml-auto text-lg" style={{ color: f.color }}>✓</span>
                  )}
                </div>
              </button>
            ))}
            <button onClick={() => setStep('detachment')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Continue →
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
                accent={theme.secondary} theme={theme} onClick={() => setLocalDetachment(d.id)} />
            ))}
            <button onClick={() => localDetachment && setStep('units')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: localDetachment ? theme.secondary : theme.border, color: localDetachment ? theme.bg : theme.textSecondary }}>
              Continue →
            </button>
          </div>
        )}

        {/* ── Step: Units ── */}
        {step === 'units' && (
          <div className="space-y-4">
            {(() => {
              const totalPts = localUnits.reduce((sum, id) => {
                const u = unitList.find(u => u.id === id)
                return sum + (u?.points || 0)
              }, 0)
              return (
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Tap to add units to your roster.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
                      {localUnits.length} units
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
                {/* Section header */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-px flex-1" style={{ background: section.accent + '40' }} />
                  <p className="text-xs font-black tracking-widest uppercase px-2"
                    style={{ color: section.accent }}>
                    {section.label}
                  </p>
                  <div className="h-px flex-1" style={{ background: section.accent + '40' }} />
                </div>
                {Object.entries(section.byCategory).map(([cat, units]) => units.length === 0 ? null : (
                  <div key={cat}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: theme.textSecondary }}>
                      {categoryLabels[cat] || cat}
                    </p>
                    <div className="space-y-2">
                      {units.map(u => {
                        const selected = localUnits.includes(u.id)
                        return (
                          <button key={u.id} onClick={() => toggleUnit(u.id)}
                            className="w-full rounded-2xl border p-3 text-left transition-all"
                            style={{
                              background: selected ? `${section.accent}12` : theme.surface,
                              borderColor: selected ? section.accent : theme.border,
                            }}>
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-bold text-sm" style={{ color: selected ? section.accent : theme.textPrimary }}>
                                  {u.name}
                                </p>
                                <div className="flex gap-3 mt-1 text-xs" style={{ color: theme.textSecondary }}>
                                  <span>M {u.M}</span>
                                  <span>T {u.T}</span>
                                  <span>Sv {u.Sv}</span>
                                  <span>W {u.W}</span>
                                  {u.InvSv && <span>Inv {u.InvSv}</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs px-2 py-1 rounded-full"
                                  style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
                                  {u.points} pts
                                </span>
                                <div className="w-5 h-5 rounded-full flex items-center justify-center"
                                  style={{ background: selected ? section.accent : theme.border }}>
                                  {selected && <span className="text-xs font-bold" style={{ color: theme.bg }}>✓</span>}
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {(() => {
              const totalPts = localUnits.reduce((sum, id) => {
                const u = unitList.find(u => u.id === id)
                return sum + (u?.points || 0)
              }, 0)
              return (
                <button onClick={() => localUnits.length > 0 && setStep('opponent')}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm"
                  style={{ background: localUnits.length > 0 ? theme.secondary : theme.border, color: localUnits.length > 0 ? theme.bg : theme.textSecondary }}>
                  Continue — {localUnits.length} units · {totalPts} pts →
                </button>
              )
            })()}
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
    </div>
  )
}
