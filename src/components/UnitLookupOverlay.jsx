import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'
import { KEYWORD_GUIDE, lookupKeyword } from '../data/keywordGuide'
import { FactionIcon, KeywordIcon } from './GameIcon'
import { GiChestArmor, GiMagicSwirl, GiCrossedSwords, GiOpenBook } from 'react-icons/gi'

// ── Static indexes built once at module load ──────────────────────────────────

const ALL_UNITS = (() => {
  const seen = new Set()
  const out = []
  for (const [factionId, list] of Object.entries(FACTION_UNITS)) {
    for (const unit of list) {
      if (!seen.has(unit.id)) {
        seen.add(unit.id)
        out.push({ ...unit, factionId })
      }
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name))
})()

// Separate index for Legends-only units so the overlay can filter them
const ALL_UNITS_NO_LEGENDS = ALL_UNITS.filter(u => !u.legends)

const ALL_ABILITIES = (() => {
  const seen = new Set()
  const out = []
  for (const [factionId, list] of Object.entries(FACTION_UNITS)) {
    for (const unit of list) {
      for (const ab of (unit.abilities || [])) {
        const key = `${unit.id}::${ab.name}`
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ ...ab, unitId: unit.id, unitName: unit.name, factionId, unit: { ...unit, factionId } })
      }
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name))
})()

const ALL_WEAPONS = (() => {
  const seen = new Set()
  const out = []
  for (const [factionId, list] of Object.entries(FACTION_UNITS)) {
    for (const unit of list) {
      for (const w of (unit.weapons || [])) {
        const key = `${unit.id}::${w.name}::${w.type}`
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ ...w, unitId: unit.id, unitName: unit.name, factionId, unit: { ...unit, factionId } })
      }
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name))
})()

const ALL_RULES = Object.entries(KEYWORD_GUIDE).map(([key, entry]) => ({ ...entry, key }))

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_LABEL = {
  epicHero: 'Epic Hero', character: 'Character', battleline: 'Battleline',
  infantry: 'Infantry', cavalry: 'Cavalry', monster: 'Monster', vehicle: 'Vehicle',
}

const PHASE_ICON = {
  command: '📋', movement: '🏃', shooting: '🎯',
  charge: '⚡', fight: '⚔️', any: '✦',
}

const PHASE_COLOR = {
  command: '#c9a84c', movement: '#22c55e', shooting: '#60a5fa',
  charge: '#f97316', fight: '#ef4444', any: '#8899aa',
}

const STAT_KEYS = ['M', 'T', 'Sv', 'W', 'Ld', 'OC']

