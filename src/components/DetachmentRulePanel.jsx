import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { PickOneIcon } from './GameIcon'

export default function DetachmentRulePanel({ detachment, activePhase, theme, onceBuffAvailable = false }) {
  const {
    detachmentState,
    setDetachmentSelection,
    clearDetachmentSelection,
    setTargetNote,
    setOnceBuffUsed,
  } = useBattleStore()

  const [expanded, setExpanded] = useState(false)
  const [pendingId, setPendingId] = useState(null)

  if (!detachment) return null

  const { activeSelection, usedSelections = [], targetNote, onceBuffUsed } = detachmentState || {}
  const action = detachment.commandPhaseAction
  const rule = detachment.detachmentRule
  const isCommandPhase = activePhase?.id === 'command'

  const perRound = action?.perRound === true  // pick fresh every command phase, no "used" tracking
  const needsPick = action?.type === 'pick_one' && !activeSelection && isCommandPhase
  const activeOption = action?.type === 'pick_one'
    ? action.options?.find(o => o.id === activeSelection)
    : null

  const remainingCount = action?.type === 'pick_one' && !perRound
    ? action.options.filter(o => !usedSelections.includes(o.id)).length
    : action?.options?.length ?? 0
  const allUsed = action?.type === 'pick_one' && !perRound && remainingCount === 0

  const pendingOption = pendingId ? action?.options?.find(o => o.id === pendingId) : null

  // onceBuff (Howling Onslaught) is available only when Logan is on field and not yet spent
  const canUsOnceBuff = action?.onceBuff && onceBuffAvailable && !onceBuffUsed

  const borderColor = needsPick
    ? theme.secondary
    : activeOption
      ? `${theme.secondary}60`
      : `${theme.primary}40`

  const handleConfirm = () => {
    if (!pendingId) return
    const isReusingViaBuff = usedSelections.includes(pendingId) && canUsOnceBuff
    if (isReusingViaBuff) setOnceBuffUsed()
    setDetachmentSelection(pendingId)
    setPendingId(null)
  }

  return (
    <div className="mx-3 mt-2 rounded-2xl border overflow-hidden shrink-0"
      style={{
        background: theme.surface,
        borderColor,
        transition: 'border-color 0.25s',
      }}>

      {/* ── Header ── */}
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

          {activeOption && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1"
              style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
              <PickOneIcon icon={activeOption.icon} size={11} color={theme.secondary} />
              {activeOption.label}
            </span>
          )}

          {action?.type === 'pick_one' && !perRound && usedSelections.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{
                background: allUsed ? theme.border : `${theme.secondary}15`,
                color: allUsed ? theme.textSecondary : theme.secondary,
                border: `1px solid ${allUsed ? theme.border : theme.secondary + '44'}`,
              }}>
              {allUsed ? 'All used' : `${remainingCount} left`}
            </span>
          )}

          {action?.type === 'passive' && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: `${theme.secondary}15`, color: theme.secondary, border: `1px solid ${theme.secondary}30` }}>
              ● Always Active
            </span>
          )}

          {action?.type === 'designate_target' && targetNote && (
            <span className="text-xs font-medium truncate" style={{ color: theme.secondary }}>
              🎯 {targetNote}
            </span>
          )}

          {needsPick && !allUsed && (
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

              {/* ── PICK ONE ── */}
              {action?.type === 'pick_one' && (
                <>
                  <div className="flex items-center justify-between pt-0.5">
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      {action.prompt}
                    </p>
                    {!perRound && action.options.length > 1 && (
                      <span className="text-xs font-bold shrink-0 ml-2"
                        style={{ color: allUsed ? theme.textSecondary : theme.secondary }}>
                        {usedSelections.length}/{action.options.length} used
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {action.options.map(opt => {
                      const isActive = activeSelection === opt.id
                      const isUsed = !perRound && usedSelections.includes(opt.id)
                      const isPending = pendingId === opt.id
                      const canReuse = isUsed && !isActive && canUsOnceBuff
                      const isDisabled = isUsed && !isActive && !canReuse

                      return (
                        <button key={opt.id}
                          onClick={() => {
                            if (isDisabled) return
                            setPendingId(isPending ? null : opt.id)
                          }}
                          disabled={isDisabled}
                          className="rounded-xl border p-2 text-center transition-all relative"
                          style={{
                            background: isPending
                              ? `${theme.secondary}30`
                              : isActive
                                ? `${theme.secondary}22`
                                : isUsed
                                  ? `${theme.border}30`
                                  : theme.surfaceHigh,
                            borderColor: isPending
                              ? theme.secondary
                              : isActive
                                ? theme.secondary
                                : theme.border,
                            opacity: isDisabled ? 0.4 : 1,
                          }}>
                          <PickOneIcon icon={opt.icon} size={22} color={isPending || isActive ? theme.secondary : isUsed ? theme.textSecondary : theme.textPrimary} className="mb-1" />
                          <p className="text-xs font-bold leading-tight"
                            style={{ color: isPending || isActive ? theme.secondary : isUsed ? theme.textSecondary : theme.textPrimary }}>
                            {opt.label}
                          </p>
                          <p className="mt-0.5 leading-tight"
                            style={{ color: theme.textSecondary, fontSize: 9 }}>
                            {opt.shortEffect}
                          </p>
                          {isUsed && !isActive && !canReuse && (
                            <span className="absolute top-1 right-1 text-xs font-bold px-1 py-0.5 rounded"
                              style={{ background: theme.border, color: theme.textSecondary, fontSize: 8 }}>
                              ✓
                            </span>
                          )}
                          {canReuse && !isPending && (
                            <span className="absolute top-1 right-1 text-xs font-bold px-1 py-0.5 rounded"
                              style={{ background: `${theme.primary}22`, color: theme.primary, fontSize: 8 }}>
                              ↺
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Pending preview + confirm */}
                  {pendingOption && (
                    <div className="rounded-xl p-2.5 space-y-2"
                      style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}40` }}>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <PickOneIcon icon={pendingOption.icon} size={16} color={theme.secondary} />
                          <p className="text-xs font-bold" style={{ color: theme.secondary }}>
                            {pendingOption.label}
                            {usedSelections.includes(pendingId) && canUsOnceBuff && (
                              <span className="ml-2 font-normal" style={{ color: theme.primary }}>
                                — Howling Onslaught (Logan)
                              </span>
                            )}
                          </p>
                        </div>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textPrimary }}>
                          {pendingOption.fullEffect}
                        </p>
                      </div>
                      <button onClick={handleConfirm}
                        className="w-full py-2 rounded-xl text-xs font-black"
                        style={{ background: theme.secondary, color: theme.bg }}>
                        {action.confirmLabel || 'Select this Pack →'}
                      </button>
                    </div>
                  )}

                  {/* Active pack detail (no pending) */}
                  {activeOption && !pendingOption && (
                    <div className="rounded-xl p-2.5"
                      style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <PickOneIcon icon={activeOption.icon} size={16} color={theme.secondary} />
                          <p className="text-xs font-bold" style={{ color: theme.secondary }}>
                            {activeOption.label} — Active
                          </p>
                        </div>
                        {isCommandPhase && (perRound || remainingCount > 0) && (
                          <button onClick={() => { clearDetachmentSelection(); setPendingId(null) }}
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
                          {perRound ? 'You may change this at the start of your next Command phase.' : 'Re-pick at start of your next Command phase.'}
                        </p>
                      )}
                    </div>
                  )}

                  {/* All used + Logan reuse hint */}
                  {allUsed && !activeOption && !pendingOption && (
                    <div className="rounded-xl p-2.5 text-center"
                      style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                      <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>
                        All options used this battle
                      </p>
                      {canUsOnceBuff && (
                        <p className="text-xs mt-1" style={{ color: theme.primary }}>
                          Logan Grimnar: tap any pack above to reuse it once (Howling Onslaught)
                        </p>
                      )}
                      {action.onceBuff && onceBuffUsed && (
                        <p className="text-xs mt-1" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                          Howling Onslaught already used
                        </p>
                      )}
                    </div>
                  )}

                  {/* Logan Howling Onslaught status — only shows if Logan is on field */}
                  {action.onceBuff && onceBuffAvailable && (
                    <div className="rounded-xl p-2.5"
                      style={{
                        background: onceBuffUsed ? theme.surfaceHigh : `${theme.primary}10`,
                        border: `1px solid ${onceBuffUsed ? theme.border : theme.primary + '44'}`,
                        opacity: onceBuffUsed ? 0.5 : 1,
                      }}>
                      <p className="text-xs font-bold"
                        style={{ color: onceBuffUsed ? theme.textSecondary : theme.primary }}>
                        {action.onceBuff.label}{onceBuffUsed ? ' — Used' : ' — Available'}
                      </p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>
                        {action.onceBuff.description}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* ── DESIGNATE TARGET ── */}
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

              {/* ── PASSIVE ── */}
              {(!action || action?.type === 'passive') && (
                <div className="space-y-2">
                  {action?.type === 'passive' && action.effect && (
                    <div className="rounded-xl p-2.5"
                      style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: theme.secondary }}>
                        {action.label} — Always Active
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>
                        {action.effect}
                      </p>
                    </div>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                    {rule.description}
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
