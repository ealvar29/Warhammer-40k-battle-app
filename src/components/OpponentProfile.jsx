import React from 'react'
import { motion } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'

const TAGS = [
  { id: 'melee',      label: 'Melee Rush',     icon: '⚔️', hint: 'Charges everything — expect combat every turn' },
  { id: 'gunline',    label: 'Gunline',         icon: '🎯', hint: 'Stays back and shoots — use cover on the approach' },
  { id: 'fast',       label: 'Fast Movers',     icon: '💨', hint: 'Huge threat ranges — assume they can reach anything' },
  { id: 'objectives', label: 'Objective Play',  icon: '🏴', hint: 'Scores points constantly — contest their home objectives' },
  { id: 'monsters',   label: 'Monster Mash',    icon: '💪', hint: 'Big targets — bring anti-tank, fight one at a time' },
  { id: 'balanced',   label: 'Balanced',        icon: '⚖️', hint: 'No obvious weakness — adapt each phase' },
]

export default function OpponentProfile({ theme }) {
  const opponentTags  = useBattleStore(s => s.opponentTags)
  const toggleOpponentTag = useBattleStore(s => s.toggleOpponentTag)
  const accent = theme.secondary

  return (
    <div className="rounded-2xl border px-3.5 py-3"
      style={{ background: theme.surface, borderColor: theme.border }}>

      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-sm">🎲</span>
        <div>
          <p className="text-xs font-black" style={{ color: theme.textPrimary }}>
            Opponent Playstyle
          </p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            Tag their style — the app will surface relevant stratagems and hints during battle
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TAGS.map(tag => {
          const active = opponentTags.includes(tag.id)
          return (
            <motion.button key={tag.id} whileTap={{ scale: 0.94 }}
              onClick={() => toggleOpponentTag(tag.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-bold text-xs transition-colors"
              style={{
                background:   active ? `${accent}18` : theme.surfaceHigh,
                borderColor:  active ? accent : theme.border,
                color:        active ? accent : theme.textSecondary,
              }}>
              <span style={{ fontSize: 13 }}>{tag.icon}</span>
              {tag.label}
            </motion.button>
          )
        })}
      </div>

      {/* Hint for selected tags */}
      {opponentTags.length > 0 && (
        <div className="mt-2.5 space-y-1">
          {TAGS.filter(t => opponentTags.includes(t.id)).map(t => (
            <p key={t.id} className="text-xs leading-snug"
              style={{ color: theme.textSecondary }}>
              <span style={{ color: accent }}>{t.icon} {t.label}:</span> {t.hint}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
