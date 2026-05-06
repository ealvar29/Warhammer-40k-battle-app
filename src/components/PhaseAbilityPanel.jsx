import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KeywordChip, { parseTextWithKeywords } from './KeywordChip'

const PHASE_ACCENT = {
  command:  '#c9a84c',
  movement: '#22c55e',
  shooting: '#60a5fa',
  charge:   '#f97316',
  fight:    '#ef4444',
}

const PHASE_CONTEXT = {
  shooting: 'Only ranged units fire this phase — melee specialists wait for Fight.',
  charge:   'Push melee units into charge range. Ranged units hang back.',
  fight:    'Melee fighters shine here. Strike with everything in Engagement Range.',
}

// Determines a unit's combat role based on its weapons (or user override)
function getUnitRole(unit) {
  if (unit.phaseRole) return unit.phaseRole
  const weapons = unit.weapons || []
  const hasRanged = weapons.some(w => w.type === 'ranged')
  const hasMelee  = weapons.some(w => w.type === 'melee')
  if (hasRanged && hasMelee) return 'mixed'
  if (hasRanged) return 'ranged'
  return 'melee' // pure melee or pistol-only
}

// Which squad units are "active" (relevant) for a given phase
function partitionUnits(squadUnits, phaseId) {
  if (phaseId === 'shooting') {
    const active = squadUnits.filter(u => { const r = getUnitRole(u); return r === 'ranged' || r === 'mixed' })
    const hold   = squadUnits.filter(u => { const r = getUnitRole(u); return r !== 'ranged' && r !== 'mixed' })
    return { active, hold }
  }
  if (phaseId === 'charge' || phaseId === 'fight') {
    const active = squadUnits.filter(u => { const r = getUnitRole(u); return r === 'melee' || r === 'mixed' })
    const hold   = squadUnits.filter(u => { const r = getUnitRole(u); return r !== 'melee' && r !== 'mixed' })
    return { active, hold }
  }
  return { active: squadUnits, hold: [] }
}

function buildHoldNotice(holdUnits, phaseId) {
  if (!holdUnits.length) return null
  const short = holdUnits.map(u => u.name.split(' ').slice(-1)[0]).join(', ')
  if (phaseId === 'shooting') {
    return `${short} ${holdUnits.length === 1 ? 'carries' : 'carry'} melee weapons — save them for Fight`
  }
  if (phaseId === 'charge') {
    return `${short} ${holdUnits.length === 1 ? 'is a' : 'are'} ranged ${holdUnits.length === 1 ? 'unit' : 'units'} — no need to charge`
  }
  return null
}

const FOCUS_LABEL = {
  shooting: '🎯 Activate now',
  charge:   '⚡ Charge with these',
  fight:    '⚔ Fight with these',
}

export default function PhaseAbilityPanel({ units, activePhase, theme }) {
  const [expandedKey, setExpandedKey] = useState(null)

  const phaseId = activePhase?.id
  const accent  = PHASE_ACCENT[phaseId] || theme.secondary

  const allUnits   = units || []
  const squadUnits = allUnits.filter(u => !u.isLeader)

  // Phase ability items (include leader abilities injected via augmentedUnits)
  const phaseItems = []
  for (const unit of allUnits) {
    for (const a of (unit.abilities || [])) {
      if (typeof a === 'object' && a.name && (a.phase === phaseId || a.phase === 'any')) {
        phaseItems.push({ unit, ability: a })
      }
    }
  }

  // Unit focus only on phases where it matters
  const showFocus = ['shooting', 'charge', 'fight'].includes(phaseId) && squadUnits.length > 0
  const { active: focusUnits, hold: holdUnits } = showFocus
    ? partitionUnits(squadUnits, phaseId)
    : { active: [], hold: [] }

  const holdNotice = buildHoldNotice(holdUnits, phaseId)
  const contextTip = PHASE_CONTEXT[phaseId]

  if (!showFocus && phaseItems.length === 0) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phaseId}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="mx-3 mt-2 rounded-2xl border overflow-hidden"
        style={{ background: theme.surface, borderColor: `${accent}50` }}
      >
        {/* Header */}
        <div className="px-3 py-2 flex items-center gap-2"
          style={{ background: `${accent}18`, borderBottom: `1px solid ${accent}30` }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          <p className="text-xs font-black tracking-widest uppercase" style={{ color: accent }}>
            Battle Intel
          </p>
          <p className="text-xs" style={{ color: `${accent}99` }}>— {activePhase?.label}</p>
        </div>

        {/* Unit focus section */}
        {showFocus && (
          <div className="px-3 pt-2.5 pb-2.5"
            style={{ borderBottom: phaseItems.length > 0 ? `1px solid ${theme.border}` : undefined }}>

            {/* Static new-player tip */}
            {contextTip && (
              <p className="text-xs mb-2 leading-snug" style={{ color: theme.textSecondary }}>
                {contextTip}
              </p>
            )}

            {/* Active units */}
            {focusUnits.length > 0 && (
              <div className="mb-1.5">
                <p className="text-xs font-bold mb-1.5" style={{ color: accent }}>
                  {FOCUS_LABEL[phaseId]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {focusUnits.map(u => (
                    <span key={u.id}
                      className="text-xs font-bold px-2.5 py-1 rounded-xl"
                      style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}40` }}>
                      {u.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Hold-back notice */}
            {holdNotice && (
              <p className="text-xs mt-2 leading-snug italic" style={{ color: theme.textSecondary }}>
                ⬤ {holdNotice}
              </p>
            )}
          </div>
        )}

        {/* Active abilities */}
        {phaseItems.map(({ unit, ability }, i) => {
          const key    = `${unit.id}-${ability.name}`
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
      </motion.div>
    </AnimatePresence>
  )
}