// ── Datasheet stat block ──────────────────────────────────────────────────────
function StatBlock({ unit, color }) {
  const cols = [...STAT_KEYS, ...(unit.InvSv ? ['InvSv'] : [])]
  return (
    <div className="overflow-hidden rounded-b-xl" style={{ border: `2px solid ${color}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, background: color }}>
        {cols.map(k => (
          <div key={k} className="text-center py-1">
            <p style={{ fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: '0.07em' }}>
              {k === 'InvSv' ? 'INV' : k}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, background: '#0d0e11' }}>
        {cols.map((k, i) => (
          <div key={k} className="text-center py-2.5"
            style={{ borderRight: i < cols.length - 1 ? `1px solid ${color}33` : 'none' }}>
            <p className="font-black" style={{ fontSize: 15, color: '#fff' }}>{unit[k] ?? '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tappable keyword badge with inline explanation ────────────────────────────
function KeywordChip({ kw, color, activeKw, onToggle }) {
  const entry = lookupKeyword(kw)
  const isActive = activeKw === kw
  const hasEntry = !!entry

  return (
    <button
      onClick={hasEntry ? (e) => { e.stopPropagation(); onToggle(kw) } : undefined}
      disabled={!hasEntry}
      className="inline-flex items-center gap-0.5 rounded-md font-bold transition-all"
      style={{
        padding: '2px 6px',
        fontSize: 9,
        background: isActive ? color : `${color}18`,
        color: isActive ? '#0d0e11' : color,
        border: `1px solid ${isActive ? color : `${color}44`}`,
        cursor: hasEntry ? 'pointer' : 'default',
      }}>
      {kw}
      {hasEntry && <span style={{ fontSize: 8, opacity: isActive ? 0.7 : 0.5 }}>?</span>}
    </button>
  )
}

// ── Weapons table with tappable keyword chips ─────────────────────────────────
function WeaponsTable({ weapons, type, color }) {
  const [activeKw, setActiveKw] = useState(null)
  const rows = (weapons || []).filter(w => w.type === type)
  if (!rows.length) return null
  const isRanged = type === 'ranged'
  const activeKwData = activeKw ? lookupKeyword(activeKw) : null

  function toggleKw(kw) {
    setActiveKw(prev => prev === kw ? null : kw)
  }

  return (
    <div>
      <div className="px-3 py-1.5" style={{ background: `${color}22`, borderBottom: `1px solid ${color}44` }}>
        <p style={{ color, fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {isRanged ? 'Ranged Weapons' : 'Melee Weapons'}
        </p>
      </div>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#13151c' }}>
            <th className="text-left px-3 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: '38%' }}>WEAPON</th>
            {isRanged && <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>RANGE</th>}
            <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>A</th>
            <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>{isRanged ? 'BS' : 'WS'}</th>
            <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>S</th>
            <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>AP</th>
            <th className="text-center px-1 py-1.5" style={{ color: '#8899aa', fontSize: 9, fontWeight: 700 }}>D</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((w, i) => (
            <tr key={i} style={{ borderTop: '1px solid #1e2130', background: i % 2 === 0 ? '#0d0e11' : '#11131a' }}>
              <td className="px-3 py-2">
                <p style={{ color: '#e8edf2', fontSize: 11, fontWeight: 700 }}>{w.name}</p>
                {w.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {w.keywords.map((kw, ki) => (
                      <KeywordChip key={ki} kw={kw} color={color}
                        activeKw={activeKw} onToggle={toggleKw} />
                    ))}
                  </div>
                )}
              </td>
              {isRanged && <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{w.range}</td>}
              <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{w.A}</td>
              <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{isRanged ? w.BS : w.WS}</td>
              <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{w.S}</td>
              <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{w.AP}</td>
              <td className="text-center px-1 py-2" style={{ color: '#e8edf2', fontSize: 11 }}>{w.D}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Inline keyword explanation */}
      <AnimatePresence>
        {activeKwData && (
          <motion.div
            key={activeKw}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden">
            <div className="m-3 rounded-xl border p-3" style={{ background: `${color}0d`, borderColor: `${color}44` }}>
              <div className="flex items-start gap-2.5">
                <KeywordIcon keyword={activeKw} size={20} color={color} className="shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-black" style={{ color }}>{activeKw}</p>
                    <p className="text-xs font-semibold" style={{ color: `${color}bb` }}>— {activeKwData.summary}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#c8d4e0', lineHeight: 1.6 }}>
                    {activeKwData.explanation}
                  </p>
                  {activeKwData.example && (
                    <div className="mt-2 rounded-lg px-2.5 py-2" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                      <p style={{ color, fontSize: 8, fontWeight: 900, letterSpacing: '0.08em', marginBottom: 3 }}>EXAMPLE</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#8899aa', lineHeight: 1.5 }}>
                        {activeKwData.example}
                      </p>
                    </div>
                  )}
                </div>
                <button onClick={() => setActiveKw(null)}
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{ background: `${color}22`, color }}>
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Full unit datasheet detail view ──────────────────────────────────────────
function UnitDetail({ unit, theme, onBack, highlightAbility }) {
  const meta = FACTION_META[unit.factionId] || { icon: '⚔️', name: unit.factionId, color: '#c9a84c' }
  const color = meta.color
  const catLabel = CATEGORY_LABEL[unit.category || unit.type] || unit.category || ''
  const imageSearchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(unit.name + ' warhammer 40000')}&iax=images&ia=images`
  const highlightRef = useRef(null)

  useEffect(() => {
    if (highlightAbility && highlightRef.current) {
      setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120)
    }
  }, [highlightAbility])

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>
      <div className="px-3 py-2.5 flex items-center gap-2 shrink-0 border-b"
        style={{ borderColor: theme.border, background: theme.navBg }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          ← Back
        </button>
        <p className="flex-1 text-sm font-bold truncate px-1" style={{ color: theme.textSecondary }}>
          📖 Unit Lookup
        </p>
        <a href={imageSearchUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}`, textDecoration: 'none' }}>
          <span>🖼</span>
          <span className="hidden sm:inline">Images</span>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="m-3 rounded-xl overflow-hidden" style={{ border: `2px solid ${color}`, background: '#0d0e11' }}>

            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3"
              style={{ background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`, borderBottom: `1px solid ${color}55` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                <FactionIcon id={unit.factionId} size={22} color={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-lg leading-tight truncate" style={{ color: '#fff' }}>{unit.name}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <p className="text-xs font-bold" style={{ color }}>{meta.name}</p>
                  {catLabel && <><span style={{ color: `${color}66` }}>·</span><p className="text-xs" style={{ color: '#8899aa' }}>{catLabel}</p></>}
                  {unit.models > 1 && (
                    <><span style={{ color: `${color}66` }}>·</span>
                    <p className="text-xs" style={{ color: '#8899aa' }}>
                      {unit.minModels && unit.maxModels ? `${unit.minModels}–${unit.maxModels} models` : `${unit.models} models`}
                    </p></>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-black leading-none" style={{ color }}>{unit.points}</p>
                <p style={{ color: '#8899aa', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em' }}>POINTS</p>
              </div>
            </div>

            <StatBlock unit={unit} color={color} />

            <div style={{ borderTop: `2px solid ${color}44` }}>
              <WeaponsTable weapons={unit.weapons} type="ranged" color={color} />
              <WeaponsTable weapons={unit.weapons} type="melee" color={color} />
            </div>

            {/* Abilities */}
            {unit.abilities?.length > 0 && (
              <div style={{ borderTop: `2px solid ${color}44` }}>
                <div className="px-3 py-1.5" style={{ background: `${color}22`, borderBottom: `1px solid ${color}44` }}>
                  <p style={{ color, fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Abilities</p>
                </div>
                <div className="px-3 py-2 space-y-2.5">
                  {unit.abilities.map((ab, i) => {
                    const isHighlighted = highlightAbility && ab.name === highlightAbility
                    return (
                      <div key={i}
                        ref={isHighlighted ? highlightRef : null}
                        className="rounded-lg px-2 py-1.5 transition-colors"
                        style={isHighlighted ? { background: `${color}22`, outline: `1px solid ${color}55` } : {}}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span style={{ fontSize: 11 }}>{PHASE_ICON[ab.phase] || '✦'}</span>
                          <p style={{ color, fontSize: 12, fontWeight: 800 }}>{ab.name}</p>
                          <span className="ml-auto text-xs font-bold uppercase shrink-0"
                            style={{ color: '#5a6675', fontSize: 8 }}>{ab.phase}</span>
                        </div>
                        <p style={{ color: '#c8d4e0', fontSize: 11, lineHeight: 1.55 }}>{ab.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Leader info */}
            {unit.isLeader && unit.leadsUnits?.length > 0 && (
              <div style={{ borderTop: `2px solid ${color}44` }}>
                <div className="px-3 py-1.5" style={{ background: `${color}22`, borderBottom: `1px solid ${color}44` }}>
                  <p style={{ color, fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>⭐ Leader — Can Lead</p>
                </div>
                <div className="px-3 py-2.5">
                  <p style={{ color: '#c8d4e0', fontSize: 11, lineHeight: 1.55 }}>{unit.leadsUnits.join(' · ')}</p>
                </div>
              </div>
            )}

            {/* Keywords */}
            {(unit.keywords?.length > 0 || unit.factionKeywords?.length > 0) && (
              <div style={{ borderTop: `2px solid ${color}44` }}>
                <div className="px-3 py-1.5" style={{ background: `${color}22`, borderBottom: `1px solid ${color}44` }}>
                  <p style={{ color, fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Keywords</p>
                </div>
                <div className="px-3 py-2.5">
                  <p style={{ color: '#8899aa', fontSize: 10, lineHeight: 1.7, letterSpacing: '0.04em' }}>
                    {[...(unit.factionKeywords || []), ...(unit.keywords || [])].join(' · ')}
                  </p>
                </div>
              </div>
            )}

          </div>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  )
}

// ── Ability result card ───────────────────────────────────────────────────────
function AbilityCard({ ability, theme, onSelectUnit }) {
  const meta = FACTION_META[ability.factionId] || { icon: '⚔️', color: '#c9a84c', name: ability.factionId }
  const phaseColor = PHASE_COLOR[ability.phase] || '#8899aa'
  const text = ability.description || ability.reminder || ''

  return (
    <button
      onClick={() => onSelectUnit(ability.unit, ability.name)}
      className="w-full rounded-2xl border text-left overflow-hidden"
      style={{ background: theme.surface, borderColor: theme.border }}>

      <div className="px-3 pt-2.5 pb-1.5 flex items-start gap-2">
        <span className="text-base shrink-0 mt-0.5">{PHASE_ICON[ability.phase] || '✦'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-tight" style={{ color: '#fff' }}>{ability.name}</p>
          {ability.phase && (
            <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-md text-xs font-bold uppercase"
              style={{ background: `${phaseColor}20`, color: phaseColor, fontSize: 9, letterSpacing: '0.06em' }}>
              {ability.phase}
            </span>
          )}
        </div>
      </div>

      {text && (
        <p className="px-3 pb-2.5 text-xs leading-relaxed"
          style={{ color: theme.textSecondary, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {text}
        </p>
      )}

      <div className="px-3 py-2 flex items-center gap-1.5 border-t" style={{ borderColor: theme.border, background: theme.surfaceHigh }}>
        <FactionIcon id={ability.factionId} size={13} color={meta.color} />
        <p className="text-xs font-bold truncate flex-1" style={{ color: meta.color }}>{ability.unitName}</p>
        <span className="text-xs shrink-0" style={{ color: theme.textSecondary, opacity: 0.5 }}>
          {meta.name} · tap for datasheet →
        </span>
      </div>
    </button>
  )
}

// ── Weapon search result card ─────────────────────────────────────────────────
function WeaponCard({ weapon, theme, onSelectUnit }) {
  const meta = FACTION_META[weapon.factionId] || { icon: '⚔️', color: '#c9a84c', name: weapon.factionId }
  const isRanged = weapon.type === 'ranged'
  const color = meta.color

  return (
    <button
      onClick={() => onSelectUnit(weapon.unit, null)}
      className="w-full rounded-2xl border text-left overflow-hidden"
      style={{ background: theme.surface, borderColor: theme.border }}>

      <div className="px-3 pt-2.5 pb-1.5 flex items-start gap-2.5">
        <span className="text-base shrink-0 mt-0.5">{isRanged ? '🎯' : '⚔️'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-tight" style={{ color: '#fff' }}>{weapon.name}</p>
          <p className="text-xs mt-0.5" style={{ color: '#8899aa' }}>
            {isRanged ? `${weapon.range}" · ` : ''}
            {weapon.A} attacks · S{weapon.S} · AP{weapon.AP} · D{weapon.D}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-lg"
            style={{ background: `${color}18`, color, border: `1px solid ${color}33`, fontSize: 9 }}>
            {isRanged ? 'RANGED' : 'MELEE'}
          </span>
        </div>
      </div>

      {weapon.keywords?.length > 0 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1">
          {weapon.keywords.map((kw, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded-md font-bold"
              style={{ background: `${color}18`, color, border: `1px solid ${color}33`, fontSize: 9 }}>
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="px-3 py-2 flex items-center gap-1.5 border-t" style={{ borderColor: theme.border, background: theme.surfaceHigh }}>
        <FactionIcon id={weapon.factionId} size={13} color={color} />
        <p className="text-xs font-bold truncate flex-1" style={{ color }}>{weapon.unitName}</p>
        <span className="text-xs shrink-0" style={{ color: theme.textSecondary, opacity: 0.5 }}>
          {meta.name} · tap for datasheet →
        </span>
      </div>
    </button>
  )
}

// ── Rule / keyword reference card ─────────────────────────────────────────────
function RuleCard({ entry, theme }) {
  const [expanded, setExpanded] = useState(false)
  const phaseColor = PHASE_COLOR[entry.phase] || '#8899aa'

  return (
    <button
      onClick={() => setExpanded(e => !e)}
      className="w-full rounded-2xl border text-left overflow-hidden transition-all"
      style={{ background: theme.surface, borderColor: expanded ? phaseColor : theme.border }}>

      <div className="px-3 py-2.5 flex items-center gap-2.5">
        <KeywordIcon keyword={entry.key} size={20} color={phaseColor} className="shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-tight" style={{ color: '#fff' }}>{entry.name}</p>
          <p className="text-xs mt-0.5 font-semibold" style={{ color: phaseColor }}>{entry.summary}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {entry.phase && entry.phase !== 'any' && (
            <span className="px-1.5 py-0.5 rounded-md font-bold uppercase"
              style={{ background: `${phaseColor}20`, color: phaseColor, fontSize: 8, letterSpacing: '0.06em' }}>
              {entry.phase}
            </span>
          )}
          <span style={{ color: theme.textSecondary, fontSize: 10 }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden">
            <div className="px-3 pb-3 border-t" style={{ borderColor: `${phaseColor}33` }}>
              <p className="text-xs leading-relaxed mt-2.5" style={{ color: '#c8d4e0', lineHeight: 1.65 }}>
                {entry.explanation}
              </p>
              {entry.example && (
                <div className="mt-2.5 rounded-xl px-2.5 py-2.5"
                  style={{ background: `${phaseColor}10`, border: `1px solid ${phaseColor}30` }}>
                  <p style={{ color: phaseColor, fontSize: 8, fontWeight: 900, letterSpacing: '0.08em', marginBottom: 4 }}>
                    EXAMPLE
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#8899aa', lineHeight: 1.55 }}>
                    {entry.example}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// ── Search screen ─────────────────────────────────────────────────────────────
export default function UnitLookupOverlay({ theme, onClose }) {
  const [query, setQuery]       = useState('')
  const [mode, setMode]         = useState('units')   // 'units' | 'abilities' | 'weapons' | 'rules'
  const [selected, setSelected] = useState(null)      // { unit, highlightAbility }
  const [showLegends, setShowLegends] = useState(() => localStorage.getItem('w40k-show-legends') === 'true')
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80)
  }, [])

  const unitResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const pool = showLegends ? ALL_UNITS : ALL_UNITS_NO_LEGENDS
    return pool.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.keywords?.some(k => k.toLowerCase().includes(q)) ||
      u.factionKeywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 40)
  }, [query, showLegends])

  const abilityResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_ABILITIES.filter(ab =>
      ab.name.toLowerCase().includes(q) ||
      ab.description?.toLowerCase().includes(q) ||
      ab.reminder?.toLowerCase().includes(q) ||
      ab.unitName.toLowerCase().includes(q)
    ).slice(0, 60)
  }, [query])

  const weaponResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_WEAPONS.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.keywords?.some(k => k.toLowerCase().includes(q)) ||
      w.unitName.toLowerCase().includes(q)
    ).slice(0, 60)
  }, [query])

  const rulesResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_RULES
    return ALL_RULES.filter(entry =>
      entry.name.toLowerCase().includes(q) ||
      entry.summary.toLowerCase().includes(q) ||
      entry.explanation.toLowerCase().includes(q)
    )
  }, [query])

  const activeResults = {
    units: unitResults,
    abilities: abilityResults,
    weapons: weaponResults,
    rules: rulesResults,
  }[mode]

  if (selected) {
    return (
      <UnitDetail
        unit={selected.unit}
        theme={theme}
        onBack={() => setSelected(null)}
        highlightAbility={selected.highlightAbility}
      />
    )
  }

  const MODES = [
    { id: 'units',     Icon: GiChestArmor,   label: 'Units',     count: query ? unitResults.length    : null },
    { id: 'abilities', Icon: GiMagicSwirl,   label: 'Abilities', count: query ? abilityResults.length : null },
    { id: 'weapons',   Icon: GiCrossedSwords, label: 'Weapons',  count: query ? weaponResults.length  : null },
    { id: 'rules',     Icon: GiOpenBook,     label: 'Rules',     count: rulesResults.length },
  ]

  const weaponRuleHints = ['Lance', 'Melta', 'Torrent', 'Heavy', 'Blast', 'Lethal Hits', 'Hazardous']

  return (
    <div className="flex flex-col h-full">

      {/* Search header */}
      <div className="px-3 pt-3 pb-2 shrink-0 border-b" style={{ borderColor: theme.border, background: theme.navBg }}>
        {/* Title row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <GiOpenBook size={16} color={theme.secondary} />
            <p className="text-sm font-black" style={{ color: theme.textPrimary }}>Codex Lookup</p>
          </div>
          <button onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            ✕ Close
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5 mb-2.5"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <span style={{ color: theme.textSecondary, fontSize: 16 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder={
              mode === 'units'     ? 'Search units, characters, keywords…' :
              mode === 'abilities' ? 'Search abilities, rules, effects…'    :
              mode === 'weapons'   ? 'Search weapon name or keyword…'       :
                                    'Search rules, e.g. Lance, Melta, Blast…'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            style={{ color: theme.textPrimary }}
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
              style={{ background: theme.border, color: theme.textSecondary }}>
              ✕
            </button>
          )}
        </div>

        {/* Mode tabs + Legends toggle row */}
        <div className="flex items-center gap-2">
        <div className="flex-1 flex rounded-xl overflow-hidden" style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          {MODES.map(tab => (
            <button key={tab.id} onClick={() => setMode(tab.id)}
              className="flex-1 py-1.5 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              style={{
                background: mode === tab.id ? theme.secondary : 'transparent',
                color: mode === tab.id ? theme.bg : theme.textSecondary,
              }}>
              <tab.Icon size={12} />
              <span className="hidden xs:inline">{tab.label}</span>
              {tab.count !== null && (
                <span className="rounded-full px-1 py-0.5 font-black leading-none"
                  style={{
                    background: mode === tab.id ? 'rgba(0,0,0,0.25)' : theme.border,
                    color: mode === tab.id ? theme.bg : theme.textSecondary,
                    fontSize: 8,
                    minWidth: 16,
                    textAlign: 'center',
                  }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Legends toggle */}
        {(mode === 'units' || mode === 'weapons') && (
          <button
            onClick={() => setShowLegends(prev => {
              const next = !prev
              localStorage.setItem('w40k-show-legends', String(next))
              return next
            })}
            className="shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all"
            style={{
              background: showLegends ? `${theme.secondary}20` : theme.surfaceHigh,
              border: `1px solid ${showLegends ? theme.secondary + '55' : theme.border}`,
            }}>
            <span style={{ fontSize: 12 }}>👻</span>
            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: '0.06em', color: showLegends ? theme.secondary : theme.textSecondary }}>
              {showLegends ? 'ON' : 'OFF'}
            </span>
          </button>
        )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">

        {/* Rules mode: always show something */}
        {mode === 'rules' && (
          <div className="max-w-2xl mx-auto px-3 py-3 space-y-1.5">
            {!query && (
              <div className="mb-3">
                <p className="text-xs font-bold px-1 mb-2" style={{ color: theme.textSecondary }}>
                  Tap any rule to see what it does, how it works, and an example
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {weaponRuleHints.map(hint => (
                    <button key={hint} onClick={() => setQuery(hint)}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      {hint}
                    </button>
                  ))}
                </div>

                {/* Grouped by category */}
                {['weapon', 'unit'].map(cat => {
                  const items = rulesResults.filter(e => e.category === cat)
                  if (!items.length) return null
                  return (
                    <div key={cat} className="mb-4">
                      <p className="text-xs font-black px-1 mb-2 uppercase tracking-widest"
                        style={{ color: theme.textSecondary, opacity: 0.5, fontSize: 9 }}>
                        {cat === 'weapon' ? 'Weapon Traits' : 'Unit Traits'}
                      </p>
                      <div className="space-y-1.5">
                        {items.map(entry => <RuleCard key={entry.key} entry={entry} theme={theme} />)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {query && rulesResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <span style={{ fontSize: 40, opacity: 0.25 }}>🤷</span>
                <p className="text-sm font-bold" style={{ color: theme.textSecondary, opacity: 0.5 }}>
                  No rules found for "{query}"
                </p>
              </div>
            )}

            {query && rulesResults.length > 0 && (
              <>
                <p className="text-xs font-bold px-1 mb-2" style={{ color: theme.textSecondary }}>
                  {rulesResults.length} result{rulesResults.length !== 1 ? 's' : ''}
                </p>
                {rulesResults.map(entry => <RuleCard key={entry.key} entry={entry} theme={theme} />)}
              </>
            )}
            <div style={{ height: 16 }} />
          </div>
        )}

        {/* Units / Abilities / Weapons modes */}
        {mode !== 'rules' && (
          <>
            {!query && (
              <div className="flex flex-col items-center justify-center h-full pb-16 gap-3 px-6">
                <span style={{ fontSize: 48, opacity: 0.2 }}>
                  {mode === 'units' ? '🛡' : mode === 'abilities' ? '✦' : '⚔️'}
                </span>
                <p className="text-sm font-bold text-center" style={{ color: theme.textSecondary, opacity: 0.6 }}>
                  {mode === 'units'     ? 'Full datasheet lookup'     :
                   mode === 'abilities' ? 'Ability & rule lookup'     :
                                         'Weapon profile lookup'}
                </p>
                <p className="text-xs text-center leading-relaxed" style={{ color: theme.textSecondary, opacity: 0.4 }}>
                  {mode === 'units'     ? 'Search by name, keyword like INFANTRY or PSYKER, or faction name' :
                   mode === 'abilities' ? 'Search ability names or description text — e.g. "re-roll", "fight first", "mortal wounds"' :
                                         'Search by weapon name (e.g. "lascannon") or keyword (e.g. "melta", "blast")'}
                </p>
                {mode === 'abilities' && (
                  <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                    {['re-roll', 'fight first', 'mortal wounds', 'deep strike', 'feel no pain'].map(hint => (
                      <button key={hint} onClick={() => setQuery(hint)}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                        {hint}
                      </button>
                    ))}
                  </div>
                )}
                {mode === 'weapons' && (
                  <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                    {['lascannon', 'melta', 'flamer', 'bolter', 'plasma'].map(hint => (
                      <button key={hint} onClick={() => setQuery(hint)}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                        {hint}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {query && activeResults.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full pb-16 gap-2">
                <span style={{ fontSize: 40, opacity: 0.25 }}>🤷</span>
                <p className="text-sm font-bold" style={{ color: theme.textSecondary, opacity: 0.5 }}>
                  No {mode} found for "{query}"
                </p>
                {mode !== 'rules' && (
                  <button onClick={() => setMode('rules')}
                    className="mt-1 px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                    📚 Try Rules lookup instead
                  </button>
                )}
              </div>
            )}

            {query && activeResults.length > 0 && (
              <div className="max-w-2xl mx-auto px-3 py-2 space-y-1.5">
                <p className="text-xs font-bold px-1 mb-2" style={{ color: theme.textSecondary }}>
                  {activeResults.length} result{activeResults.length !== 1 ? 's' : ''}
                  {activeResults.length === 60 && <span style={{ opacity: 0.5 }}> — refine your search</span>}
                </p>

                {mode === 'units' && activeResults.map(unit => {
                  const meta = FACTION_META[unit.factionId] || { icon: '⚔️', color: '#c9a84c', name: unit.factionId }
                  const catLabel = CATEGORY_LABEL[unit.category || unit.type] || ''
                  return (
                    <button key={unit.id} onClick={() => setSelected({ unit, highlightAbility: null })}
                      className="w-full rounded-2xl border px-3 py-2.5 flex items-center gap-3 text-left"
                      style={{ background: theme.surface, borderColor: theme.border }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}22` }}>
                        <FactionIcon id={unit.factionId} size={18} color={meta.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <p className="text-xs" style={{ color: theme.textSecondary }}>{meta.name}</p>
                          {catLabel && <><span style={{ color: theme.border }}>·</span><p className="text-xs" style={{ color: theme.textSecondary }}>{catLabel}</p></>}
                          {unit.models > 1 && <><span style={{ color: theme.border }}>·</span><p className="text-xs" style={{ color: theme.textSecondary }}>{unit.models} models</p></>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-sm font-black" style={{ color: meta.color }}>{unit.points} pts</span>
                        {unit.isLeader && (
                          <span className="text-xs font-bold px-1.5 py-0.5 rounded-lg"
                            style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}33`, fontSize: 9 }}>
                            ⭐ Leader
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}

                {mode === 'abilities' && activeResults.map((ab, i) => (
                  <AbilityCard
                    key={`${ab.unitId}-${ab.name}-${i}`}
                    ability={ab}
                    theme={theme}
                    onSelectUnit={(unit, abilityName) => setSelected({ unit, highlightAbility: abilityName })}
                  />
                ))}

                {mode === 'weapons' && activeResults.map((w, i) => (
                  <WeaponCard
                    key={`${w.unitId}-${w.name}-${i}`}
                    weapon={w}
                    theme={theme}
                    onSelectUnit={(unit) => setSelected({ unit, highlightAbility: null })}
                  />
                ))}

                <div style={{ height: 16 }} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
