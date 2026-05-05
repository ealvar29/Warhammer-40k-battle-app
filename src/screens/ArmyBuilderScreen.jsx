import React, { useState, useEffect } from 'react'
import { PhaseIcon, FactionIcon } from '../components/GameIcon'
import { GiEagleEmblem, GiSkullCrossedBones, GiAlienBug, GiPistolGun, GiAxeSword, GiCrossedSwords } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { useListStore } from '../store/listStore'
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
    Icon: GiEagleEmblem,
    factionIds: [
      'spacewolves', 'spacemarines', 'darkangels', 'bloodangels', 'blacktemplars',
      'greyknights', 'deathwatch', 'adeptuscustodes', 'adeptasororitas',
      'admech', 'astramilitarum', 'imperialknights',
    ],
  },
  {
    id: 'chaos',
    label: 'Chaos',
    Icon: GiSkullCrossedBones,
    factionIds: [
      'chaosspacemarines', 'deathguard', 'emperorschildren', 'thousandsons',
      'worldeaters', 'chaosdaemons', 'chaosknights',
    ],
  },
  {
    id: 'xenos',
    label: 'Xenos',
    Icon: GiAlienBug,
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
  { id: 'ranged', label: 'Ranged', Icon: GiPistolGun },
  { id: 'mixed',  label: 'Mixed',  Icon: GiCrossedSwords },
  { id: 'melee',  label: 'Melee',  Icon: GiAxeSword },
]

const categoryLabels = {
  epicHero: 'Epic Heroes', character: 'Characters', battleline: 'Battleline',
  infantry: 'Infantry', cavalry: 'Cavalry', monster: 'Monsters', vehicle: 'Vehicles',
}

function getDetachmentTags(d) {
  const tags = new Set()
  const rule = (d.detachmentRule?.description || '').toLowerCase()
  const kws = (d.stratagems || []).flatMap(s => s.keywords || [])
  if (kws.includes('Fight') || rule.includes('melee')) tags.add('Melee')
  if (kws.includes('Shooting')) tags.add('Shooting')
  if (kws.some(k => k === 'Movement' || k === 'Charge')) tags.add('Mobile')
  if (kws.includes('Reaction')) tags.add('Reactive')
  if (rule.includes('monster') || kws.includes('Monster')) tags.add('Monsters')
  if (rule.includes('character') || kws.includes('Character')) tags.add('Heroes')
  if (rule.includes('objective') || kws.includes('Objective')) tags.add('Objectives')
  if (kws.includes('Infiltrate')) tags.add('Infiltrate')
  if (d.commandPhaseAction) tags.add('Adaptive')
  return Array.from(tags)
}

