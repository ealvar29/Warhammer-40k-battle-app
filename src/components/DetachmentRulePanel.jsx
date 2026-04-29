import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'

export default function DetachmentRulePanel({ detachment, activePhase, theme }) {
  const {
    detachmentState,
    setDetachmentSelection,
    clearDetachmentSelection,
    setTargetNote,
    setOnceBuffUsed,
  } = useBattleStore()

  const [expanded, setExpanded] = useState(false)

  if (!detachment) return null

  const { activeSelection, targetNote, onceBuffUsed } = detachmentState || {}
  const action = detachment.commandPhaseAction
  const rule = detachment.detachmentRule
  const isCommandPhase = activePhase?.id === 'command'

  const needsPick = action?.type === 'pick_one' && !activeSelection && isCommandPhase
  const activeOption = action?.type === 'pick_one'
    ? action.options?.find(o => o.id === activeSelection)
    : null

  const borderColor = needsPick
    ? theme.secondary
    : activeOption
      ? `${theme.secondary}60`
      : `${theme.primary}40`

  return (
    <div className="mx-3 mt-2 rounded-2xl border overflow-hidden shrink-0"
      style={{
        background: theme.surface,
        borderColor,
        transition: 'border-color 0.25s',
      }}>

      {/* ── Header — always visible ── */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-3 py-2 flex items-center gap-2 text-left"
        style={{ background: expanded ? `${theme.primary}08` : 'transparent' }}>

        <span className="font-black px-1.5 py-0.5 rounded shrink-0"
          style={{ background: `${theme.primary}20`, color: theme.primary, fontSize: 8, letterSpacing: '0.06em' }}>
          DET RULE
        </span>

        <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
          <p className="text-xs font-bold shrink-0" style={{ color: theme.textPrimary }}>
            {rule.name}
          </p>

          {/* Active selection badge */}
          {activeOption && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
              {activeOption.icon} {activeOption.label}
            </span>
          )}

          {/* Quarry target */}
          {action?.type === 'designate_target' && targetNote && (
            <span className="text-xs font-medium truncate" style={{ color: theme.secondary }}>
              🎯 {targetNote}
            </span>
          )}

          {/* "Pick now" pulse when command phase and no selection yet */}
          {needsPick && (
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}55` }}>
              Pick now
            </motion.span>
          )}
        </div>

        <span className="text-xs shrink-0" style={{ color: theme.textSecondary }}>
          {expanded ? '▴' : '▾'}
        </span>
      </button>

      {/* ── Expanded content ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden">

            <div className="px-3 pb-3 pt-1 border-t space-y-2.5"
              style={{ borderColor: theme.border }}>

              {/* ── PICK ONE (e.g. Hunting Packs) ── */}
              {action?.type === 'pick_one' && (
                <>
                  <p className="text-xs pt-0.5" style={{ color: theme.textSecondary }}>
                    {action.prompt}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5">
                    {action.options.map(opt => {
                      const isSelected = activeSelection === opt.id
                      return (
                        <button key={opt.id}
                          onClick={() => setDetachmentSelection(opt.id)}
                          className="rounded-xl border p-2 text-center transition-all"
                          style={{
                            background: isSelected ? `${theme.secondary}22` : theme.surfaceHigh,
                            borderColor: isSelected ? theme.secondary : theme.border,
                          }}>
                          <div className="text-base mb-1">{opt.icon}</div>
                          <p className="text-xs font-bold leading-tight"
                            style={{ color: isSelected ? theme.secondary : theme.textPrimary }}>
                            {opt.label}
                          </p>
                          <p className="mt-0.5 leading-tight"
                            style={{ color: theme.textSecondary, fontSize: 9 }}>
                            {opt.shortEffect}
                          </p>
                        </button>
                      )
                    })}
                  </div>

                  {/* Active pack detail */}
                  {activeOption && (
                    <div className="rounded-xl p-2.5"
                      style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold" style={{ color: theme.secondary }}>
                          {activeOption.icon} {activeOption.label} — Active
                        </p>
                        {isCommandPhase && (
                          <button onClick={clearDetachmentSelection}
                            className="text-xs font-bold px-2 py-0.5 rounded-lg"
                            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                            Change
                          </button>
                        )}
                      </div>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textPrimary }}>
                        {activeOption.fullEffect}
                      </p>
                      {!isCommandPhase && (
                        <p className="text-xs mt-1 italic" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                          Re-pick at start of your next Command phase.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Once-per-battle buff */}
                  {action.onceBuff && (
                    <div className="rounded-xl p-2.5 flex items-start gap-2"
                      style={{
                        background: onceBuffUsed ? `${theme.surfaceHigh}` : `${theme.primary}12`,
                        border: `1px solid ${onceBuffUsed ? theme.border : theme.primary + '44'}`,
                        opacity: onceBuffUsed ? 0.5 : 1,
                      }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold"
                          style={{ color: onceBuffUsed ? theme.textSecondary : theme.primary }}>
                          {action.onceBuff.label}
                          {onceBuffUsed && ' — Used'}
                        </p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>
                          {action.onceBuff.description}
                        </p>
                      </div>
                      {!onceBuffUsed && (
                        <button onClick={setOnceBuffUsed}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold shrink-0"
                          style={{ background: theme.primary, color: '#1a1f2e' }}>
                          Use
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* ── DESIGNATE TARGET (e.g. Pack's Quarry) ── */}
              {action?.type === 'designate_target' && (
                <>
                  <p className="text-xs pt-0.5" style={{ color: theme.textSecondary }}>
                    {action.prompt}
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={targetNote}
                      onChange={e => setTargetNote(e.target.value)}
                      placeholder={action.placeholder}
                      className="flex-1 rounded-xl px-3 py-2 text-xs font-medium outline-none"
                      style={{
                        background: theme.surfaceHigh,
                        border: `1px solid ${targetNote ? theme.secondary : theme.border}`,
                        color: theme.textPrimary,
                      }}
                    />
                    {targetNote && (
                      <button onClick={() => setTargetNote('')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="rounded-xl p-2.5"
                    style={{
                      background: targetNote ? `${theme.secondary}12` : theme.surfaceHigh,
                      border: `1px solid ${targetNote ? theme.secondary + '30' : theme.border}`,
                    }}>
                    {targetNote && (
                      <p className="text-xs font-bold mb-1" style={{ color: theme.secondary }}>
                        🎯 Quarry: {targetNote}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>
                      {action.effect}
                    </p>
                  </div>
                </>
              )}

              {/* ── PASSIVE — just show full rule description ── */}
              {!action && (
                <p className="text-xs leading-relaxed pt-0.5" style={{ color: theme.textSecondary }}>
                  {rule.description}
                </p>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
