import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { getKeywordTip, ALL_KNOWN_KEYWORDS } from '../data/keywords'

export default function KeywordChip({ keyword, theme }) {
  const [pos, setPos] = useState(null)
  const chipRef = useRef(null)
  const timerRef = useRef(null)
  const tip = getKeywordTip(keyword)
  const upper = String(keyword).toUpperCase()

  const show = () => {
    if (!chipRef.current) return
    const r = chipRef.current.getBoundingClientRect()
    setPos({ x: r.left, y: r.top })
  }
  const hide = () => setPos(null)

  const onTouchStart = () => { timerRef.current = setTimeout(show, 380) }
  const onTouchEnd = () => {
    clearTimeout(timerRef.current)
    if (pos) setTimeout(hide, 1800)
  }

  return (
    <span className="relative inline-block">
      <span
        ref={chipRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="inline-block px-1.5 py-0.5 rounded font-bold cursor-help select-none"
        style={{
          background: `${theme.secondary}18`,
          color: theme.secondary,
          border: `1px solid ${theme.secondary}40`,
          fontSize: 9,
          letterSpacing: '0.04em',
        }}
      >
        {upper}
      </span>
      {pos && tip && ReactDOM.createPortal(
        <span
          className="rounded-xl p-2.5 shadow-2xl block"
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y - 8,
            transform: 'translateY(-100%)',
            zIndex: 9999,
            background: theme.surface,
            border: `1px solid ${theme.secondary}44`,
            minWidth: 180,
            maxWidth: 240,
            pointerEvents: 'none',
          }}
        >
          <span className="block text-xs font-black mb-1" style={{ color: theme.secondary }}>{upper}</span>
          <span className="block text-xs leading-relaxed" style={{ color: theme.textPrimary }}>{tip}</span>
        </span>,
        document.body
      )}
    </span>
  )
}

// Utility: parse free text and wrap known keywords in KeywordChip
export function parseTextWithKeywords(text, theme) {
  if (!text) return text
  // Sort longest first to prevent partial matches
  const sorted = ALL_KNOWN_KEYWORDS.slice().sort((a, b) => b.length - a.length)
  const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    const upper = part.toUpperCase()
    if (ALL_KNOWN_KEYWORDS.includes(upper)) {
      return <KeywordChip key={i} keyword={upper} theme={theme} />
    }
    return part
  })
}
