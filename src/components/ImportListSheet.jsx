import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseImportedList, resolveImportedUnits } from '../utils/listImport'
import { FACTION_META } from '../data/factionRegistry'
import { FactionIcon } from './GameIcon'

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

const CONFIDENCE_BADGE = {
  exact:   { label: '✓ Matched',  bg: '#16a34a22', border: '#16a34a55', text: '#4ade80' },
  high:    { label: '~ Close',    bg: '#ca8a0422', border: '#ca8a0455', text: '#fbbf24' },
  partial: { label: '~ Partial',  bg: '#ca8a0422', border: '#ca8a0455', text: '#fbbf24' },
  none:    { label: '? Unknown',  bg: '#6b728022', border: '#6b728055', text: '#9ca3af' },
}

export default function ImportListSheet({ onLoadAsMyArmy, onLoadAsOpponent, onClose, theme }) {
  const [step, setStep] = useState('paste')   // paste | preview
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState(null)  // { faction, detachment, totalPoints, units }
  const [error, setError] = useState(null)

  const handleParse = useCallback(() => {
    if (!text.trim()) return
    setError(null)
    try {
      const result = parseImportedList(text)
      if (!result.parsedUnits.length) {
        setError("Couldn't find any units in that text. Make sure to paste the full exported list.")
        return
      }
      const resolved = resolveImportedUnits(result.parsedUnits, result.faction || 'tyranids')
      setParsed({ ...result, resolvedUnits: resolved })
      setStep('preview')
    } catch (e) {
      setError('Parse failed — please check the format and try again.')
    }
  }, [text])

  const factionMeta = parsed?.faction ? FACTION_META[parsed.faction] : null
  const matchedCount = parsed?.resolvedUnits?.filter(u => u.confidence !== 'none').length ?? 0
  const totalCount = parsed?.resolvedUnits?.length ?? 0

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.82)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="w-full max-w-lg flex flex-col rounded-t-3xl"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '90vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
      >
        {/* Handle */}
        <div className="shrink-0 pt-3 pb-2 flex flex-col items-center">
          <div className="w-10 h-1 rounded-full mb-3" style={{ background: theme.border }} />
          <div className="px-5 w-full flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
                {step === 'paste' ? 'Import Army List' : 'Preview Import'}
              </p>
              {step === 'preview' && factionMeta && (
                <p className="text-sm font-black mt-0.5" style={{ color: theme.textPrimary }}>
                  <FactionIcon id={parsed.faction} size={14} color={factionMeta.color} /> {factionMeta.name}
                  {parsed.detachmentRaw && (
                    <span className="text-xs font-normal ml-2" style={{ color: theme.textSecondary }}>
                      — {parsed.detachmentRaw}
                    </span>
                  )}
                </p>
              )}
            </div>
            {step === 'preview' && (
              <button onClick={() => setStep('paste')}
                className="text-xs px-3 py-1.5 rounded-xl font-bold"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
                ← Edit
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">

          {/* ── Step: Paste ── */}
          {step === 'paste' && (
            <div className="space-y-3">
              <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                Export your list from New Recruit, BattleScribe, or any app that outputs the standard text format, then paste it below.
              </p>
              <textarea
                className="w-full rounded-2xl p-3 text-xs font-mono resize-none outline-none"
                style={{
                  background: theme.surfaceHigh, color: theme.textPrimary,
                  border: `1px solid ${theme.border}`, minHeight: 220,
                }}
                placeholder={"Paste your exported army list here...\n\nExample:\n++++++++\n+ FACTION KEYWORD: Tyranids\n+ DETACHMENT: Invasion Fleet\n+ TOTAL ARMY POINTS: 1985pts\n++++++++\n\n1x Hive Tyrant (195 pts): ..."}
                value={text}
                onChange={e => setText(e.target.value)}
                spellCheck={false}
              />
              {error && (
                <p className="text-xs rounded-xl px-3 py-2" style={{ background: '#7f1d1d44', color: '#f87171' }}>
                  {error}
                </p>
              )}
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleParse}
                className="w-full py-3.5 rounded-2xl font-bold text-sm"
                style={{ background: text.trim() ? theme.secondary : theme.border, color: text.trim() ? theme.bg : theme.textSecondary }}>
                Parse List →
              </motion.button>
            </div>
          )}

          {/* ── Step: Preview ── */}
          {step === 'preview' && parsed && (
            <div className="space-y-3">
              {/* Summary bar */}
              <div className="flex gap-2">
                <div className="flex-1 rounded-2xl p-3 text-center"
                  style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  <p className="text-lg font-black" style={{ color: theme.textPrimary }}>{parsed.totalPoints}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>pts</p>
                </div>
                <div className="flex-1 rounded-2xl p-3 text-center"
                  style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  <p className="text-lg font-black" style={{ color: theme.textPrimary }}>{totalCount}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>units</p>
                </div>
                <div className="flex-1 rounded-2xl p-3 text-center"
                  style={{ background: matchedCount === totalCount ? '#16a34a22' : '#ca8a0422',
                    border: `1px solid ${matchedCount === totalCount ? '#16a34a55' : '#ca8a0455'}` }}>
                  <p className="text-lg font-black"
                    style={{ color: matchedCount === totalCount ? '#4ade80' : '#fbbf24' }}>
                    {matchedCount}/{totalCount}
                  </p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>matched</p>
                </div>
              </div>

              {/* Detachment match status */}
              {parsed.detachmentRaw && (
                <div className="rounded-xl px-3 py-2 flex items-center gap-2"
                  style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  <span className="text-sm">{parsed.detachment ? '✓' : '?'}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>
                      {parsed.detachment ? parsed.detachment.name : parsed.detachmentRaw}
                    </p>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      {parsed.detachment ? `${parsed.detachment.stratagems.length} stratagems loaded` : 'Detachment not found in database — stratagems unavailable'}
                    </p>
                  </div>
                </div>
              )}

              {/* Unknown units notice */}
              {matchedCount < totalCount && (
                <div className="rounded-xl px-3 py-2"
                  style={{ background: '#78350f22', border: '1px solid #92400e55' }}>
                  <p className="text-xs font-bold" style={{ color: '#fbbf24' }}>
                    {totalCount - matchedCount} unit{totalCount - matchedCount > 1 ? 's' : ''} not in database
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#d97706' }}>
                    They'll be imported as stubs — stats won't be available but wound tracking will work.
                  </p>
                </div>
              )}

              {/* Unit list */}
              <div className="space-y-1.5">
                {parsed.resolvedUnits.map((entry, i) => {
                  const badge = CONFIDENCE_BADGE[entry.confidence]
                  const u = entry.resolved
                  return (
                    <div key={i} className="rounded-xl p-3 flex items-start gap-3"
                      style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold leading-tight truncate" style={{ color: theme.textPrimary }}>
                          {entry.parsedName}
                        </p>
                        {entry.confidence !== 'none' && u.name !== entry.parsedName && (
                          <p className="text-xs mt-0.5 truncate" style={{ color: theme.textSecondary }}>
                            → {u.name}
                          </p>
                        )}
                        {entry.confidence !== 'none' && (
                          <div className="flex gap-2 mt-1 text-xs" style={{ color: theme.textSecondary }}>
                            <span>T{u.T}</span>
                            <span>Sv {u.Sv}</span>
                            <span>W{u.W}</span>
                            {u.InvSv && <span>{u.InvSv}++</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.text }}>
                          {badge.label}
                        </span>
                        <span className="text-xs" style={{ color: theme.textSecondary }}>
                          {entry.points} pts
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        {step === 'preview' && parsed && (
          <div className="shrink-0 px-5 py-4 border-t space-y-2" style={{ borderColor: theme.border }}>
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => onLoadAsMyArmy(parsed)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Load as My Army
            </motion.button>
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => onLoadAsOpponent(parsed)}
              className="w-full py-3 rounded-2xl font-bold text-sm"
              style={{ background: '#b91c1c22', border: '1px solid #b91c1c55', color: '#f87171' }}>
              Load as Opponent Army
            </motion.button>
            <button onClick={onClose}
              className="w-full py-2 text-xs font-medium"
              style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          </div>
        )}

        {step === 'paste' && (
          <div className="shrink-0 px-5 pb-5">
            <button onClick={onClose}
              className="w-full py-2 text-xs font-medium"
              style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
