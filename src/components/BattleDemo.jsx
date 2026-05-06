import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhaseIcon, GameIcon } from './GameIcon'
import { FactionEdge } from './FactionAccent'
import { GiLightningTrio } from 'react-icons/gi'
import { demoStratagems, demoUnits } from '../data/demoData'
import { PHASES, KEYWORD_PHASE_HINTS, WEAPON_KEYWORD_PHASE_HINTS, CHARGE_BONUS_PATTERN } from '../data/editionConfig'
import { leaders, unitLeaderMap, leaderAbilities } from '../data/leaderData'
import { getLeaderAbilities } from '../data/factionRegistry'
import { getSuggestions, opponentProfiles } from '../data/suggestions'
import { findDetachment } from '../data/factionRegistry'
import { useBattleStore } from '../store/battleStore'
import PostBattleDebrief from './PostBattleDebrief'
import { useCrusadeStore } from '../store/crusadeStore'
import ShareArmySheet from './ShareArmySheet'
import MatchupSheet from './MatchupSheet'
import ImportListSheet from './ImportListSheet'
import PhaseAbilityPanel from './PhaseAbilityPanel'
import DetachmentRulePanel from './DetachmentRulePanel'
import PhaseGuideCard from './PhaseGuideCard'

import { PHASE_EFFECTS } from '../data/phaseEffects'
import MathHammerSheet from './MathHammerSheet'
import KeywordChip, { parseTextWithKeywords } from './KeywordChip'
import BattleLayoutProto from './BattleLayoutProto'

const PULSE_STYLE = `
  @keyframes syncPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.35; }
  }
  .sync-pulse { animation: syncPulse 1.8s ease-in-out infinite; }
`

function getStratagems(faction, detachmentId) {
  const coreStrats = demoStratagems.filter(s => s.source === 'core')
  const detachment = findDetachment(faction, detachmentId)
  const detStrats = detachment?.stratagems || []
  return [...coreStrats, ...detStrats]
}

function getDetachment(faction, detachmentId) {
  return findDetachment(faction, detachmentId) || null
}

// ── Shared spring config ───────────────────────────────────────────────────────
const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

function formatCategory(cat) {
  if (!cat) return ''
  return cat.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
}

function getActiveWeapons(unit) {
  if (!unit.weaponLoadouts || !unit.activeLoadout) return unit.weapons || []
  const loadout = unit.weaponLoadouts.find(l => l.id === unit.activeLoadout)
  if (!loadout?.weaponFilter) return unit.weapons || []
  return (unit.weapons || []).filter(w => loadout.weaponFilter.includes(w.name))
}

// ── Phase relevance — drives contextual hints and suppress dimming ─────────────
function getPhaseRelevance(unit, phaseId) {
  const weapons = getActiveWeapons(unit)
  const hasRanged = weapons.some(w => w.type === 'ranged')
  const hasMelee  = weapons.some(w => w.type === 'melee')
  const kws = (unit.keywords || []).map(k => k.toUpperCase())
  const abilities = unit.abilities || []

  if (phaseId === 'command') {
    const cpAbility = abilities.find(a =>
      typeof a === 'object' && a.phase === 'command' && /\bCP\b|command point/i.test(a.description || '')
    )
    if (cpAbility) return { level: 'relevant', hint: `${cpAbility.name} — gain 1 CP if on battlefield` }
    const cmdAbility = abilities.find(a => typeof a === 'object' && a.phase === 'command')
    if (cmdAbility) return { level: 'relevant', hint: `${cmdAbility.name} — use this now` }
    return { level: 'neutral', hint: null }
  }

  if (phaseId === 'movement') {
    for (const [kw, cfg] of Object.entries(KEYWORD_PHASE_HINTS)) {
      if (cfg.phase === 'movement' && kws.includes(kw))
        return { level: 'relevant', hint: cfg.hint }
    }
    const movAbility = abilities.find(a => typeof a === 'object' && a.phase === 'movement')
    if (movAbility) return { level: 'relevant', hint: `${movAbility.name} — use this phase` }
    if (!hasRanged && hasMelee)
      return { level: 'relevant', hint: 'Melee unit — advance toward the enemy' }
    return { level: 'neutral', hint: null }
  }

  if (phaseId === 'shooting') {
    if (!hasRanged && hasMelee)
      return { level: 'suppress', hint: 'No ranged weapons — save for Fight phase' }
    const shootingHints = WEAPON_KEYWORD_PHASE_HINTS.filter(h => h.phase === 'shooting')
    for (const h of shootingHints) {
      const w = weapons.find(w => w.type === 'ranged' && w.keywords?.some(k => h.test.test(k)))
      if (w) return { level: 'relevant', hint: h.hint(w.keywords.find(k => h.test.test(k)), w.name) }
    }
    return { level: hasRanged ? 'relevant' : 'neutral', hint: null }
  }

  if (phaseId === 'charge') {
    if (!hasMelee) return { level: 'suppress', hint: 'Ranged unit — stay back' }
    const chargeAbility = abilities.find(a =>
      typeof a === 'object' &&
      /charge/i.test(a.description || '') &&
      CHARGE_BONUS_PATTERN.test(a.description || '')
    )
    if (chargeAbility) return { level: 'relevant', hint: `${chargeAbility.name} — charge bonus triggers` }
    return { level: 'relevant', hint: null }
  }

  if (phaseId === 'fight') {
    if (!hasMelee && hasRanged)
      return { level: 'suppress', hint: 'No melee weapons — hold position' }
    const fightAbility = abilities.find(a => typeof a === 'object' && a.phase === 'fight')
    if (fightAbility) return { level: 'relevant', hint: `${fightAbility.name} — active in melee` }
    const fightHints = WEAPON_KEYWORD_PHASE_HINTS.filter(h => h.phase === 'fight')
    for (const h of fightHints) {
      const w = weapons.find(w => w.type === 'melee' && w.keywords?.some(k => h.test.test(k)))
      if (w) return { level: 'relevant', hint: h.hint(w.keywords.find(k => h.test.test(k)), w.name) }
    }
    return { level: hasMelee ? 'relevant' : 'neutral', hint: null }
  }

  return { level: 'neutral', hint: null }
}
const FADE_IN = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } }

const PHASE_ACTION_LABEL = {
  command:  'Used',
  movement: 'Moved',
  shooting: 'Fired',
  charge:   'Charged',
  fight:    'Fought',
}

// ── HP Bar ────────────────────────────────────────────────────────────────────
function HpBar({ current, max, theme }) {
  const pct = Math.max(0, (current / max) * 100)
  const color = pct > 60 ? theme.hpFull : pct > 30 ? theme.hpMid : theme.hpLow
  return (
    <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: theme.border }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
    </div>
  )
}

