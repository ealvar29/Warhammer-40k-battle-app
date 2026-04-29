import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calcMath, avgDice, weaponToParams } from '../utils/mathHammer'

const SHEET_SPRING = { type: 'spring', stiffness: 340, damping: 32 }
const DICE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 'D3', 'D6', 'D6+1', 'D6+2', '2D6']
const STAT_S_T = [1,2,3,4,5,6,7,8,9,10,12,14]
const SAVE_OPTIONS = [2,3,4,5,6,7]

function OptionBtn({ value, selected, label, onClick, theme }) {
  return (
    <button onClick={onClick}
      className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
      style={{
        background: selected ? theme.secondary : theme.surfaceHigh,
        color: selected ? theme.bg : theme.textSecondary,
        border: `1px solid ${selected ? theme.secondary : theme.border}`,
      }}>
      {label ?? value}
    </button>
  )
}

function Toggle({ label, active, onChange, theme, color }) {
  return (
    <button onClick={() => onChange(!active)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all"
      style={{
        background: active ? `${color || theme.secondary}22` : theme.surfaceHigh,
        color: active ? (color || theme.secondary) : theme.textSecondary,
        border: `1px solid ${active ? (color || theme.secondary) : theme.border}`,
      }}>
      <span>{active ? '✓' : '○'}</span>
      {label}
    </button>
  )
}

function ResultBar({ label, value, max, color, theme }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>{label}</p>
        <p className="text-sm font-black" style={{ color }}>{value}</p>
      </div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: theme.border }}>
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

function PickRow({ label, value, options, onChange, theme, formatLabel }) {
  return (
    <div>
      <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>{label}</p>
      <div className="flex flex-wrap gap-1">
        {options.map(o => (
          <OptionBtn key={String(o)} value={o} selected={value === o}
            label={formatLabel ? formatLabel(o) : String(o)}
            onClick={() => onChange(o)} theme={theme} />
        ))}
      </div>
    </div>
  )
}

