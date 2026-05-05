import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCrossedSwords, GiShieldBash, GiLightningTrio } from 'react-icons/gi'

// ── 10th ed wound roll table ──────────────────────────────────────────────────
function woundThreshold(S, T) {
  if (S >= T * 2) return 2
  if (S > T) return 3
  if (S === T) return 4
  if (S * 2 > T) return 5
  return 6
}

function avgDice(val) {
  if (typeof val === 'number') return val
  const s = String(val).toUpperCase().trim()
  if (s === 'D6') return 3.5
  if (s === 'D3') return 2
  if (s === '2D6') return 7
  if (s.startsWith('D6+')) return 3.5 + Number(s.slice(3))
  if (s.startsWith('D3+')) return 2 + Number(s.slice(3))
  return Number(s) || 1
}

function pAtLeast(n) {
  if (n <= 1) return 1
  if (n > 6) return 0
  return (7 - n) / 6
}

function calcMath({ A, hitOn, S, AP, D, T, Sv, invuln, fnp,
  rerollHitsAll, rerollHits1, rerollWoundsAll, rerollWounds1,
  sustainedHits, lethalHits, devastatingWounds, torrent, twinLinked }) {

  const avgA = avgDice(A)
  const avgD = avgDice(D)
  const pCrit = 1 / 6

  // Hits
  let pHit = torrent ? 1 : pAtLeast(hitOn)
  if (!torrent && rerollHitsAll) pHit = pHit + (1 - pHit) * pHit
  else if (!torrent && rerollHits1) pHit = pHit + pCrit * pAtLeast(hitOn)

  const sustainedExtra = sustainedHits > 0 ? pCrit * sustainedHits : 0
  const expectedHits = avgA * (pHit + sustainedExtra)

  let expectedLethalWounds = 0
  let hitsForWound = avgA * pHit
  if (lethalHits) {
    expectedLethalWounds = avgA * pCrit
    hitsForWound = avgA * Math.max(0, pHit - pCrit)
  }

  // Wounds
  const woundOn = woundThreshold(S, T)
  let pWound = pAtLeast(woundOn)
  if (twinLinked || rerollWoundsAll) pWound = pWound + (1 - pWound) * pWound
  else if (rerollWounds1) pWound = pWound + pCrit * pAtLeast(woundOn)

  let expectedDevWounds = 0
  let expectedNormalWounds = hitsForWound * pWound
  if (devastatingWounds) {
    expectedDevWounds = hitsForWound * pCrit
    expectedNormalWounds = hitsForWound * Math.max(0, pWound - pCrit)
  }
  const expectedWounds = expectedNormalWounds + expectedLethalWounds + expectedDevWounds

  // Saves
  const modSv = Sv - AP
  const effectiveSv = invuln ? Math.min(modSv, invuln) : modSv
  const pSave = effectiveSv <= 6 ? pAtLeast(effectiveSv) : 0
  const unsavedNormal = (expectedNormalWounds + expectedLethalWounds) * (1 - pSave)
  const expectedUnsaved = unsavedNormal + expectedDevWounds

  // FNP
  const finalUnsaved = (fnp && fnp <= 6) ? expectedUnsaved * (1 - pAtLeast(fnp)) : expectedUnsaved

  return {
    expectedHits: +expectedHits.toFixed(2),
    woundOn,
    expectedWounds: +expectedWounds.toFixed(2),
    effectiveSv: effectiveSv > 6 ? null : effectiveSv,
    expectedUnsaved: +finalUnsaved.toFixed(2),
    expectedDamage: +(finalUnsaved * avgD).toFixed(2),
  }
}

// ── Input helpers ─────────────────────────────────────────────────────────────
const DICE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 'D3', 'D6', 'D6+1', 'D6+2', '2D6']
const STAT_OPTIONS = { hitOn: [2,3,4,5], S: [1,2,3,4,5,6,7,8,9,10,12,14], T: [2,3,4,5,6,7,8,9,10,12,14] }
const SAVE_OPTIONS = [2,3,4,5,6,7]

