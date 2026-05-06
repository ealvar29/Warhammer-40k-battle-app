// Interactive layout prototype — compare Concept A / B / C for the battle phase screen.
// Eduardo uses this to pick a direction before we implement the winner.

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhaseIcon } from './GameIcon'
import { PHASES } from '../data/editionConfig'

const ACCENT = {
  command: '#c9a84c', movement: '#22c55e', shooting: '#60a5fa',
  charge: '#f97316', fight: '#ef4444',
}

// Self-contained demo units — no store imports needed
const PROTO_UNITS = [
  {
    id: 'ragnar', name: 'Ragnar Blackmane', role: 'Epic Hero',
    M: '6"', T: 4, Sv: '3+', OC: 1, W: 5, maxW: 5,
    rangedA: 1, meleeA: 6, isLeader: true,
    commandAbility: null,
    movementAbility: null,
    shootingAbility: 'Bolt Pistol — 1 attack, 12" range, S4 AP0',
    chargeAbility: 'Battle-lust — adds 3" to charge move, advance & charge eligible',
    fightAbility: 'Wolf-kin — this unit fights first after charging',
    weapons: [
      { name: 'Frostfang', type: 'melee', A: 6, S: 6, AP: -3, D: 2, skill: '2+' },
      { name: 'Bolt Pistol', type: 'ranged', A: 1, range: '12"', S: 4, AP: 0, D: 1, skill: '3+' },
    ],
  },
  {
    id: 'logan', name: 'Logan Grimnar', role: 'Legendary Hero',
    M: '6"', T: 4, Sv: '2+', OC: 1, W: 6, maxW: 6,
    rangedA: 0, meleeA: 5, isLeader: true,
    commandAbility: 'High King of Fenris — gain 1 CP at the start of your Command phase',
    movementAbility: null,
    shootingAbility: null,
    chargeAbility: null,
    fightAbility: 'Guile of the Wolf (Aura) — re-roll all hit rolls for friendly units within 6"',
    weapons: [
      { name: 'Axe Morkai', type: 'melee', A: 5, S: 8, AP: -2, D: 3, skill: '2+' },
    ],
  },
  {
    id: 'bloodclaws', name: 'Blood Claws', role: 'Infantry · 10 models',
    M: '6"', T: 4, Sv: '3+', OC: 2, W: 10, maxW: 10,
    rangedA: 1, meleeA: 3, isLeader: false,
    commandAbility: null,
    movementAbility: 'Advance — push toward the enemy, add D6" to move',
    shootingAbility: 'Bolt Pistols — 1 attack each, 12" range, S4 AP0',
    chargeAbility: null,
    fightAbility: 'Savage Fighter — +1 Attack on melee weapons if this unit charged this turn',
    weapons: [
      { name: 'Chainsword', type: 'melee', A: 3, S: 4, AP: -1, D: 1, skill: '3+' },
      { name: 'Bolt Pistol', type: 'ranged', A: 1, range: '12"', S: 4, AP: 0, D: 1, skill: '3+' },
    ],
  },
  {
    id: 'terminators', name: 'Wolf Guard Terminators', role: 'Infantry · 5 models',
    M: '5"', T: 5, Sv: '2+', OC: 2, W: 5, maxW: 5,
    rangedA: 2, meleeA: 4, isLeader: false,
    commandAbility: null,
    movementAbility: null,
    shootingAbility: 'Storm Bolters — 2 attacks each, rapid fire, S4 AP0',
    chargeAbility: null,
    fightAbility: 'Rugged Resilience — 6+ Feel No Pain save in Fight phase',
    weapons: [
      { name: 'Storm Bolter', type: 'ranged', A: 2, range: '24"', S: 4, AP: 0, D: 1, skill: '3+' },
      { name: 'Power Fist', type: 'melee', A: 4, S: 8, AP: -2, D: 2, skill: '4+' },
    ],
  },
]

function getPhaseAbility(unit, phaseId) {
  if (phaseId === 'command')  return unit.commandAbility
  if (phaseId === 'movement') return unit.movementAbility
  if (phaseId === 'shooting') return unit.shootingAbility
  if (phaseId === 'charge')   return unit.chargeAbility
  if (phaseId === 'fight')    return unit.fightAbility
  return null
}

