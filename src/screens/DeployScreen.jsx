import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { unitLeaderMap, leaders as leaderMeta, leaderAbilities } from '../data/leaderData'

const PHASE_ICON = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }
const PHASE_LABEL = { command: 'Command', movement: 'Move', shooting: 'Shoot', charge: 'Charge', fight: 'Fight', any: 'Any' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

function getPairingAbilities(leaderId, unitId) {
  const key = `${baseId(leaderId)}_${baseId(unitId)}`
  return leaderAbilities[key]?.abilities || []
}

// ── Atom node: the leader portrait ──────────────────────────────────────────
function LeaderAtom({ unit, accent, theme, glowing }) {
  const initials = unit.name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="flex flex-col items-center gap-1 w-[68px] shrink-0">
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base border-2 select-none"
        style={{
          background: `${accent}18`,
          borderColor: glowing ? accent : `${accent}44`,
          color: accent,
        }}
        animate={glowing ? {
          boxShadow: [`0 0 6px ${accent}44`, `0 0 18px ${accent}88`, `0 0 6px ${accent}44`],
        } : { boxShadow: 'none' }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        {initials}
      </motion.div>
      <p className="text-center font-bold leading-tight w-full px-0.5" style={{ color: theme.textPrimary, fontSize: 9 }}>
        {unit.name.split(' ')[0]}
      </p>
      <p className="text-center leading-tight w-full px-0.5" style={{ color: theme.textSecondary, fontSize: 8 }}>
        {leaderMeta[baseId(unit.id)]?.role || 'Character'}
      </p>
    </div>
  )
}

// ── Atom node: the squad portrait ───────────────────────────────────────────
function SquadAtom({ unit, accent, theme, assigned, onPress }) {
  return (
    <motion.button whileTap={{ scale: 0.93 }} onClick={onPress}
      className="flex flex-col items-center gap-1 w-[68px] shrink-0">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 px-1"
        style={{
          background: theme.surfaceHigh,
          borderColor: assigned ? `${accent}88` : theme.border,
        }}>
        <p className="font-bold text-center leading-tight" style={{ color: theme.textPrimary, fontSize: 8 }}>
          {unit.name.replace(/\b(Squad|Warriors|Guard)\b/g, '').trim() || unit.name}
        </p>
      </div>
      <p className="text-center leading-tight w-full px-0.5" style={{ color: assigned ? accent : theme.textSecondary, fontSize: 8 }}>
        {assigned ? 'led ✓' : 'tap'}
      </p>
    </motion.button>
  )
}

// ── Connection band between leader and squad ────────────────────────────────
function BondLine({ abilities, accent }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1 px-1.5 min-w-0">
      <div className="w-full flex items-center gap-0">
        <motion.div className="h-[2px] flex-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}00, ${accent}99, ${accent}00)` }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} />
      </div>
      {abilities.slice(0, 2).map((ab, i) => (
        <div key={i}
          className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 max-w-full"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
          <span style={{ fontSize: 8 }}>{PHASE_ICON[ab.phase] || '✦'}</span>
          <p className="font-bold truncate" style={{ color: accent, fontSize: 7.5, lineHeight: '11px' }}>
            {ab.name}
          </p>
        </div>
      ))}
      {abilities.length > 2 && (
        <p className="font-bold" style={{ color: accent, fontSize: 7 }}>+{abilities.length - 2} more</p>
      )}
    </div>
  )
}