function DetachmentCard({ d, selected, accent, theme, onClick }) {
  const desc = d.detachmentRule?.description || d.detachmentRule?.reminder || ''
  const tags = getDetachmentTags(d)
  return (
    <button onClick={onClick}
      className="w-full rounded-2xl overflow-hidden text-left transition-all"
      style={{
        border: `2px solid ${selected ? accent : theme.border}`,
        boxShadow: selected ? `0 0 22px ${accent}33` : 'none',
        background: theme.surface,
      }}>

      {/* Accent bar — thicker when selected */}
      <div style={{ height: selected ? 4 : 3, background: selected ? accent : `${accent}35` }} />

      <div className="p-4">
        {/* Name + check */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <p className="font-black text-base leading-tight"
              style={{ color: selected ? accent : theme.textPrimary }}>
              {d.name}
            </p>
            {d.subtitle && (
              <p className="text-xs italic mt-0.5" style={{ color: theme.textSecondary }}>{d.subtitle}</p>
            )}
          </div>
          {selected && (
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: accent }}>
              <span style={{ color: '#000', fontSize: 9, fontWeight: 900 }}>✓</span>
            </div>
          )}
        </div>

        {/* Playstyle — the key summary for new players */}
        {d.playstyle && (
          <p className="text-xs leading-relaxed mt-2 mb-3" style={{ color: theme.textSecondary }}>
            {d.playstyle}
          </p>
        )}

        {/* Tags derived from stratagems + rule */}
        {tags.length > 0 && (
          <div className="mb-3">
            <p className="text-[9px] font-black uppercase tracking-widest mb-1.5"
              style={{ color: theme.textSecondary, opacity: 0.55 }}>
              Playstyle focus
            </p>
            <div className="flex flex-wrap gap-1">
              {tags.map(tag => (
                <span key={tag}
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}28` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detachment rule callout */}
        <div className="rounded-xl px-3 py-2.5"
          style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
          <div className="flex items-center gap-1.5 mb-1">
            <span style={{ fontSize: 10 }}>⚡</span>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
              {d.detachmentRule.name}
            </p>
          </div>
          {desc && (
            <p className="text-xs leading-relaxed" style={{
              color: theme.textPrimary,
              opacity: 0.82,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {desc}
            </p>
          )}
        </div>

        {/* Footer: counts + hint */}
        <div className="flex items-center justify-between mt-3 gap-2">
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${accent}12`, color: accent }}>
              {d.stratagems.length} stratagems
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              {d.enhancements.length} enhancements
            </span>
          </div>
          <p className="text-[10px] shrink-0" style={{ color: `${theme.textSecondary}88` }}>
            Tap for details →
          </p>
        </div>
      </div>
    </button>
  )
}

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

function phaseColor(phase, theme) {
  if (!phase) return theme.textSecondary
  const p = phase.toLowerCase()
  if (p.includes('command')) return '#c8a84c'
  if (p.includes('movement') || p.includes('move')) return '#3b82f6'
  if (p.includes('shoot')) return '#f59e0b'
  if (p.includes('charge')) return '#ef4444'
  if (p.includes('fight')) return '#8b5cf6'
  return theme.textSecondary
}

function groupStratagemsByPhase(stratagems) {
  const groups = {}
  for (const s of stratagems || []) {
    const key = s.phase || 'any'
    if (!groups[key]) groups[key] = []
    groups[key].push(s)
  }
  return groups
}

const PHASE_ORDER = ['command', 'movement', 'shooting', 'charge', 'fight', 'any']
const PHASE_LABELS = {
  command: 'Command Phase', movement: 'Movement Phase', shooting: 'Shooting Phase',
  charge: 'Charge Phase', fight: 'Fight Phase', any: 'Any Phase',
}
const PHASE_ICON_FALLBACK = { any: '↻' }

function StratagemsTabContent({ d, theme, accent }) {
  const grouped = groupStratagemsByPhase(d.stratagems)
  if (!d.stratagems?.length) return (
    <p className="text-xs text-center py-8" style={{ color: theme.textSecondary }}>No stratagems listed for this detachment.</p>
  )
  return (
    <div className="space-y-5 pb-4">
      {PHASE_ORDER.filter(phase => grouped[phase]).map(phase => {
        const pc = phaseColor(phase, theme)
        return (
          <div key={phase}>
            <div className="flex items-center gap-2 mb-2">
              {phase !== 'any'
                ? <PhaseIcon phase={phase} size={12} color={pc} />
                : <span style={{ fontSize: 12, color: pc }}>{PHASE_ICON_FALLBACK.any}</span>
              }
              <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: pc }}>
                {PHASE_LABELS[phase]}
              </p>
              <div className="h-px flex-1" style={{ background: `${pc}30` }} />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: `${pc}18`, color: pc }}>
                {grouped[phase].length}
              </span>
            </div>
            <div className="space-y-2 pl-1">
              {grouped[phase].map(s => (
                <div key={s.id} className="rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${theme.border}`, background: theme.surface }}>
                  <div className="h-0.5" style={{ background: `${pc}55` }} />
                  <div className="px-3 py-2.5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>{s.name}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {s.trigger === 'reaction' && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)' }}>
                            ↩ Reaction
                          </span>
                        )}
                        <span className="text-xs font-black px-2 py-0.5 rounded-full"
                          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}33` }}>
                          {s.cost}CP
                        </span>
                      </div>
                    </div>
                    {s.timing && (
                      <p className="text-[10px] font-semibold mb-1.5 leading-snug" style={{ color: `${pc}cc` }}>
                        {s.timing}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{s.effect}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DetachmentInfoSheet({ d, theme, accent, onChoose, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stratagems', label: `Stratagems${d.stratagems?.length ? ` (${d.stratagems.length})` : ''}` },
    { id: 'details', label: 'Full Rules' },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg rounded-t-3xl flex flex-col overflow-hidden md:rounded-3xl md:mx-4"
        style={{ maxHeight: '92vh', background: theme.bg, border: `1px solid ${theme.border}` }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: theme.border }} />
        </div>

        {/* Accent bar */}
        <div className="h-1 mx-5 mt-2 rounded-full shrink-0"
          style={{ background: `linear-gradient(to right, ${accent}, ${accent}44)` }} />

        {/* Fixed header: name + tabs */}
        <div className="px-5 pt-4 pb-0 shrink-0">
          <p className="font-black text-2xl leading-tight" style={{ color: accent }}>{d.name}</p>
          {d.subtitle && (
            <p className="text-sm italic mt-0.5 mb-3" style={{ color: theme.textSecondary }}>{d.subtitle}</p>
          )}
          {/* Tab bar */}
          <div className="flex gap-1.5 mt-3 p-1 rounded-2xl" style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex-1 py-2.5 text-xs font-black rounded-xl transition-all"
                  style={{
                    background: isActive ? accent : `${accent}12`,
                    color: isActive ? '#000' : accent,
                    boxShadow: isActive ? `0 2px 10px ${accent}55` : 'none',
                    border: `1px solid ${isActive ? 'transparent' : `${accent}30`}`,
                    letterSpacing: isActive ? '0.03em' : '0',
                  }}>
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable tab content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4">
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div key="overview"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}
                className="space-y-4 pb-4"
              >
                {/* Playstyle */}
                {d.playstyle && (
                  <div className="px-4 py-3 rounded-2xl"
                    style={{ background: `${accent}0e`, border: `1px solid ${accent}22` }}>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-1.5" style={{ color: accent }}>
                      How this detachment plays
                    </p>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: theme.textPrimary }}>
                      {d.playstyle}
                    </p>
                  </div>
                )}

                {/* Command Phase picks — compact visual tiles */}
                {d.commandPhaseAction?.options?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <PhaseIcon phase="command" size={12} color={accent} />
                      <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: accent }}>
                        Each Command Phase — pick one
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      {d.commandPhaseAction.options.map(opt => (
                        <div key={opt.id}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                          style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                          <span className="text-lg shrink-0">{opt.icon}</span>
                          <p className="font-bold text-sm flex-1" style={{ color: theme.textPrimary }}>{opt.label}</p>
                          {opt.shortEffect && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
                              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}33` }}>
                              {opt.shortEffect}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    {d.commandPhaseAction.onceBuff && (
                      <div className="mt-2 px-3 py-2 rounded-xl flex gap-2 items-center"
                        style={{ background: `${accent}08`, border: `1px dashed ${accent}33` }}>
                        <span className="text-sm shrink-0">⭐</span>
                        <p className="text-xs font-bold" style={{ color: accent }}>
                          {d.commandPhaseAction.onceBuff.label} — once per battle
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Quick stats row */}
                <div className="flex gap-2 flex-wrap">
                  {d.stratagems?.length > 0 && (
                    <button onClick={() => setActiveTab('stratagems')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                      style={{ background: theme.surface, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      <span style={{ color: accent }}>📜</span>
                      {d.stratagems.length} stratagems →
                    </button>
                  )}
                  {d.enhancements?.length > 0 && (
                    <button onClick={() => setActiveTab('details')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                      style={{ background: theme.surface, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      <span style={{ color: accent }}>⭐</span>
                      {d.enhancements.length} enhancements →
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── STRATAGEMS TAB ── */}
            {activeTab === 'stratagems' && (
              <motion.div key="stratagems"
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
              >
                <StratagemsTabContent d={d} theme={theme} accent={accent} />
              </motion.div>
            )}

            {/* ── DETAILS TAB ── */}
            {activeTab === 'details' && (
              <motion.div key="details"
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
                className="space-y-5 pb-4"
              >
                {/* Full detachment rule */}
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: accent }}>
                    Detachment Rule
                  </p>
                  <div className="px-4 py-3 rounded-2xl space-y-2"
                    style={{ background: `${accent}10`, border: `1px solid ${accent}2a` }}>
                    <p className="font-black text-sm" style={{ color: theme.textPrimary }}>
                      {d.detachmentRule.name}
                    </p>
                    <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: theme.textPrimary, opacity: 0.85 }}>
                      {d.detachmentRule.description || d.detachmentRule.reminder}
                    </p>
                  </div>
                </div>

                {/* Full command phase options with effect text */}
                {d.commandPhaseAction?.options?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: accent }}>
                      Command Phase Options — Full Text
                    </p>
                    <div className="space-y-2">
                      {d.commandPhaseAction.options.map(opt => (
                        <div key={opt.id} className="px-3 py-3 rounded-2xl flex gap-3 items-start"
                          style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                          <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>{opt.label}</p>
                            <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{opt.fullEffect}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {d.commandPhaseAction.onceBuff && (
                      <div className="mt-2 px-3 py-2.5 rounded-2xl flex gap-2 items-start"
                        style={{ background: `${accent}08`, border: `1px dashed ${accent}33` }}>
                        <span className="text-base shrink-0">⭐</span>
                        <div>
                          <p className="font-bold text-xs" style={{ color: accent }}>
                            {d.commandPhaseAction.onceBuff.label} — Once per battle
                          </p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>
                            {d.commandPhaseAction.onceBuff.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhancements */}
                {d.enhancements?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: accent }}>
                      Enhancements ({d.enhancements.length})
                    </p>
                    <div className="space-y-2">
                      {d.enhancements.map((enh, i) => (
                        <div key={i} className="px-3 py-2.5 rounded-xl"
                          style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{enh.name}</p>
                            <span className="text-xs font-black shrink-0 px-2 py-0.5 rounded-full"
                              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                              {enh.cost}pts
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{enh.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* CTA footer */}
        <div className="px-5 pb-6 pt-3 shrink-0 border-t" style={{ borderColor: theme.border, background: theme.surface }}>
          <button
            onClick={() => onChoose(d.id)}
            className="w-full py-3.5 rounded-2xl font-black text-sm tracking-wide"
            style={{ background: accent, color: '#000' }}>
            Choose {d.name} →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FactionArtCard({ f, id, selected, theme, onSelect, onContinue, unitCount }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <div
      onClick={onSelect}
      className="rounded-2xl overflow-hidden text-left transition-all relative cursor-pointer min-h-[160px] md:min-h-[280px] flex flex-col justify-end"
      style={{
        border: `2px solid ${selected ? f.color : 'transparent'}`,
        boxShadow: selected ? `0 0 20px ${f.color}55` : 'none',
      }}>

      {/* Gradient base — renders instantly */}
      <div className="absolute inset-0"
        style={{ backgroundImage: f.gradient, backgroundSize: '100% 100%' }} />

      {/* Art layer — fades in once loaded */}
      {f.artUrl && (
        <>
          <img src={f.artUrl} alt="" aria-hidden="true"
            style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
            onLoad={() => setImgLoaded(true)} />
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url(${f.artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }} />
        </>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 100%)' }} />

      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
          style={{ background: f.color }}>
          <span style={{ color: '#000', fontSize: 9, fontWeight: 900 }}>✓</span>
        </div>
      )}

      <div className="relative z-10 px-3 pb-2.5 pt-6">
        <div className="flex items-end justify-between mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black leading-tight truncate" style={{ color: '#fff' }}>{f.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: 600 }}>{unitCount} units</p>
          </div>
          <FactionIcon id={id} size={22} color={f.color} />
        </div>
      </div>

      {selected && (
        <button
          onClick={e => { e.stopPropagation(); onContinue() }}
          className="relative z-10 w-full py-2.5 font-black text-sm tracking-wide"
          style={{ background: f.color, color: '#fff' }}>
          Continue with {f.name} →
        </button>
      )}
    </div>
  )
}

export default function ArmyBuilderScreen({ theme, onNavigate }) {
  const store = useBattleStore()
  const setSelectedFaction = useListStore(s => s.setSelectedFaction)
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

  // Kick off image preloads so they're in cache when the faction grid renders
  useEffect(() => {
    Object.values(FACTION_META).forEach(f => {
      if (f.artUrl) { const img = new Image(); img.src = f.artUrl }
    })
  }, [])

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
  const [unitLoadouts, setUnitLoadouts] = useState({})
  const [infoSheetDetachment, setInfoSheetDetachment] = useState(null)
  const [showLegends, setShowLegends] = useState(() => localStorage.getItem('w40k-show-legends') === 'true')

  const toggleShowLegends = () => setShowLegends(prev => {
    const next = !prev
    localStorage.setItem('w40k-show-legends', String(next))
    return next
  })

  const isSW = localFaction === 'spacewolves'
  const factionMeta = FACTION_META[localFaction] || { name: '', color: '#888' }

  const unitList = FACTION_UNITS[localFaction] || []

  const detachments = isSW
    ? [...swDetachmentList, ...smGenericDetachmentList]
    : Object.values(FACTION_DETACHMENTS[localFaction] || {})

  function applyLegendsFilter(byCategory) {
    if (showLegends) return byCategory
    const out = {}
    for (const [cat, units] of Object.entries(byCategory)) {
      const filtered = units.filter(u => !u.legends)
      if (filtered.length) out[cat] = filtered
    }
    return out
  }

  const unitSections = isSW
    ? [
        { label: 'Space Wolves', byCategory: applyLegendsFilter(swUnitsByCategory), accent: theme.secondary },
        { label: 'Space Marines', byCategory: applyLegendsFilter(smGenericsByCategory), accent: theme.primary },
      ]
    : [{ label: factionMeta.name, byCategory: applyLegendsFilter(getUnitsByCategory(unitList)), accent: factionMeta.color }]

  const toggleTag = (tag) =>
    setLocalOpponentTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const startBattle = () => {
    const detData = FACTION_DETACHMENTS[localFaction]?.[localDetachment]
    const staticMods = detData?.staticUnitMods || []

    const selectedUnitData = []
    for (const [unitId, count] of Object.entries(unitCounts)) {
      if (!count) continue
      const u = unitList.find(u => u.id === unitId)
      if (!u) continue
      const chosenLoadout = u.weaponLoadouts
        ? (unitLoadouts[u.id] || u.defaultLoadout || u.weaponLoadouts[0].id)
        : null
      const loadoutData = chosenLoadout ? u.weaponLoadouts?.find(l => l.id === chosenLoadout) : null
      const statOverrides = { ...(loadoutData?.statOverrides || {}) }

      // Apply static detachment mods (e.g. Champions of Fenris +1 OC for TERMINATORs)
      const modSources = []
      for (const mod of staticMods) {
        const allKws = [...(u.keywords || []), ...(u.factionKeywords || [])]
        const passes = !mod.keywordFilter || mod.keywordFilter.every(kw => allKws.includes(kw))
        if (!passes) continue
        for (const [stat, delta] of Object.entries(mod.statMods)) {
          statOverrides[stat] = (statOverrides[stat] ?? u[stat] ?? 0) + delta
          modSources.push({ stat, delta, source: mod.source, condition: mod.condition, why: mod.why })
        }
      }

      const effectiveW = statOverrides.W ?? u.W
      const totalWounds = u.maxWounds ?? (u.models > 1 ? effectiveW * u.models : effectiveW)
      for (let i = 0; i < count; i++) {
        selectedUnitData.push({
          ...u,
          ...statOverrides,
          id: count > 1 ? `${u.id}_${i + 1}` : u.id,
          type: u.type || u.category,
          maxWounds: totalWounds,
          currentWounds: totalWounds,
          unitKey: u.unitKey || u.id,
          phaseRole: u.weaponRole || unitRoleOverrides[u.id] || null,
          activeLoadout: chosenLoadout,
          modSources: modSources.length > 0 ? modSources : undefined,
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
                  <g.Icon size={22} color={allegianceTab === g.id ? theme.secondary : theme.textSecondary} />
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
                return (
                  <FactionArtCard
                    key={id}
                    f={f}
                    id={id}
                    selected={localFaction === id}
                    theme={theme}
                    onSelect={() => { setLocalFaction(id); setLocalDetachment(null); setUnitCounts({}); store.setFaction(id); setSelectedFaction(id) }}
                    onContinue={() => setStep('detachment')}
                    unitCount={(FACTION_UNITS[id] || []).length}
                  />
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
                    accent={theme.secondary} theme={theme} onClick={() => setInfoSheetDetachment({ d, accent: theme.secondary })} />
                ))}
                {/* Generic SM detachments */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-px flex-1" style={{ background: theme.primary + '40' }} />
                  <p className="text-xs font-black tracking-widest uppercase px-2" style={{ color: theme.primary }}>Space Marines</p>
                  <div className="h-px flex-1" style={{ background: theme.primary + '40' }} />
                </div>
                {smGenericDetachmentList.map(d => (
                  <DetachmentCard key={d.id} d={d} selected={localDetachment === d.id}
                    accent={theme.primary} theme={theme} onClick={() => setInfoSheetDetachment({ d, accent: theme.primary })} />
                ))}
              </>
            )}
            {!isSW && detachments.map(d => (
              <DetachmentCard key={d.id} d={d} selected={localDetachment === d.id}
                accent={factionMeta.color} theme={theme} onClick={() => setInfoSheetDetachment({ d, accent: factionMeta.color })} />
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
                <div className="space-y-2">
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
                  <div className="flex justify-end">
                    <button
                      onClick={toggleShowLegends}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: showLegends ? `${theme.secondary}20` : theme.surfaceHigh,
                        color: showLegends ? theme.secondary : theme.textSecondary,
                        border: `1px solid ${showLegends ? theme.secondary + '55' : theme.border}`,
                      }}>
                      <span style={{ fontSize: 9 }}>👻</span>
                      <span style={{ fontSize: 9, letterSpacing: '0.06em' }}>
                        LEGENDS {showLegends ? 'ON' : 'OFF'}
                      </span>
                    </button>
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
                                        <opt.Icon size={8} style={{ display: 'inline', verticalAlign: 'middle' }} />
                                        {' '}{opt.label}
                                      </button>
                                    )
                                  })}
                                </div>
                              )}

                              {/* Loadout picker for units with wargear choices */}
                              {selected && u.weaponLoadouts?.length > 0 && (
                                <div className="flex gap-1 mt-1" onClick={e => e.stopPropagation()}>
                                  {u.weaponLoadouts.map(opt => {
                                    const active = (unitLoadouts[u.id] || u.defaultLoadout || u.weaponLoadouts[0].id) === opt.id
                                    return (
                                      <button key={opt.id}
                                        onClick={() => setUnitLoadouts(prev => ({ ...prev, [u.id]: opt.id }))}
                                        className="flex-1 py-0.5 rounded font-bold"
                                        style={{
                                          background: active ? section.accent : 'rgba(0,0,0,0.6)',
                                          color: active ? '#000' : 'rgba(255,255,255,0.45)',
                                          border: `1px solid ${active ? section.accent : 'rgba(255,255,255,0.1)'}`,
                                          fontSize: 8,
                                        }}>
                                        {opt.short}
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

      <AnimatePresence>
        {infoSheetDetachment && (
          <DetachmentInfoSheet
            d={infoSheetDetachment.d}
            accent={infoSheetDetachment.accent}
            theme={theme}
            onChoose={(id) => { setLocalDetachment(id); setInfoSheetDetachment(null); setStep('units') }}
            onClose={() => setInfoSheetDetachment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