function isActiveThisPhase(unit, phaseId) {
  if (phaseId === 'shooting') return unit.rangedA > 0
  if (phaseId === 'charge' || phaseId === 'fight') return unit.meleeA > 0
  return true
}

function getAttacks(unit, phaseId) {
  if (phaseId === 'shooting') return unit.rangedA
  if (phaseId === 'fight' || phaseId === 'charge') return unit.meleeA
  return null
}

// ── Shared micro-components ───────────────────────────────────────────────────

function HpBar({ pct, theme }) {
  const color = pct > 0.6 ? '#22c55e' : pct > 0.3 ? '#f59e0b' : '#ef4444'
  return (
    <div className="w-full rounded-full h-1 overflow-hidden mt-1.5 mb-0.5" style={{ background: theme.border }}>
      <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: color }} />
    </div>
  )
}

function StatRow({ unit, phaseId, accent, theme }) {
  const stats = [
    { l: 'M',  v: unit.M,  pulse: phaseId === 'movement' },
    { l: 'T',  v: unit.T,  pulse: false },
    { l: 'SV', v: unit.Sv, pulse: false },
    { l: 'OC', v: unit.OC, pulse: false },
  ]
  return (
    <div className="flex gap-3 my-1.5">
      {stats.map(s => (
        <div key={s.l} className="flex flex-col items-center min-w-[30px]">
          <motion.span className="font-black leading-none"
            style={{ fontSize: 13, color: s.pulse ? accent : theme.textPrimary }}
            animate={s.pulse ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={s.pulse ? { repeat: Infinity, duration: 1.0 } : {}}>
            {s.v}
          </motion.span>
          <motion.span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.06em', color: s.pulse ? accent : theme.textSecondary }}
            animate={s.pulse ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={s.pulse ? { repeat: Infinity, duration: 1.0 } : {}}>
            {s.l}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function AbilityBadge({ text, accent }) {
  return (
    <div className="mt-1.5 flex items-start gap-1.5 rounded-lg px-2 py-1.5"
      style={{ background: `${accent}14`, border: `1px solid ${accent}40` }}>
      <motion.span style={{ color: accent, fontSize: 10, flexShrink: 0, lineHeight: 1.4 }}
        animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
        ⚡
      </motion.span>
      <p className="text-xs leading-snug" style={{ color: accent }}>{text}</p>
    </div>
  )
}

function WeaponRow({ weapon, accent, theme, pulse }) {
  return (
    <div className="flex items-center gap-2 text-xs py-0.5">
      <span className="font-bold flex-1 truncate" style={{ color: theme.textPrimary }}>{weapon.name}</span>
      {weapon.range && <span style={{ color: theme.textSecondary }}>{weapon.range}</span>}
      <motion.span className="font-black px-1.5 py-0.5 rounded-md"
        style={{ background: `${accent}18`, color: accent }}
        animate={pulse ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
        transition={pulse ? { repeat: Infinity, duration: 1.0 } : {}}>
        A{weapon.A}
      </motion.span>
      <span style={{ color: theme.textSecondary }}>S{weapon.S}</span>
      <span style={{ color: theme.textSecondary }}>AP{weapon.AP}</span>
      <span style={{ color: theme.textSecondary }}>D{weapon.D}</span>
    </div>
  )
}

function PhaseNav({ phaseId, theme, style = 'normal' }) {
  const curIdx = PHASES.findIndex(p => p.id === phaseId)
  return (
    <div className="flex border-t" style={{ borderColor: theme.border, background: theme.surface }}>
      {PHASES.map((p, i) => {
        const a = ACCENT[p.id]
        const isActive = p.id === phaseId
        const isPast = i < curIdx
        const opacity = style === 'bright'
          ? (isActive ? 1 : isPast ? 0.6 : 0.5)
          : (isActive ? 1 : isPast ? 0.35 : 0.5)
        return (
          <div key={p.id} className="flex-1 flex flex-col items-center py-2 gap-0.5"
            style={{ borderTop: isActive ? `2px solid ${a}` : '2px solid transparent', background: isActive ? `${a}12` : 'transparent' }}>
            {isPast && style === 'bright'
              ? <span style={{ fontSize: 11, color: a, opacity }}>✓</span>
              : <PhaseIcon phase={p.id} size={15} color={isActive ? a : theme.textSecondary} style={{ opacity }} />
            }
            <span className="text-[9px] font-bold" style={{ color: isActive ? a : theme.textSecondary, opacity }}>
              {p.short}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONCEPT A — "Phase Brief"
// Slim 2-line guide banner replaces the tall accordion. Abilities surface inline
// on each unit card. Tabs remain but guide tab is now compact.
// ═══════════════════════════════════════════════════════════════════════════════

const BRIEF_TEXT = {
  command:  'Gain 1 CP · use command abilities · pick your Hunting Pack option',
  movement: 'Move all units · advance melee units forward · hold ranged in position',
  shooting: 'Shoot with every ranged unit · pick targets · melee-only units hold back',
  charge:   'Charge with melee units · roll 2D6 and beat the gap to the enemy',
  fight:    'Fight with all units in Engagement Range · strike order matters',
}

function ConceptA({ theme, phase, accent }) {
  const phaseId = phase.id
  const [doneIds, setDoneIds] = useState(new Set())
  const [openWeapons, setOpenWeapons] = useState(null)
  const [activeTab, setActiveTab] = useState('guide')

  const toggle = id => setDoneIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ background: theme.surface, borderColor: `${accent}40` }}>
      {/* Concept label */}
      <div className="px-4 py-2.5 flex items-center gap-2.5" style={{ background: `${accent}20`, borderBottom: `1px solid ${accent}35` }}>
        <span className="font-black text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{ background: accent, color: '#000' }}>A</span>
        <div>
          <p className="text-xs font-black" style={{ color: accent }}>Phase Brief</p>
          <p className="text-[10px]" style={{ color: `${accent}aa` }}>Slim guide banner · abilities surface inline on each unit</p>
        </div>
      </div>

      {/* ── SLIM GUIDE BANNER (replaces the tall accordion card) ── */}
      <div className="mx-3 mt-3 rounded-xl flex items-center gap-3 px-3 py-2.5"
        style={{ background: `${accent}10`, border: `1px solid ${accent}35` }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}20`, border: `1px solid ${accent}50` }}>
          <PhaseIcon phase={phaseId} size={20} color={accent} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-[10px] tracking-widest uppercase" style={{ color: accent }}>{phase.label} Phase</p>
          <p className="text-xs leading-snug mt-0.5" style={{ color: theme.textPrimary }}>{BRIEF_TEXT[phaseId]}</p>
        </div>
        <button className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>▾ More</button>
      </div>

      {/* ── UNITS with inline ability callouts ── */}
      <div className="px-3 mt-3 space-y-2">
        {PROTO_UNITS.map(u => {
          const ability = getPhaseAbility(u, phaseId)
          const active = isActiveThisPhase(u, phaseId)
          const done = doneIds.has(u.id)
          const phaseWeapons = phaseId === 'shooting' ? u.weapons.filter(w => w.type === 'ranged')
            : ['fight','charge'].includes(phaseId) ? u.weapons.filter(w => w.type === 'melee') : []

          return (
            <div key={u.id} className="rounded-xl border p-3"
              style={{ background: theme.unitBg, borderColor: done ? theme.border : ability ? `${accent}50` : theme.border, opacity: done ? 0.5 : !active ? 0.38 : 1 }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{u.name}</p>
                    {u.isLeader && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>LEADER</span>}
                  </div>
                  <p className="text-[9px] font-medium uppercase tracking-wide mt-0.5" style={{ color: theme.textSecondary }}>{u.role}</p>
                  <StatRow unit={u} phaseId={phaseId} accent={accent} theme={theme} />
                  {/* ← KEY DIFFERENTIATOR: ability pulsing inline on the unit card */}
                  {ability && active && !done && <AbilityBadge text={ability} accent={accent} />}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>
                    {u.W}/{u.maxW}
                  </span>
                </div>
              </div>
              <HpBar pct={u.W / u.maxW} theme={theme} />
              <div className="flex gap-1.5 mt-2">
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>+ Heal</button>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#ef4444', border: `1px solid ${theme.border}` }}>− Wound</button>
                <button onClick={() => toggle(u.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: done ? 'rgba(34,197,94,0.2)' : theme.surfaceHigh, color: done ? '#4ade80' : theme.textSecondary, border: `1px solid ${done ? 'rgba(34,197,94,0.5)' : theme.border}` }}>
                  {done ? '✓ Done' : '○ Done'}
                </button>
                {phaseWeapons.length > 0 && (
                  <button onClick={() => setOpenWeapons(openWeapons === u.id ? null : u.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{ background: openWeapons === u.id ? `${accent}22` : theme.surfaceHigh, color: openWeapons === u.id ? accent : theme.textSecondary, border: `1px solid ${openWeapons === u.id ? accent : theme.border}` }}>
                    Weapons
                  </button>
                )}
              </div>
              {openWeapons === u.id && phaseWeapons.length > 0 && (
                <div className="mt-2 pt-1.5 space-y-0.5" style={{ borderTop: `1px solid ${theme.border}` }}>
                  {phaseWeapons.map(w => <WeaponRow key={w.name} weapon={w} accent={accent} theme={theme} pulse={false} />)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Tab bar — same structure, but guide tab is now compact ── */}
      <div className="flex border-t mt-3" style={{ borderColor: theme.border, background: theme.surface }}>
        {[{id:'guide',l:'Guide'},{id:'strats',l:'Strats (4)'},{id:'units',l:'Units'}].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className="flex-1 py-2.5 text-xs font-bold text-center transition-all"
            style={{ color: activeTab === t.id ? accent : theme.textSecondary, borderTop: activeTab === t.id ? `2px solid ${accent}` : '2px solid transparent', background: activeTab === t.id ? `${accent}0a` : 'transparent' }}>
            {t.l}
          </button>
        ))}
      </div>
      <PhaseNav phaseId={phaseId} theme={theme} style="normal" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONCEPT B — "Unit First"
// No guide tab at all. Units dominate the screen. During each phase, the
// relevant stat (Attacks during Shooting/Fight, M during Movement) is shown
// as a large pulsing tile on every card. Relevant weapons auto-expand.
// Stratagems live in a floating pull-up button — no separate tab.
// ═══════════════════════════════════════════════════════════════════════════════

const PHASE_BREADCRUMB = {
  command:  { label: 'Gain CP',       sub: 'then use abilities · pick your detachment action' },
  movement: { label: 'Move your army', sub: 'advance melee units · hold ranged back' },
  shooting: { label: 'Open fire',      sub: 'roll to hit → wound → save · check weapon range' },
  charge:   { label: 'Declare charges', sub: 'roll 2D6 · beat the gap · Ragnar gets +3" free' },
  fight:    { label: 'Melee combat',   sub: 'units in Engagement Range fight · strike order matters' },
}

function ConceptB({ theme, phase, accent }) {
  const phaseId = phase.id
  const [doneIds, setDoneIds] = useState(new Set())
  const [showStrats, setShowStrats] = useState(false)
  const bc = PHASE_BREADCRUMB[phaseId]
  const toggle = id => setDoneIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className="rounded-2xl overflow-hidden border relative" style={{ background: theme.surface, borderColor: `${accent}40` }}>
      {/* Concept label */}
      <div className="px-4 py-2.5 flex items-center gap-2.5" style={{ background: `${accent}20`, borderBottom: `1px solid ${accent}35` }}>
        <span className="font-black text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{ background: accent, color: '#000' }}>B</span>
        <div>
          <p className="text-xs font-black" style={{ color: accent }}>Unit First</p>
          <p className="text-[10px]" style={{ color: `${accent}aa` }}>No guide tab · attack count prominent · strats pull-up</p>
        </div>
      </div>

      {/* ── SLIM BREADCRUMB (replaces both guide card AND battle intel) ── */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl shrink-0"
          style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}>
          <PhaseIcon phase={phaseId} size={13} color={accent} />
          <span className="text-xs font-black" style={{ color: accent }}>{phase.label}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold leading-tight" style={{ color: theme.textPrimary }}>{bc.label}</p>
          <p className="text-[10px] leading-snug" style={{ color: theme.textSecondary }}>{bc.sub}</p>
        </div>
      </div>

      {/* ── UNITS — the entire screen ── */}
      <div className="px-3 pt-3 pb-2 space-y-2">
        {PROTO_UNITS.map(u => {
          const active = isActiveThisPhase(u, phaseId)
          const done = doneIds.has(u.id)
          const attacks = getAttacks(u, phaseId)
          const ability = getPhaseAbility(u, phaseId)
          const phaseWeapons = phaseId === 'shooting' ? u.weapons.filter(w => w.type === 'ranged')
            : ['fight','charge'].includes(phaseId) ? u.weapons.filter(w => w.type === 'melee') : []

          return (
            <div key={u.id} className="rounded-xl border p-3"
              style={{ background: theme.unitBg, borderColor: active && !done ? `${accent}50` : theme.border, opacity: done ? 0.45 : !active ? 0.35 : 1 }}>
              <div className="flex items-center gap-3">
                {/* ← KEY DIFFERENTIATOR: large pulsing attack tile */}
                {active && !done ? (
                  <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ background: `${accent}18`, border: `1.5px solid ${accent}55` }}>
                    {attacks !== null ? (
                      <>
                        <motion.span className="font-black leading-none" style={{ fontSize: 22, color: accent }}
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}>
                          {attacks}
                        </motion.span>
                        <span style={{ fontSize: 8, color: accent, fontWeight: 800, letterSpacing: '0.06em' }}>ATK</span>
                      </>
                    ) : (
                      <PhaseIcon phase={phaseId} size={24} color={accent} />
                    )}
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: 20, color: done ? '#4ade80' : theme.textSecondary }}>
                      {done ? '✓' : '—'}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>{u.name}</p>
                    {u.isLeader && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ background: `${theme.secondary}22`, color: theme.secondary }}>LEADER</span>}
                  </div>
                  <p className="text-[9px] uppercase tracking-wide font-medium" style={{ color: theme.textSecondary }}>{u.role}</p>
                  <StatRow unit={u} phaseId={phaseId} accent={accent} theme={theme} />
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>
                    {u.W}/{u.maxW}
                  </span>
                  <button onClick={() => toggle(u.id)}
                    className="text-xs px-2 py-1 rounded-lg font-bold"
                    style={{ background: done ? 'rgba(34,197,94,0.2)' : theme.surfaceHigh, color: done ? '#4ade80' : theme.textSecondary, border: `1px solid ${done ? 'rgba(34,197,94,0.5)' : theme.border}` }}>
                    {done ? '✓' : '○'}
                  </button>
                </div>
              </div>
              <HpBar pct={u.W / u.maxW} theme={theme} />

              {/* Ability — inline on the card */}
              {ability && active && !done && <AbilityBadge text={ability} accent={accent} />}

              {/* Relevant weapons auto-expanded — no "Weapons" button needed */}
              {phaseWeapons.length > 0 && active && !done && (
                <div className="mt-2 pt-1.5 space-y-0.5" style={{ borderTop: `1px solid ${theme.border}` }}>
                  {phaseWeapons.map(w => <WeaponRow key={w.name} weapon={w} accent={accent} theme={theme} pulse={true} />)}
                </div>
              )}

              <div className="flex gap-1.5 mt-2">
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>+ Heal</button>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#ef4444', border: `1px solid ${theme.border}` }}>− Wound</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Floating Stratagems pull-up button (no separate tab) ── */}
      <div className="px-3 pb-2 flex justify-end">
        <button onClick={() => setShowStrats(!showStrats)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs shadow-lg"
          style={{ background: accent, color: '#000' }}>
          ⚡ Stratagems (4) {showStrats ? '▾' : '▴'}
        </button>
      </div>

      {showStrats && (
        <div className="mx-3 mb-3 rounded-xl border p-3" style={{ background: theme.unitBg, borderColor: `${accent}40` }}>
          <p className="text-xs font-black mb-2" style={{ color: accent }}>Phase Stratagems</p>
          {['Insane Bravery — 1 CP', 'Counter-Offensive — 2 CP', 'Adaptive Strategy — 1 CP', 'Heroic Intervention — 1 CP'].map(s => (
            <div key={s} className="py-1.5 border-b last:border-0 flex items-center justify-between"
              style={{ borderColor: theme.border }}>
              <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{s.split(' — ')[0]}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: theme.surfaceHigh, color: theme.secondary }}>{s.split(' — ')[1]}</span>
            </div>
          ))}
        </div>
      )}

      <PhaseNav phaseId={phaseId} theme={theme} style="normal" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONCEPT C — "Mission Control"
// A sticky command bar at the top acts as the brain of the screen — it shows
// the current phase, a smart 1-sentence tip tailored to your actual units,
// scrollable phase checklist chips, and a strats trigger. Units fill everything
// below. Phase nav is brighter (past phases ✓ checked, not faded).
// ═══════════════════════════════════════════════════════════════════════════════

const SMART_TIPS = {
  command:  'Logan: High King of Fenris triggers now (+1 CP) · then pick your Hunting Pack',
  movement: 'Ragnar & Blood Claws: advance toward enemy · Terminators hold the line',
  shooting: 'Blood Claws + Terminators: shoot bolt weapons · Ragnar fires Bolt Pistol',
  charge:   'Ragnar: Battle-lust (+3") charges reliably · Blood Claws follow up',
  fight:    'Ragnar fights first (Wolf-kin) · Logan\'s aura re-rolls hits for nearby units',
}

const PHASE_CHIPS = {
  command:  ['Gain 1 CP ▸', 'High King +1 CP ▸', 'Pick Hunting Pack ▸', 'Use Abilities ▸'],
  movement: ['Move 6" ▸', 'Advance? ▸', 'Ragnar → enemy ▸', 'Hold ranged ▸'],
  shooting: ['Pick target ▸', 'Roll to Hit ▸', 'Roll to Wound ▸', 'Opponent saves ▸'],
  charge:   ['Declare charge ▸', 'Roll 2D6 ▸', 'Ragnar +3" ▸', 'Pile in ▸'],
  fight:    ['Select unit ▸', 'Ragnar first ▸', 'Logan aura ▸', 'Roll to Hit ▸'],
}

function ConceptC({ theme, phase, accent }) {
  const phaseId = phase.id
  const [doneIds, setDoneIds] = useState(new Set())
  const [showStrats, setShowStrats] = useState(false)
  const toggle = id => setDoneIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ background: theme.surface, borderColor: `${accent}40` }}>
      {/* Concept label */}
      <div className="px-4 py-2.5 flex items-center gap-2.5" style={{ background: `${accent}20`, borderBottom: `1px solid ${accent}35` }}>
        <span className="font-black text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{ background: accent, color: '#000' }}>C</span>
        <div>
          <p className="text-xs font-black" style={{ color: accent }}>Mission Control</p>
          <p className="text-[10px]" style={{ color: `${accent}aa` }}>Smart command bar · units fill screen · phase nav brighter</p>
        </div>
      </div>

      {/* ── STICKY COMMAND BAR ── */}
      <div className="mx-3 mt-3 rounded-2xl overflow-hidden border" style={{ background: `${accent}0c`, borderColor: `${accent}40` }}>
        {/* Row 1: phase identity + strats trigger */}
        <div className="px-3 py-2.5 flex items-start gap-2.5" style={{ borderBottom: `1px solid ${accent}25` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}>
            <PhaseIcon phase={phaseId} size={20} color={accent} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm leading-none" style={{ color: theme.textPrimary }}>{phase.label} Phase</p>
            {/* ← KEY DIFFERENTIATOR: smart tip tailored to your actual units */}
            <p className="text-xs mt-0.5 leading-snug" style={{ color: accent }}>{SMART_TIPS[phaseId]}</p>
          </div>
          <button onClick={() => setShowStrats(!showStrats)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black shrink-0 transition-all"
            style={{ background: showStrats ? accent : `${accent}22`, color: showStrats ? '#000' : accent, border: `1px solid ${accent}55` }}>
            ⚡ Strats {showStrats ? '▾' : '▴'}
          </button>
        </div>
        {/* Row 2: scrollable phase step chips */}
        <div className="flex gap-1.5 px-3 py-2 overflow-x-auto">
          {(PHASE_CHIPS[phaseId] || []).map(c => (
            <span key={c} className="whitespace-nowrap text-[10px] font-bold px-2.5 py-1 rounded-lg"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>{c}</span>
          ))}
        </div>
        {/* Strats pull-down */}
        {showStrats && (
          <div className="border-t px-3 py-2" style={{ borderColor: `${accent}25` }}>
            {['Insane Bravery — 1 CP', 'Counter-Offensive — 2 CP', 'Adaptive Strategy — 1 CP'].map(s => (
              <div key={s} className="py-1 flex items-center justify-between">
                <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{s.split(' — ')[0]}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: theme.surfaceHigh, color: theme.secondary }}>{s.split(' — ')[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── UNITS — fill the rest ── */}
      <div className="px-3 mt-3 pb-2 space-y-2">
        {PROTO_UNITS.map(u => {
          const active = isActiveThisPhase(u, phaseId)
          const done = doneIds.has(u.id)
          const attacks = getAttacks(u, phaseId)
          const ability = getPhaseAbility(u, phaseId)
          const phaseWeapons = phaseId === 'shooting' ? u.weapons.filter(w => w.type === 'ranged')
            : ['fight','charge'].includes(phaseId) ? u.weapons.filter(w => w.type === 'melee') : []

          return (
            <div key={u.id} className="rounded-xl border p-3"
              style={{ background: theme.unitBg, borderColor: active && !done ? `${accent}50` : theme.border, opacity: done ? 0.45 : !active ? 0.38 : 1 }}>
              <div className="flex items-start gap-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>{u.name}</p>
                    {/* Attacks badge in title — inline, not a separate large tile */}
                    {attacks !== null && active && !done && (
                      <motion.span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
                        animate={{ opacity: [1, 0.35, 1] }} transition={{ repeat: Infinity, duration: 1.0 }}>
                        {attacks} ATK
                      </motion.span>
                    )}
                  </div>
                  <p className="text-[9px] uppercase tracking-wide font-medium" style={{ color: theme.textSecondary }}>{u.role}</p>
                  <StatRow unit={u} phaseId={phaseId} accent={accent} theme={theme} />
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>
                    {u.W}/{u.maxW}
                  </span>
                  <button onClick={() => toggle(u.id)}
                    className="text-xs px-2 py-1 rounded-lg font-bold transition-all"
                    style={{ background: done ? 'rgba(34,197,94,0.2)' : theme.surfaceHigh, color: done ? '#4ade80' : theme.textSecondary, border: `1px solid ${done ? 'rgba(34,197,94,0.5)' : theme.border}` }}>
                    {done ? '✓' : '○'}
                  </button>
                </div>
              </div>
              <HpBar pct={u.W / u.maxW} theme={theme} />
              {ability && active && !done && <AbilityBadge text={ability} accent={accent} />}
              {phaseWeapons.length > 0 && active && !done && (
                <div className="mt-2 pt-1.5 space-y-0.5" style={{ borderTop: `1px solid ${theme.border}` }}>
                  {phaseWeapons.map(w => <WeaponRow key={w.name} weapon={w} accent={accent} theme={theme} pulse={true} />)}
                </div>
              )}
              <div className="flex gap-1.5 mt-2">
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#22c55e', border: `1px solid ${theme.border}` }}>+ Heal</button>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: '#ef4444', border: `1px solid ${theme.border}` }}>− Wound</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                  Weapons
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Phase nav — brighter, past phases show ✓ ── */}
      <PhaseNav phaseId={phaseId} theme={theme} style="bright" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main export — full-screen overlay with phase switcher
// ═══════════════════════════════════════════════════════════════════════════════

export default function BattleLayoutProto({ theme, onClose }) {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0)
  const phase   = PHASES[activePhaseIdx]
  const accent  = ACCENT[phase.id] || theme.secondary

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: theme.bg, fontFamily: theme.font }}>

      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <div>
          <p className="font-black text-sm" style={{ color: theme.textPrimary }}>Layout Preview</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>Scroll to compare A, B, C — pick your favourite</p>
        </div>
        <button onClick={onClose}
          className="px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          ✕ Close
        </button>
      </div>

      {/* Phase switcher */}
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto shrink-0"
        style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <span className="text-[10px] font-bold uppercase tracking-widest shrink-0 mr-1"
          style={{ color: theme.textSecondary }}>Test phase:</span>
        {PHASES.map((p, i) => {
          const a = ACCENT[p.id]
          const active = i === activePhaseIdx
          return (
            <button key={p.id} onClick={() => setActivePhaseIdx(i)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all"
              style={{ background: active ? `${a}20` : 'transparent', color: active ? a : theme.textSecondary, border: `1px solid ${active ? a + '55' : 'rgba(255,255,255,0.1)'}` }}>
              <PhaseIcon phase={p.id} size={11} color={active ? a : theme.textSecondary} />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Scrollable comparison */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-8">
        <ConceptA theme={theme} phase={phase} accent={accent} />
        <ConceptB theme={theme} phase={phase} accent={accent} />
        <ConceptC theme={theme} phase={phase} accent={accent} />

        {/* Spacer so last concept isn't cut off */}
        <div className="h-8" />
      </div>
    </div>
  )
}