// ── Formation row: assigned leader ↔ squad bond ─────────────────────────────
function FormationRow({ leader, squad, accent, theme, onDetach }) {
  const abilities = getPairingAbilities(leader.id, squad.id)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: `${accent}55` }}>

      {/* Atom bond row */}
      <div className="flex items-center px-3 pt-3 pb-2">
        <LeaderAtom unit={leader} accent={accent} theme={theme} glowing />
        <BondLine abilities={abilities} accent={accent} />
        <SquadAtom unit={squad} accent={accent} theme={theme} assigned onPress={onDetach} />
      </div>

      {/* Ability detail cards */}
      {abilities.length > 0 && (
        <div className="px-3 pb-3 space-y-1.5 border-t mx-3 pt-2" style={{ borderColor: `${accent}20` }}>
          {abilities.map((ab, i) => (
            <div key={i} className="rounded-xl px-2.5 py-1.5"
              style={{ background: `${accent}0d`, border: `1px solid ${accent}1a` }}>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 11 }}>{PHASE_ICON[ab.phase] || '✦'}</span>
                <p className="text-xs font-bold flex-1" style={{ color: accent }}>{ab.name}</p>
                <span className="font-bold uppercase rounded px-1.5 py-0.5 shrink-0"
                  style={{ background: `${accent}18`, color: accent, fontSize: 7 }}>
                  {PHASE_LABEL[ab.phase] || ab.phase}
                </span>
              </div>
              {(ab.reminder || ab.description) && (
                <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textPrimary }}>
                  {ab.reminder || ab.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Detach button */}
      <div className="flex justify-end px-3 pb-2.5">
        <button onClick={onDetach}
          className="text-xs px-2.5 py-1 rounded-lg font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          Detach ✕
        </button>
      </div>
    </motion.div>
  )
}

// ── Unassigned leader card: shows eligible squads to pick from ───────────────
function LeaderAssignCard({ leader, eligibleSquads, unitStates, leaderAssignmentMap, accent, theme, onAssign }) {
  const canLeadAnyone = eligibleSquads.length > 0
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: theme.border }}>

      {/* Leader header */}
      <div className="px-3 py-2.5 flex items-center gap-3"
        style={{ background: theme.surfaceHigh, borderBottom: `1px solid ${theme.border}` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black border shrink-0"
          style={{ background: `${accent}12`, borderColor: `${accent}30`, color: accent }}>
          {leader.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{leader.name}</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            {leaderMeta[baseId(leader.id)]?.role || 'Character'}
          </p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold shrink-0"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          Unassigned
        </span>
      </div>

      {/* Squad options */}
      <div className="px-3 py-2.5">
        {!canLeadAnyone ? (
          <p className="text-xs italic" style={{ color: theme.textSecondary, opacity: 0.55 }}>
            No eligible squads in your army — operates independently
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-black tracking-wider uppercase mb-1.5" style={{ color: theme.textSecondary, fontSize: 9 }}>
              Can lead:
            </p>
            {eligibleSquads.map(squad => {
              const takenByOther = !!(unitStates[squad.id]?.attachedLeaderId) &&
                                   unitStates[squad.id]?.attachedLeaderId !== leader.id
              const abilities = getPairingAbilities(leader.id, squad.id)
              return (
                <motion.button key={squad.id} whileTap={{ scale: 0.98 }}
                  onClick={() => !takenByOther && onAssign(squad.id, leader.id)}
                  disabled={takenByOther}
                  className="w-full rounded-xl border px-3 py-2.5 text-left"
                  style={{
                    background: takenByOther ? theme.surfaceHigh : `${accent}08`,
                    borderColor: takenByOther ? theme.border : `${accent}44`,
                    opacity: takenByOther ? 0.45 : 1,
                  }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold" style={{ color: takenByOther ? theme.textSecondary : theme.textPrimary }}>
                      {squad.name}
                    </p>
                    {takenByOther ? (
                      <span style={{ color: theme.textSecondary, fontSize: 9 }}>Already led</span>
                    ) : (
                      <span className="font-bold" style={{ color: accent, fontSize: 9 }}>Assign →</span>
                    )}
                  </div>
                  {abilities.length > 0 && !takenByOther && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {abilities.map((ab, i) => (
                        <span key={i}
                          className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-bold"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}22`, color: accent, fontSize: 8 }}>
                          {PHASE_ICON[ab.phase]} {ab.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {abilities.length === 0 && !takenByOther && (
                    <p className="text-xs mt-1 italic" style={{ color: theme.textSecondary, opacity: 0.55, fontSize: 9 }}>
                      No special bonuses — general leadership
                    </p>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main screen ──────────────────────────────────────────────────────────────
export default function DeployScreen({ theme, onNavigate }) {
  const { selectedUnits, unitStates, attachLeader, detachLeader, startBattle } = useBattleStore()

  const leaderUnits = useMemo(() => selectedUnits.filter(u => u.isLeader), [selectedUnits])
  const squadUnits  = useMemo(() => selectedUnits.filter(u => !u.isLeader), [selectedUnits])

  const leaderAssignmentMap = useMemo(() => {
    const map = {}
    for (const [unitId, state] of Object.entries(unitStates)) {
      if (state?.attachedLeaderId) map[state.attachedLeaderId] = unitId
    }
    return map
  }, [unitStates])

  // For each leader: which squads in this army are they eligible to lead?
  const leaderEligibleSquads = useMemo(() => {
    const map = {}
    for (const leader of leaderUnits) {
      const lid = baseId(leader.id)
      map[leader.id] = squadUnits.filter(squad => {
        const key = squad.unitKey || baseId(squad.id)
        return (unitLeaderMap[key] || []).includes(lid)
      })
    }
    return map
  }, [leaderUnits, squadUnits])

  const handleAssign = (unitId, leaderId) => {
    const currentLeader = unitStates[unitId]?.attachedLeaderId
    const prevUnit = leaderAssignmentMap[leaderId]
    if (prevUnit && prevUnit !== unitId) detachLeader(prevUnit)
    if (currentLeader === leaderId) detachLeader(unitId)
    else attachLeader(unitId, leaderId)
  }

  const assignedLeaders   = leaderUnits.filter(l => leaderAssignmentMap[l.id] != null)
  const unassignedLeaders = leaderUnits.filter(l => leaderAssignmentMap[l.id] == null)

  // Squads that have no leader options at all in this army
  const independentSquads = squadUnits.filter(squad => {
    if (unitStates[squad.id]?.attachedLeaderId) return false // assigned — show in bonds
    const key = squad.unitKey || baseId(squad.id)
    return !leaderUnits.some(l => (unitLeaderMap[key] || []).includes(baseId(l.id)))
  })

  const assignableCount = squadUnits.filter(squad => {
    const key = squad.unitKey || baseId(squad.id)
    return leaderUnits.some(l => (unitLeaderMap[key] || []).includes(baseId(l.id)))
  }).length
  const assignedCount = squadUnits.filter(u => unitStates[u.id]?.attachedLeaderId).length

  const handleBeginBattle = () => {
    startBattle()
    onNavigate('battle')
  }

  const accent = theme.secondary

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>

      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0"
        style={{ background: theme.navBg, borderColor: theme.border }}>
        <button onClick={() => onNavigate('armyBuilder')}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </button>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
            Pre-Battle
          </p>
          <h1 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>
            Deploy Your Forces
          </h1>
        </div>
        {assignableCount > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full font-bold"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}33` }}>
            {assignedCount}/{assignableCount} led
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">

        {/* Tip */}
        <div className="rounded-2xl px-3.5 py-3"
          style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
            Each leader brings unique abilities to the squad they command. Review what each pairing unlocks, then assign. One leader per squad — each leader can only lead one squad.
          </p>
        </div>

        {/* ── Section 1: Formation Bonds ── */}
        <AnimatePresence>
          {assignedLeaders.length > 0 && (
            <section>
              <div className="flex items-center gap-2 px-1 mb-2">
                <p className="text-xs font-black tracking-widest uppercase" style={{ color: theme.textSecondary }}>
                  Formation Bonds
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: `${accent}18`, color: accent }}>
                  {assignedLeaders.length}
                </span>
              </div>
              <div className="space-y-3">
                {assignedLeaders.map(leader => {
                  const squadId = leaderAssignmentMap[leader.id]
                  const squad = squadUnits.find(u => u.id === squadId)
                  if (!squad) return null
                  return (
                    <FormationRow
                      key={leader.id}
                      leader={leader}
                      squad={squad}
                      accent={accent}
                      theme={theme}
                      onDetach={() => detachLeader(squadId)}
                    />
                  )
                })}
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* ── Section 2: Assign a Leader ── */}
        {unassignedLeaders.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2" style={{ color: theme.textSecondary }}>
              {assignedLeaders.length > 0 ? 'More Leaders' : 'Assign a Leader'}
            </p>
            <div className="space-y-3">
              {unassignedLeaders.map(leader => (
                <LeaderAssignCard
                  key={leader.id}
                  leader={leader}
                  eligibleSquads={leaderEligibleSquads[leader.id] || []}
                  unitStates={unitStates}
                  leaderAssignmentMap={leaderAssignmentMap}
                  accent={accent}
                  theme={theme}
                  onAssign={handleAssign}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Section 3: Independent ── */}
        {independentSquads.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2" style={{ color: theme.textSecondary }}>
              Independent
            </p>
            <div className="flex flex-wrap gap-2">
              {independentSquads.map(u => (
                <div key={u.id} className="rounded-xl border px-3 py-2"
                  style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{u.name}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary, opacity: 0.55 }}>No leader available</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="h-2" />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t flex items-center gap-3 shrink-0"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <button onClick={() => onNavigate('armyBuilder')}
          className="px-4 py-3 rounded-2xl text-sm font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          ← Back
        </button>
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={handleBeginBattle}
          className="flex-1 py-3 rounded-2xl font-black text-sm"
          style={{ background: accent, color: theme.bg }}>
          Begin Battle →
        </motion.button>
      </div>
    </div>
  )
}
