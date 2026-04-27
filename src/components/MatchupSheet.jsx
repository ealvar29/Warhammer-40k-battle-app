import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calcMath, weaponToParams, avgDice } from '../utils/mathHammer'

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

function ResultBar({ label, value, max, color, theme }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>{label}</p>
        <p className="text-sm font-black" style={{ color }}>{value}</p>
      </div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: theme.border }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function MatchupSheet({ attacker, opponentUnits, stratagems, activePhase, onClose, theme }) {
  const [targetIdx, setTargetIdx] = useState(0)
  const [weaponIdx, setWeaponIdx] = useState(0)

  const target = opponentUnits[targetIdx]
  const weapons = attacker.weapons || []
  const weapon = weapons[weaponIdx]

  const result = useMemo(() => {
    if (!weapon || !target) return null
    return calcMath(weaponToParams(weapon, target))
  }, [weapon, target])

  const relevantStrats = (stratagems || []).filter(s => s.phase === activePhase)

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
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '92vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 shrink-0 border-b" style={{ borderColor: theme.border }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: theme.secondary }}>
                Combat Matchup
              </p>
              <h2 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>
                {attacker.name}
              </h2>
              <p className="text-xs mt-0.5 uppercase tracking-wider font-medium" style={{ color: theme.textSecondary }}>
                {attacker.type || attacker.category}
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
          </div>

          {/* Target picker */}
          <div className="mb-3">
            <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
              vs. Target
            </p>
            <div className="flex flex-wrap gap-1.5">
              {opponentUnits.map((u, i) => (
                <button key={u.id} onClick={() => setTargetIdx(i)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: targetIdx === i ? `${theme.hpLow}22` : theme.surfaceHigh,
                    color: targetIdx === i ? theme.hpLow : theme.textSecondary,
                    border: `1px solid ${targetIdx === i ? theme.hpLow : theme.border}`,
                  }}>
                  {u.name}
                </button>
              ))}
            </div>
          </div>

          {/* Weapon picker */}
          {weapons.length > 0 && (
            <div>
              <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Weapon
              </p>
              <div className="flex flex-wrap gap-1.5">
                {weapons.map((w, i) => (
                  <button key={i} onClick={() => setWeaponIdx(i)}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: weaponIdx === i ? `${theme.secondary}22` : theme.surfaceHigh,
                      color: weaponIdx === i ? theme.secondary : theme.textSecondary,
                      border: `1px solid ${weaponIdx === i ? theme.secondary : theme.border}`,
                    }}>
                    {w.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">

          {/* Target stat strip */}
          {target && (
            <div className="rounded-2xl border p-3 flex items-center gap-3"
              style={{ background: `${theme.hpLow}0a`, borderColor: `${theme.hpLow}33` }}>
              <p className="text-xs font-bold" style={{ color: theme.hpLow }}>🎯 {target.name}</p>
              <div className="flex gap-2 text-xs ml-auto" style={{ color: theme.textSecondary }}>
                <span>T{target.T}</span>
                <span>Sv{target.Sv}</span>
                {target.InvSv && <span>{target.InvSv}++</span>}
                <span>W{target.W}</span>
              </div>
            </div>
          )}

          {/* Damage result */}
          {result && (
            <div className="rounded-2xl border p-4" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>
                    Expected Damage
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={result.expectedDamage}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="text-3xl font-black leading-none mt-1"
                      style={{ color: theme.secondary }}
                    >
                      {result.expectedDamage}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="text-right text-xs space-y-0.5" style={{ color: theme.textSecondary }}>
                  <p>Wound on <span style={{ color: theme.textPrimary, fontWeight: 700 }}>{result.woundOn}+</span></p>
                  {result.effectiveSv != null && (
                    <p>Eff. save <span style={{ color: theme.textPrimary, fontWeight: 700 }}>{result.effectiveSv}+</span></p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <ResultBar label="Avg Hits" value={result.expectedHits}
                  max={avgDice(weapon?.A || 1)} color={theme.secondary} theme={theme} />
                <ResultBar label="Avg Wounds" value={result.expectedWounds}
                  max={result.expectedHits} color={theme.hpMid || '#f59e0b'} theme={theme} />
                <ResultBar label="Unsaved" value={result.expectedUnsaved}
                  max={result.expectedWounds} color={theme.hpLow} theme={theme} />
              </div>
            </div>
          )}

          {/* Weapon keywords */}
          {weapon?.abilities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {weapon.abilities.map((a, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}33` }}>
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Opponent abilities — watch out for */}
          {target?.abilities?.length > 0 && (
            <div className="rounded-2xl border p-3" style={{ background: theme.stratBg, borderColor: theme.stratBorder }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.hpLow }}>
                ⚠ Watch Out For
              </p>
              <div className="flex flex-wrap gap-1.5">
                {target.abilities.map((a, i) => {
                  const label = typeof a === 'string' ? a : a.name
                  return (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}33` }}>
                      {label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Relevant stratagems */}
          {relevantStrats.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-2 px-0.5" style={{ color: theme.secondary }}>
                ⚡ Your Stratagems This Phase
              </p>
              {relevantStrats.slice(0, 5).map(s => (
                <div key={s.id} className="rounded-xl border p-3 mb-2"
                  style={{ background: theme.stratBg, borderColor: theme.stratBorder }}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{s.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold shrink-0"
                      style={{ background: theme.surfaceHigh, color: theme.secondary, border: `1px solid ${theme.border}` }}>
                      {s.cost} CP
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{s.effect}</p>
                </div>
              ))}
            </div>
          )}

          {!result && weapons.length === 0 && (
            <p className="text-xs text-center py-4" style={{ color: theme.textSecondary }}>
              No weapon profiles on this unit.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
