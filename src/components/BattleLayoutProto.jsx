// Battle screen redesign prototype — "Card Mode"
// Trading-card layout: leader + unit shown as linked pairs in a horizontal scroll.
// Top: slim phase command bar. Middle: the cards. Bottom: phase nav.
// Eduardo approves this, then we rebuild BattleDemo to match.

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhaseIcon } from './GameIcon'
import { PHASES } from '../data/editionConfig'

const ACCENT = {
  command: '#c9a84c', movement: '#22c55e', shooting: '#60a5fa',
  charge: '#f97316', fight: '#ef4444',
}

// Real art URLs pulled from units.js so the prototype looks like the real thing
const PAIRS = [
  {
    id: 'pair-ragnar',
    leader: {
      id: 'ragnar', name: 'Ragnar Blackmane', role: 'Epic Hero',
      M: '6"', T: 4, Sv: '3+', OC: 1, W: 5, maxW: 5,
      rangedA: 1, meleeA: 6,
      artUrl: 'https://assets.warhammer-community.com/articles/521ce86b-b8b1-4599-bfe8-38167ea01f65/idaz7xmwcxfwoehr.jpg',
      artPosition: 'center top',
      commandAbility: null,
      movementAbility: null,
      shootingAbility: 'Bolt Pistol — 1 attack, 12", S4 AP0',
      chargeAbility: 'Battle-lust — +3" to charge, advance & charge eligible',
      fightAbility: 'Wolf-kin — fights first after charging this turn',
    },
    unit: {
      id: 'bloodclaws', name: 'Blood Claws', role: 'Infantry · 10 models',
      M: '6"', T: 4, Sv: '3+', OC: 2, W: 10, maxW: 10,
      rangedA: 1, meleeA: 3,
      artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101434_SpaceWolvesBloodClaws1.jpg?fm=webp&w=892&h=920',
      artPosition: 'center center',
      commandAbility: null,
      movementAbility: 'Push forward — advance toward the enemy to close the gap',
      shootingAbility: 'Bolt Pistols — 1 attack each, 12" range, S4 AP0',
      chargeAbility: null,
      fightAbility: 'Savage Fighter — +1 Attack on all melee weapons when charged this turn',
    },
  },
  {
    id: 'pair-logan',
    leader: {
      id: 'loganGrimnar', name: 'Logan Grimnar', role: 'Legendary Hero',
      M: '6"', T: 4, Sv: '2+', OC: 1, W: 6, maxW: 6,
      rangedA: 0, meleeA: 5,
      artUrl: 'https://assets.warhammer-community.com/grotmas10-dec10-image1_wide-opfvgxejgg.jpg',
      artPosition: 'center center',
      commandAbility: 'High King of Fenris — gain 1 CP at start of your Command phase',
      movementAbility: null,
      shootingAbility: null,
      chargeAbility: null,
      fightAbility: 'Guile of the Wolf — re-roll hit rolls for SW units within 6"',
    },
    unit: null, // Logan leads solo (no attached squad in this demo)
  },
  {
    id: 'pair-wolfpriest',
    leader: {
      id: 'wolfPriest', name: 'Wolf Priest', role: 'Character',
      M: '6"', T: 4, Sv: '3+', OC: 1, W: 4, maxW: 4,
      rangedA: 1, meleeA: 3,
      artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101435_SpaceWolvesWolfPriest1.jpg?fm=webp&w=892&h=920',
      artPosition: 'center center',
      commandAbility: null,
      movementAbility: null,
      shootingAbility: null,
      chargeAbility: null,
      fightAbility: 'Healing Balms — once per battle, restore D3 lost wounds to this unit',
    },
    unit: {
      id: 'greyHunters', name: 'Grey Hunters', role: 'Battleline · 10 models',
      M: '6"', T: 4, Sv: '3+', OC: 2, W: 10, maxW: 10,
      rangedA: 2, meleeA: 2,
      artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101433_SpaceWolvesGreyHuntersSquad1.jpg?fm=webp&w=892&h=920',
      artPosition: 'center center',
      commandAbility: null,
      movementAbility: null,
      shootingAbility: 'Bolt Rifles — 2 attacks, 24", Rapid Fire, S4 AP-1',
      chargeAbility: null,
      fightAbility: null,
    },
  },
  {
    id: 'pair-terminators',
    leader: null,
    unit: {
      id: 'wolfGuardTerminators', name: 'Wolf Guard Terminators', role: 'Infantry · 5 models',
      M: '5"', T: 5, Sv: '2+', OC: 2, W: 5, maxW: 5,
      rangedA: 2, meleeA: 4,
      artUrl: 'https://assets.warhammer-community.com/carousel1-21drmyig74.png',
      artPosition: 'center center',
      commandAbility: null,
      movementAbility: null,
      shootingAbility: 'Storm Bolters — 2 attacks, Rapid Fire, S4 AP0',
      chargeAbility: null,
      fightAbility: 'Rugged Resilience — 6+ Feel No Pain save in Fight phase',
    },
  },
]

