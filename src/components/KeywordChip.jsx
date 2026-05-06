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
    const vw = typeof window !== 'undefined' ? window.innerWidth : 400
    const showBelow = r.top < 130
    setPos({
      x: Math.min(r.left, vw - 250),
      y: showBelow ? r.bottom : r.top,
      below: showBelow,
    })
  }
  const hide = () => setPos(null)

  const onTouchStart = () => { timerRef.current = setTimeout(show, 320) }
  const onTouchEnd = () => {
    clearTimeout(timerRef.current)
    if (pos) setTimeout(hide, 2200)
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
            top: pos.below ? pos.y + 8 : pos.y - 8,
            transform: pos.below ? 'none' : 'translateY(-100%)',
            zIndex: 9999,
            background: theme.surface,
            border: `1px solid ${theme.secondary}44`,
            minWidth: 180,
            maxWidth: 240,
            pointerEvents: 'none',
          }}
        >
          <span className="block text-[10px] font-black mb-1" style={{ color: theme.secondary }}>{upper}</span>
          <span className="block text-xs leading-relaxed" style={{ color: theme.textPrimary }}>{tip}</span>
        </span>,
        document.body
      )}
    </span>
  )
}

// Parse ability text and wrap [KEYWORD] brackets + known plain keywords as interactive chips.
// W40K 10th edition wraps all special keywords in [brackets] in ability text.
export function parseTextWithKeywords(text, theme) {
  if (!text) return text

  // Split on [KEYWORD] bracket groups first
  const parts = text.split(/(\[[^\]]+\])/g)

  const nodes = []
  parts.forEach((part, i) => {
    const bracketMatch = part.match(/^\[([^\]]+)\]$/)
    if (bracketMatch) {
      const kw = bracketMatch[1]
      const tip = getKeywordTip(kw)
      nodes.push(tip
        ? <KeywordChip key={i} keyword={kw} theme={theme} />
        : part
      )
      return
    }

    // For plain-text segments, also match known static keywords (e.g. in reminder fields)
    const sorted = ALL_KNOWN_KEYWORDS.slice().sort((a, b) => b.length - a.length)
    const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const kwPattern = new RegExp(`(${escaped.join('|')})`, 'gi')
    const subParts = part.split(kwPattern)
    if (subParts.length === 1) { nodes.push(part); return }
    subParts.forEach((sp, j) =>
      nodes.push(ALL_KNOWN_KEYWORDS.includes(sp.toUpperCase())
        ? <KeywordChip key={`${i}-${j}`} keyword={sp.toUpperCase()} theme={theme} />
        : sp
      )
    )
  })

  if (nodes.every(n => typeof n === 'string')) return nodes.join('')
  return nodes
}
