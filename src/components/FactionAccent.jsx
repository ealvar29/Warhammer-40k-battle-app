// Faction-specific decorative accents that make the UI feel alive.
// ChitinEdge   — Tyranid row of organic teeth / chitin plates
// RunicEdge    — Space Wolves angular separator
// FactionEdge  — picks the right accent based on theme.id
// themeClip    — clip-path string for chitin-shaped buttons/cards (hivemind only)

import React from 'react'

// ── Chitin tooth strip ──────────────────────────────────────────────────────
// Renders a row of downward (or upward when flip=true) pointing triangular teeth.
// Use as a horizontal divider inside panels.

export function ChitinEdge({ color, opacity = 0.45, toothW = 14, height = 10, flip = false }) {
  // unique pattern ID so multiple instances on the same page don't clash
  const uid = `chitin-${color.replace(/[^a-f0-9]/gi, '')}-${flip ? '1' : '0'}`
  const points = flip
    ? `0,${height} ${toothW / 2},0 ${toothW},${height}`
    : `0,0 ${toothW / 2},${height} ${toothW},0`

  return (
    <svg
      width="100%"
      height={height}
      preserveAspectRatio="none"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={uid} x="0" y="0" width={toothW} height={height} patternUnits="userSpaceOnUse">
          <polygon points={points} fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${uid})`} />
    </svg>
  )
}

// ── Runic separator ─────────────────────────────────────────────────────────
// A gradient line with subtle angular marks — evokes Norse engravings.

export function RunicEdge({ color, opacity = 0.5 }) {
  return (
    <div style={{ position: 'relative', height: 2, flexShrink: 0 }} aria-hidden="true">
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(90deg, transparent 0%, ${color} 15%, ${color} 85%, transparent 100%)`,
        opacity,
      }} />
      {/* small rune notches at 33% and 66% */}
      {[33, 67].map(pct => (
        <div key={pct} style={{
          position: 'absolute', top: -3, left: `${pct}%`,
          width: 2, height: 8,
          background: color, opacity: opacity * 0.8,
          transform: 'translateX(-50%) rotate(30deg)',
        }} />
      ))}
    </div>
  )
}

// ── Smart selector ──────────────────────────────────────────────────────────

export function FactionEdge({ theme, flip = false }) {
  if (!theme) return null
  if (theme.id === 'hivemind')   return <ChitinEdge color={theme.primary} flip={flip} />
  if (theme.id === 'spacewolves') return <RunicEdge  color={theme.secondary} />
  return null
}

// ── Chitin clip-path for buttons / cards ────────────────────────────────────
// Returns a clip-path value string for the hivemind theme that gives panels
// a double-cut corner suggesting segmented chitin armour.
// Returns '' for all other themes so it's safe to spread unconditionally.

export function themeClip(theme, size = 10) {
  if (theme?.id === 'hivemind') {
    return `polygon(0% 0%, calc(100% - ${size}px) 0%, 100% ${size}px, 100% 100%, ${size}px 100%, 0% calc(100% - ${size}px))`
  }
  return ''
}
