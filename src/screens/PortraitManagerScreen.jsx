import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'
import { FactionIcon } from '../components/GameIcon'
import { usePortraitStore } from '../store/portraitStore'

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }

const POSITION_OPTIONS = [
  { label: 'Center', value: 'center center' },
  { label: 'Top',    value: 'center top' },
  { label: 'Bottom', value: 'center bottom' },
  { label: 'Left',   value: 'left center' },
  { label: 'Right',  value: 'right center' },
]

const CATEGORY_ORDER = ['epicHero', 'character', 'battleline', 'infantry', 'cavalry', 'vehicle', 'monster', 'transport']
const CATEGORY_LABEL = {
  epicHero:   'Epic Heroes',
  character:  'Characters',
  battleline: 'Battleline',
  infantry:   'Infantry',
  cavalry:    'Cavalry',
  vehicle:    'Vehicles',
  monster:    'Monsters',
  transport:  'Transports',
}

// All factions that have data
const FACTIONS = Object.keys(FACTION_UNITS).filter(k => FACTION_UNITS[k]?.length > 0)

function UnitPortraitTile({ unit, portrait, onEdit, theme }) {
  const artUrl = portrait?.artUrl ?? unit.artUrl ?? null
  const artPos = portrait?.artPosition ?? unit.artPosition ?? 'center center'
  const hasArt = !!artUrl

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onEdit(unit)}
      className="flex flex-col overflow-hidden rounded-2xl border relative"
      style={{
        background: theme.surface,
        borderColor: portrait ? theme.secondary : theme.border,
        boxShadow: portrait ? `0 0 0 1px ${theme.secondary}44` : 'none',
        height: 120,
      }}
    >
      {/* Portrait area */}
      <div className="flex-1 relative overflow-hidden">
        {hasArt ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: artPos,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: theme.surfaceHigh }}>
            <span style={{ fontSize: 28, opacity: 0.2 }}>🖼</span>
          </div>
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

        {/* custom badge */}
        {portrait && (
          <div className="absolute top-1.5 right-1.5">
            <span className="text-xs font-black px-1.5 py-0.5 rounded-full"
              style={{ background: theme.secondary, color: theme.bg, fontSize: 8 }}>✓</span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5">
        <p className="text-xs font-bold leading-tight truncate text-left"
          style={{ color: '#fff' }}>
          {unit.name}
        </p>
      </div>
    </motion.button>
  )
}

