import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'

// Flat deduplicated unit index with faction attached
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

const CATEGORY_LABEL = {
  epicHero: 'Epic Hero', character: 'Character', battleline: 'Battleline',
  infantry: 'Infantry', cavalry: 'Cavalry', monster: 'Monster', vehicle: 'Vehicle',
}

const PHASE_ICON = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }

const STAT_KEYS = ['M', 'T', 'Sv', 'W', 'Ld', 'OC']

function StatBlock({ unit, theme }) {
  const cols = [...STAT_KEYS, ...(unit.InvSv ? ['InvSv'] : [])]
  const labels = { InvSv: 'INV' }
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: theme.border }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, background: theme.surfaceHigh }}>
        {cols.map(k => (
          <div key={k} className="text-center py-1.5 border-r last:border-r-0" style={{ borderColor: theme.border }}>
            <p style={{ fontSize: 9, color: theme.textSecondary, fontWeight: 700, letterSpacing: '0.05em' }}>
              {labels[k] || k}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, background: theme.surface }}>
        {cols.map(k => (
          <div key={k} className="text-center py-2 border-r last:border-r-0" style={{ borderColor: theme.border }}>
            <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{unit[k] ?? '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeaponsTable({ weapons, type, theme }) {
  const rows = (weapons || []).filter(w => w.type === type)
  if (!rows.length) return null
  const isRanged = type === 'ranged'
  return (
    <div>
      <p className="text-xs font-bold mb-1.5 uppercase tracking-widest"
        style={{ color: theme.textSecondary, fontSize: 9 }}>
        {isRanged ? '🎯 Ranged' : '⚔️ Melee'}
      </p>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: theme.border }}>
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: theme.surfaceHigh }}>
              <th className="text-left px-2 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>WEAPON</th>
              {isRanged && <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>RNG</th>}
              <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>A</th>
              <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>{isRanged ? 'BS' : 'WS'}</th>
              <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>S</th>
              <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>AP</th>
              <th className="text-center px-1 py-1.5" style={{ color: theme.textSecondary, fontSize: 9, fontWeight: 700 }}>D</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${theme.border}`, background: i % 2 === 0 ? theme.surface : `${theme.surfaceHigh}99` }}>
                <td className="px-2 py-1.5">
                  <p style={{ color: theme.textPrimary, fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>{w.name}</p>
                  {w.keywords?.length > 0 && (
                    <p style={{ color: theme.secondary, fontSize: 9, lineHeight: 1.3 }}>
                      [{w.keywords.join(', ')}]
                    </p>
                  )}
                </td>
                {isRanged && <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{w.range}</td>}
                <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{w.A}</td>
                <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{isRanged ? w.BS : w.WS}</td>
                <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{w.S}</td>
                <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{w.AP}</td>
                <td className="text-center px-1 py-1.5" style={{ color: theme.textPrimary, fontSize: 11 }}>{w.D}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UnitDetail({ unit, theme, onBack }) {
  const meta = FACTION_META[unit.factionId] || { icon: '⚔️', name: unit.factionId, color: '#c9a84c' }
  const catLabel = CATEGORY_LABEL[unit.category || unit.type] || unit.category || ''

  return (
    <div className="flex flex-col h-full">
      {/* Detail header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0"
        style={{ borderColor: theme.border, background: theme.navBg }}>
        <button onClick={onBack}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          ←
        </button>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}33` }}>
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm leading-tight truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>{meta.name}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {catLabel && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              {catLabel}
            </span>
          )}
          <span className="text-xs font-black px-2 py-0.5 rounded-lg"
            style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}33` }}>
            {unit.points} pts
          </span>
        </div>
      </div>

      {/* Detail body */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">

        {/* Stat block */}
        <StatBlock unit={unit} theme={theme} />

        {/* Weapons */}
        <WeaponsTable weapons={unit.weapons} type="ranged" theme={theme} />
        <WeaponsTable weapons={unit.weapons} type="melee" theme={theme} />

        {/* Abilities */}
        {unit.abilities?.length > 0 && (
          <div>
            <p className="text-xs font-bold mb-1.5 uppercase tracking-widest"
              style={{ color: theme.textSecondary, fontSize: 9 }}>
              ✦ Abilities
            </p>
            <div className="space-y-1.5">
              {unit.abilities.map((ab, i) => (
                <div key={i} className="rounded-xl px-3 py-2.5"
                  style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span style={{ fontSize: 11 }}>{PHASE_ICON[ab.phase] || '✦'}</span>
                    <p className="text-xs font-bold" style={{ color: theme.secondary }}>{ab.name}</p>
                    <span className="ml-auto text-xs font-bold uppercase shrink-0"
                      style={{ color: theme.textSecondary, opacity: 0.7, fontSize: 8 }}>
                      {ab.phase}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>{ab.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leader info */}
        {unit.isLeader && unit.leadsUnits?.length > 0 && (
          <div className="rounded-xl px-3 py-2.5"
            style={{ background: `${meta.color}0d`, border: `1px solid ${meta.color}33` }}>
            <p className="text-xs font-bold mb-1" style={{ color: meta.color }}>⭐ Can Lead</p>
            <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>
              {unit.leadsUnits.join(', ')}
            </p>
          </div>
        )}

        {/* Keywords */}
        {(unit.keywords?.length > 0 || unit.factionKeywords?.length > 0) && (
          <div>
            <p className="text-xs font-bold mb-1.5 uppercase tracking-widest"
              style={{ color: theme.textSecondary, fontSize: 9 }}>
              🏷 Keywords
            </p>
            <div className="flex flex-wrap gap-1">
              {[...(unit.factionKeywords || []), ...(unit.keywords || [])].map((kw, i) => (
                <span key={i} className="text-xs font-bold px-2 py-0.5 rounded-lg"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}`, fontSize: 10 }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 16 }} />
      </div>
    </div>
  )
}

