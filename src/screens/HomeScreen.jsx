import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { useCrusadeStore } from '../store/crusadeStore'

const CORE_STRATAGEMS = [
  { name: 'Command Re-roll', cost: 1, phase: 'Any', effect: 'Re-roll one dice roll made for a unit in your army.' },
  { name: 'Counter-Offensive', cost: 2, phase: 'Fight', effect: 'After an enemy unit fights, select one of your units within Engagement Range to fight next.' },
  { name: 'Insane Bravery', cost: 2, phase: 'Command', effect: 'Select one unit. Until your next Command phase, it is immune to Battleshock.' },
  { name: 'Fire Overwatch', cost: 1, phase: 'Movement / Charge', effect: 'When an enemy ends a move within 24", one friendly unit can shoot at it.' },
  { name: 'Rapid Ingress', cost: 1, phase: 'Movement (reaction)', effect: "At end of opponent's Movement phase, bring a unit in from Strategic Reserves anywhere 9\"+ from enemies." },
  { name: 'Heroic Intervention', cost: 1, phase: 'Charge (reaction)', effect: 'After an enemy Charge move, one CHARACTER moves up to 3" toward the nearest enemy.' },
  { name: 'Counter-Charge', cost: 1, phase: 'Charge', effect: 'Select one unit in Engagement Range — it can make a Charge move this phase.' },
  { name: 'Smoke Launchers', cost: 1, phase: 'Movement', effect: 'Select one VEHICLE. Until your next turn it has Benefit of Cover vs ranged.' },
  { name: 'Grenades', cost: 1, phase: 'Shooting', effect: 'A GRENADES unit can shoot its grenade weapons even if it Advanced or Fell Back.' },
]

const PHASE_SUMMARY = [
  { id: 'command',  icon: '⚜️', label: 'Command',  steps: ['Gain +1 CP', 'Resolve Battleshock for shaken units', 'Use Command phase stratagems'] },
  { id: 'movement', icon: '🏃', label: 'Movement',  steps: ['Move all eligible units', 'Advance: add D6" but no shooting this turn', 'Fall Back: disengage, but no shooting/charging', 'Arrive units from Strategic Reserves (9"+ away)'] },
  { id: 'shooting', icon: '🎯', label: 'Shooting',  steps: ['Select eligible units (not Advanced/Fell Back, not in Engagement Range)', 'Pick targets within range and line of sight', 'Roll hits → wounds → saves', 'Damage applies per model — no spill-over (except Devastating Wounds)'] },
  { id: 'charge',   icon: '⚔️', label: 'Charge',   steps: ['Declare charge against units within 12"', 'Roll 2D6 — must equal or exceed the distance', 'Charging units get +1 to hit in Fight phase', 'Opponent may Fire Overwatch (1 CP) or Heroic Intervention (1 CP)'] },
  { id: 'fight',    icon: '💀', label: 'Fight',    steps: ['Charging units fight first', 'Then players alternate selecting units', 'Models in Engagement Range (1" / 5" vertically) can fight', 'Destroyed models fight before removal if they charged'] },
]

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

function BottomSheet({ onClose, children }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-t-3xl flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Thin ornamental divider like the chrome lines on the box art
function Divider({ color }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}60)` }} />
      <div className="w-1 h-1 rotate-45 shrink-0" style={{ background: color, opacity: 0.6 }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color}60)` }} />
    </div>
  )
}

