import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import {
  PRIMARY_MISSIONS, SECONDARY_MISSIONS, DEPLOYMENTS, TERRAIN_LAYOUTS,
  MISSION_POOL, VP_CAPS, rollMission, drawSecondaries, shuffleSecondaries,
} from '../data/missions'

const STEP_LABELS = ['Mission', 'Secondaries', 'Ready']

// ── Small reusable card shell ─────────────────────────────────────────────────
function Card({ children, accent, theme, glowing }) {
  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: theme.surface,
        borderColor: glowing ? accent : theme.border,
        boxShadow: glowing ? `0 0 18px ${accent}33` : 'none',
      }}
      layout>
      {children}
    </motion.div>
  )
}

// ── Secondary mission card ────────────────────────────────────────────────────
function SecondaryCard({ sec, accent, theme, mode, onToggle, selected, disabled }) {
  const vpText = mode === 'fixed' ? sec.fixedVP : sec.tacticalVP
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={() => !disabled && onToggle(sec)}
      className="w-full rounded-2xl border text-left overflow-hidden transition-all"
      style={{
        background: selected ? `${accent}12` : theme.surface,
        borderColor: selected ? accent : theme.border,
        opacity: disabled ? 0.4 : 1,
      }}>
      <div className="px-3.5 py-3">
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{sec.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-black leading-tight" style={{ color: selected ? accent : theme.textPrimary }}>
                {sec.name}
              </p>
              {!sec.canBeFixed && mode === 'fixed' && (
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded"
                  style={{ background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440' }}>
                  TACTICAL ONLY
                </span>
              )}
            </div>
            <p className="text-xs mt-1 leading-snug" style={{ color: theme.textSecondary }}>
              {vpText}
            </p>
            <p className="text-xs mt-1 italic leading-snug" style={{ color: accent, opacity: 0.8 }}>
              {sec.hint}
            </p>
          </div>
          {selected && (
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: accent }}>
              <span style={{ color: '#000', fontSize: 10, fontWeight: 900 }}>✓</span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function MissionSetupScreen({ theme, onNavigate }) {
  const accent = theme.secondary
  const {
    setMission, setSecondaryMode, setSecondaries, setSecondaryDeck,
    mission: savedMission,
    secondaryMode: savedMode,
    secondaries: savedSecondaries,
  } = useBattleStore()

  const [step, setStep] = useState(0)

  // Step 0 — Mission roll
  const [rolledMission, setRolledMission]     = useState(savedMission)
  const [isRolling, setIsRolling]             = useState(false)

  // Step 1 — Secondaries
  const [mode, setMode]                       = useState(savedMode || 'tactical')
  const [selected, setSelected]               = useState(savedSecondaries || [])
  const [tacticalHand, setTacticalHand]       = useState([])
  const [tacticalDealt, setTacticalDealt]     = useState(false)

  const primaryData   = rolledMission ? PRIMARY_MISSIONS[rolledMission.primaryId]   : null
  const deployData    = rolledMission ? DEPLOYMENTS[rolledMission.deploymentId]      : null
  const terrainIds    = rolledMission ? rolledMission.terrainLayouts                 : []

  // Roll animation
  const handleRoll = useCallback(() => {
    setIsRolling(true)
    let flips = 0
    const interval = setInterval(() => {
      setRolledMission(MISSION_POOL[Math.floor(Math.random() * MISSION_POOL.length)])
      flips++
      if (flips >= 12) {
        clearInterval(interval)
        const final = rollMission()
        setRolledMission(final)
        setIsRolling(false)
      }
    }, 80)
  }, [])

  const handleModeChange = (m) => {
    setMode(m)
    setSelected([])
    setTacticalHand([])
    setTacticalDealt(false)
  }

  const handleDealTactical = () => {
    const hand = drawSecondaries(2)
    setTacticalHand(hand)
    setSelected(hand)
    setTacticalDealt(true)
    const deck = shuffleSecondaries(hand.map(s => s.id))
    setSecondaryDeck(deck)
  }

  const handleToggleFixed = (sec) => {
    if (!sec.canBeFixed) return
    if (selected.find(s => s.id === sec.id)) {
      setSelected(selected.filter(s => s.id !== sec.id))
    } else if (selected.length < 2) {
      setSelected([...selected, sec])
    }
  }

  const handleConfirm = () => {
    setMission(rolledMission)
    setSecondaryMode(mode)
    setSecondaries(selected)
    if (mode === 'tactical' && !tacticalDealt) {
      const deck = shuffleSecondaries(selected.map(s => s.id))
      setSecondaryDeck(deck)
    }
    onNavigate('deploy')
  }

  const canProceedStep0 = !!rolledMission
  const canProceedStep1 = mode === 'tactical'
    ? (tacticalDealt && selected.length === 2)
    : selected.length === 2
  const canConfirm = canProceedStep0 && canProceedStep1

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>

      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0"
        style={{ background: theme.navBg, borderColor: theme.border }}>
        <button onClick={() => step > 0 ? setStep(step - 1) : onNavigate('armyBuilder')}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </button>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Pre-Battle</p>
          <h1 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>Mission Setup</h1>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full flex items-center justify-center font-black"
                style={{
                  background: i <= step ? accent : theme.surfaceHigh,
                  color: i <= step ? '#000' : theme.textSecondary,
                  fontSize: 9,
                }}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

        {/* ── STEP 0: Roll mission ── */}
        {step === 0 && (
          <AnimatePresence mode="wait">
            <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

              <p className="text-xs font-black tracking-widest uppercase px-1"
                style={{ color: theme.textSecondary }}>Step 1 of 3 — Roll Your Mission</p>

              {/* Roll button */}
              <Card accent={accent} theme={theme}>
                <div className="px-4 py-5 text-center">
                  <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                    Randomly select one of the 20 Chapter Approved tournament missions.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRoll}
                    disabled={isRolling}
                    className="px-8 py-3 rounded-2xl font-black text-sm"
                    style={{ background: accent, color: '#000', opacity: isRolling ? 0.7 : 1 }}>
                    {isRolling ? '🎲 Rolling…' : rolledMission ? '🎲 Re-Roll' : '🎲 Roll Mission'}
                  </motion.button>
                </div>
              </Card>

              {/* Result */}
              <AnimatePresence>
                {rolledMission && primaryData && deployData && (
                  <motion.div
                    key={rolledMission.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-3">

                    {/* Mission letter badge */}
                    <div className="flex items-center gap-3 px-1">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl"
                        style={{ background: accent, color: '#000' }}>
                        {rolledMission.id}
                      </div>
                      <div>
                        <p className="font-black text-base" style={{ color: theme.textPrimary }}>
                          {primaryData.icon} {primaryData.name}
                        </p>
                        <p className="text-xs" style={{ color: accent }}>
                          {deployData.icon} {deployData.name}
                        </p>
                      </div>
                    </div>

                    {/* Primary mission */}
                    <Card accent={accent} theme={theme} glowing>
                      <div className="px-4 py-3 border-b" style={{ borderColor: theme.border }}>
                        <p className="text-xs font-black tracking-widest uppercase" style={{ color: accent }}>Primary Mission</p>
                        <p className="font-black text-base mt-0.5" style={{ color: theme.textPrimary }}>{primaryData.name}</p>
                        <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>{primaryData.summary}</p>
                      </div>
                      <div className="px-4 py-3 space-y-2">
                        {primaryData.scoring.map((s, i) => (
                          <div key={i} className="rounded-xl px-3 py-2"
                            style={{ background: `${accent}0d`, border: `1px solid ${accent}1a` }}>
                            <p className="text-[10px] font-bold mb-0.5" style={{ color: accent }}>{s.when}</p>
                            <p className="text-xs leading-snug" style={{ color: theme.textPrimary }}>{s.vp}</p>
                            {s.max && <p className="text-[10px] mt-0.5 font-bold" style={{ color: theme.textSecondary }}>Max: {s.max}</p>}
                          </div>
                        ))}
                        {primaryData.notes && (
                          <p className="text-xs italic px-1" style={{ color: theme.textSecondary }}>{primaryData.notes}</p>
                        )}
                      </div>
                    </Card>

                    {/* Deployment */}
                    <Card accent={accent} theme={theme}>
                      <div className="px-4 py-3">
                        <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: theme.textSecondary }}>Deployment</p>
                        <p className="font-black text-sm" style={{ color: theme.textPrimary }}>{deployData.icon} {deployData.name}</p>
                        <p className="text-xs mt-1 leading-snug" style={{ color: theme.textSecondary }}>{deployData.description}</p>
                        <p className="text-xs mt-1 font-bold" style={{ color: accent }}>Zones: {deployData.zones}</p>
                      </div>
                    </Card>

                    {/* Terrain layouts */}
                    <Card accent={accent} theme={theme}>
                      <div className="px-4 py-3">
                        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: theme.textSecondary }}>
                          Terrain Layout{terrainIds.length > 1 ? 's' : ''} — pick one
                        </p>
                        <div className="space-y-2">
                          {terrainIds.map(id => {
                            const layout = TERRAIN_LAYOUTS[id]
                            return (
                              <div key={id} className="rounded-xl px-3 py-2"
                                style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                                <p className="text-xs font-black" style={{ color: theme.textPrimary }}>Layout {id}</p>
                                <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textSecondary }}>{layout.description}</p>
                                <p className="text-[10px] mt-1 font-bold" style={{ color: accent }}>Favours: {layout.favours}</p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </Card>

                    {/* VP caps reminder */}
                    <div className="rounded-2xl px-4 py-3 flex items-center justify-between"
                      style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}>
                      <div className="text-center">
                        <p className="text-lg font-black" style={{ color: accent }}>50</p>
                        <p className="text-[9px] font-bold" style={{ color: theme.textSecondary }}>Primary VP</p>
                      </div>
                      <div className="text-[10px]" style={{ color: `${accent}60` }}>+</div>
                      <div className="text-center">
                        <p className="text-lg font-black" style={{ color: accent }}>40</p>
                        <p className="text-[9px] font-bold" style={{ color: theme.textSecondary }}>Secondary VP</p>
                      </div>
                      <div className="text-[10px]" style={{ color: `${accent}60` }}>+</div>
                      <div className="text-center">
                        <p className="text-lg font-black" style={{ color: accent }}>10</p>
                        <p className="text-[9px] font-bold" style={{ color: theme.textSecondary }}>Battle Ready</p>
                      </div>
                      <div className="text-[10px]" style={{ color: `${accent}60` }}>=</div>
                      <div className="text-center">
                        <p className="text-lg font-black" style={{ color: theme.textPrimary }}>100</p>
                        <p className="text-[9px] font-bold" style={{ color: theme.textSecondary }}>Total VP</p>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── STEP 1: Secondaries ── */}
        {step === 1 && (
          <AnimatePresence mode="wait">
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

              <p className="text-xs font-black tracking-widest uppercase px-1"
                style={{ color: theme.textSecondary }}>Step 2 of 3 — Secondary Missions</p>

              {/* Fixed / Tactical toggle */}
              <div className="flex gap-2">
                {['tactical', 'fixed'].map(m => (
                  <motion.button key={m} whileTap={{ scale: 0.97 }}
                    onClick={() => handleModeChange(m)}
                    className="flex-1 py-2.5 rounded-xl font-black text-xs"
                    style={{
                      background: mode === m ? accent : theme.surfaceHigh,
                      color: mode === m ? '#000' : theme.textSecondary,
                      border: `1px solid ${mode === m ? accent : theme.border}`,
                    }}>
                    {m === 'tactical' ? '🃏 Tactical' : '📌 Fixed'}
                  </motion.button>
                ))}
              </div>

              {/* Mode explanation */}
              <div className="rounded-2xl px-3.5 py-3"
                style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}>
                {mode === 'tactical' ? (
                  <>
                    <p className="text-xs font-black" style={{ color: accent }}>Tactical Missions</p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textSecondary }}>
                      Draw 2 cards at battle start. Keep 2 active at all times — discard when scored, then draw replacements each Command phase. Spend 1CP (New Orders) to swap a card you don't like.
                    </p>
                    <p className="text-xs mt-1 font-bold" style={{ color: accent }}>
                      Discarding voluntarily at end of your turn: gain 1CP per card discarded.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-black" style={{ color: accent }}>Fixed Missions</p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textSecondary }}>
                      Choose 2 cards before the battle. They stay active all game and can be scored multiple times. Max 20VP per card. Cannot be discarded or redrawn.
                    </p>
                    <p className="text-xs mt-1 font-bold" style={{ color: accent }}>
                      Select 2 below — {selected.length}/2 chosen.
                    </p>
                  </>
                )}
              </div>

              {/* Tactical: deal button or hand */}
              {mode === 'tactical' && (
                <>
                  {!tacticalDealt ? (
                    <motion.button whileTap={{ scale: 0.97 }}
                      onClick={handleDealTactical}
                      className="w-full py-3 rounded-2xl font-black text-sm"
                      style={{ background: accent, color: '#000' }}>
                      🃏 Deal 2 Cards
                    </motion.button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs font-bold px-1" style={{ color: theme.textSecondary }}>Your opening hand:</p>
                      {tacticalHand.map(sec => (
                        <SecondaryCard key={sec.id} sec={sec} accent={accent} theme={theme} mode={mode} selected onToggle={() => {}} disabled />
                      ))}
                      <p className="text-xs px-1 text-center italic" style={{ color: theme.textSecondary, opacity: 0.5 }}>
                        You can redraw from the deck in-battle using New Orders (1CP)
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Fixed: scrollable list */}
              {mode === 'fixed' && (
                <div className="space-y-2">
                  {SECONDARY_MISSIONS.map(sec => (
                    <SecondaryCard
                      key={sec.id}
                      sec={sec}
                      accent={accent}
                      theme={theme}
                      mode={mode}
                      selected={!!selected.find(s => s.id === sec.id)}
                      disabled={!sec.canBeFixed || (selected.length >= 2 && !selected.find(s => s.id === sec.id))}
                      onToggle={handleToggleFixed}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}

        {/* ── STEP 2: Ready ── */}
        {step === 2 && (
          <AnimatePresence mode="wait">
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

              <p className="text-xs font-black tracking-widest uppercase px-1"
                style={{ color: theme.textSecondary }}>Step 3 of 3 — Confirm &amp; Deploy</p>

              {primaryData && deployData && (
                <Card accent={accent} theme={theme} glowing>
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                        style={{ background: accent, color: '#000' }}>
                        {rolledMission.id}
                      </div>
                      <div>
                        <p className="font-black" style={{ color: accent }}>{primaryData.icon} {primaryData.name}</p>
                        <p className="text-xs" style={{ color: theme.textSecondary }}>{deployData.icon} {deployData.name} · Layout {terrainIds.join(' or ')}</p>
                      </div>
                    </div>
                    <div style={{ height: 1, background: theme.border }} />
                    <div>
                      <p className="text-xs font-black tracking-widest uppercase mb-1.5"
                        style={{ color: theme.textSecondary }}>
                        {mode === 'fixed' ? 'Fixed Secondaries' : 'Opening Hand'}
                      </p>
                      {selected.map(sec => (
                        <div key={sec.id} className="flex items-center gap-2 py-1">
                          <span style={{ fontSize: 14 }}>{sec.icon}</span>
                          <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{sec.name}</p>
                          <span className="text-[9px] font-bold ml-auto px-2 py-0.5 rounded-full"
                            style={{ background: `${accent}20`, color: accent }}>
                            {mode === 'fixed' ? 'FIXED' : 'TACTICAL'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              <div className="rounded-2xl px-3.5 py-3"
                style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}>
                <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                  VP tracking, secondary card management, and the New Orders (1CP) button will be available in the Command phase panel during the battle.
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        )}

        <div className="h-2" />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t flex items-center gap-3 shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)}
            className="px-4 py-3 rounded-2xl text-sm font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            ← Back
          </button>
        )}

        {step < 2 && (
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setStep(step + 1)}
            disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
            className="flex-1 py-3 rounded-2xl font-black text-sm"
            style={{
              background: accent, color: '#000',
              opacity: (step === 0 ? !canProceedStep0 : !canProceedStep1) ? 0.4 : 1,
            }}>
            {step === 0 ? 'Choose Secondaries →' : 'Review →'}
          </motion.button>
        )}

        {step === 2 && (
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex-1 py-3 rounded-2xl font-black text-sm"
            style={{ background: accent, color: '#000', opacity: !canConfirm ? 0.4 : 1 }}>
            Deploy Forces →
          </motion.button>
        )}
      </div>
    </div>
  )
}