// ── Stat Pill ─────────────────────────────────────────────────────────────────
function StatPill({ label, value, mod, pulse, theme }) {
  const valueColor = mod ? theme.secondary : theme.textPrimary
  const labelColor = mod ? theme.secondary : theme.textSecondary
  const pulseAnim = pulse ? { opacity: [1, 0.3, 1] } : { opacity: 1 }
  const pulseTrans = pulse ? { repeat: Infinity, duration: 1.0 } : { duration: 0.2 }
  return (
    <div className="flex flex-col items-center min-w-[38px]">
      <div className="flex items-baseline gap-px">
        <motion.span className="font-black leading-tight"
          style={{ fontSize: 15, color: valueColor }}
          animate={pulseAnim} transition={pulseTrans}>
          {value}
        </motion.span>
        {mod && (
          <span style={{ fontSize: 8, fontWeight: 900, color: theme.secondary, lineHeight: 1 }}>+{mod.delta}</span>
        )}
      </div>
      <motion.span style={{ color: labelColor, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}
        animate={pulseAnim} transition={pulseTrans}>
        {label}
      </motion.span>
    </div>
  )
}

// ── Opponent Unit Card ────────────────────────────────────────────────────────
function OpponentUnitCard({ unit, theme, onMatchup, motionProps }) {
  const stats = [
    unit.T && { label: 'T', value: unit.T },
    unit.Sv && { label: 'SV', value: unit.Sv },
    unit.InvSv && { label: 'INV', value: unit.InvSv },
    unit.W && { label: 'W', value: unit.W },
    unit.OC != null && { label: 'OC', value: unit.OC },
  ].filter(Boolean)

  return (
    <motion.div
      {...motionProps}
      className="rounded-2xl border p-3"
      style={{
        background: theme.unitBg,
        borderColor: `${theme.hpLow}44`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>{unit.name}</p>
          <p className="text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: theme.textSecondary }}>
            {formatCategory(unit.type || unit.category)}
          </p>
        </div>
        {onMatchup && (
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={onMatchup}
            className="text-xs px-2.5 py-1 rounded-xl font-bold shrink-0"
            style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
            ⚔ vs
          </motion.button>
        )}
      </div>
      {stats.length > 0 && (
        <div className="flex gap-3 mb-2">
          {stats.map(s => <StatPill key={s.label} label={s.label} value={s.value} theme={theme} />)}
        </div>
      )}
      {unit.abilities?.length > 0 && (
        <AbilityChipRow abilities={unit.abilities.slice(0, 5)} theme={theme} />
      )}
    </motion.div>
  )
}

// ── Phase colours ─────────────────────────────────────────────────────────────
const PHASE_ACCENT = {
  command:  '#c9a84c',
  movement: '#22c55e',
  shooting: '#60a5fa',
  charge:   '#f97316',
  fight:    '#ef4444',
  any:      null,
}

// ── Ability Chip Panel ────────────────────────────────────────────────────────
function AbilityChipRow({ abilities, theme }) {
  const [openIdx, setOpenIdx] = useState(null)
  if (!abilities?.length) return null
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {abilities.map((a, i) => {
          const label = typeof a === 'string' ? a : a.name
          const desc = typeof a === 'object' ? (a.description || null) : null
          const phase = typeof a === 'object' ? a.phase : null
          const accent = (phase && PHASE_ACCENT[phase]) || theme.secondary
          const isOpen = openIdx === i
          return (
            <button
              key={`${label}-${i}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="text-xs px-2 py-1 rounded-full font-bold transition-all"
              style={{
                background: isOpen ? `${accent}28` : `${accent}14`,
                color: isOpen ? accent : `${accent}dd`,
                border: `1px solid ${isOpen ? accent : `${accent}60`}`,
              }}
            >
              {label}{desc ? (isOpen ? ' ▴' : ' ▾') : ''}
            </button>
          )
        })}
      </div>
      <AnimatePresence>
        {openIdx !== null && (() => {
          const a = abilities[openIdx]
          if (typeof a !== 'object' || !a.description) return null
          const accent = (a.phase && PHASE_ACCENT[a.phase]) || theme.secondary
          const phaseLabel = a.phase ? a.phase.toUpperCase() : null
          return (
            <motion.div
              key={openIdx}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl overflow-hidden" style={{ border: `1px solid ${accent}35` }}>
                <div className="px-3 py-2 flex items-center gap-2" style={{ background: `${accent}20` }}>
                  {phaseLabel && (
                    <span className="font-black px-2 py-0.5 rounded-full" style={{ background: accent, color: '#fff', fontSize: 9, letterSpacing: '0.06em' }}>
                      {phaseLabel}
                    </span>
                  )}
                  <p className="text-xs font-bold" style={{ color: accent }}>{a.name}</p>
                </div>
                <div className="px-3 py-2.5" style={{ background: `${accent}08` }}>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.9 }}>{parseTextWithKeywords(a.description, theme)}</p>
                  {a.reminder && (
                    <div className="mt-2 flex items-start gap-1.5 rounded-lg px-2 py-1.5" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                      <span style={{ color: accent, fontSize: 10, lineHeight: '1.4', flexShrink: 0 }}>↳</span>
                      <p className="text-xs font-bold leading-snug" style={{ color: accent }}>{a.reminder}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}

// ── Source Badge ──────────────────────────────────────────────────────────────
function SourceBadge({ source, theme }) {
  const isCore = source === 'core'
  return (
    <span className="text-xs font-bold px-1.5 py-0.5 rounded"
      style={{
        background: isCore ? `${theme.secondary}18` : `${theme.primary}18`,
        color: isCore ? theme.secondary : theme.textSecondary,
        border: `1px solid ${isCore ? theme.secondary : theme.border}`,
        fontSize: 9, letterSpacing: '0.05em',
      }}>
      {isCore ? 'CORE' : 'DET'}
    </span>
  )
}

// ── Stratagem Card ────────────────────────────────────────────────────────────
function StratCard({ strat, theme, highlighted, highlightReason, motionProps, cp, onActivate, activeStratIds }) {
  const [expanded, setExpanded] = useState(false)
  const isActive = activeStratIds?.has(strat.id) ?? false
  const canAfford = cp >= strat.cost
  return (
    <motion.button
      {...motionProps}
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-2xl border p-4 relative overflow-hidden"
      whileTap={{ scale: 0.98 }}
      style={{
        background: expanded ? theme.stratHover : theme.stratBg,
        borderColor: isActive ? '#22c55e' : highlighted ? theme.secondary : expanded ? theme.border : theme.stratBorder,
        boxShadow: highlighted
          ? `0 0 0 1px ${theme.secondary}44, 0 4px 16px rgba(0,0,0,0.3)`
          : '0 1px 4px rgba(0,0,0,0.2)',
      }}
    >
      {highlighted && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: theme.secondary }} />
      )}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: '#22c55e' }} />
      )}
      <div className={`flex items-start justify-between gap-2 ${highlighted ? 'pl-2' : ''}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm leading-tight" style={{ color: theme.textPrimary }}>{strat.name}</span>
            <SourceBadge source={strat.source} theme={theme} />
            {highlighted && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ background: theme.secondary, color: theme.bg, fontSize: 9 }}>
                SUGGESTED
              </span>
            )}
            {isActive && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ background: '#22c55e', color: '#000', fontSize: 9 }}>
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{strat.timing}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.border}` }}>
            {strat.cost} CP
          </span>
          <span style={{ color: theme.textSecondary, fontSize: 9 }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {highlighted && highlightReason && !expanded && (
        <p className={`text-xs mt-2 italic ${highlighted ? 'pl-2' : ''}`} style={{ color: theme.secondary, opacity: 0.85 }}>
          💡 {highlightReason}
        </p>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden ${highlighted ? 'pl-2' : ''}`}
          >
            <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: theme.border }}>
              <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.85 }}>{strat.effect}</p>
              {highlighted && highlightReason && (
                <p className="text-xs italic" style={{ color: theme.secondary }}>💡 {highlightReason}</p>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onActivate?.(strat) }}
                disabled={!canAfford && !isActive}
                className="w-full mt-2 py-2 rounded-xl text-xs font-black transition-all"
                style={{
                  background: isActive ? '#22c55e22' : canAfford ? `${theme.secondary}22` : theme.surfaceHigh,
                  color: isActive ? '#22c55e' : canAfford ? theme.secondary : theme.textSecondary,
                  border: `1px solid ${isActive ? '#22c55e44' : canAfford ? theme.secondary + '44' : theme.border}`,
                  opacity: !canAfford && !isActive ? 0.5 : 1,
                }}>
                {isActive ? '✓ Active this phase' : canAfford ? `Activate — Spend ${strat.cost} CP` : `Need ${strat.cost} CP`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ── Leader Panel ──────────────────────────────────────────────────────────────
function LeaderPanel({ unit, attachedLeaderId, onAttach, onDetach, activePhase, theme }) {
  const [open, setOpen] = useState(false)
  const unitKey = unit.unitKey || unit.id.replace(/_\d+$/, '')
  // Eligible leaders: use unit.eligibleLeaders if present, else fall back to unitLeaderMap
  const eligibleIds = unit.eligibleLeaders?.length > 0
    ? unit.eligibleLeaders
    : (unitLeaderMap[unitKey] || [])
  const eligible = eligibleIds.map(id => leaders[id]).filter(Boolean)
  const attached = attachedLeaderId ? leaders[attachedLeaderId] : null
  const baseLeaderId = attachedLeaderId?.replace(/_\d+$/, '')
  const abilities = baseLeaderId ? getLeaderAbilities(baseLeaderId) : []
  const activeAbilities = abilities.filter(a => a.phase === activePhase || a.phase === 'any')

  // Show if there are eligible leaders OR a leader is already attached
  if (eligible.length === 0 && !attached) return null

  return (
    <div className="mt-3">
      <AnimatePresence>
        {activeAbilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="rounded-xl p-3 mb-2"
            style={{
              background: `${theme.secondary}12`,
              border: `1px solid ${theme.secondary}44`,
              borderLeftWidth: 3,
              borderLeftColor: theme.secondary,
            }}
          >
            {activeAbilities.map(a => (
              <div key={a.name}>
                <p className="text-xs font-bold" style={{ color: theme.secondary }}>⚡ {a.name} — Active this phase</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.85 }}>{a.reminder}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {attached ? (
        <div className="rounded-xl border p-3 flex items-center justify-between"
          style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: theme.secondary, color: theme.bg }}>
              {attached.name[0]}
            </div>
            <div>
              <p className="text-xs font-bold leading-tight" style={{ color: theme.textPrimary }}>{attached.name}</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>{attached.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
            {abilities.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {abilities.slice(0, 3).map(a => (
                  <span key={a.name} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}40` }}>
                    {a.name}
                  </span>
                ))}
                {abilities.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                    +{abilities.length - 3}
                  </span>
                )}
              </div>
            )}
            <button onClick={() => onDetach(unit.id)}
              className="text-xs px-2 py-1 rounded-lg font-bold"
              style={{ background: theme.stratBg, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(!open)}
          className="w-full rounded-xl border py-2 text-xs font-bold flex items-center justify-center gap-2"
          style={{ background: 'transparent', borderColor: theme.border, borderStyle: 'dashed', color: theme.textSecondary }}>
          <span style={{ color: theme.secondary }}>+</span> Assign Leader
        </motion.button>
      )}

      <AnimatePresence>
        {open && !attached && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-2"
          >
            <div className="rounded-xl border overflow-hidden" style={{ background: theme.stratBg, borderColor: theme.border }}>
              {eligible.map(l => {
                const pairKey = `${l.id}_${unitKey}`
                const pairAbilities = getLeaderAbilities(l.id)
                return (
                  <button key={l.id}
                    onClick={() => { onAttach(unit.id, l.id); setOpen(false) }}
                    className="w-full flex items-center gap-3 p-3 text-left border-b last:border-b-0 transition-all hover:opacity-80"
                    style={{ borderColor: theme.border }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                      style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.border}` }}>
                      {l.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{l.name}</p>
                      <p className="text-xs" style={{ color: theme.textSecondary }}>{l.role}</p>
                      {pairAbilities.map(a => (
                        <p key={a.name} className="text-xs mt-0.5" style={{ color: theme.secondary }}>✦ {a.name}</p>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Unit Card ─────────────────────────────────────────────────────────────────
function UnitCard({ unit, unitState, attachedLeaderId, onAttach, onDetach, onWound, onHeal, onToggleWarlord, isWarlord, activePhase, activePickEffect, phaseRelevance, ferocityChoice, onFerocityChoice, isDone, onMarkDone, theme, motionProps, onMatchup, onCalcWeapon }) {
  const wounds = unitState?.currentWounds ?? unit.currentWounds ?? unit.maxWounds
  const pct = wounds / unit.maxWounds
  const statusColor = pct > 0.6 ? theme.hpFull : pct > 0.3 ? theme.hpMid : theme.hpLow
  const [showWeapons, setShowWeapons] = useState(false)
  const prevWoundsRef = useRef(wounds)
  const woundFlash = wounds < prevWoundsRef.current
  prevWoundsRef.current = wounds

  // Compute detachment pick/passive badge for this unit + phase
  const pickBadge = useMemo(() => {
    if (!activePickEffect) return null
    if (!activePickEffect.phases.includes(activePhase)) return null
    const allKws = [...(unit.keywords || []), ...(unit.factionKeywords || [])]
    if (activePickEffect.factionKeywords) {
      if (!activePickEffect.factionKeywords.some(kw => allKws.includes(kw))) return null
    }
    if (activePickEffect.keywordFilter) {
      if (!activePickEffect.keywordFilter.some(kw => allKws.includes(kw))) return null
    }
    if (activePickEffect.excludeKeywords) {
      if (activePickEffect.excludeKeywords.some(kw => allKws.includes(kw))) return null
    }
    return activePickEffect
  }, [activePickEffect, activePhase, unit])

  const stats = [
    unit.M && { label: 'M', value: unit.M },
    unit.T && { label: 'T', value: unit.T },
    unit.Sv && { label: 'SV', value: unit.Sv },
    unit.OC != null && { label: 'OC', value: unit.OC, mod: unit.modSources?.find(m => m.stat === 'OC') },
    unit.InvSv && { label: 'INV', value: unit.InvSv },
  ].filter(Boolean)

  const isSuppressed = phaseRelevance?.level === 'suppress'
  const isRelevant = phaseRelevance?.level === 'relevant' && !isSuppressed && !isDone

  return (
    <motion.div
      {...motionProps}
      animate={{
        ...(typeof motionProps?.animate === 'object' ? motionProps.animate : { opacity: 1, y: 0 }),
        opacity: isSuppressed ? 0.35 : isDone ? 0.55 : 1,
      }}
      layout
      className="rounded-2xl border p-4"
      style={{
        background: theme.unitBg,
        borderColor: isDone ? `${theme.border}88` : isWarlord ? theme.secondary : theme.border,
        boxShadow: isWarlord
          ? `0 0 0 1px ${theme.secondary}44, 0 0 20px ${theme.secondary}22, 0 2px 8px rgba(0,0,0,0.3)`
          : '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>{unit.name}</p>
            <AnimatePresence>
              {isWarlord && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: theme.secondary, color: theme.bg, fontSize: 9, letterSpacing: '0.05em' }}
                >
                  ★ WARLORD
                </motion.span>
              )}
              {isDone && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(34,197,94,0.18)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)', fontSize: 9 }}
                >
                  ✓ Done
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: theme.textSecondary }}>{formatCategory(unit.type)}</p>
          {unit.abilities?.some(a => a.isEnhancement) && (() => {
            const enh = unit.abilities.find(a => a.isEnhancement)
            return (
              <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(251,191,36,0.14)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.35)' }}>
                ⭐ {enh.name}
              </span>
            )
          })()}
          <AnimatePresence>
            {phaseRelevance?.hint && (
              <motion.span
                key={phaseRelevance.hint}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isRelevant
                  ? { opacity: [1, 0.35, 1], scale: 1 }
                  : { opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={isRelevant
                  ? { opacity: { repeat: Infinity, duration: 1.1 }, scale: { duration: 0.18 } }
                  : { duration: 0.18 }}
                className="inline-flex mt-1 text-xs px-2 py-0.5 rounded-full font-bold"
                style={{
                  background: isSuppressed ? `${theme.hpLow}18` : `${theme.secondary}22`,
                  color: isSuppressed ? theme.hpLow : theme.secondary,
                  border: `1px solid ${isSuppressed ? theme.hpLow + '35' : theme.secondary + '55'}`,
                  fontSize: 9,
                }}
              >
                {isSuppressed ? '◆ ' : '● '}{phaseRelevance.hint}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {unit.isLeader && (
            <motion.button
              onClick={() => onToggleWarlord(unit.id)}
              whileTap={{ scale: 0.8, rotate: isWarlord ? -15 : 15 }}
              animate={isWarlord ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="text-xs px-2 py-1 rounded-lg font-bold"
              style={{
                background: isWarlord ? `${theme.secondary}22` : theme.surfaceHigh,
                color: isWarlord ? theme.secondary : theme.textSecondary,
                border: `1px solid ${isWarlord ? theme.secondary : theme.border}`,
              }}
              title="Toggle Warlord"
            >
              {isWarlord ? '★' : '☆'}
            </motion.button>
          )}
          {/* Wounds badge */}
          <motion.div
            key={wounds}
            initial={woundFlash ? { scale: 1.25, backgroundColor: theme.hpLow } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: theme.surfaceHigh, color: statusColor, border: `1px solid ${theme.border}` }}
          >
            {wounds} / {unit.maxWounds}
          </motion.div>
        </div>
      </div>

      {/* Stat bar */}
      {stats.length > 0 && (
        <div className="flex gap-3 mb-1 px-1">
          {stats.map(s => (
            <StatPill key={s.label} label={s.label} value={s.value} mod={s.mod}
              pulse={activePhase === 'movement' && s.label === 'M'}
              theme={theme} />
          ))}
        </div>
      )}

      {/* Static mod source line (e.g. Champions of Fenris +1 OC) */}
      {unit.modSources?.length > 0 && (
        <p className="text-xs px-1 mb-1.5 leading-snug" style={{ color: theme.secondary, fontSize: 9, opacity: 0.85 }}>
          {unit.modSources.map(m => `${m.source}: +${m.delta} ${m.stat}${m.condition ? ` (${m.condition})` : ''}`).join(' · ')}
        </p>
      )}

      {/* Active Hunting Pack / detachment pick badge */}
      <AnimatePresence>
        {pickBadge && (
          <motion.div
            key={pickBadge.badge}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-2"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
              style={{ background: `${pickBadge.badgeColor}18`, border: `1px solid ${pickBadge.badgeColor}40` }}>
              <GiLightningTrio size={10} color={pickBadge.badgeColor} style={{ flexShrink: 0 }} />
              <span className="font-black" style={{ color: pickBadge.badgeColor, fontSize: 10 }}>
                {pickBadge.badge}
              </span>
              <span className="ml-auto leading-tight" style={{ color: pickBadge.badgeColor, fontSize: 8, opacity: 0.7 }}>
                Active Pack
              </span>
            </div>
            {pickBadge.why && (
              <p className="text-xs mt-0.5 px-1 leading-snug" style={{ color: theme.textSecondary, fontSize: 9 }}>
                {pickBadge.why}
              </p>
            )}
            {/* Ferocious Strike sub-choice — shown when that pack is active in Fight phase */}
            {activePhase === 'fight' && activePickEffect?.id === 'ferocityStrike' && onFerocityChoice && (
              <div className="flex gap-1.5 mt-1.5">
                {['lethal', 'sustained'].map(opt => {
                  const label = opt === 'lethal' ? 'Lethal Hits' : 'Sustained Hits 1'
                  const chosen = ferocityChoice === opt
                  return (
                    <button key={opt} onClick={() => onFerocityChoice(opt)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-black transition-all"
                      style={{
                        background: chosen ? pickBadge.badgeColor : theme.surfaceHigh,
                        color: chosen ? '#000' : theme.textSecondary,
                        border: `1px solid ${chosen ? pickBadge.badgeColor : theme.border}`,
                      }}>
                      {label}
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <HpBar current={wounds} max={unit.maxWounds} theme={theme} />

      {/* Heal / Wound buttons */}
      <div className="flex gap-2 mt-3">
        <motion.button whileTap={{ scale: 0.95 }}
          onClick={() => onHeal(unit.id, wounds)}
          className="flex-1 rounded-xl py-2 text-xs font-bold tracking-wide"
          style={{ background: theme.surfaceHigh, color: theme.hpFull, border: `1px solid ${theme.border}` }}>
          + Heal
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }}
          onClick={() => onWound(unit.id, wounds)}
          className="flex-1 rounded-xl py-2 text-xs font-bold tracking-wide"
          style={{ background: theme.surfaceHigh, color: theme.hpLow, border: `1px solid ${theme.border}` }}>
          − Wound
        </motion.button>
        {!isSuppressed && onMarkDone && (
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={onMarkDone}
            className="px-3 rounded-xl py-2 text-xs font-bold"
            style={{
              background: isDone ? 'rgba(34,197,94,0.2)' : theme.surfaceHigh,
              color: isDone ? '#4ade80' : theme.textSecondary,
              border: `1px solid ${isDone ? 'rgba(34,197,94,0.5)' : theme.border}`,
            }}>
            {isDone ? `✓ ${PHASE_ACTION_LABEL[activePhase] || 'Done'}` : `○ ${PHASE_ACTION_LABEL[activePhase] || 'Done'}`}
          </motion.button>
        )}
        {getActiveWeapons(unit).length > 0 && (
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => setShowWeapons(!showWeapons)}
            className="px-3 rounded-xl py-2 text-xs font-bold"
            style={{
              background: showWeapons ? `${theme.secondary}22` : theme.surfaceHigh,
              color: showWeapons ? theme.secondary : theme.textSecondary,
              border: `1px solid ${showWeapons ? theme.secondary : theme.border}`,
            }}>
            Weapons
          </motion.button>
        )}
        {onMatchup && (
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={onMatchup}
            className="px-3 rounded-xl py-2 text-xs font-bold"
            style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
            ⚡ vs
          </motion.button>
        )}
      </div>

      {/* Weapon profiles expandable */}
      <AnimatePresence>
        {showWeapons && getActiveWeapons(unit).length > 0 && (() => {
          const activeWeapons = getActiveWeapons(unit)
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {unit.activeLoadout && unit.weaponLoadouts && (
                <div className="mt-2 flex gap-1">
                  {unit.weaponLoadouts.map(l => (
                    <span key={l.id}
                      className="text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{
                        background: l.id === unit.activeLoadout ? `${theme.secondary}22` : 'transparent',
                        color: l.id === unit.activeLoadout ? theme.secondary : theme.textSecondary,
                        border: `1px solid ${l.id === unit.activeLoadout ? theme.secondary : theme.border}`,
                      }}>
                      {l.short}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor: theme.border }}>
                <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                  <thead>
                    <tr style={{ background: theme.surfaceHigh, borderBottom: `1px solid ${theme.border}` }}>
                      {[['WEAPON','left'],['RNG','center'],['A','center'],['S','center'],['AP','center'],['D','center'],['WS/BS','center']].map(([h, align]) => (
                        <th key={h} className="px-2 py-1.5 font-bold whitespace-nowrap"
                          style={{ color: theme.textSecondary, fontSize: 9, letterSpacing: '0.06em', textAlign: align }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeWeapons.map((w, i) => (
                      <React.Fragment key={i}>
                        <tr
                          style={{ borderBottom: i < activeWeapons.length - 1 || w.keywords?.length > 0 ? `1px solid ${theme.border}` : undefined, background: i % 2 === 0 ? theme.unitBg : `${theme.surfaceHigh}88`, cursor: onCalcWeapon ? 'pointer' : 'default' }}
                          onClick={() => onCalcWeapon?.(w)}>
                          <td className="px-2 py-2 text-xs font-bold" style={{ color: theme.textPrimary }}>
                            <span className="flex items-center gap-1">
                              <span>{w.name}</span>
                              {onCalcWeapon && <span style={{ fontSize: 8, opacity: 0.4, flexShrink: 0 }}>🎲</span>}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-xs text-center whitespace-nowrap" style={{ color: theme.textSecondary }}>{w.range || '—'}</td>
                          <td className="px-2 py-2 text-xs font-bold text-center whitespace-nowrap" style={{ color: theme.secondary }}>{w.A}</td>
                          <td className="px-2 py-2 text-xs text-center whitespace-nowrap" style={{ color: theme.textPrimary }}>{w.S}</td>
                          <td className="px-2 py-2 text-xs text-center whitespace-nowrap" style={{ color: theme.textPrimary }}>{w.AP}</td>
                          <td className="px-2 py-2 text-xs font-bold text-center whitespace-nowrap" style={{ color: theme.secondary }}>{w.D}</td>
                          <td className="px-2 py-2 text-xs text-center whitespace-nowrap" style={{ color: theme.textSecondary }}>{w.WS || w.BS || '—'}</td>
                        </tr>
                        {w.keywords?.length > 0 && (
                          <tr style={{ background: i % 2 === 0 ? theme.unitBg : `${theme.surfaceHigh}88`, borderBottom: i < activeWeapons.length - 1 ? `1px solid ${theme.border}` : undefined }}>
                            <td colSpan={7} className="px-2 pb-1.5">
                              <div className="flex flex-wrap gap-1">
                                {w.keywords.map(kw => <KeywordChip key={kw} keyword={kw} theme={theme} />)}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Ability chips */}
      {unit.abilities && <AbilityChipRow abilities={unit.abilities} theme={theme} />}

      {/* Leader panel */}
      {!unit.isLeader && (
        <LeaderPanel unit={unit} attachedLeaderId={attachedLeaderId}
          onAttach={onAttach} onDetach={onDetach} activePhase={activePhase} theme={theme} />
      )}
    </motion.div>
  )
}

// ── VP Modal ──────────────────────────────────────────────────────────────────
function VPModal({ vpScores, currentRound, onAdjust, onAdvanceRound, onClose, theme }) {
  const totalYou = vpScores.you.reduce((a, b) => a + b, 0)
  const totalThem = vpScores.them.reduce((a, b) => a + b, 0)
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 pt-6 pb-4 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-base" style={{ color: theme.textPrimary }}>Victory Points</h2>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-3 text-center" style={{ background: `${theme.hpFull}18`, border: `1px solid ${theme.hpFull}44` }}>
              <motion.p key={totalYou} initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}
                className="text-2xl font-black" style={{ color: theme.hpFull }}>{totalYou}</motion.p>
              <p className="text-xs font-bold mt-0.5" style={{ color: theme.textSecondary }}>YOUR VP</p>
            </div>
            <div className="rounded-2xl p-3 text-center" style={{ background: `${theme.hpLow}18`, border: `1px solid ${theme.hpLow}44` }}>
              <motion.p key={totalThem} initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}
                className="text-2xl font-black" style={{ color: theme.hpLow }}>{totalThem}</motion.p>
              <p className="text-xs font-bold mt-0.5" style={{ color: theme.textSecondary }}>THEIR VP</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-2">
          {[0,1,2,3,4].map(i => {
            const isCurrent = i === currentRound - 1
            return (
              <div key={i} className="rounded-2xl border p-4 transition-all"
                style={{ background: isCurrent ? `${theme.secondary}10` : theme.unitBg, borderColor: isCurrent ? theme.secondary : theme.border }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: isCurrent ? theme.secondary : theme.textSecondary }}>
                  Round {i + 1}{isCurrent ? ' · Current' : ''}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['you', 'them'].map(player => (
                    <div key={player}>
                      <p className="text-xs font-bold mb-2" style={{ color: player === 'you' ? theme.secondary : theme.textSecondary }}>
                        {player === 'you' ? 'You' : 'Them'}
                      </p>
                      <div className="flex items-center gap-2">
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => onAdjust(player, i, -1)}
                          className="w-7 h-7 rounded-lg font-bold flex items-center justify-center text-sm"
                          style={{ background: theme.surfaceHigh, color: theme.hpLow, border: `1px solid ${theme.border}` }}>−</motion.button>
                        <motion.span key={vpScores[player][i]} initial={{ scale: 1.4 }} animate={{ scale: 1 }}
                          className="flex-1 text-center font-black text-base" style={{ color: theme.textPrimary }}>
                          {vpScores[player][i]}
                        </motion.span>
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => onAdjust(player, i, 1)}
                          className="w-7 h-7 rounded-lg font-bold flex items-center justify-center text-sm"
                          style={{ background: theme.surfaceHigh, color: theme.hpFull, border: `1px solid ${theme.border}` }}>+</motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="px-5 pb-8 pt-3 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          {currentRound < 5 && (
            <motion.button whileTap={{ scale: 0.97 }} onClick={onAdvanceRound}
              className="w-full py-3 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Advance to Round {currentRound + 1}
            </motion.button>
          )}
          <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Close</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Battle Profile Modal ──────────────────────────────────────────────────────
function BattleProfileModal({ opponentTags, onToggleTag, onClose, theme }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-t-3xl p-5 pb-8"
        style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-base" style={{ color: theme.textPrimary }}>Battle Profile</h2>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>Tag your opponent's army style to get stratagem suggestions.</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {opponentProfiles.map(p => {
            const active = opponentTags.includes(p.id)
            return (
              <motion.button key={p.id} onClick={() => onToggleTag(p.id)}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border p-3 text-left transition-all"
                style={{
                  background: active ? `${theme.secondary}18` : theme.stratBg,
                  borderColor: active ? theme.secondary : theme.border,
                }}>
                <div className="text-xl mb-1">{p.icon}</div>
                <p className="text-xs font-bold leading-tight" style={{ color: active ? theme.secondary : theme.textPrimary }}>{p.label}</p>
                <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{p.description}</p>
              </motion.button>
            )
          })}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
          className="w-full mt-4 py-3 rounded-2xl font-bold text-sm"
          style={{ background: theme.secondary, color: theme.bg }}>
          Save Profile
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ── Phase accent colours (shared) ─────────────────────────────────────────────
const PHASE_ACCENT_MAP = {
  command:  '#c9a84c',
  movement: '#22c55e',
  shooting: '#60a5fa',
  charge:   '#f97316',
  fight:    '#ef4444',
}

// ── Phase Context Row (weapon + ability counts for the units area) ─────────────
function PhaseContextRow({ units, phaseId, abilityCount, theme }) {
  const chips = []

  if (phaseId === 'command') {
    const cpUnits = units.filter(u =>
      (u.abilities || []).some(a => typeof a === 'object' && a.phase === 'command' && /\bCP\b|command point/i.test(a.description || ''))
    )
    if (cpUnits.length) chips.push({ phase: 'command', label: `${cpUnits.length} CP generator${cpUnits.length > 1 ? 's' : ''} on field`, color: '#fbbf24' })
    if (abilityCount > 0) chips.push({ phase: 'command', label: `${abilityCount} ${abilityCount === 1 ? 'ability' : 'abilities'} — check Battle Intel`, color: theme.secondary })
  }

  if (phaseId === 'movement') {
    const dsUnits = units.filter(u => (u.keywords || []).some(k => /^DEEP STRIKE$/i.test(k)))
    const scoutUnits = units.filter(u => (u.keywords || []).some(k => /^SCOUTS$/i.test(k)))
    if (dsUnits.length) chips.push({ phase: 'movement', label: `${dsUnits.length} Deep Strike`, color: '#2dd4bf' })
    if (scoutUnits.length) chips.push({ phase: 'movement', label: `${scoutUnits.length} Scouts`, color: '#2dd4bf' })
    if (abilityCount > 0) chips.push({ phase: 'movement', label: `${abilityCount} ${abilityCount === 1 ? 'ability' : 'abilities'} — check Battle Intel`, color: theme.secondary })
  }

  if (phaseId === 'shooting') {
    const n = units.filter(u => u.weapons?.some(w => w.type === 'ranged')).length
    const suppressed = units.filter(u => !u.weapons?.some(w => w.type === 'ranged') && u.weapons?.some(w => w.type === 'melee')).length
    if (n > 0) chips.push({ phase: 'shooting', label: `${n} can shoot`, color: '#60a5fa' })
    if (suppressed > 0) chips.push({ phase: 'fight', label: `${suppressed} melee-only — hold`, color: theme.textSecondary })
  }

  if (phaseId === 'charge') {
    const meleeUnits = units.filter(u => u.weapons?.some(w => w.type === 'melee'))
    const withBonus = meleeUnits.filter(u =>
      (u.abilities || []).some(a => typeof a === 'object' && /charge/i.test(a.description || '') && /add \d|\+\d|bonus/i.test(a.description || ''))
    )
    if (meleeUnits.length) chips.push({ phase: 'charge', label: `${meleeUnits.length} can charge`, color: '#f97316' })
    if (withBonus.length) chips.push({ phase: 'charge', label: `${withBonus.length} charge bonus`, color: '#fbbf24' })
  }

  if (phaseId === 'fight') {
    const n = units.filter(u => u.weapons?.some(w => w.type === 'melee')).length
    const withAbility = units.filter(u => (u.abilities || []).some(a => typeof a === 'object' && a.phase === 'fight')).length
    if (n > 0) chips.push({ phase: 'fight', label: `${n} can fight`, color: '#ef4444' })
    if (withAbility > 0) chips.push({ phase: 'fight', label: `${withAbility} fight ${withAbility === 1 ? 'ability' : 'abilities'}`, color: '#fbbf24' })
  }

  if (chips.length === 0) return null
  return (
    <div className="flex gap-1.5 px-3 pt-2 pb-0.5 flex-wrap shrink-0">
      {chips.map(c => (
        <span key={c.label} className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}40` }}>
          <PhaseIcon phase={c.phase} size={11} color={c.color} />
          {c.label}
        </span>
      ))}
    </div>
  )
}

function getCardAttacks(unit, phaseId) {
  const weapons = getActiveWeapons(unit)
  let relevant = []
  if (phaseId === 'shooting')
    relevant = weapons.filter(w => w.type === 'ranged')
  else if (phaseId === 'fight' || phaseId === 'charge')
    relevant = weapons.filter(w => w.type === 'melee')
  if (!relevant.length) return null
  const bestA = relevant.reduce((best, w) => {
    const ba = typeof best.A === 'number' ? best.A : 0
    const ca = typeof w.A === 'number' ? w.A : 0
    return ca > ba ? w : best
  }).A
  if (phaseId === 'charge' && unit.id === 'ragnar' && typeof bestA === 'number') return bestA + 2
  return bestA
}

function buildPairs(allUnits, unitStates) {
  const usedLeaderIds = new Set()
  const pairs = []
  for (const u of allUnits) {
    if (u.isLeader) continue
    const attachedId = unitStates[u.id]?.attachedLeaderId
    const baseAttachedId = attachedId?.replace(/_\d+$/, '')
    const leader = attachedId
      ? allUnits.find(l => l.isLeader && (l.id === attachedId || l.id === baseAttachedId))
      : null
    if (leader) usedLeaderIds.add(leader.id)
    pairs.push({ id: `pair-${u.id}`, leader: leader || null, unit: u })
  }
  for (const u of allUnits) {
    if (u.isLeader && !usedLeaderIds.has(u.id))
      pairs.push({ id: `solo-leader-${u.id}`, leader: u, unit: null })
  }
  return pairs
}

function BattleUnitCard({
  unit, unitState, phaseId, phaseAccent, phaseRelevance,
  isDone, onDone, onWound, onHeal, onDetail, isLeader, theme, desktop
}) {
  const wounds   = unitState?.currentWounds ?? unit.maxWounds
  const maxW     = unit.maxWounds
  const pct      = wounds / maxW
  const hpColor  = pct > 0.6 ? '#22c55e' : pct > 0.3 ? '#f59e0b' : '#ef4444'
  const active   = phaseRelevance?.level !== 'suppress'
  const relevant = phaseRelevance?.level === 'relevant'
  const attacks  = getCardAttacks(unit, phaseId)
  const showAtk  = attacks !== null && active && !isDone &&
    (phaseId === 'shooting' || phaseId === 'fight' || phaseId === 'charge')
  const pulseMov = phaseId === 'movement' && active && !isDone

  const cardW = isLeader ? (desktop ? 200 : 155) : (desktop ? 230 : 175)
  const fName = desktop ? 15 : 12
  const fRole = desktop ? 10 : 8
  const fStat = desktop ? 13 : 11
  const fLbl  = desktop ? 8  : 7
  const fBtn  = desktop ? 11 : 9
  const fAtk  = desktop ? 28 : 20

  const borderCol = isDone ? `${theme.border}88`
    : !active ? theme.border
    : relevant ? `${phaseAccent}70`
    : `${phaseAccent}35`

  return (
    <div
      className="relative rounded-2xl overflow-hidden shrink-0 flex flex-col"
      style={{
        width: cardW, height: '100%',
        border: `1.5px solid ${borderCol}`,
        opacity: isDone ? 0.45 : !active ? 0.3 : 1,
        boxShadow: active && !isDone && relevant
          ? `0 0 24px ${phaseAccent}35, 0 4px 20px rgba(0,0,0,0.55)`
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'opacity 0.3s, box-shadow 0.3s',
      }}
    >
      {unit.artUrl ? (
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${unit.artUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: unit.artPosition || 'center center',
        }} />
      ) : (
        <div className="absolute inset-0" style={{ background: `${phaseAccent}18` }} />
      )}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom,
          rgba(0,0,0,0.05) 0%,
          rgba(0,0,0,0.08) 28%,
          rgba(0,0,0,0.80) 56%,
          rgba(0,0,0,0.97) 100%)`,
      }} />

      {/* Top overlays */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between z-10">
        <div className="flex flex-col items-start gap-1">
          <span className="font-black px-2 py-0.5 rounded-full"
            style={{ fontSize: desktop ? 11 : 9, background: 'rgba(0,0,0,0.65)', color: hpColor, border: `1px solid ${hpColor}55`, backdropFilter: 'blur(4px)' }}>
            {wounds}/{maxW} W
          </span>
          {isLeader && (
            <span className="font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase"
              style={{ fontSize: 7, background: `${phaseAccent}cc`, color: '#000' }}>
              Leader
            </span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={e => { e.stopPropagation(); onDone() }}
          className="font-black rounded-full"
          style={{
            fontSize: desktop ? 10 : 8,
            padding: desktop ? '4px 8px' : '3px 6px',
            background: isDone ? 'rgba(34,197,94,0.45)' : 'rgba(0,0,0,0.60)',
            color: isDone ? '#4ade80' : 'rgba(255,255,255,0.82)',
            border: `1.5px solid ${isDone ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.35)'}`,
            backdropFilter: 'blur(4px)',
          }}
        >
          {isDone ? '✓ Done' : '○ Mark'}
        </motion.button>
      </div>

      {/* ATK tile — synced pulse via CSS */}
      {showAtk && (
        <div className="absolute z-10 sync-pulse" style={{ top: '34%', right: 8 }}>
          <div className="flex flex-col items-center rounded-xl"
            style={{
              padding: desktop ? '7px 9px' : '5px 7px',
              background: `${phaseAccent}e8`,
              border: `2px solid ${phaseAccent}`,
              backdropFilter: 'blur(6px)',
              boxShadow: `0 0 14px ${phaseAccent}80`,
            }}>
            <span className="font-black leading-none" style={{ fontSize: fAtk, color: '#000' }}>{attacks}</span>
            <span style={{ fontSize: desktop ? 8 : 6, fontWeight: 900, color: '#000', letterSpacing: '0.08em' }}>ATK</span>
          </div>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-2.5 pb-2.5 pt-2">
        <p className="font-black leading-tight text-white truncate" style={{ fontSize: fName }}>{unit.name}</p>
        <p className="font-bold uppercase tracking-wide mt-0.5" style={{ fontSize: fRole, color: `${phaseAccent}dd` }}>
          {unit.type || (unit.isLeader ? 'Character' : 'Unit')}
        </p>

        {/* Stats */}
        <div className="flex gap-2.5 mt-1.5">
          {[['M', unit.M, pulseMov], ['T', unit.T, false], ['SV', unit.Sv, false]]
            .filter(([, v]) => v != null)
            .map(([l, v, pulse]) => (
              <div key={l} className="flex flex-col items-center">
                <span
                  className={pulse ? 'sync-pulse font-black leading-none' : 'font-black leading-none'}
                  style={{ fontSize: fStat, color: pulse ? phaseAccent : 'white' }}>
                  {v}
                </span>
                <span style={{ fontSize: fLbl, fontWeight: 800, color: pulse ? `${phaseAccent}cc` : 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
                  {l}
                </span>
              </div>
            ))}
        </div>

        {/* Contextual hint badge */}
        {phaseRelevance?.hint && (
          <div
            className={`mt-1.5 rounded-lg px-2 py-1 ${relevant && !isDone ? 'sync-pulse' : ''}`}
            style={{
              background: phaseRelevance.level === 'suppress' ? 'rgba(239,68,68,0.18)' : `${phaseAccent}28`,
              border: `1px solid ${phaseRelevance.level === 'suppress' ? 'rgba(239,68,68,0.38)' : phaseAccent + '50'}`,
            }}>
            <p style={{ fontSize: fLbl + 1, color: phaseRelevance.level === 'suppress' ? '#f87171' : phaseAccent, lineHeight: 1.35 }}>
              {phaseRelevance.level === 'suppress' ? '◆ ' : '⚡ '}{phaseRelevance.hint}
            </p>
          </div>
        )}

        {/* HP bar */}
        <div className="mt-1.5 w-full rounded-full overflow-hidden" style={{ height: desktop ? 4 : 3, background: 'rgba(255,255,255,0.18)' }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct * 100}%`, background: hpColor }} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1 mt-1.5">
          <button
            onClick={e => { e.stopPropagation(); onWound() }}
            className="w-full rounded-lg font-black flex items-center justify-center gap-1"
            style={{ fontSize: fBtn, padding: desktop ? '6px 0' : '5px 0', background: 'rgba(239,68,68,0.30)', color: '#fca5a5', border: '1.5px solid rgba(239,68,68,0.55)' }}>
            ▼ Take Damage
          </button>
          <div className="flex gap-1">
            <button
              onClick={e => { e.stopPropagation(); onHeal() }}
              className="flex-1 rounded-lg font-black flex items-center justify-center"
              style={{ fontSize: fBtn, padding: desktop ? '5px 0' : '4px 0', background: 'rgba(34,197,94,0.20)', color: '#86efac', border: '1px solid rgba(34,197,94,0.40)' }}>
              ▲ Heal
            </button>
            <button
              onClick={e => { e.stopPropagation(); onDetail() }}
              className="flex-1 rounded-lg font-black flex items-center justify-center"
              style={{ fontSize: fBtn, padding: desktop ? '5px 0' : '4px 0', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.25)' }}>
              ··· Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BattleUnitPairGroup({ pair, phaseId, phaseAccent, unitStates, getPhaseRel, doneUnitIds, toggleDone, onWound, onHeal, onDetail, theme, desktop }) {
  const { leader, unit } = pair
  const hasBoth = leader && unit
  return (
    <div className="flex items-stretch shrink-0 h-full gap-0" style={{ scrollSnapAlign: 'start' }}>
      {leader && (
        <BattleUnitCard
          unit={leader} unitState={unitStates[leader.id]}
          phaseId={phaseId} phaseAccent={phaseAccent}
          phaseRelevance={getPhaseRel(leader)}
          isDone={doneUnitIds.has(leader.id)} onDone={() => toggleDone(leader.id)}
          onWound={() => onWound(leader.id, unitStates[leader.id]?.currentWounds ?? leader.maxWounds)}
          onHeal={() => onHeal(leader.id, unitStates[leader.id]?.currentWounds ?? leader.maxWounds)}
          onDetail={() => onDetail(leader)}
          isLeader={true} theme={theme} desktop={desktop}
        />
      )}
      {hasBoth && (
        <div className="flex flex-col items-center justify-center w-4 shrink-0 self-stretch">
          <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${phaseAccent}60, ${phaseAccent}60, transparent)` }} />
          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${phaseAccent}22`, border: `1px solid ${phaseAccent}55` }}>
            <span style={{ fontSize: 8, color: phaseAccent }}>⚡</span>
          </div>
          <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${phaseAccent}60, ${phaseAccent}60, transparent)` }} />
        </div>
      )}
      {unit && (
        <BattleUnitCard
          unit={unit} unitState={unitStates[unit.id]}
          phaseId={phaseId} phaseAccent={phaseAccent}
          phaseRelevance={getPhaseRel(unit)}
          isDone={doneUnitIds.has(unit.id)} onDone={() => toggleDone(unit.id)}
          onWound={() => onWound(unit.id, unitStates[unit.id]?.currentWounds ?? unit.maxWounds)}
          onHeal={() => onHeal(unit.id, unitStates[unit.id]?.currentWounds ?? unit.maxWounds)}
          onDetail={() => onDetail(unit)}
          isLeader={false} theme={theme} desktop={desktop}
        />
      )}
    </div>
  )
}

// ── Main Battle Screen ────────────────────────────────────────────────────────
export default function BattleDemo({ theme, onNavigate, onPhaseChange, onStratagemUse }) {
  const store = useBattleStore()
  const {
    faction, detachmentId, selectedUnits, unitStates, opponentTags,
    cp, setCp, gainCp, setWounds, attachLeader, detachLeader,
    toggleOpponentTag, vpScores, adjustVp, warlordUnitId, setWarlord,
    opponentArmy, clearOpponentArmy, setOpponentArmy,
    detachmentState,
    cpLog, logCpGain, logCpSpend, markCpGainedForRound, cpGainedRounds,
  } = store

  const crusadeStore = useCrusadeStore()
  const isCrusadeMatch = store.crusadeBattle === true

  const [activePhaseIdx, setActivePhaseIdx] = useState(0)
  const [isYourTurn, setIsYourTurn] = useState(true)
  const [activeTab, setActiveTab] = useState('guide') // 'guide' | 'stratagems' | 'units'
  const [sourceFilter, setSourceFilter] = useState('all')
  const [showProfile, setShowProfile] = useState(false)
  const [showDebrief, setShowDebrief] = useState(false)
  const [showVp, setShowVp] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [matchupUnit, setMatchupUnit] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [turnFlash, setTurnFlash] = useState(null) // 'yours' | 'theirs' | null
  const [mathHammerWeapon, setMathHammerWeapon] = useState(null)
  const [showLayoutProto, setShowLayoutProto] = useState(false)
  const [showCpLog, setShowCpLog] = useState(false)
  const [detailUnit, setDetailUnit] = useState(null)
  const [showStratsPanel, setShowStratsPanel] = useState(false)
  const [showGuideSheet, setShowGuideSheet] = useState(false)
  const desktop = window.innerWidth >= 768
  const [activeStratIds, setActiveStratIds] = useState(new Set())
  // Ferocious Strike sub-choice: per unit, resets when fight phase changes
  const [ferocityChoices, setFerocityChoices] = useState({})
  // Per-phase done tracking — resets when phase changes
  const [doneUnitIds, setDoneUnitIds] = useState(new Set())
  React.useEffect(() => { setDoneUnitIds(new Set()) }, [activePhaseIdx])
  const setFerocityChoice = (unitId, choice) =>
    setFerocityChoices(prev => ({ ...prev, [unitId]: prev[unitId] === choice ? null : choice }))

  const totalYouVp = vpScores?.you.reduce((a, b) => a + b, 0) ?? 0
  const totalThemVp = vpScores?.them.reduce((a, b) => a + b, 0) ?? 0

  const units = selectedUnits.length > 0 ? selectedUnits : demoUnits
  // Inject leader abilities into unit.abilities so PhaseAbilityPanel surfaces them
  const enhancementAssignments = useBattleStore(s => s.enhancementAssignments)

  const augmentedUnits = units.map(u => {
    const baseUnitId = u.unitKey || u.id.replace(/_\d+$/, '')

    // Inject leader abilities
    const leaderId = unitStates[u.id]?.attachedLeaderId
    const baseLeaderId = leaderId?.replace(/_\d+$/, '')
    const leaderExtra = baseLeaderId ? getLeaderAbilities(baseLeaderId) : []

    // Inject pair-specific abilities (e.g. Ragnar leading Headtakers → War Howl + Berserk Charge)
    const pairKey = baseLeaderId ? `${baseLeaderId}_${baseUnitId}` : null
    const pairExtra = pairKey ? (leaderAbilities[pairKey]?.abilities || []) : []

    // Inject assigned enhancement as an ability
    const assignedEnhName = enhancementAssignments?.[baseUnitId]
    const assignedEnh = assignedEnhName
      ? detachment?.enhancements?.find(e => e.name === assignedEnhName)
      : null
    const enhExtra = assignedEnh
      ? [{ name: assignedEnh.name, phase: 'any', description: assignedEnh.description, isEnhancement: true }]
      : []

    // Pair abilities take precedence — deduplicate by name so same-named abilities don't show twice
    const pairNames = new Set(pairExtra.map(a => a?.name).filter(Boolean))
    const uniqueLeaderExtra = leaderExtra.filter(a => !a?.name || !pairNames.has(a.name))

    if (!uniqueLeaderExtra.length && !pairExtra.length && !enhExtra.length) return u
    return { ...u, abilities: [...(u.abilities || []), ...pairExtra, ...uniqueLeaderExtra, ...enhExtra] }
  })

  const allStratagems = getStratagems(faction || 'spacewolves', detachmentId || 'sagaOfTheGreatWolf')
  const detachment = getDetachment(faction || 'spacewolves', detachmentId || 'sagaOfTheGreatWolf')
  const activePhase = PHASES[activePhaseIdx]

  const activeUnitIds = new Set(units.map(u => u.id))
  const activePhaseEffects = PHASE_EFFECTS.filter(e => activeUnitIds.has(e.unitId))
  const hasBjorn = activeUnitIds.has('bjorn')

  const activeAdaptationBonus = (() => {
    const action = detachment?.commandPhaseAction
    if (!action || action.type !== 'pick_one') return null
    const opt = action.options?.find(o => o.id === detachmentState?.activeSelection)
    if (!opt?.mathBonus) return null
    return { ...opt.mathBonus, label: opt.mathBonusLabel, icon: opt.icon }
  })()

  // Active pick_one effect OR always-on passive effect to pass into unit cards
  const activePickEffect = useMemo(() => {
    const action = detachment?.commandPhaseAction
    if (!action) return null
    if (action.type === 'passive') return action.unitEffects || null
    if (action.type !== 'pick_one') return null
    if (!detachmentState?.activeSelection) return null
    const opt = action.options?.find(o => o.id === detachmentState.activeSelection)
    return opt?.unitEffects || null
  }, [detachment, detachmentState])

  const reactionCount = allStratagems.filter(s => s.phase === activePhase.id && s.trigger === 'reaction').length

  const phaseAbilityCount = units.reduce((sum, u) =>
    sum + (u.abilities?.filter(a => typeof a === 'object' && a.name && (a.phase === activePhase.id || a.phase === 'any'))?.length || 0)
  , 0)

  const suggestions = getSuggestions(detachmentId || 'sagaOfTheGreatWolf', opponentTags)
  const suggestedIds = new Set(suggestions.map(s => s.stratId))
  const suggestionMap = Object.fromEntries(suggestions.map(s => [s.stratId, s.reason]))
  const phaseSuggestedCount = allStratagems.filter(s =>
    s.phase === activePhase.id &&
    suggestedIds.has(s.id) &&
    !(isYourTurn && s.trigger === 'reaction') &&
    !(!isYourTurn && s.trigger === 'active')
  ).length

  const visibleStratagems = allStratagems.filter(s => {
    if (s.phase !== activePhase.id) return false
    if (isYourTurn && s.trigger === 'reaction') return false
    if (!isYourTurn && s.trigger === 'active') return false
    if (sourceFilter === 'suggested') return suggestedIds.has(s.id)
    if (sourceFilter !== 'all' && s.source !== sourceFilter) return false
    return true
  })

  const handleTurnToggle = (yourTurn) => {
    if (yourTurn === isYourTurn) return
    setTurnFlash(yourTurn ? 'yours' : 'theirs')
    setTimeout(() => {
      setIsYourTurn(yourTurn)
      setTurnFlash(null)
    }, 320)
  }

  const handleAdvanceRound = () => {
    setCurrentRound(r => Math.min(5, r + 1))
    setShowVp(false)
  }

  const handleDebriefComplete = (destination) => {
    store.resetBattle()
    setShowDebrief(false)
    if (onNavigate) onNavigate(destination === 'crusade' ? 'crusade' : 'home')
  }

  const handleActivateStrat = (strat) => {
    setActiveStratIds(prev => {
      const next = new Set(prev)
      if (next.has(strat.id)) {
        next.delete(strat.id)
        logCpGain(strat.cost, `Deactivated: ${strat.name}`, activePhase.id, currentRound)
      } else {
        next.add(strat.id)
        logCpSpend(strat.cost, `Activated: ${strat.name}`, activePhase.id, currentRound)
        onStratagemUse?.(strat.id, strat.name, strat.cost, activePhase.id, strat.effect)
      }
      return next
    })
  }

  useEffect(() => {
    setActiveStratIds(new Set())
    // Movement phase defaults to units so players immediately see who to move
    setActiveTab(PHASES[activePhaseIdx]?.id === 'movement' ? 'units' : 'guide')
  }, [activePhaseIdx, isYourTurn])

  const sourceOptions = [
    { id: 'all', label: 'All' },
    { id: 'detachment', label: 'Detachment' },
    { id: 'core', label: 'Core' },
  ]

  const phaseAccent = PHASE_ACCENT_MAP[activePhase.id] || theme.secondary

  // CP effects node — passed into PhaseGuideCard + shown in desktop left col
  const cpEffectsNode = (() => {
    const commandGains      = activePhaseEffects.filter(e => e.phase === 'command' && e.type === 'cpGain')
    const commandConditional = activePhaseEffects.filter(e => e.phase === 'command' && (e.type === 'cpConditional' || e.type === 'cpFree'))
    const fightKills        = activePhaseEffects.filter(e => e.phase === 'fight' && e.type === 'cpKill')

    if (activePhase.id === 'command' && isYourTurn && (commandGains.length > 0 || commandConditional.length > 0)) {
      const totalAutoGain = 1 + commandGains.reduce((s, e) => s + (e.amount || 1), 0)
      const alreadyGained = cpGainedRounds.includes(currentRound)
      const sources = [
        { label: 'Standard Command Phase', amount: 1 },
        ...commandGains.map(e => ({ label: `${e.unitName} — ${e.abilityName}`, amount: e.amount || 1 })),
      ]
      const handleGainAll = () => {
        if (alreadyGained) return
        sources.forEach(src => logCpGain(src.amount, src.label, 'command', currentRound))
        markCpGainedForRound(currentRound)
      }
      return (
        <div className="rounded-xl px-3 py-2.5 space-y-2"
          style={{ background: `${phaseAccent}0d`, border: `1px solid ${phaseAccent}25` }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold" style={{ color: phaseAccent }}>CP this Command Phase</p>
            {!alreadyGained ? (
              <button onClick={handleGainAll} className="text-xs px-2.5 py-1 rounded-lg font-black"
                style={{ background: phaseAccent, color: theme.bg }}>
                +{totalAutoGain} Gain All
              </button>
            ) : (
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                style={{ background: `${phaseAccent}18`, color: phaseAccent }}>✓ Gained</span>
            )}
          </div>
          {sources.map((src, i) => (
            <div key={i} className="flex items-center justify-between">
              <p className="text-xs" style={{ color: theme.textSecondary }}>+{src.amount} {src.label}</p>
            </div>
          ))}
          {commandConditional.length > 0 && (
            <div className="pt-1.5" style={{ borderTop: `1px solid ${theme.border}` }}>
              {commandConditional.map(e => (
                <div key={e.unitId} className="mb-1">
                  <p className="text-xs font-bold" style={{ color: e.type === 'cpFree' ? theme.cpColor : phaseAccent }}>
                    {e.unitName} — {e.abilityName}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{e.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (activePhase.id === 'fight' && fightKills.length > 0) {
      return (
        <div className="rounded-xl px-3 py-2.5 space-y-2"
          style={{ background: `${phaseAccent}0d`, border: `1px solid ${phaseAccent}25` }}>
          <p className="text-xs font-bold" style={{ color: phaseAccent }}>CP on kill</p>
          {fightKills.map(e => (
            <div key={e.unitId}>
              <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{e.unitName} — {e.abilityName}</p>
              <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{e.note}</p>
            </div>
          ))}
        </div>
      )
    }

    return null
  })()

  // Active detachment effect callout — shown in Guide tab
  // passive = always-on rule; pick_one = player-selected option this battle
  const activePackNode = activePickEffect && (
    <div className="mx-3 mt-2 rounded-2xl overflow-hidden shrink-0"
      style={{ background: theme.surface, border: `1px solid ${activePickEffect.badgeColor}40` }}>
      <div className="px-3 py-2 flex items-center gap-2"
        style={{ background: `${activePickEffect.badgeColor}12`, borderBottom: `1px solid ${activePickEffect.badgeColor}25` }}>
        <GiLightningTrio size={11} color={activePickEffect.badgeColor} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: activePickEffect.badgeColor }}>
          {detachment?.commandPhaseAction?.type === 'passive'
            ? `Detachment Rule — ${activePickEffect.badge}`
            : `Active — ${activePickEffect.badge}`}
        </p>
      </div>
      <p className="px-3 py-2 text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
        {activePickEffect.why}
      </p>
    </div>
  )

  // Shared content blocks — referenced by both mobile tabs and desktop columns
  const cpLogPanel = (
    <AnimatePresence>
      {showCpLog && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden mx-3 mt-2 rounded-2xl border shrink-0"
          style={{ background: theme.surface, borderColor: theme.border }}>
          <div className="px-3 py-2 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${theme.border}`, background: theme.surfaceHigh }}>
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: theme.textSecondary }}>CP History</p>
            <button onClick={() => setShowCpLog(false)} className="text-xs" style={{ color: theme.textSecondary }}>✕</button>
          </div>
          {cpLog.length === 0 ? (
            <p className="px-3 py-3 text-xs text-center" style={{ color: theme.textSecondary }}>No CP changes yet</p>
          ) : (
            <div className="max-h-48 overflow-y-auto divide-y" style={{ borderColor: theme.border }}>
              {cpLog.map(entry => (
                <div key={entry.id} className="px-3 py-2 flex items-center gap-2">
                  <span className="text-sm shrink-0" style={{ color: entry.type === 'gain' ? '#22c55e' : theme.hpLow }}>
                    {entry.type === 'gain' ? '+' : '−'}{entry.amount}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-tight truncate" style={{ color: theme.textPrimary }}>{entry.reason}</p>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      Round {entry.round} · {entry.phase} · {entry.cpBefore} → {entry.cpAfter} CP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )

  const vpStripMobile = (
    <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowVp(true)}
      className="mx-3 mt-2.5 rounded-2xl border flex items-center shrink-0 overflow-hidden"
      style={{ background: theme.surface, borderColor: theme.border }}>
      <div className="flex-1 py-2.5 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>You</p>
        <motion.p key={totalYouVp} initial={{ scale: 1.25 }} animate={{ scale: 1 }}
          className="text-xl font-black leading-none mt-0.5" style={{ color: theme.hpFull }}>{totalYouVp}</motion.p>
      </div>
      <div className="py-2.5 px-4 border-x text-center" style={{ borderColor: theme.border }}>
        <p className="text-xs" style={{ color: theme.textSecondary }}>Round</p>
        <p className="text-lg font-black leading-none mt-0.5" style={{ color: theme.textPrimary }}>{currentRound}/5</p>
      </div>
      <div className="flex-1 py-2.5 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Them</p>
        <motion.p key={totalThemVp} initial={{ scale: 1.25 }} animate={{ scale: 1 }}
          className="text-xl font-black leading-none mt-0.5" style={{ color: theme.hpLow }}>{totalThemVp}</motion.p>
      </div>
    </motion.button>
  )

  const stratagemFilterBar = (
    <div className="flex gap-2 px-3 mt-2.5 shrink-0 flex-wrap">
      {sourceOptions.map(opt => (
        <button key={opt.id} onClick={() => setSourceFilter(opt.id)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          style={{
            background: sourceFilter === opt.id ? theme.surfaceHigh : 'transparent',
            color: sourceFilter === opt.id ? theme.textPrimary : 'rgba(255,255,255,0.55)',
            border: `1px solid ${sourceFilter === opt.id ? theme.border : 'rgba(255,255,255,0.14)'}`,
          }}>
          {opt.label}
        </button>
      ))}
      {opponentTags.length > 0 && phaseSuggestedCount > 0 && (
        <button
          onClick={() => setSourceFilter(f => f === 'suggested' ? 'all' : 'suggested')}
          className="ml-auto px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          style={{
            background: sourceFilter === 'suggested' ? `${theme.secondary}22` : `${theme.secondary}10`,
            color: theme.secondary,
            border: `1px solid ${sourceFilter === 'suggested' ? theme.secondary : theme.secondary + '44'}`,
          }}>
          💡 {phaseSuggestedCount} suggested
        </button>
      )}
    </div>
  )

  const stratagemList = (
    <div className="px-3 pb-2 mt-2 space-y-2">
      {visibleStratagems.length === 0 ? (
        <motion.div {...FADE_IN} className="rounded-2xl border p-5 text-center"
          style={{ background: theme.stratBg, borderColor: theme.stratBorder }}>
          <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
            {isYourTurn ? 'No stratagems for this phase.' : 'No reaction stratagems this phase.'}
          </p>
        </motion.div>
      ) : (
        visibleStratagems.map((s, i) => (
          <StratCard key={s.id} strat={s} theme={theme}
            highlighted={suggestedIds.has(s.id)}
            highlightReason={suggestionMap[s.id]}
            cp={cp}
            onActivate={handleActivateStrat}
            activeStratIds={activeStratIds}
            motionProps={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.04, duration: 0.22 },
            }}
          />
        ))
      )}
    </div>
  )

  const sortedUnits = [...units].sort((a, b) => {
    const sa = getPhaseRelevance(a, activePhase.id).level === 'suppress' ? 1 : 0
    const sb = getPhaseRelevance(b, activePhase.id).level === 'suppress' ? 1 : 0
    return sa - sb
  })

  const unitsList = (
    <div className="px-3 mt-2 space-y-2 pb-2">
      <PhaseContextRow units={units} phaseId={activePhase.id} abilityCount={phaseAbilityCount} theme={theme} />
      <FactionEdge theme={theme} />
      <p className="text-xs font-bold tracking-widest uppercase px-1 pt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Your Units
      </p>
      {sortedUnits.map((u, i) => (
        <UnitCard key={u.id} unit={u}
          unitState={unitStates[u.id]}
          attachedLeaderId={unitStates[u.id]?.attachedLeaderId ?? null}
          onAttach={(uid, lid) => attachLeader(uid, lid)}
          onDetach={(uid) => detachLeader(uid)}
          onWound={(id, cur) => setWounds(id, cur - 1)}
          onHeal={(id, cur) => setWounds(id, cur + 1)}
          onToggleWarlord={setWarlord}
          isWarlord={warlordUnitId === u.id}
          activePhase={activePhase.id}
          activePickEffect={activePickEffect}
          phaseRelevance={getPhaseRelevance(u, activePhase.id)}
          ferocityChoice={ferocityChoices[u.id] ?? null}
          onFerocityChoice={(choice) => setFerocityChoice(u.id, choice)}
          isDone={doneUnitIds.has(u.id)}
          onMarkDone={() => setDoneUnitIds(prev => {
            const next = new Set(prev)
            next.has(u.id) ? next.delete(u.id) : next.add(u.id)
            return next
          })}
          theme={theme}
          onMatchup={opponentArmy?.units?.length > 0 ? () => setMatchupUnit(u) : undefined}
          onCalcWeapon={setMathHammerWeapon}
          motionProps={{
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.05, duration: 0.22 },
          }}
        />
      ))}
      {opponentArmy?.units?.length > 0 ? (
        <>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-px flex-1" style={{ background: `${theme.hpLow}44` }} />
            <p className="text-xs font-bold tracking-widest uppercase px-2" style={{ color: theme.hpLow }}>Opponent Army</p>
            <div className="h-px flex-1" style={{ background: `${theme.hpLow}44` }} />
            <button onClick={clearOpponentArmy}
              className="text-xs px-1.5 py-0.5 rounded-lg font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>✕</button>
          </div>
          {opponentArmy.units.map((u, i) => (
            <OpponentUnitCard key={u.id} unit={u} theme={theme}
              onMatchup={() => setMatchupUnit({ ...units[0], _asDefender: true, _opponentUnit: u })}
              motionProps={{
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.04, duration: 0.22 },
              }}
            />
          ))}
        </>
      ) : (
        <div className="space-y-2 mt-1">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowShare(true)}
            className="w-full rounded-2xl border p-3.5 text-center"
            style={{ background: theme.stratBg, borderColor: theme.stratBorder, borderStyle: 'dashed' }}>
            <p className="text-sm font-bold" style={{ color: theme.textSecondary }}>🔗 Link Opponent's Army</p>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary, opacity: 0.7 }}>Share your link — they send one back</p>
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowImport(true)}
            className="w-full rounded-2xl border p-3.5 text-center"
            style={{ background: theme.stratBg, borderColor: theme.stratBorder, borderStyle: 'dashed' }}>
            <p className="text-sm font-bold" style={{ color: theme.textSecondary }}>📋 Paste Opponent's List</p>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary, opacity: 0.7 }}>Import from New Recruit, BattleScribe, etc.</p>
          </motion.button>
        </div>
      )}
    </div>
  )

  const pairs = buildPairs(augmentedUnits, unitStates)

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: theme.bg, fontFamily: theme.font }}>

      {/* Turn flash overlay */}
      <AnimatePresence>
        {turnFlash && (
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, times: [0, 0.3, 1] }}
            style={{ background: turnFlash === 'yours' ? theme.secondary : theme.hpLow }}
          />
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: theme.border }}>
          <button onClick={() => handleTurnToggle(true)}
            className="px-3 py-1.5 text-xs font-bold transition-all"
            style={{ background: isYourTurn ? theme.secondary : 'transparent', color: isYourTurn ? theme.bg : theme.textSecondary }}>
            Your Turn
          </button>
          <button onClick={() => handleTurnToggle(false)}
            className="px-3 py-1.5 text-xs font-bold transition-all"
            style={{ background: !isYourTurn ? theme.hpLow : 'transparent', color: !isYourTurn ? '#fff' : theme.textSecondary }}>
            Their Turn
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>CP</span>
            <span className="text-sm font-black" style={{ color: cp > 0 ? theme.secondary : theme.textSecondary }}>{cp}</span>
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <motion.div key={i}
                  initial={false}
                  animate={{ scale: i < Math.min(cp, 6) ? 1 : 0.7, opacity: i < Math.min(cp, 6) ? 1 : 0.35 }}
                  transition={{ duration: 0.2 }}
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: i < Math.min(cp, 6) ? (hasBjorn && i === 1 ? '#3b82f6' : theme.secondary) : theme.border }}
                />
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => gainCp(1)}
              className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>+</motion.button>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setCp(Math.max(0, cp - 1))}
              className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>−</motion.button>
            <button onClick={() => setShowCpLog(s => !s)}
              className="w-5 h-5 rounded text-xs flex items-center justify-center"
              title="CP history"
              style={{ background: showCpLog ? `${theme.secondary}22` : theme.surfaceHigh, color: showCpLog ? theme.secondary : theme.textSecondary, border: `1px solid ${showCpLog ? theme.secondary + '44' : theme.border}` }}>
              📋
            </button>
          </div>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setShowShare(true)}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
            style={{
              background: opponentArmy ? `${theme.secondary}22` : theme.surfaceHigh,
              border: `1px solid ${opponentArmy ? theme.secondary : theme.border}`,
            }}
            title="Share army">
            🔗
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfile(true)}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
            style={{
              background: opponentTags.length > 0 ? `${theme.secondary}22` : theme.surfaceHigh,
              border: `1px solid ${opponentTags.length > 0 ? theme.secondary : theme.border}`,
            }}>
            🎯
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }}
            onClick={() => setShowDebrief(true)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
            End
          </motion.button>
        </div>
      </div>

      {/* ── New layout: Intel top / Card gallery bottom ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <style>{PULSE_STYLE}</style>

        {/* ── INTEL ZONE ── */}
        <div className="shrink-0" style={{ borderBottom: `1px solid ${phaseAccent}30` }}>
          {cpLogPanel}

          {/* Compact VP + CP row */}
          <div className="flex items-center gap-2 px-3 pt-2">
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowVp(true)}
              className="flex items-center gap-3 rounded-xl px-3 py-1.5 border flex-1"
              style={{ background: theme.surface, borderColor: theme.border }}>
              <span className="text-base font-black" style={{ color: '#22c55e' }}>{totalYouVp}</span>
              <span className="flex-1 text-center text-xs font-bold" style={{ color: theme.textSecondary }}>
                Rd {currentRound}/5
              </span>
              <span className="text-base font-black" style={{ color: '#ef4444' }}>{totalThemVp}</span>
            </motion.button>
          </div>

          {activePackNode}
          {cpEffectsNode && activePhase.id === 'command' && (
            <div className="px-3 pt-2">{cpEffectsNode}</div>
          )}
          <PhaseAbilityPanel units={augmentedUnits} activePhase={activePhase} theme={theme} onUnitClick={setDetailUnit} />

          {/* Quick action buttons */}
          <div className="flex gap-2 px-3 py-2">
            <button onClick={() => setShowGuideSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-1 justify-center"
              style={{ background: `${phaseAccent}14`, color: phaseAccent, border: `1px solid ${phaseAccent}40` }}>
              <PhaseIcon phase={activePhase.id} size={12} color={phaseAccent} />
              Phase Guide
            </button>
            <button onClick={() => setShowStratsPanel(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-1 justify-center"
              style={{ background: `${theme.secondary}14`, color: theme.secondary, border: `1px solid ${theme.secondary}40` }}>
              ⚡ Stratagems
              {visibleStratagems.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full font-black leading-none"
                  style={{ background: theme.secondary, color: theme.bg, fontSize: 9 }}>
                  {visibleStratagems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── CARD GALLERY ── */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div
            className="flex-1 flex items-stretch overflow-x-auto overflow-y-hidden px-3 gap-3 py-3"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {pairs.map(pair => (
              <BattleUnitPairGroup
                key={pair.id}
                pair={pair}
                phaseId={activePhase.id}
                phaseAccent={phaseAccent}
                unitStates={unitStates}
                getPhaseRel={u => getPhaseRelevance(u, activePhase.id)}
                doneUnitIds={doneUnitIds}
                toggleDone={id => setDoneUnitIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })}
                onWound={(id, cur) => setWounds(id, cur - 1)}
                onHeal={(id, cur) => setWounds(id, cur + 1)}
                onDetail={setDetailUnit}
                theme={theme}
                desktop={desktop}
              />
            ))}
            <div className="w-3 shrink-0" />
          </div>
          <p className="text-center shrink-0 pb-1"
            style={{ fontSize: 9, color: theme.textSecondary, opacity: 0.45 }}>
            ← scroll to see all units →
          </p>
        </div>
      </div>

      {/* ── Phase nav — phase-colored active state ── */}
      <div className="border-t grid grid-cols-5 shrink-0" style={{ background: theme.navBg, borderColor: theme.border }}>
        {PHASES.map((phase, i) => {
          const isActive = i === activePhaseIdx
          const isDone   = i < activePhaseIdx
          const accent   = PHASE_ACCENT_MAP[phase.id] || theme.secondary
          return (
            <motion.button key={phase.id} onClick={() => { setActivePhaseIdx(i); onPhaseChange?.(i) }}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center justify-center py-3 gap-1 relative"
              style={{
                background: isActive ? `${accent}14` : 'transparent',
                borderTop: isActive ? `2px solid ${accent}` : '2px solid transparent',
              }}>
              <PhaseIcon phase={phase.id} size={18}
                color={isActive ? accent : theme.textSecondary}
                style={{ opacity: isDone ? 0.35 : 1 }} />
              <span className="text-xs font-bold tracking-wide"
                style={{ color: isActive ? accent : theme.textSecondary, opacity: isDone ? 0.35 : 1 }}>
                {phase.short}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showVp && (
          <VPModal vpScores={vpScores} currentRound={currentRound}
            onAdjust={adjustVp} onAdvanceRound={handleAdvanceRound}
            onClose={() => setShowVp(false)} theme={theme} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfile && (
          <BattleProfileModal opponentTags={opponentTags} onToggleTag={toggleOpponentTag}
            onClose={() => setShowProfile(false)} theme={theme} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDebrief && (
          <PostBattleDebrief units={units} faction={faction} theme={theme}
            isCrusadeMatch={isCrusadeMatch}
            onComplete={handleDebriefComplete} onCancel={() => setShowDebrief(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShare && faction && (
          <ShareArmySheet
            faction={faction}
            detachmentId={detachmentId}
            unitIds={units.map(u => u.id)}
            onClose={() => setShowShare(false)}
            theme={theme}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {matchupUnit && opponentArmy?.units?.length > 0 && (
          <MatchupSheet
            attacker={matchupUnit}
            opponentUnits={opponentArmy.units}
            stratagems={allStratagems}
            activePhase={activePhase.id}
            onClose={() => setMatchupUnit(null)}
            theme={theme}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showImport && (
          <ImportListSheet
            theme={theme}
            onLoadAsMyArmy={() => {}}
            onLoadAsOpponent={(parsed) => {
              const units = parsed.resolvedUnits.map(e => e.resolved)
              setOpponentArmy({
                faction: parsed.faction,
                detachmentId: parsed.detachment?.id || null,
                units,
                detachment: parsed.detachment || null,
              })
              setShowImport(false)
            }}
            onClose={() => setShowImport(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mathHammerWeapon && (
          <MathHammerSheet
            key={mathHammerWeapon.name}
            weapon={mathHammerWeapon}
            onClose={() => setMathHammerWeapon(null)}
            theme={theme}
            detachmentBonus={activeAdaptationBonus}
          />
        )}
      </AnimatePresence>

      {/* ── Phase Guide Sheet ── */}
      <AnimatePresence>
        {showGuideSheet && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowGuideSheet(false)}>
            <motion.div
              className="w-full max-w-lg rounded-2xl flex flex-col"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex-1 overflow-y-auto pb-4">
                <PhaseGuideCard activePhase={activePhase} isYourTurn={isYourTurn} theme={theme} cpEffectsNode={cpEffectsNode} />
                {activePackNode}
                <DetachmentRulePanel detachment={detachment} activePhase={activePhase} theme={theme}
                  onceBuffAvailable={units.some(u => u.id === 'loganGrimnar')} />
              </div>
              <div className="px-5 pb-5 pt-3 shrink-0 border-t" style={{ borderColor: theme.border }}>
                <button onClick={() => setShowGuideSheet(false)}
                  className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stratagems Sheet ── */}
      <AnimatePresence>
        {showStratsPanel && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowStratsPanel(false)}>
            <motion.div
              className="w-full max-w-lg rounded-2xl flex flex-col"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}>
              <div className="px-5 pt-5 pb-3 shrink-0">
                <h2 className="font-black text-base" style={{ color: theme.textPrimary }}>
                  Stratagems — {activePhase.label}
                </h2>
                {stratagemFilterBar}
              </div>
              <div className="flex-1 overflow-y-auto pb-4">
                {stratagemList}
              </div>
              <div className="px-5 pb-5 pt-3 shrink-0 border-t" style={{ borderColor: theme.border }}>
                <button onClick={() => setShowStratsPanel(false)}
                  className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Unit Detail Sheet ── */}
      <AnimatePresence>
        {detailUnit && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setDetailUnit(null)}>
            <motion.div
              className="w-full max-w-lg rounded-2xl flex flex-col"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}>
              <div className="px-5 pt-5 pb-2 shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-base" style={{ color: theme.textPrimary }}>{detailUnit.name}</p>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>{formatCategory(detailUnit.type || detailUnit.category)}</p>
                  </div>
                  <button onClick={() => setDetailUnit(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-8">
                <UnitCard
                  unit={detailUnit}
                  unitState={unitStates[detailUnit.id]}
                  attachedLeaderId={unitStates[detailUnit.id]?.attachedLeaderId ?? null}
                  onAttach={(uid, lid) => attachLeader(uid, lid)}
                  onDetach={(uid) => detachLeader(uid)}
                  onWound={(id, cur) => setWounds(id, cur - 1)}
                  onHeal={(id, cur) => setWounds(id, cur + 1)}
                  onToggleWarlord={setWarlord}
                  isWarlord={warlordUnitId === detailUnit.id}
                  activePhase={activePhase.id}
                  activePickEffect={activePickEffect}
                  phaseRelevance={getPhaseRelevance(detailUnit, activePhase.id)}
                  ferocityChoice={ferocityChoices[detailUnit.id] ?? null}
                  onFerocityChoice={(choice) => setFerocityChoice(detailUnit.id, choice)}
                  isDone={doneUnitIds.has(detailUnit.id)}
                  onMarkDone={() => setDoneUnitIds(prev => {
                    const next = new Set(prev); next.has(detailUnit.id) ? next.delete(detailUnit.id) : next.add(detailUnit.id); return next
                  })}
                  theme={theme}
                  onMatchup={opponentArmy?.units?.length > 0 ? () => { setDetailUnit(null); setTimeout(() => setMatchupUnit(detailUnit), 100) } : undefined}
                  onCalcWeapon={setMathHammerWeapon}
                  motionProps={{}}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