function StatPicker({ label, value, options, onChange, theme }) {
  return (
    <div>
      <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>{label}</p>
      <div className="flex flex-wrap gap-1">
        {options.map(o => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
            style={{
              background: value === o ? theme.secondary : theme.surfaceHigh,
              color: value === o ? theme.bg : theme.textSecondary,
              border: `1px solid ${value === o ? theme.secondary : theme.border}`,
            }}
          >
            {o}{label === 'Hit On' || label === 'Save' ? '+' : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

function Toggle({ label, active, onChange, theme, color }) {
  return (
    <button
      onClick={() => onChange(!active)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all"
      style={{
        background: active ? `${color || theme.secondary}22` : theme.surfaceHigh,
        color: active ? (color || theme.secondary) : theme.textSecondary,
        border: `1px solid ${active ? (color || theme.secondary) : theme.border}`,
      }}
    >
      <span>{active ? '✓' : '○'}</span>
      {label}
    </button>
  )
}

// ── Result bar ────────────────────────────────────────────────────────────────
function ResultBar({ label, value, max, color, theme }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>{label}</p>
        <p className="text-sm font-black" style={{ color }}>{value}</p>
      </div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: theme.border }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function MathHammerScreen({ theme }) {
  // Weapon
  const [A, setA] = useState(4)
  const [hitOn, setHitOn] = useState(3)
  const [S, setS] = useState(4)
  const [AP, setAP] = useState(0)
  const [D, setD] = useState(1)
  // Target
  const [T, setT] = useState(4)
  const [Sv, setSv] = useState(3)
  const [invuln, setInvuln] = useState(null)
  const [fnp, setFnp] = useState(null)
  // Keywords / modifiers
  const [torrent, setTorrent] = useState(false)
  const [lethalHits, setLethalHits] = useState(false)
  const [sustainedHits, setSustainedHits] = useState(0)
  const [devastatingWounds, setDevastatingWounds] = useState(false)
  const [twinLinked, setTwinLinked] = useState(false)
  const [rerollHitsAll, setRerollHitsAll] = useState(false)
  const [rerollHits1, setRerollHits1] = useState(false)
  const [rerollWoundsAll, setRerollWoundsAll] = useState(false)
  const [rerollWounds1, setRerollWounds1] = useState(false)
  const [section, setSection] = useState('weapon') // 'weapon' | 'target' | 'keywords'

  const result = useMemo(() => calcMath({
    A, hitOn, S, AP, D, T, Sv, invuln: invuln || null, fnp: fnp || null,
    rerollHitsAll, rerollHits1, rerollWoundsAll, rerollWounds1,
    sustainedHits, lethalHits, devastatingWounds, torrent, twinLinked,
  }), [A, hitOn, S, AP, D, T, Sv, invuln, fnp, rerollHitsAll, rerollHits1,
       rerollWoundsAll, rerollWounds1, sustainedHits, lethalHits, devastatingWounds, torrent, twinLinked])

  const avgAttacks = avgDice(A)
  const TABS = [
    { id: 'weapon',   label: 'Weapon',   Icon: GiCrossedSwords },
    { id: 'target',   label: 'Target',   Icon: GiShieldBash },
    { id: 'keywords', label: 'Keywords', Icon: GiLightningTrio },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg, fontFamily: theme.font }}>

      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b shrink-0" style={{ background: theme.surface, borderColor: theme.border }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: theme.secondary }}>Combat Calculator</p>
        <h1 className="text-xl font-black" style={{ color: theme.textPrimary }}>MathHammer</h1>
      </div>

      {/* Result display — always visible */}
      <div className="px-4 pt-4 shrink-0">
        <div className="rounded-2xl border p-4" style={{ background: theme.surface, borderColor: theme.border }}>
          {/* Big damage number */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Expected Damage</p>
              <motion.p
                key={result.expectedDamage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="text-4xl font-black leading-none mt-1"
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
          {/* Breakdown bars */}
          <div className="space-y-2.5">
            <ResultBar label="Avg Hits" value={result.expectedHits} max={avgAttacks} color={theme.secondary} theme={theme} />
            <ResultBar label="Avg Wounds" value={result.expectedWounds} max={result.expectedHits} color={theme.hpMid || '#f59e0b'} theme={theme} />
            <ResultBar label="Unsaved" value={result.expectedUnsaved} max={result.expectedWounds} color={theme.hpLow} theme={theme} />
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 px-4 mt-3 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSection(tab.id)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: section === tab.id ? theme.surfaceHigh : 'transparent',
              color: section === tab.id ? theme.textPrimary : theme.textSecondary,
              border: `1px solid ${section === tab.id ? theme.border : 'transparent'}`,
            }}
          >
            <tab.Icon size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-5"
          >
            {section === 'weapon' && (
              <>
                <div className="rounded-2xl border p-4 space-y-4" style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Weapon Profile</p>
                  {/* Attacks */}
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Attacks (A)</p>
                    <div className="flex flex-wrap gap-1">
                      {DICE_OPTIONS.filter(o => ['D3','D6','D6+1','2D6',1,2,3,4,5,6,8,10,12].includes(o)).map(o => (
                        <button key={o} onClick={() => setA(o)}
                          className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: A === o ? theme.secondary : theme.surfaceHigh,
                            color: A === o ? theme.bg : theme.textSecondary,
                            border: `1px solid ${A === o ? theme.secondary : theme.border}`,
                          }}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <StatPicker label="Hit On" value={hitOn} options={[2,3,4,5,6]} onChange={setHitOn} theme={theme} />
                  <StatPicker label="Strength" value={S} options={STAT_OPTIONS.S} onChange={setS} theme={theme} />
                  {/* AP */}
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>AP</p>
                    <div className="flex flex-wrap gap-1">
                      {[0,-1,-2,-3,-4,-5,-6].map(o => (
                        <button key={o} onClick={() => setAP(o)}
                          className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: AP === o ? theme.secondary : theme.surfaceHigh,
                            color: AP === o ? theme.bg : theme.textSecondary,
                            border: `1px solid ${AP === o ? theme.secondary : theme.border}`,
                          }}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Damage */}
                  <div>
                    <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Damage (D)</p>
                    <div className="flex flex-wrap gap-1">
                      {DICE_OPTIONS.map(o => (
                        <button key={o} onClick={() => setD(o)}
                          className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: D === o ? theme.secondary : theme.surfaceHigh,
                            color: D === o ? theme.bg : theme.textSecondary,
                            border: `1px solid ${D === o ? theme.secondary : theme.border}`,
                          }}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {section === 'target' && (
              <div className="rounded-2xl border p-4 space-y-4" style={{ background: theme.surface, borderColor: theme.border }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Target Profile</p>
                <StatPicker label="Toughness" value={T} options={STAT_OPTIONS.T} onChange={setT} theme={theme} />
                <StatPicker label="Save" value={Sv} options={SAVE_OPTIONS} onChange={setSv} theme={theme} />
                {/* Invuln */}
                <div>
                  <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Invulnerable Save</p>
                  <div className="flex flex-wrap gap-1">
                    {[null, 3, 4, 5, 6].map(o => (
                      <button key={String(o)} onClick={() => setInvuln(o)}
                        className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: invuln === o ? theme.secondary : theme.surfaceHigh,
                          color: invuln === o ? theme.bg : theme.textSecondary,
                          border: `1px solid ${invuln === o ? theme.secondary : theme.border}`,
                        }}>
                        {o === null ? 'None' : `${o}++`}
                      </button>
                    ))}
                  </div>
                </div>
                {/* FNP */}
                <div>
                  <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Feel No Pain</p>
                  <div className="flex flex-wrap gap-1">
                    {[null, 4, 5, 6].map(o => (
                      <button key={String(o)} onClick={() => setFnp(o)}
                        className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: fnp === o ? theme.secondary : theme.surfaceHigh,
                          color: fnp === o ? theme.bg : theme.textSecondary,
                          border: `1px solid ${fnp === o ? theme.secondary : theme.border}`,
                        }}>
                        {o === null ? 'None' : `${o}+++`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === 'keywords' && (
              <div className="rounded-2xl border p-4 space-y-3" style={{ background: theme.surface, borderColor: theme.border }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.secondary }}>Weapon Keywords & Modifiers</p>
                <div className="grid grid-cols-2 gap-2">
                  <Toggle label="Torrent" active={torrent} onChange={setTorrent} theme={theme} />
                  <Toggle label="Lethal Hits" active={lethalHits} onChange={setLethalHits} theme={theme} />
                  <Toggle label="Dev. Wounds" active={devastatingWounds} onChange={setDevastatingWounds} theme={theme} color={theme.hpLow} />
                  <Toggle label="Twin-linked" active={twinLinked} onChange={setTwinLinked} theme={theme} />
                  <Toggle label="Re-roll Hits" active={rerollHitsAll} onChange={v => { setRerollHitsAll(v); if(v) setRerollHits1(false) }} theme={theme} />
                  <Toggle label="Re-roll Hit 1s" active={rerollHits1} onChange={v => { setRerollHits1(v); if(v) setRerollHitsAll(false) }} theme={theme} />
                  <Toggle label="Re-roll Wounds" active={rerollWoundsAll} onChange={v => { setRerollWoundsAll(v); if(v) setRerollWounds1(false) }} theme={theme} />
                  <Toggle label="Re-roll Wnd 1s" active={rerollWounds1} onChange={v => { setRerollWounds1(v); if(v) setRerollWoundsAll(false) }} theme={theme} />
                </div>
                {/* Sustained Hits */}
                <div>
                  <p className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: theme.textSecondary }}>Sustained Hits</p>
                  <div className="flex gap-1">
                    {[0,1,2,3].map(n => (
                      <button key={n} onClick={() => setSustainedHits(n)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: sustainedHits === n ? theme.secondary : theme.surfaceHigh,
                          color: sustainedHits === n ? theme.bg : theme.textSecondary,
                          border: `1px solid ${sustainedHits === n ? theme.secondary : theme.border}`,
                        }}>
                        {n === 0 ? 'Off' : `+${n}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
