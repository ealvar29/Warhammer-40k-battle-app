import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHASES, demoStratagems, demoUnits } from '../data/demoData'
import { leaders, leaderAbilities } from '../data/leaderData'
import { getSuggestions, opponentProfiles } from '../data/suggestions'
import { swDetachments } from '../data/spacewolves/detachments'
import { tyranidDetachments } from '../data/tyranids/detachments'
import { csmDetachments } from '../data/chaosspacemarines/detachments'
import { useBattleStore } from '../store/battleStore'
import PostBattleDebrief from './PostBattleDebrief'
import ShareArmySheet from './ShareArmySheet'
import MatchupSheet from './MatchupSheet'
import ImportListSheet from './ImportListSheet'

function getStratagems(faction, detachmentId) {
  const coreStrats = demoStratagems.filter(s => s.source === 'core')
  const detachmentMap = {
    spacewolves: swDetachments,
    tyranids: tyranidDetachments,
    chaosspacemarines: csmDetachments,
  }
  const detachment = detachmentMap[faction]?.[detachmentId]
  const detStrats = detachment?.stratagems || []
  return [...coreStrats, ...detStrats]
}

// ── Shared spring config ───────────────────────────────────────────────────────
const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }
const FADE_IN = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } }

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
function StatPill({ label, value, theme }) {
  return (
    <div className="flex flex-col items-center min-w-[32px]">
      <span className="text-xs font-black leading-tight" style={{ color: theme.textPrimary }}>{value}</span>
      <span style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }}>{label}</span>
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
            {unit.type || unit.category}
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
        <div className="flex flex-wrap gap-1">
          {unit.abilities.slice(0, 5).map((a, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              {typeof a === 'string' ? a : a.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
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
          const isOpen = openIdx === i
          return (
            <button
              key={`${label}-${i}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="text-xs px-2 py-1 rounded-full font-bold transition-all"
              style={{
                background: isOpen ? `${theme.secondary}22` : theme.surfaceHigh,
                color: isOpen ? theme.secondary : theme.textSecondary,
                border: `1px solid ${isOpen ? theme.secondary : theme.border}`,
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
          const desc = typeof a === 'object' ? a.description : null
          const phase = typeof a === 'object' ? a.phase : null
          if (!desc) return null
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl p-3" style={{ background: `${theme.secondary}10`, border: `1px solid ${theme.secondary}30` }}>
                {phase && (
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: theme.secondary }}>
                    {phase} phase
                  </p>
                )}
                <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.9 }}>{desc}</p>
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
function StratCard({ strat, theme, highlighted, highlightReason, motionProps }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.button
      {...motionProps}
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-2xl border p-4 relative overflow-hidden"
      whileTap={{ scale: 0.98 }}
      style={{
        background: expanded ? theme.stratHover : theme.stratBg,
        borderColor: highlighted ? theme.secondary : expanded ? theme.border : theme.stratBorder,
        boxShadow: highlighted
          ? `0 0 0 1px ${theme.secondary}44, 0 4px 16px rgba(0,0,0,0.3)`
          : '0 1px 4px rgba(0,0,0,0.2)',
      }}
    >
      {highlighted && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: theme.secondary }} />
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
  const unitKey = unit.unitKey || unit.id
  const eligibleIds = unit.eligibleLeaders?.length > 0 ? unit.eligibleLeaders : []
  const eligible = eligibleIds.map(id => leaders[id]).filter(Boolean)
  const attached = attachedLeaderId ? leaders[attachedLeaderId] : null
  const abilities = attachedLeaderId ? (leaderAbilities[`${attachedLeaderId}_${unitKey}`]?.abilities || []) : []
  const activeAbilities = abilities.filter(a => a.phase === activePhase)

  if (eligible.length === 0) return null

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
          <div className="flex items-center gap-2">
            {abilities.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                {abilities.length} {abilities.length === 1 ? 'ability' : 'abilities'}
              </span>
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
                const pairAbilities = leaderAbilities[pairKey]?.abilities || []
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
function UnitCard({ unit, unitState, attachedLeaderId, onAttach, onDetach, onWound, onHeal, onToggleWarlord, isWarlord, activePhase, theme, motionProps, onMatchup }) {
  const wounds = unitState?.currentWounds ?? unit.currentWounds ?? unit.maxWounds
  const pct = wounds / unit.maxWounds
  const statusColor = pct > 0.6 ? theme.hpFull : pct > 0.3 ? theme.hpMid : theme.hpLow
  const [showWeapons, setShowWeapons] = useState(false)
  const prevWoundsRef = useRef(wounds)
  const woundFlash = wounds < prevWoundsRef.current
  prevWoundsRef.current = wounds

  const stats = [
    unit.M && { label: 'M', value: unit.M },
    unit.T && { label: 'T', value: unit.T },
    unit.Sv && { label: 'SV', value: unit.Sv },
    unit.OC != null && { label: 'OC', value: unit.OC },
    unit.InvSv && { label: 'INV', value: unit.InvSv },
  ].filter(Boolean)

  return (
    <motion.div
      {...motionProps}
      layout
      className="rounded-2xl border p-4"
      style={{
        background: theme.unitBg,
        borderColor: isWarlord ? theme.secondary : theme.border,
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
            </AnimatePresence>
          </div>
          <p className="text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: theme.textSecondary }}>{unit.type}</p>
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
        <div className="flex gap-3 mb-2 px-1">
          {stats.map(s => <StatPill key={s.label} label={s.label} value={s.value} theme={theme} />)}
        </div>
      )}

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
        {unit.weapons?.length > 0 && (
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => setShowWeapons(!showWeapons)}
            className="px-3 rounded-xl py-2 text-xs font-bold"
            style={{
              background: showWeapons ? `${theme.secondary}22` : theme.surfaceHigh,
              color: showWeapons ? theme.secondary : theme.textSecondary,
              border: `1px solid ${showWeapons ? theme.secondary : theme.border}`,
            }}>
            ⚔
          </motion.button>
        )}
        {onMatchup && (
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={onMatchup}
            className="px-3 rounded-xl py-2 text-xs font-bold"
            style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
            vs
          </motion.button>
        )}
      </div>

      {/* Weapon profiles expandable */}
      <AnimatePresence>
        {showWeapons && unit.weapons?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: theme.border }}>
              {/* Header */}
              <div className="grid text-center px-2 py-1.5" style={{
                gridTemplateColumns: '1fr auto auto auto auto auto auto',
                background: theme.surfaceHigh,
                borderBottom: `1px solid ${theme.border}`,
              }}>
                {['WEAPON','RNG','A','S','AP','D','WS/BS'].map(h => (
                  <span key={h} className="text-xs font-bold" style={{ color: theme.textSecondary, fontSize: 8, letterSpacing: '0.05em' }}>{h}</span>
                ))}
              </div>
              {unit.weapons.map((w, i) => (
                <div key={i} className="grid items-center px-2 py-2 border-b last:border-b-0 text-center"
                  style={{
                    gridTemplateColumns: '1fr auto auto auto auto auto auto',
                    borderColor: theme.border,
                    background: i % 2 === 0 ? theme.unitBg : `${theme.surfaceHigh}88`,
                  }}>
                  <span className="text-xs font-bold text-left truncate" style={{ color: theme.textPrimary }}>{w.name}</span>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>{w.range || '—'}</span>
                  <span className="text-xs font-bold" style={{ color: theme.secondary }}>{w.A}</span>
                  <span className="text-xs" style={{ color: theme.textPrimary }}>{w.S}</span>
                  <span className="text-xs" style={{ color: theme.textPrimary }}>{w.AP}</span>
                  <span className="text-xs font-bold" style={{ color: theme.secondary }}>{w.D}</span>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>{w.WS || w.BS || '—'}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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

// ── Main Battle Screen ────────────────────────────────────────────────────────
export default function BattleDemo({ theme, onNavigate }) {
  const store = useBattleStore()
  const {
    faction, detachmentId, selectedUnits, unitStates, opponentTags,
    cp, setCp, setWounds, attachLeader, detachLeader,
    toggleOpponentTag, vpScores, adjustVp, warlordUnitId, setWarlord,
    opponentArmy, clearOpponentArmy, setOpponentArmy,
  } = store

  const [activePhaseIdx, setActivePhaseIdx] = useState(0)
  const [isYourTurn, setIsYourTurn] = useState(true)
  const [sourceFilter, setSourceFilter] = useState('all')
  const [showProfile, setShowProfile] = useState(false)
  const [showDebrief, setShowDebrief] = useState(false)
  const [showVp, setShowVp] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [matchupUnit, setMatchupUnit] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [turnFlash, setTurnFlash] = useState(null) // 'yours' | 'theirs' | null

  const totalYouVp = vpScores?.you.reduce((a, b) => a + b, 0) ?? 0
  const totalThemVp = vpScores?.them.reduce((a, b) => a + b, 0) ?? 0

  const units = selectedUnits.length > 0 ? selectedUnits : demoUnits
  const allStratagems = getStratagems(faction || 'spacewolves', detachmentId || 'sagaOfTheGreatWolf')
  const activePhase = PHASES[activePhaseIdx]

  const visibleStratagems = allStratagems.filter(s => {
    if (s.phase !== activePhase.id) return false
    if (isYourTurn && s.trigger === 'reaction') return false
    if (!isYourTurn && s.trigger === 'active') return false
    if (sourceFilter !== 'all' && s.source !== sourceFilter) return false
    return true
  })

  const suggestions = getSuggestions(detachmentId || 'sagaOfTheGreatWolf', opponentTags)
  const suggestedIds = new Set(suggestions.map(s => s.stratId))
  const suggestionMap = Object.fromEntries(suggestions.map(s => [s.stratId, s.reason]))

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

  const sourceOptions = [
    { id: 'all', label: 'All' },
    { id: 'detachment', label: 'Detachment' },
    { id: 'core', label: 'Core' },
  ]

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
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <motion.div key={i}
                  initial={false}
                  animate={{ scale: i < cp ? 1 : 0.7, opacity: i < cp ? 1 : 0.35 }}
                  transition={{ duration: 0.2 }}
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: i < cp ? theme.secondary : theme.border }}
                />
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setCp(Math.min(6, cp + 1))}
              className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>+</motion.button>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setCp(Math.max(0, cp - 1))}
              className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>−</motion.button>
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

      {/* ── Responsive layout: single-col on mobile, 2-col on desktop ── */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden md:flex md:flex-row">

        {/* ── Left column: VP (mobile) + Phase banner + Filters + Stratagems ── */}
        <div className="md:flex-1 md:flex md:flex-col md:overflow-hidden md:border-r" style={{ borderColor: theme.border }}>

          {/* VP strip — mobile position (hidden on desktop) */}
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowVp(true)}
            className="md:hidden mx-3 mt-2.5 rounded-2xl border flex items-center shrink-0 overflow-hidden"
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

          {/* Phase banner */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePhaseIdx}-${isYourTurn}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.22 }}
              className="mx-3 mt-3 rounded-2xl p-4 border relative overflow-hidden shrink-0"
              style={{
                background: theme.phaseBg,
                borderColor: isYourTurn ? theme.phaseBorder : theme.hpLow,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${isYourTurn ? theme.secondary : theme.hpLow}, transparent)` }} />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  {activePhase.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: isYourTurn ? theme.secondary : theme.hpLow }}>
                    {isYourTurn ? 'Your Turn' : "Opponent's Turn"}
                  </p>
                  <h1 className="text-lg font-black tracking-tight" style={{ color: theme.phaseText, lineHeight: 1.1 }}>
                    {activePhase.label} Phase
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black" style={{ color: theme.textPrimary }}>{visibleStratagems.length}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>Available</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Source filter tabs */}
          <div className="flex gap-2 px-3 mt-2.5 shrink-0">
            {sourceOptions.map(opt => (
              <button key={opt.id} onClick={() => setSourceFilter(opt.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: sourceFilter === opt.id ? theme.surfaceHigh : 'transparent',
                  color: sourceFilter === opt.id ? theme.textPrimary : theme.textSecondary,
                  border: `1px solid ${sourceFilter === opt.id ? theme.border : 'transparent'}`,
                }}>
                {opt.label}
              </button>
            ))}
            {opponentTags.length > 0 && (
              <span className="ml-auto text-xs flex items-center gap-1" style={{ color: theme.secondary }}>
                💡 {suggestions.length} suggestions
              </span>
            )}
          </div>

          {/* Stratagems */}
          <div className="md:flex-1 md:overflow-y-auto px-3 pb-2 mt-2 space-y-2">
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
                  motionProps={{
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.04, duration: 0.22 },
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right column: VP (desktop) + Units ── */}
        <div className="md:flex-1 md:flex md:flex-col md:overflow-hidden">

          {/* VP strip — desktop position (hidden on mobile) */}
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowVp(true)}
            className="hidden md:flex mx-3 mt-2.5 rounded-2xl border items-center shrink-0 overflow-hidden"
            style={{ background: theme.surface, borderColor: theme.border }}>
            <div className="flex-1 py-2.5 text-center">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>You</p>
              <motion.p key={`d-${totalYouVp}`} initial={{ scale: 1.25 }} animate={{ scale: 1 }}
                className="text-xl font-black leading-none mt-0.5" style={{ color: theme.hpFull }}>{totalYouVp}</motion.p>
            </div>
            <div className="py-2.5 px-4 border-x text-center" style={{ borderColor: theme.border }}>
              <p className="text-xs" style={{ color: theme.textSecondary }}>Round</p>
              <p className="text-lg font-black leading-none mt-0.5" style={{ color: theme.textPrimary }}>{currentRound}/5</p>
            </div>
            <div className="flex-1 py-2.5 text-center">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Them</p>
              <motion.p key={`d-${totalThemVp}`} initial={{ scale: 1.25 }} animate={{ scale: 1 }}
                className="text-xl font-black leading-none mt-0.5" style={{ color: theme.hpLow }}>{totalThemVp}</motion.p>
            </div>
          </motion.button>

          {/* Units */}
          <div className="md:flex-1 md:overflow-y-auto px-3 pb-2 mt-2 space-y-2">
            {/* Your units — always shown so you can track wounds */}
            <p className="text-xs font-bold tracking-widest uppercase px-1 pt-1" style={{ color: theme.textSecondary }}>
              Your Units
            </p>
            {units.map((u, i) => (
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
                theme={theme}
                onMatchup={opponentArmy?.units?.length > 0 ? () => setMatchupUnit(u) : undefined}
                motionProps={{
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.05, duration: 0.22 },
                }}
              />
            ))}

            {/* Opponent army section */}
            {opponentArmy?.units?.length > 0 ? (
              <>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-px flex-1" style={{ background: `${theme.hpLow}44` }} />
                  <p className="text-xs font-bold tracking-widest uppercase px-2" style={{ color: theme.hpLow }}>
                    Opponent Army
                  </p>
                  <div className="h-px flex-1" style={{ background: `${theme.hpLow}44` }} />
                  <button onClick={clearOpponentArmy}
                    className="text-xs px-1.5 py-0.5 rounded-lg font-bold"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                    ✕
                  </button>
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
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => setShowShare(true)}
                  className="w-full rounded-2xl border p-3.5 text-center"
                  style={{ background: theme.stratBg, borderColor: theme.stratBorder, borderStyle: 'dashed' }}>
                  <p className="text-sm font-bold" style={{ color: theme.textSecondary }}>🔗 Link Opponent's Army</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                    Share your link — they send one back
                  </p>
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => setShowImport(true)}
                  className="w-full rounded-2xl border p-3.5 text-center"
                  style={{ background: theme.stratBg, borderColor: theme.stratBorder, borderStyle: 'dashed' }}>
                  <p className="text-sm font-bold" style={{ color: theme.textSecondary }}>📋 Paste Opponent's List</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                    Import from New Recruit, BattleScribe, etc.
                  </p>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Phase nav ── */}
      <div className="border-t grid grid-cols-5 shrink-0 relative" style={{ background: theme.navBg, borderColor: theme.border }}>
        {PHASES.map((phase, i) => {
          const isActive = i === activePhaseIdx
          const isDone = i < activePhaseIdx
          return (
            <motion.button key={phase.id} onClick={() => setActivePhaseIdx(i)}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center justify-center py-3 gap-1 relative"
              style={{
                background: isActive ? theme.surfaceHigh : 'transparent',
                borderTop: isActive ? `2px solid ${theme.secondary}` : '2px solid transparent',
              }}>
              <span className="text-sm">{phase.icon}</span>
              <span className="text-xs font-bold tracking-wide"
                style={{ color: isActive ? theme.textPrimary : theme.textSecondary, opacity: isDone ? 0.4 : 1 }}>
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
    </div>
  )
}