function EditPortraitSheet({ unit, portrait, onSave, onClear, onClose, theme }) {
  const [url, setUrl]         = useState(portrait?.artUrl ?? '')
  const [pos, setPos]         = useState(portrait?.artPosition ?? 'center center')
  const [preview, setPreview] = useState(portrait?.artUrl ?? '')
  const [imgError, setImgError] = useState(false)
  const inputRef = useRef(null)

  const handleUrlChange = (val) => {
    setUrl(val)
    setImgError(false)
    if (val.startsWith('http')) setPreview(val)
    else setPreview('')
  }

  const handleSave = () => {
    if (!url.trim()) return
    onSave(unit.id, url.trim(), pos)
    onClose()
  }

  const defaultArt = unit.artUrl ?? null
  const displayArt = preview || defaultArt

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-t-3xl flex flex-col overflow-hidden"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '92vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="pt-4 pb-2 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: theme.border }} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-black text-base" style={{ color: theme.textPrimary }}>{unit.name}</h2>
              <p className="text-xs mt-0.5 font-medium uppercase tracking-wider"
                style={{ color: theme.textSecondary }}>{unit.category}</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>✕</button>
          </div>

          {/* Preview */}
          <div className="rounded-2xl overflow-hidden mb-4 relative"
            style={{ height: 180, background: theme.surfaceHigh }}>
            {displayArt && !imgError ? (
              <>
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${displayArt})`,
                    backgroundSize: 'cover',
                    backgroundPosition: pos,
                  }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <img src={displayArt} alt="" className="hidden"
                  onError={() => setImgError(true)} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <span style={{ fontSize: 36, opacity: 0.2 }}>🖼</span>
                <p className="text-xs" style={{ color: theme.textSecondary }}>
                  {imgError ? 'Could not load image' : 'Paste a URL below to preview'}
                </p>
              </div>
            )}
            {preview && !imgError && (
              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                  style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>Preview</span>
              </div>
            )}
          </div>

          {/* URL input */}
          <div className="mb-4">
            <label className="text-xs font-black tracking-widest uppercase mb-2 block"
              style={{ color: theme.textSecondary }}>Image URL</label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={url}
                onChange={e => handleUrlChange(e.target.value)}
                placeholder="https://warhammer-community.com/..."
                className="flex-1 rounded-xl px-3 py-2.5 text-xs font-medium outline-none"
                style={{
                  background: theme.surfaceHigh,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.border}`,
                }}
                autoFocus
              />
              {url && (
                <button onClick={() => { setUrl(''); setPreview(''); setImgError(false) }}
                  className="w-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                  ✕
                </button>
              )}
            </div>
            <p className="text-xs mt-1.5" style={{ color: theme.textSecondary, opacity: 0.6 }}>
              Right-click any image on Warhammer Community → Copy image address
            </p>
          </div>

          {/* Position picker */}
          <div className="mb-5">
            <label className="text-xs font-black tracking-widest uppercase mb-2 block"
              style={{ color: theme.textSecondary }}>Focus Point</label>
            <div className="flex gap-2 flex-wrap">
              {POSITION_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => setPos(opt.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: pos === opt.value ? `${theme.secondary}22` : theme.surfaceHigh,
                    color: pos === opt.value ? theme.secondary : theme.textSecondary,
                    border: `1px solid ${pos === opt.value ? theme.secondary : theme.border}`,
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-8 pt-3 space-y-2 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
            disabled={!url.trim()}
            className="w-full py-3 rounded-2xl font-black text-sm transition-all"
            style={{
              background: url.trim() ? theme.secondary : theme.surfaceHigh,
              color: url.trim() ? theme.bg : theme.textSecondary,
              opacity: url.trim() ? 1 : 0.5,
            }}>
            Save Portrait
          </motion.button>
          {portrait && (
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => { onClear(unit.id); onClose() }}
              className="w-full py-2.5 rounded-2xl font-bold text-sm"
              style={{ background: `${theme.hpLow}15`, color: theme.hpLow, border: `1px solid ${theme.hpLow}33` }}>
              Remove Custom Portrait
            </motion.button>
          )}
          <button onClick={onClose} className="w-full py-2 text-xs font-medium"
            style={{ color: theme.textSecondary }}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortraitManagerScreen({ theme, onNavigate }) {
  const { portraits, setPortrait, clearPortrait } = usePortraitStore()
  const [activeFaction, setActiveFaction] = useState(FACTIONS[0])
  const [editingUnit, setEditingUnit] = useState(null)
  const [search, setSearch] = useState('')

  const factionMeta  = FACTION_META[activeFaction] ?? {}
  const allUnits     = FACTION_UNITS[activeFaction] ?? []
  const filtered     = search.trim()
    ? allUnits.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    : allUnits

  // Group by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const units = filtered.filter(u => u.category === cat || u.type === cat)
    if (units.length) acc[cat] = units
    return acc
  }, {})

  // Stats
  const totalWithPortrait = Object.keys(portraits).length
  const factionWithPortrait = allUnits.filter(u => portraits[u.id]).length

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg, fontFamily: theme.font }}>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b shrink-0 flex items-center gap-3"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate?.('home')}
          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </motion.button>
        <div className="flex-1 min-w-0">
          <h1 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>Portrait Manager</h1>
          <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
            {totalWithPortrait} portrait{totalWithPortrait !== 1 ? 's' : ''} added
          </p>
        </div>
      </div>

      {/* Faction selector */}
      <div className="shrink-0 overflow-x-auto border-b" style={{ borderColor: theme.border, background: theme.surface }}>
        <div className="flex gap-1 px-3 py-2" style={{ width: 'max-content' }}>
          {FACTIONS.map(fk => {
            const meta   = FACTION_META[fk] ?? {}
            const units  = FACTION_UNITS[fk] ?? []
            const filled = units.filter(u => portraits[u.id]).length
            const isActive = activeFaction === fk
            return (
              <motion.button key={fk} whileTap={{ scale: 0.94 }}
                onClick={() => { setActiveFaction(fk); setSearch('') }}
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl shrink-0 relative"
                style={{
                  background: isActive ? `${theme.secondary}18` : 'transparent',
                  border: `1px solid ${isActive ? theme.secondary : 'transparent'}`,
                  minWidth: 64,
                }}>
                <FactionIcon id={fk} size={18} color={isActive ? theme.secondary : theme.textSecondary} />
                <span className="text-xs font-bold leading-tight text-center"
                  style={{ color: isActive ? theme.secondary : theme.textSecondary, fontSize: 9, maxWidth: 56 }}>
                  {meta.name ?? fk}
                </span>
                {filled > 0 && (
                  <span className="absolute top-1 right-1 font-black rounded-full leading-none"
                    style={{ background: theme.secondary, color: theme.bg, fontSize: 8, padding: '1px 4px' }}>
                    {filled}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Search + faction stats */}
      <div className="px-4 py-2.5 shrink-0 border-b flex items-center gap-3" style={{ borderColor: theme.border }}>
        <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <span style={{ color: theme.textSecondary, fontSize: 12 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${factionMeta.name ?? activeFaction} units…`}
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ color: theme.textPrimary }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ color: theme.textSecondary, fontSize: 11 }}>✕</button>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-black" style={{ color: theme.textPrimary }}>{factionWithPortrait}/{allUnits.length}</p>
          <p style={{ color: theme.textSecondary, fontSize: 9 }}>DONE</p>
        </div>
      </div>

      {/* Unit grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {Object.entries(grouped).length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>No units found</p>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, units]) => (
            <div key={cat} className="mt-4">
              <p className="text-xs font-black tracking-widest uppercase mb-2 px-0.5"
                style={{ color: theme.textSecondary }}>
                {CATEGORY_LABEL[cat] ?? cat}
                <span className="ml-2 font-bold opacity-50">{units.filter(u => portraits[u.id]).length}/{units.length}</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {units.map(unit => (
                  <UnitPortraitTile
                    key={unit.id}
                    unit={unit}
                    portrait={portraits[unit.id] ?? null}
                    onEdit={setEditingUnit}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit sheet */}
      <AnimatePresence>
        {editingUnit && (
          <EditPortraitSheet
            unit={editingUnit}
            portrait={portraits[editingUnit.id] ?? null}
            onSave={setPortrait}
            onClear={clearPortrait}
            onClose={() => setEditingUnit(null)}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