export default function UnitLookupOverlay({ theme, onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_UNITS.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.keywords?.some(k => k.toLowerCase().includes(q)) ||
      u.factionKeywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 40)
  }, [query])

  if (selected) {
    return (
      <UnitDetail
        unit={selected}
        theme={theme}
        onBack={() => setSelected(null)}
      />
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search header */}
      <div className="px-3 pt-3 pb-2 shrink-0 border-b" style={{ borderColor: theme.border, background: theme.navBg }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl px-3 py-2.5"
            style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
            <span style={{ color: theme.textSecondary, fontSize: 16 }}>🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search units, characters, keywords…"
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
          <button onClick={onClose}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            ✕
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {!query && (
          <div className="flex flex-col items-center justify-center h-full pb-16 gap-3"
            style={{ color: theme.textSecondary }}>
            <span style={{ fontSize: 48, opacity: 0.3 }}>🔍</span>
            <p className="text-sm font-bold" style={{ opacity: 0.5 }}>Search across all factions</p>
            <p className="text-xs text-center px-8" style={{ opacity: 0.4 }}>
              Unit names, keywords like INFANTRY, PSYKER, VEHICLE…
            </p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full pb-16 gap-2">
            <span style={{ fontSize: 40, opacity: 0.3 }}>🤷</span>
            <p className="text-sm font-bold" style={{ color: theme.textSecondary, opacity: 0.6 }}>No units found</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="px-3 py-2 space-y-1.5">
            <p className="text-xs font-bold px-1 mb-2" style={{ color: theme.textSecondary }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map(unit => {
              const meta = FACTION_META[unit.factionId] || { icon: '⚔️', color: '#c9a84c', name: unit.factionId }
              const catLabel = CATEGORY_LABEL[unit.category || unit.type] || ''
              return (
                <button key={unit.id} onClick={() => setSelected(unit)}
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
                      {catLabel && (
                        <>
                          <span style={{ color: theme.border }}>·</span>
                          <p className="text-xs" style={{ color: theme.textSecondary }}>{catLabel}</p>
                        </>
                      )}
                      {unit.models > 1 && (
                        <>
                          <span style={{ color: theme.border }}>·</span>
                          <p className="text-xs" style={{ color: theme.textSecondary }}>{unit.models} models</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-black" style={{ color: meta.color }}>{unit.points} pts</span>
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
            <div style={{ height: 16 }} />
          </div>
        )}
      </div>
    </div>
  )
}
