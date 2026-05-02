import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'

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

// ── Weapons table ─────────────────────────────────────────────────────────────
function WeaponsTable({ weapons, type, color }) {
  const rows = (weapons || []).filter(w => w.type === type)
  if (!rows.length) return null
  const isRanged = type === 'ranged'
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
                  <p style={{ color, fontSize: 9, marginTop: 1 }}>[{w.keywords.join(', ')}]</p>
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                {meta.icon}
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

      {/* Ability header */}
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

      {/* Description */}
      {text && (
        <p className="px-3 pb-2.5 text-xs leading-relaxed"
          style={{ color: theme.textSecondary, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {text}
        </p>
      )}

      {/* Unit footer */}
      <div className="px-3 py-2 flex items-center gap-1.5 border-t" style={{ borderColor: theme.border, background: theme.surfaceHigh }}>
        <span style={{ fontSize: 13 }}>{meta.icon}</span>
        <p className="text-xs font-bold truncate flex-1" style={{ color: meta.color }}>{ability.unitName}</p>
        <span className="text-xs shrink-0" style={{ color: theme.textSecondary, opacity: 0.5 }}>
          {meta.name} · tap for datasheet →
        </span>
      </div>
    </button>
  )
}

// ── Search screen ─────────────────────────────────────────────────────────────
export default function UnitLookupOverlay({ theme, onClose }) {
  const [query, setQuery]       = useState('')
  const [mode, setMode]         = useState('units')   // 'units' | 'abilities'
  const [selected, setSelected] = useState(null)      // { unit, highlightAbility }
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80)
  }, [])

  const unitResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_UNITS.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.keywords?.some(k => k.toLowerCase().includes(q)) ||
      u.factionKeywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 40)
  }, [query])

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

  const results = mode === 'units' ? unitResults : abilityResults

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

  const emptyHint = mode === 'units'
    ? 'Search by name, keyword like INFANTRY or PSYKER, or faction name'
    : 'Search ability names or description text — e.g. "re-roll", "fight first", "mortal wounds"'

  return (
    <div className="flex flex-col h-full">

      {/* Search header */}
      <div className="px-3 pt-3 pb-2 shrink-0 border-b" style={{ borderColor: theme.border, background: theme.navBg }}>
        {/* Title row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 16 }}>📖</span>
            <p className="text-sm font-black" style={{ color: theme.textPrimary }}>Lookup</p>
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
            placeholder={mode === 'units' ? 'Search units, characters, keywords…' : 'Search abilities, rules, effects…'}
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

        {/* Mode tab switcher */}
        <div className="flex rounded-xl overflow-hidden" style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          {[
            { id: 'units',     label: '🛡 Units',     count: query ? unitResults.length : null },
            { id: 'abilities', label: '✦ Abilities',  count: query ? abilityResults.length : null },
          ].map(tab => (
            <button key={tab.id} onClick={() => setMode(tab.id)}
              className="flex-1 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              style={{
                background: mode === tab.id ? theme.secondary : 'transparent',
                color: mode === tab.id ? theme.bg : theme.textSecondary,
              }}>
              {tab.label}
              {tab.count !== null && (
                <span className="rounded-full px-1.5 py-0.5 text-xs font-black leading-none"
                  style={{
                    background: mode === tab.id ? 'rgba(0,0,0,0.25)' : theme.border,
                    color: mode === tab.id ? theme.bg : theme.textSecondary,
                    fontSize: 9,
                  }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {!query && (
          <div className="flex flex-col items-center justify-center h-full pb-16 gap-3 px-6">
            <span style={{ fontSize: 48, opacity: 0.2 }}>
              {mode === 'units' ? '🛡' : '✦'}
            </span>
            <p className="text-sm font-bold text-center" style={{ color: theme.textSecondary, opacity: 0.6 }}>
              {mode === 'units' ? 'Full datasheet lookup' : 'Ability & rule lookup'}
            </p>
            <p className="text-xs text-center leading-relaxed" style={{ color: theme.textSecondary, opacity: 0.4 }}>
              {emptyHint}
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
          </div>
        )}

        {query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full pb-16 gap-2">
            <span style={{ fontSize: 40, opacity: 0.25 }}>🤷</span>
            <p className="text-sm font-bold" style={{ color: theme.textSecondary, opacity: 0.5 }}>
              No {mode} found
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="max-w-2xl mx-auto px-3 py-2 space-y-1.5">
            <p className="text-xs font-bold px-1 mb-2" style={{ color: theme.textSecondary }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
              {results.length === 60 && <span style={{ opacity: 0.5 }}> — refine your search</span>}
            </p>

            {mode === 'units' && results.map(unit => {
              const meta = FACTION_META[unit.factionId] || { icon: '⚔️', color: '#c9a84c', name: unit.factionId }
              const catLabel = CATEGORY_LABEL[unit.category || unit.type] || ''
              return (
                <button key={unit.id} onClick={() => setSelected({ unit, highlightAbility: null })}
                  className="w-full rounded-2xl border px-3 py-2.5 flex items-center gap-3 text-left"
                  style={{ background: theme.surface, borderColor: theme.border }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}22` }}>
                    {meta.icon}
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

            {mode === 'abilities' && results.map((ab, i) => (
              <AbilityCard
                key={`${ab.unitId}-${ab.name}-${i}`}
                ability={ab}
                theme={theme}
                onSelectUnit={(unit, abilityName) => setSelected({ unit, highlightAbility: abilityName })}
              />
            ))}

            <div style={{ height: 16 }} />
          </div>
        )}
      </div>
    </div>
  )
}