function getPhaseAbility(unit, phaseId) {
  if (!unit) return null
  if (phaseId === 'command')  return unit.commandAbility
  if (phaseId === 'movement') return unit.movementAbility
  if (phaseId === 'shooting') return unit.shootingAbility
  if (phaseId === 'charge')   return unit.chargeAbility
  if (phaseId === 'fight')    return unit.fightAbility
  return null
}

function getAttacks(unit, phaseId) {
  if (!unit) return null
  if (phaseId === 'shooting') return unit.rangedA > 0 ? unit.rangedA : null
  if (phaseId === 'fight' || phaseId === 'charge') return unit.meleeA > 0 ? unit.meleeA : null
  return null
}

function isActive(unit, phaseId) {
  if (!unit) return false
  if (phaseId === 'shooting') return unit.rangedA > 0
  if (phaseId === 'fight' || phaseId === 'charge') return unit.meleeA > 0
  return true
}

// Phase command bar tips — tailored to the actual demo army
const SMART_TIPS = {
  command:  'Logan: High King of Fenris → gain 1 CP now · then pick your Hunting Pack',
  movement: 'Ragnar + Blood Claws: advance 6" + D6 · Terminators hold the line at 5"',
  shooting: 'Grey Hunters: Rapid Fire at 12" = 4 attacks each · Blood Claws Bolt Pistols at 12"',
  charge:   'Ragnar: Battle-lust adds 3" free · Blood Claws follow his charge in',
  fight:    'Ragnar fights first (Wolf-kin) · Logan\'s Guile of the Wolf re-rolls hits within 6"',
}

const PHASE_STEPS = {
  command:  ['Gain 1 CP', 'Logan +1 CP (Aura)', 'Pick Hunting Pack', 'Use Abilities'],
  movement: ['Move all units', 'Ragnar → advance', 'Blood Claws → advance', 'Hold Terminators'],
  shooting: ['Pick target', 'Roll to Hit', 'Roll to Wound', 'Opponent saves'],
  charge:   ['Declare charges', 'Roll 2D6', 'Ragnar +3" free', 'Pile in on success'],
  fight:    ['Ragnar first', 'Logan aura active', 'Roll to Hit', 'Roll to Wound'],
}

// ── Single battle card ────────────────────────────────────────────────────────