export default function MathHammerSheet({ weapon, onClose, theme, detachmentBonus }) {
  const init = weaponToParams(weapon)

  const [A, setA] = useState(init.A ?? 4)
  const [hitOn, setHitOn] = useState(init.hitOn ?? 3)
  const [S, setS] = useState(init.S ?? 4)
  const [AP, setAP] = useState(init.AP ?? 0)
  const [D, setD] = useState(init.D ?? 1)
  const [T, setT] = useState(4)
  const [Sv, setSv] = useState(3)
  const [invuln, setInvuln] = useState(null)
  const [fnp, setFnp] = useState(null)
  const [torrent, setTorrent] = useState(init.torrent ?? false)
  const [lethalHits, setLethalHits] = useState(init.lethalHits ?? false)
  const [sustainedHits, setSustainedHits] = useState(init.sustainedHits ?? 0)
  const [devastatingWounds, setDevastatingWounds] = useState(init.devastatingWounds ?? false)
  const [twinLinked, setTwinLinked] = useState(init.twinLinked ?? false)
  const [rerollHitsAll, setRerollHitsAll] = useState(false)
  const [rerollHits1, setRerollHits1] = useState(false)
  const [rerollWoundsAll, setRerollWoundsAll] = useState(false)
  const [rerollWounds1, setRerollWounds1] = useState(false)
  const [tab, setTab] = useState('weapon')
  const [bonusEnabled, setBonusEnabled] = useState(true)

  const effectiveSustainedHits = bonusEnabled && detachmentBonus?.sustainedHits
    ? Math.max(sustainedHits, detachmentBonus.sustainedHits)
    : sustainedHits
  const effectiveLethalHits = (lethalHits || (bonusEnabled && detachmentBonus?.lethalHits)) ?? false

  const result = useMemo(() => calcMath({
    A, hitOn, S, AP, D, T, Sv, invuln, fnp,
    rerollHitsAll, rerollHits1, rerollWoundsAll, rerollWounds1,
    sustainedHits: effectiveSustainedHits,
    lethalHits: effectiveLethalHits,
    devastatingWounds, torrent, twinLinked,
  }), [A, hitOn, S, AP, D, T, Sv, invuln, fnp,
       rerollHitsAll, rerollHits1, rerollWoundsAll, rerollWounds1,
       effectiveSustainedHits, effectiveLethalHits, devastatingWounds, torrent, twinLinked])

  const avgA = avgDice(A)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg flex flex-col rounded-t-3xl"
        style={{ background: theme.bg, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle + header */}
        <div className="px-5 pt-4 pb-3 shrink-0 border-b" style={{ borderColor: theme.border }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
                Combat Calculator
              </p>
              <p className="font-black text-base mt-0.5" style={{ color: theme.textPrimary }}>
                {weapon?.name || 'MathHammer'}
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold mt-1"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
              ✕
            </button>
          </div>
        </div>

        {/* Result always visible */}
        <div className="px-4 pt-3 pb-2 shrink-0">
          <div className="rounded-2xl border p-3" style={{ background: theme.surface, borderColor: theme.border }}>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>
                  Expected Damage
                </p>
                <motion.p
                  key={result.expectedDamage}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="text-3xl font-black leading-none mt-1"
                  style={{ color: theme.secondary }}
                >
                  {result.expectedDamage}
                </motion.p>
              </div>
              <div className="text-right text-xs space-y-0.5" style={{ color: theme.textSecondary }}>
                <p>Wound on <span style={{ color: theme.textPrimary, fontWeight: 700 }}>{result.woundOn}+</span></p>
                {result.effectiveSv && (
                  <p>Eff. save <span style={{ color: theme.textPrimary, fontWeight: 700 }}>{result.effectiveSv}+</span></p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <ResultBar label="Avg Hits" value={result.expectedHits} max={avgA} color={theme.secondary} theme={theme} />
              <ResultBar label="Avg Wounds" value={result.expectedWounds} max={result.expectedHits} color={theme.hpMid || '#f59e0b'} theme={theme} />
              <ResultBar label="Unsaved" value={result.expectedUnsaved} max={result.expectedWounds} color={theme.hpLow} theme={theme} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 mb-2 shrink-0">
          {[['weapon','⚔️','Weapon'],['target','🛡','Target'],['keywords','⚡','Keywords']].map(([id, icon, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: tab === id ? theme.surfaceHigh : 'transparent',
                color: tab === id ? theme.textPrimary : theme.textSecondary,
                border: `1px solid ${tab === id ? theme.border : 'transparent'}`,
              }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {tab === 'weapon' && (
                <div className="rounded-2xl border p-4 space-y-4" style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Weapon Profile</p>
                  <PickRow label="Attacks (A)" value={A}
                    options={[1,2,3,4,5,6,7,8,10,12,'D3','D6','D6+1','D6+2','2D6']}
                    onChange={setA} theme={theme} />
                  <PickRow label="Hit On" value={hitOn} options={[2,3,4,5,6]}
                    formatLabel={o => `${o}+`} onChange={setHitOn} theme={theme} />
                  <PickRow label="Strength" value={S} options={STAT_S_T} onChange={setS} theme={theme} />
                  <PickRow label="AP" value={AP} options={[0,-1,-2,-3,-4,-5,-6]} onChange={setAP} theme={theme} />
                  <PickRow label="Damage (D)" value={D} options={DICE_OPTIONS} onChange={setD} theme={theme} />
                </div>
              )}

              {tab === 'target' && (
                <div className="rounded-2xl border p-4 space-y-4" style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Target Profile</p>
                  <PickRow label="Toughness" value={T} options={STAT_S_T} onChange={setT} theme={theme} />
                  <PickRow label="Save" value={Sv} options={SAVE_OPTIONS}
                    formatLabel={o => `${o}+`} onChange={setSv} theme={theme} />
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Invulnerable Save</p>
                    <div className="flex flex-wrap gap-1">
                      {[null,3,4,5,6].map(o => (
                        <OptionBtn key={String(o)} value={o} selected={invuln === o}
                          label={o === null ? 'None' : `${o}++`}
                          onClick={() => setInvuln(o)} theme={theme} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Feel No Pain</p>
                    <div className="flex flex-wrap gap-1">
                      {[null,4,5,6].map(o => (
                        <OptionBtn key={String(o)} value={o} selected={fnp === o}
                          label={o === null ? 'None' : `${o}+++`}
                          onClick={() => setFnp(o)} theme={theme} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'keywords' && (
                <div className="rounded-2xl border p-4 space-y-3" style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Keywords & Modifiers</p>

                  {/* Detachment adaptation bonus */}
                  {detachmentBonus && (
                    <button
                      onClick={() => setBonusEnabled(e => !e)}
                      className="w-full rounded-xl p-2.5 text-left transition-all"
                      style={{
                        background: bonusEnabled ? `${theme.secondary}18` : theme.surfaceHigh,
                        border: `1px solid ${bonusEnabled ? theme.secondary + '55' : theme.border}`,
                      }}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold" style={{ color: bonusEnabled ? theme.secondary : theme.textSecondary }}>
                          {detachmentBonus.icon} Detachment — {bonusEnabled ? 'Applied' : 'Off'}
                        </p>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg shrink-0"
                          style={{ background: bonusEnabled ? theme.secondary : theme.border, color: bonusEnabled ? theme.bg : theme.textSecondary }}>
                          {bonusEnabled ? '✓ ON' : '○ OFF'}
                        </span>
                      </div>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary, fontSize: 10 }}>
                        {detachmentBonus.label}
                      </p>
                    </button>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <Toggle label="Torrent" active={torrent} onChange={setTorrent} theme={theme} />
                    <Toggle label="Lethal Hits" active={lethalHits} onChange={setLethalHits} theme={theme} />
                    <Toggle label="Dev. Wounds" active={devastatingWounds} onChange={setDevastatingWounds} theme={theme} color={theme.hpLow} />
                    <Toggle label="Twin-linked" active={twinLinked} onChange={setTwinLinked} theme={theme} />
                    <Toggle label="Re-roll Hits" active={rerollHitsAll}
                      onChange={v => { setRerollHitsAll(v); if (v) setRerollHits1(false) }} theme={theme} />
                    <Toggle label="Re-roll Hit 1s" active={rerollHits1}
                      onChange={v => { setRerollHits1(v); if (v) setRerollHitsAll(false) }} theme={theme} />
                    <Toggle label="Re-roll Wounds" active={rerollWoundsAll}
                      onChange={v => { setRerollWoundsAll(v); if (v) setRerollWounds1(false) }} theme={theme} />
                    <Toggle label="Re-roll Wnd 1s" active={rerollWounds1}
                      onChange={v => { setRerollWounds1(v); if (v) setRerollWoundsAll(false) }} theme={theme} />
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Sustained Hits</p>
                    <div className="flex gap-1">
                      {[0,1,2,3].map(n => (
                        <OptionBtn key={n} value={n} selected={sustainedHits === n}
                          label={n === 0 ? 'None' : `+${n}`}
                          onClick={() => setSustainedHits(n)} theme={theme} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
