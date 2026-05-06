import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHASE_STEPS, PHASE_RULES_PRIMER } from '../data/phaseGuide'
import KeywordChip from './KeywordChip'

const PHASE_ACCENT = {
  command:  '#c9a84c',
  movement: '#22c55e',
  shooting: '#60a5fa',
  charge:   '#f97316',
  fight:    '#ef4444',
}

export default function PhaseGuideCard({ activePhase, isYourTurn, theme, cpEffectsNode }) {
  const [openStep, setOpenStep] = useState(null)
  const [showPrimer, setShowPrimer] = useState(false)

  const phaseId = activePhase?.id
  const accent  = PHASE_ACCENT[phaseId] || theme.secondary
  const steps   = PHASE_STEPS[phaseId]  || []
  const primer  = PHASE_RULES_PRIMER[phaseId] || []

  return (
    <motion.div
      key={`guide-${phaseId}-${isYourTurn}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25 }}
      className="mx-3 mt-3 rounded-2xl overflow-hidden border"
      style={{
        background: theme.surface,
        borderColor: `${accent}45`,
        boxShadow: `0 4px 28px ${accent}14`,
      }}
    >
      {/* ── Phase header ── */}
      <div
        className="px-4 pt-4 pb-3 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}06 100%)` }}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${accent}18`, border: `1.5px solid ${accent}40` }}
          >
            {activePhase?.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black tracking-widest uppercase mb-0.5"
              style={{ color: isYourTurn ? accent : theme.hpLow }}>
              {isYourTurn ? 'Your Turn' : "Opponent's Turn"}
            </p>
            <h2 className="text-2xl font-black tracking-tight leading-none"
              style={{ color: theme.textPrimary }}>
              {activePhase?.label}
            </h2>
            <p className="text-xs mt-1 font-semibold" style={{ color: `${accent}bb` }}>Phase</p>
          </div>
        </div>
      </div>

      {/* ── CP / detachment effects passed in as a node (command phase only) ── */}
      {cpEffectsNode && (
        <div className="px-3 pt-2">
          {cpEffectsNode}
        </div>
      )}

      {/* ── Steps ── */}
      <div className="px-3 pt-3 pb-1">
        <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
          style={{ color: accent }}>
          What to do now
        </p>

        <div className="space-y-1.5">
          {steps.map((step, i) => {
            const isOpen = openStep === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenStep(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{
                    background: isOpen ? `${accent}16` : `${accent}07`,
                    border: `1px solid ${isOpen ? accent + '45' : accent + '18'}`,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: accent, color: theme.bg }}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-xs font-bold leading-snug"
                    style={{ color: theme.textPrimary }}>
                    {step.label}
                  </span>
                  <span className="text-xs shrink-0" style={{ color: `${accent}70` }}>
                    {isOpen ? '▴' : '▾'}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-2.5 mx-1 mb-0.5 rounded-b-xl"
                        style={{
                          background: `${accent}09`,
                          borderLeft: `2px solid ${accent}50`,
                          borderBottom: `1px solid ${accent}20`,
                          borderRight: `1px solid ${accent}20`,
                        }}
                      >
                        <p className="text-xs leading-relaxed whitespace-pre-line"
                          style={{ color: theme.textPrimary, opacity: 0.9 }}>
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Rules primer ── */}
      {primer.length > 0 && (
        <div className="px-3 pb-3 pt-2">
          <button
            onClick={() => setShowPrimer(s => !s)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
            style={{
              background: showPrimer ? `${accent}12` : `${accent}06`,
              border: `1px solid ${showPrimer ? accent + '35' : accent + '18'}`,
            }}
          >
            <span style={{ fontSize: 13 }}>📖</span>
            <span className="flex-1 text-xs font-bold text-left" style={{ color: theme.textPrimary, opacity: 0.75 }}>
              How does this phase work?
            </span>
            <span className="text-xs" style={{ color: `${accent}80` }}>
              {showPrimer ? '▴' : '▾'}
            </span>
          </button>

          <AnimatePresence>
            {showPrimer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl px-3 py-3 space-y-2.5"
                  style={{ background: `${accent}08`, border: `1px solid ${accent}22` }}>
                  {primer.map((item, i) => {
                    const text     = typeof item === 'string' ? item : item.text
                    const keywords = typeof item === 'object' ? (item.keywords || []) : []
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-1 shrink-0" style={{ color: accent, fontSize: 7 }}>◆</span>
                        <div className="flex-1">
                          <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.85 }}>
                            {text}
                          </p>
                          {keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {keywords.map(kw => (
                                <KeywordChip key={kw} keyword={kw} theme={theme} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