function BattleCard({ unit, phaseId, accent, theme, isDone, onDone, isLeader, cardHeight }) {
  const [expanded, setExpanded] = useState(false)
  if (!unit) return null

  const active     = isActive(unit, phaseId)
  const attacks    = getAttacks(unit, phaseId)
  const ability    = getPhaseAbility(unit, phaseId)
  const showAttack = attacks !== null && active && !isDone
  const pulseMov   = phaseId === 'movement' && active && !isDone

  const cardWidth  = isLeader ? 152 : 172
  const borderCol  = isDone
    ? `${theme.border}88`
    : !active ? theme.border
    : ability  ? `${accent}70`
    : `${accent}45`

  return (
    <div
      className="relative rounded-2xl overflow-hidden shrink-0 flex flex-col"
      style={{
        width: cardWidth,
        height: cardHeight,
        border: `1.5px solid ${borderCol}`,
        opacity: isDone ? 0.45 : !active ? 0.32 : 1,
        boxShadow: active && !isDone && ability
          ? `0 0 20px ${accent}30, 0 4px 16px rgba(0,0,0,0.5)`
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'opacity 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Portrait */}
      <div className="absolute inset-0" style={{
        backgroundImage:    `url(${unit.artUrl})`,
        backgroundSize:     'cover',
        backgroundPosition: unit.artPosition || 'center center',
      }} />

      {/* Gradient — heavy at bottom for legibility */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(
          to bottom,
          rgba(0,0,0,0.08) 0%,
          rgba(0,0,0,0.10) 30%,
          rgba(0,0,0,0.72) 58%,
          rgba(0,0,0,0.96) 100%
        )`,
      }} />

      {/* ── Top overlays ── */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between z-10">
        {/* HP badge */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.65)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.45)', backdropFilter: 'blur(4px)' }}>
            {unit.W}/{unit.maxW}
          </span>
          {isLeader && (
            <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase"
              style={{ background: `${accent}cc`, color: '#000' }}>
              Leader
            </span>
          )}
        </div>

        {/* Done toggle */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={e => { e.stopPropagation(); onDone() }}
          className="text-[10px] font-black px-2 py-0.5 rounded-full"
          style={{
            background: isDone ? 'rgba(34,197,94,0.45)' : 'rgba(0,0,0,0.55)',
            color:      isDone ? '#4ade80' : 'rgba(255,255,255,0.65)',
            border:     `1px solid ${isDone ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.2)'}`,
            backdropFilter: 'blur(4px)',
          }}
        >
          {isDone ? '✓ Done' : '○'}
        </motion.button>
      </div>

      {/* ── Phase attack tile (mid-card, right edge) ── */}
      {showAttack && (
        <div className="absolute z-10" style={{ top: '36%', right: 10 }}>
          <motion.div
            className="flex flex-col items-center rounded-xl px-2 py-1.5"
            style={{
              background: `${accent}e0`,
              border:     `1.5px solid ${accent}`,
              backdropFilter: 'blur(6px)',
              boxShadow:  `0 0 12px ${accent}80`,
            }}
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ repeat: Infinity, duration: 1.0 }}
          >
            <span className="font-black leading-none" style={{ fontSize: 22, color: '#000' }}>{attacks}</span>
            <span style={{ fontSize: 7, fontWeight: 900, color: '#000', letterSpacing: '0.08em' }}>ATK</span>
          </motion.div>
        </div>
      )}

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 pt-2">

        {/* Name + role */}
        <p className="font-black leading-tight text-white" style={{ fontSize: 12 }}>{unit.name}</p>
        <p className="font-bold uppercase tracking-wide mt-0.5" style={{ fontSize: 8, color: `${accent}dd` }}>
          {unit.role}
        </p>

        {/* Stats row */}
        <div className="flex gap-2.5 mt-1.5">
          {[['M', unit.M, pulseMov], ['T', unit.T, false], ['SV', unit.Sv, false]].map(([l, v, pulse]) => (
            <div key={l} className="flex flex-col items-center">
              <motion.span
                className="font-black leading-none"
                style={{ fontSize: 11, color: pulse ? accent : 'white' }}
                animate={pulse ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
                transition={pulse ? { repeat: Infinity, duration: 1.0 } : {}}>
                {v}
              </motion.span>
              <span style={{ fontSize: 7, fontWeight: 800, color: pulse ? `${accent}cc` : 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Phase ability — inline glowing badge */}
        {ability && active && !isDone && (
          <div className="mt-1.5 rounded-lg px-2 py-1" style={{ background: `${accent}28`, border: `1px solid ${accent}55` }}>
            <p style={{ fontSize: 9, color: accent, lineHeight: 1.35 }}>⚡ {ability}</p>
          </div>
        )}

        {/* HP bar */}
        <div className="mt-2 w-full rounded-full overflow-hidden" style={{ height: 3, background: 'rgba(255,255,255,0.18)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background: unit.W / unit.maxW > 0.5 ? '#22c55e' : unit.W / unit.maxW > 0.25 ? '#f59e0b' : '#ef4444' }}
            initial={false} animate={{ width: `${(unit.W / unit.maxW) * 100}%` }} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-1 mt-2">
          <button className="flex-1 py-1.5 rounded-lg font-black text-center"
            style={{ fontSize: 11, background: 'rgba(34,197,94,0.22)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)' }}>
            +
          </button>
          <button className="flex-1 py-1.5 rounded-lg font-black text-center"
            style={{ fontSize: 11, background: 'rgba(239,68,68,0.22)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' }}>
            −
          </button>
          <button className="flex-1 py-1.5 rounded-lg font-black text-center"
            style={{ fontSize: 11, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.18)' }}>
            ⚔
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Leader + unit pair group ──────────────────────────────────────────────────

function PairGroup({ pair, phaseId, accent, theme, doneIds, toggleDone, cardHeight }) {
  const { leader, unit } = pair
  const hasBoth = leader && unit

  return (
    <div className="flex items-stretch shrink-0 gap-0">
      {/* Leader card */}
      {leader && (
        <BattleCard
          unit={leader} phaseId={phaseId} accent={accent} theme={theme}
          isDone={doneIds.has(leader.id)} onDone={() => toggleDone(leader.id)}
          isLeader={true} cardHeight={cardHeight}
        />
      )}

      {/* Connector between leader and unit */}
      {hasBoth && (
        <div className="flex flex-col items-center justify-center w-4 shrink-0 gap-0 self-stretch">
          <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${accent}60, ${accent}60, transparent)` }} />
          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${accent}22`, border: `1px solid ${accent}60` }}>
            <span style={{ fontSize: 8, color: accent }}>⚡</span>
          </div>
          <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${accent}60, ${accent}60, transparent)` }} />
        </div>
      )}

      {/* Unit card */}
      {unit && (
        <BattleCard
          unit={unit} phaseId={phaseId} accent={accent} theme={theme}
          isDone={doneIds.has(unit.id)} onDone={() => toggleDone(unit.id)}
          isLeader={false} cardHeight={cardHeight}
        />
      )}
    </div>
  )
}

// ── Phase command bar ─────────────────────────────────────────────────────────

function PhaseCommandBar({ phase, accent, theme, showStrats, onToggleStrats }) {
  const phaseId = phase.id
  const steps   = PHASE_STEPS[phaseId] || []
  const tip     = SMART_TIPS[phaseId] || ''

  return (
    <div className="shrink-0 mx-3 mt-3 rounded-2xl overflow-hidden border"
      style={{ background: `${accent}0c`, borderColor: `${accent}40` }}>

      {/* Header row */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ borderBottom: `1px solid ${accent}25` }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}>
          <PhaseIcon phase={phaseId} size={20} color={accent} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm leading-none" style={{ color: theme.textPrimary }}>{phase.label} Phase</p>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: accent }}>{tip}</p>
        </div>
        <button
          onClick={onToggleStrats}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black shrink-0 transition-all"
          style={{
            background: showStrats ? accent : `${accent}22`,
            color:      showStrats ? '#000' : accent,
            border:     `1px solid ${accent}55`,
          }}>
          ⚡ Strats {showStrats ? '▾' : '▴'}
        </button>
      </div>

      {/* Step chips */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto">
        {steps.map((s, i) => (
          <span key={i}
            className="whitespace-nowrap text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
            {i + 1}. {s}
          </span>
        ))}
      </div>

      {/* Strats pull-down */}
      <AnimatePresence>
        {showStrats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
            className="overflow-hidden">
            <div className="px-3 pb-3 pt-1 space-y-1.5" style={{ borderTop: `1px solid ${accent}20` }}>
              {[
                { name: 'Insane Bravery', cost: '1 CP', desc: 'Ignore Battleshock test this phase.' },
                { name: 'Counter-Offensive', cost: '2 CP', desc: 'Fight with a unit that has not yet fought.' },
                { name: 'Adaptive Strategy', cost: '1 CP', desc: 'Swap one secondary objective at the end of the round.' },
              ].map(s => (
                <div key={s.name} className="flex items-start gap-2 rounded-xl px-3 py-2"
                  style={{ background: `${accent}0e`, border: `1px solid ${accent}25` }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold leading-tight" style={{ color: theme.textPrimary }}>{s.name}</p>
                    <p style={{ fontSize: 9, color: theme.textSecondary, marginTop: 2 }}>{s.desc}</p>
                  </div>
                  <span className="text-xs font-black shrink-0 px-2 py-0.5 rounded-full"
                    style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.border}` }}>
                    {s.cost}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Phase nav ─────────────────────────────────────────────────────────────────

function PhaseNav({ phaseId, theme }) {
  const curIdx = PHASES.findIndex(p => p.id === phaseId)
  return (
    <div className="flex border-t shrink-0" style={{ borderColor: theme.border, background: theme.surface }}>
      {PHASES.map((p, i) => {
        const a       = ACCENT[p.id]
        const isAct   = p.id === phaseId
        const isPast  = i < curIdx
        const opacity = isAct ? 1 : isPast ? 0.65 : 0.5
        return (
          <div key={p.id} className="flex-1 flex flex-col items-center py-2.5 gap-0.5 relative"
            style={{ borderTop: isAct ? `2px solid ${a}` : '2px solid transparent', background: isAct ? `${a}12` : 'transparent' }}>
            {isPast
              ? <span style={{ fontSize: 13, color: a, opacity }}>✓</span>
              : <PhaseIcon phase={p.id} size={16} color={isAct ? a : theme.textSecondary} style={{ opacity }} />
            }
            <span style={{ fontSize: 9, fontWeight: 700, color: isAct ? a : theme.textSecondary, opacity }}>
              {p.short}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Top info strip (CP + VP) ──────────────────────────────────────────────────

function BattleStrip({ theme }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-2 shrink-0">
      {/* CP */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
        style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>CP</span>
        <span className="text-sm font-black" style={{ color: theme.secondary }}>3</span>
        <div className="flex gap-0.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-sm"
              style={{ background: i < 3 ? theme.secondary : theme.border, opacity: i < 3 ? 1 : 0.3 }} />
          ))}
        </div>
      </div>
      {/* VP */}
      <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl justify-between"
        style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase" style={{ color: theme.secondary }}>You</p>
          <p className="font-black text-base leading-none" style={{ color: '#22c55e' }}>8</p>
        </div>
        <p className="text-[10px] font-bold" style={{ color: theme.textSecondary }}>Round 2/5</p>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase" style={{ color: theme.textSecondary }}>Them</p>
          <p className="font-black text-base leading-none" style={{ color: '#ef4444' }}>5</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main export
// ═══════════════════════════════════════════════════════════════════════════════

export default function BattleLayoutProto({ theme, onClose }) {
  const [phaseIdx,    setPhaseIdx]    = useState(0)
  const [doneIds,     setDoneIds]     = useState(new Set())
  const [showStrats,  setShowStrats]  = useState(false)
  const [cardHeight,  setCardHeight]  = useState(300)

  const phase  = PHASES[phaseIdx]
  const accent = ACCENT[phase.id] || theme.secondary

  const toggleDone = id => setDoneIds(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: theme.bg, fontFamily: theme.font }}>

      {/* ── Header ── */}
      <div className="px-4 py-3 border-b flex items-center justify-between shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <div>
          <p className="font-black text-sm" style={{ color: theme.textPrimary }}>Card Mode — Battle Preview</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            Leaders linked to their squads · tap ○ to mark units done · change phase below
          </p>
        </div>
        <button onClick={onClose}
          className="px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          ✕ Close
        </button>
      </div>

      {/* ── Phase picker ── */}
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto shrink-0"
        style={{ borderBottom: `1px solid ${theme.border}` }}>
        <span className="text-[10px] font-bold uppercase tracking-widest shrink-0"
          style={{ color: theme.textSecondary }}>Phase:</span>
        {PHASES.map((p, i) => {
          const a = ACCENT[p.id]
          const active = i === phaseIdx
          return (
            <button key={p.id} onClick={() => setPhaseIdx(i)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all"
              style={{
                background: active ? `${a}22` : 'transparent',
                color: active ? a : theme.textSecondary,
                border: `1px solid ${active ? a + '60' : 'rgba(255,255,255,0.1)'}`,
              }}>
              <PhaseIcon phase={p.id} size={11} color={active ? a : theme.textSecondary} />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* ── Card height slider ── */}
      <div className="flex items-center gap-3 px-4 py-1.5 shrink-0"
        style={{ borderBottom: `1px solid ${theme.border}80`, background: theme.surface }}>
        <span style={{ fontSize: 10, color: theme.textSecondary, whiteSpace: 'nowrap' }}>Card size:</span>
        <input type="range" min={220} max={400} value={cardHeight}
          onChange={e => setCardHeight(Number(e.target.value))}
          className="flex-1 accent-current" style={{ accentColor: accent }} />
        <span style={{ fontSize: 10, color: theme.textSecondary, whiteSpace: 'nowrap' }}>{cardHeight}px</span>
      </div>

      {/* ── Main battle layout ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* CP + VP strip */}
        <BattleStrip theme={theme} />

        {/* Phase command bar */}
        <PhaseCommandBar
          phase={phase} accent={accent} theme={theme}
          showStrats={showStrats} onToggleStrats={() => setShowStrats(s => !s)}
        />

        {/* ── Horizontal card scroll ── */}
        <div className="flex-1 flex items-center overflow-x-auto overflow-y-hidden px-3 gap-3 py-3"
          style={{ scrollSnapType: 'x mandatory' }}>
          {PAIRS.map(pair => (
            <div key={pair.id} style={{ scrollSnapAlign: 'start' }}>
              <PairGroup
                pair={pair} phaseId={phase.id} accent={accent} theme={theme}
                doneIds={doneIds} toggleDone={toggleDone} cardHeight={cardHeight}
              />
            </div>
          ))}
          {/* Trailing space */}
          <div className="w-3 shrink-0" />
        </div>

        {/* Scroll hint */}
        <p className="text-center shrink-0 pb-1"
          style={{ fontSize: 9, color: theme.textSecondary, opacity: 0.6 }}>
          ← scroll to see all units →
        </p>
      </div>

      {/* ── Phase nav ── */}
      <PhaseNav phaseId={phase.id} theme={theme} />
    </div>
  )
}
