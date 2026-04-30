import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KeywordChip from './KeywordChip'
import { getKeywordTip, ALL_KNOWN_KEYWORDS } from '../data/keywords'

const PHASE_ACCENT = {
  command:  '#c9a84c',
  movement: '#22c55e',
  shooting: '#60a5fa',
  charge:   '#f97316',
  fight:    '#ef4444',
}

function parseTextWithKeywords(text, theme) {
  if (!text) return text
  const sorted = ALL_KNOWN_KEYWORDS.slice().sort((a, b) => b.length - a.length)
  const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    if (ALL_KNOWN_KEYWORDS.includes(part.toUpperCase())) {
      return <KeywordChip key={i} keyword={part.toUpperCase()} theme={theme} />
    }
    return part
  })
}

export default function PhaseAbilityPanel({ units, activePhase, theme }) {
  const [expandedKey, setExpandedKey] = useState(null)

  const phaseId = activePhase?.id
  const accent = PHASE_ACCENT[phaseId] || theme.secondary

  const phaseItems = []
  for (const unit of (units || [])) {
    for (const a of (unit.abilities || [])) {
      if (typeof a === 'object' && a.name && (a.phase === phaseId || a.phase === 'any')) {
        phaseItems.push({ unit, ability: a })
      }
    }
  }

  if (phaseItems.length === 0) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phaseId}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="mx-3 mt-2 rounded-2xl border overflow-hidden shrink-0 flex flex-col"
        style={{ background: theme.surface, borderColor: `${accent}50`, maxHeight: '40vh' }}
      >
        {/* Header — always visible */}
        <div className="px-3 py-2 flex items-center gap-2 shrink-0"
          style={{ background: `${accent}18`, borderBottom: `1px solid ${accent}30` }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <p className="text-xs font-black tracking-widest uppercase" style={{ color: accent }}>
            Active This Phase
          </p>
          <p className="text-xs" style={{ color: `${accent}99` }}>— {activePhase?.label}</p>
          {phaseItems.length > 4 && (
            <span className="ml-auto text-xs" style={{ color: `${accent}66` }}>
              {phaseItems.length} abilities ↕
            </span>
          )}
        </div>

        {/* Unit abilities — scrollable */}
        <div className="overflow-y-auto">
        {phaseItems.map(({ unit, ability }, i) => {
          const key = `${unit.id}-${ability.name}`
          const isOpen = expandedKey === key
          const isLast = i === phaseItems.length - 1
          return (
            <div key={key} style={{ borderBottom: isLast ? undefined : `1px solid ${theme.border}` }}>
              <button
                onClick={() => setExpandedKey(isOpen ? null : key)}
                className="w-full px-3 py-2 flex items-center gap-2 text-left transition-colors"
                style={{ background: isOpen ? `${accent}08` : 'transparent' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: isOpen ? accent : theme.textPrimary }}>
                    {ability.name}
                  </p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>{unit.name}</p>
                </div>
                {ability.description && (
                  <span className="text-xs shrink-0" style={{ color: theme.textSecondary }}>
                    {isOpen ? '▴' : '▾'}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {isOpen && ability.description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-2.5">
                      <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                        {parseTextWithKeywords(ability.description, theme)}
                      </p>
                      {ability.reminder && (
                        <div className="mt-2 flex items-start gap-1.5 rounded-lg px-2 py-1.5"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                          <span style={{ color: accent, fontSize: 10, flexShrink: 0, lineHeight: '1.4' }}>↳</span>
                          <p className="text-xs font-bold leading-snug" style={{ color: accent }}>
                            {ability.reminder}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