export default function HomeScreen({ theme, onNavigate }) {
  const { battleActive, faction, turn, isYourTurn } = useBattleStore()
  const { orders, activeOrderId } = useCrusadeStore()
  const activeOrder = orders.find(o => o.id === activeOrderId)
  const [quickRef, setQuickRef] = useState(null)

  const cards = [
    { key: 'stratagems', label: 'Core Stratagems', icon: '📋', desc: '10th Ed universal', color: theme.secondary },
    { key: 'phases',     label: 'Phase Summary',   icon: '⏱',  desc: 'Turn structure',   color: theme.hpFull },
  ]

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: theme.bg }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center px-6 pt-10 pb-8 md:pt-6 md:pb-5 text-center overflow-hidden"
        style={{ minHeight: '40vh' }}>

        {/* Radial warm glow — mimics the dramatic centre lighting on the box art */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${theme.secondary}1a 0%, transparent 70%)` }} />

        {/* Animated icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-5 relative"
        >
          <motion.div
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
            className="text-5xl"
          >
            ⚔️
          </motion.div>
          {/* Glow ring behind icon */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full blur-xl -z-10"
            style={{ background: theme.secondary, opacity: 0.25 }}
          />
        </motion.div>

        {/* WARHAMMER 40,000 — small eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-xs font-black tracking-[0.3em] uppercase mb-2"
          style={{ color: theme.secondary }}
        >
          Warhammer 40,000
        </motion.p>

        {/* BATTLE COMPANION — hero title with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="font-black uppercase leading-none mb-4"
          style={{
            fontSize: 'clamp(2rem, 8vw, 3.25rem)',
            letterSpacing: '0.04em',
            background: `linear-gradient(to bottom, #ffffff 20%, ${theme.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Battle Companion
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="w-48 mb-4"
        >
          <Divider color={theme.secondary} />
        </motion.div>

        {/* The tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="text-xs italic leading-relaxed max-w-xs"
          style={{ color: theme.textSecondary, opacity: 0.75 }}
        >
          "In the grim darkness of the far future, there is only war."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="text-xs mt-3 font-bold tracking-widest uppercase"
          style={{ color: theme.textSecondary, opacity: 0.4 }}
        >
          10th Edition
        </motion.p>
      </div>

      {/* Divider into content area */}
      <div className="px-6 mb-1">
        <Divider color={theme.secondary} />
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="flex-1 px-4 py-5 space-y-3">

        {/* Resume battle */}
        <AnimatePresence>
          {battleActive && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('battle')}
              className="w-full rounded-2xl border-2 p-4 text-left relative overflow-hidden"
              style={{ background: theme.surface, borderColor: theme.secondary, boxShadow: `0 0 28px ${theme.secondary}33` }}
            >
              <motion.div
                className="absolute top-0 left-8 right-8 h-px"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ background: `linear-gradient(90deg, transparent, ${theme.secondary}, transparent)` }}
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: theme.secondary }}>
                    Battle In Progress
                  </p>
                  <p className="font-black text-lg leading-tight" style={{ color: theme.textPrimary }}>
                    Turn {turn} · {isYourTurn ? 'Your Turn' : "Opponent's Turn"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Tap to resume →</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${theme.secondary}18`, border: `1px solid ${theme.secondary}44` }}
                >
                  🎯
                </motion.div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* New Battle — primary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('armyBuilder')}
          className="w-full rounded-2xl p-4 text-left relative overflow-hidden"
          style={{ background: theme.secondary }}
        >
          {/* Subtle inner shine */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
          <div className="flex items-center justify-between relative">
            <div>
              <p className="font-black text-sm tracking-widest uppercase" style={{ color: theme.bg, opacity: 0.7 }}>
                Prepare for War
              </p>
              <p className="font-black text-xl leading-tight mt-0.5" style={{ color: theme.bg }}>New Battle</p>
            </div>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-2xl"
              style={{ color: theme.bg }}
            >
              ›
            </motion.span>
          </div>
        </motion.button>

        {/* Crusade preview */}
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2" style={{ color: theme.textSecondary }}>
              Your Crusade
            </p>
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('crusade')}
              className="w-full rounded-2xl border p-4 text-left"
              style={{ background: theme.surface, borderColor: theme.border }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{activeOrder.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
                    {activeOrder.battlesPlayed} battles · {activeOrder.battlesWon} wins
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black" style={{ color: theme.secondary }}>{activeOrder.requisitionPoints}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>Req. Pts</p>
                </div>
              </div>
              <div className="space-y-2">
                {activeOrder.units.slice(0, 3).map(u => (
                  <div key={u.id} className="flex items-center justify-between">
                    <p className="text-xs" style={{ color: theme.textPrimary }}>{u.name}</p>
                    <div className="flex items-center gap-2">
                      {u.battleScars.length > 0 && (
                        <span className="text-xs" style={{ color: theme.hpLow }}>⚠ {u.battleScars.length} scar{u.battleScars.length > 1 ? 's' : ''}</span>
                      )}
                      {u.battleHonours.length > 0 && (
                        <span className="text-xs" style={{ color: theme.secondary }}>★ {u.battleHonours.length}</span>
                      )}
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
                        {u.xp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-2 text-right" style={{ color: theme.secondary }}>View full roster →</p>
            </motion.button>
          </motion.div>
        )}

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <p className="text-xs font-black tracking-widest uppercase px-1 mb-2" style={{ color: theme.textSecondary }}>
            Quick Reference
          </p>
          <div className="grid grid-cols-2 gap-2">
            {cards.map((item, i) => (
              <motion.button
                key={item.key}
                onClick={() => setQuickRef(item.key)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border p-3.5 text-left relative overflow-hidden"
                style={{ background: theme.surface, borderColor: `${item.color}44` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 pointer-events-none"
                  style={{ background: item.color, opacity: 0.08 }} />
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="text-xs font-bold leading-tight" style={{ color: theme.textPrimary }}>{item.label}</p>
                <p className="text-xs mt-1 font-medium" style={{ color: item.color }}>Tap to view →</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="h-2" />
      </div>

      {/* ── Core Stratagems Sheet ── */}
      <AnimatePresence>
        {quickRef === 'stratagems' && (
          <BottomSheet onClose={() => setQuickRef(null)}>
            <div className="flex flex-col flex-1 overflow-hidden" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
              <div className="px-5 pt-6 pb-4 shrink-0">
                <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Core Rules</p>
                    <h2 className="font-black text-base mt-0.5" style={{ color: theme.textPrimary }}>Core Stratagems</h2>
                  </div>
                  <button onClick={() => setQuickRef(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
                </div>
                <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Available to every army in 10th Edition.</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-2">
                {CORE_STRATAGEMS.map((s, i) => (
                  <motion.div key={s.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-2xl border p-4"
                    style={{ background: theme.unitBg, borderColor: theme.border }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{s.name}</p>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.border}` }}>
                        {s.cost} CP
                      </span>
                    </div>
                    <p className="text-xs font-medium" style={{ color: theme.secondary }}>{s.phase}</p>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.85 }}>{s.effect}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>

      {/* ── Phase Summary Sheet ── */}
      <AnimatePresence>
        {quickRef === 'phases' && (
          <BottomSheet onClose={() => setQuickRef(null)}>
            <div className="flex flex-col" style={{ maxHeight: '90vh', background: theme.surface, border: `1px solid ${theme.border}` }}>
              <div className="px-5 pt-6 pb-4 shrink-0">
                <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>10th Edition</p>
                    <h2 className="font-black text-base mt-0.5" style={{ color: theme.textPrimary }}>Turn Structure</h2>
                  </div>
                  <button onClick={() => setQuickRef(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
                </div>
                <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                  Each battle round: your full turn, then opponent's full turn.
                </p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-3">
                {PHASE_SUMMARY.map((phase, i) => (
                  <motion.div key={phase.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border p-4"
                    style={{ background: theme.unitBg, borderColor: theme.border }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                        {phase.icon}
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: theme.textSecondary }}>Phase {i + 1}</p>
                        <p className="font-black text-sm" style={{ color: theme.textPrimary }}>{phase.label}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {phase.steps.map((step, j) => (
                        <div key={j} className="flex gap-2">
                          <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: theme.secondary }}>•</span>
                          <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.85 }}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  )
}
