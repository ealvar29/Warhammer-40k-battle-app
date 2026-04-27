import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getShareUrl } from '../utils/armyShare'

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

export default function ShareArmySheet({ faction, detachmentId, unitIds, onClose, theme }) {
  const [copied, setCopied] = useState(false)
  const url = getShareUrl(faction, detachmentId, unitIds)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: select + copy
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
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

        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h2 className="font-black text-base" style={{ color: theme.textPrimary }}>Share Your Army</h2>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>
              Send this link to your opponent. They open it and tap "Load as opponent army" — their app fills in your full unit list automatically.
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
        </div>

        {/* URL display */}
        <div className="rounded-xl border p-3 mb-3 flex items-center gap-2"
          style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
          <p className="flex-1 text-xs truncate font-mono" style={{ color: theme.textSecondary }}>{url}</p>
        </div>

        {/* Copy button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCopy}
          className="w-full py-3.5 rounded-2xl font-bold text-sm overflow-hidden"
          style={{
            background: copied ? theme.hpFull : theme.secondary,
            color: theme.bg,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'copied' : 'copy'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {copied ? '✓ Copied to clipboard!' : '📋 Copy Link'}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <p className="text-xs text-center mt-3" style={{ color: theme.textSecondary, opacity: 0.55 }}>
          {unitIds.length} units · Works via any chat app, email, or QR scanner
        </p>
      </motion.div>
    </motion.div>
  )
}
