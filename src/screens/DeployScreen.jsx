import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { unitLeaderMap, leaders as leaderMeta } from '../data/leaderData'
import { getLeaderAbilities } from '../data/factionRegistry'

const PHASE_ICON = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

export default function DeployScreen({ theme, onNavigate }) {
  const { selectedUnits, unitStates, attachLeader, detachLeader, startBattle } = useBattleStore()

  const leaderUnits = useMemo(() => selectedUnits.filter(u => u.isLeader), [selectedUnits])
  const squadUnits  = useMemo(() => selectedUnits.filter(u => !u.isLeader), [selectedUnits])

  // leaderId → unitId it's currently assigned to
  const leaderAssignmentMap = useMemo(() => {
    const map = {}
    for (const [unitId, state] of Object.entries(unitStates)) {
      if (state?.attachedLeaderId) map[state.attachedLeaderId] = unitId
    }
    return map
  }, [unitStates])

  // Leaders available for a squad, keyed by the unit's base ID
  const getEligible = (unit) => {
    const key = unit.unitKey || baseId(unit.id)
    const ids = unitLeaderMap[key] || []
    return leaderUnits.filter(l => ids.includes(baseId(l.id)))
  }

  const handleToggle = (unitId, leaderId) => {
    const currentLeader = unitStates[unitId]?.attachedLeaderId
    // Detach this leader from wherever it was before
    const prevUnit = leaderAssignmentMap[leaderId]
    if (prevUnit && prevUnit !== unitId) detachLeader(prevUnit)
    // Toggle: if already assigned here, remove; otherwise assign
    if (currentLeader === leaderId) detachLeader(unitId)
    else attachLeader(unitId, leaderId)
  }

  const assignableCount = squadUnits.filter(u => getEligible(u).length > 0).length
  const assignedCount   = squadUnits.filter(u => unitStates[u.id]?.attachedLeaderId).length

  const handleBeginBattle = () => {
    startBattle()
    onNavigate('battle')
  }

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
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
            Pre-Battle
          </p>
          <h1 className="font-black text-base leading-tight" style={{ color: theme.textPrimary }}>
            Deploy Your Forces
          </h1>
        </div>
        {assignableCount > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full font-bold"
            style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}33` }}>
            {assignedCount}/{assignableCount} led
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">

        {/* Tip */}
        <div className="rounded-2xl px-3.5 py-3"
          style={{ background: `${theme.secondary}0d`, border: `1px solid ${theme.secondary}20` }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
            Assign a leader to each eligible squad to unlock their abilities during battle. Each leader can only lead one squad.
          </p>
        </div>

        {/* Squads */}
        {squadUnits.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
              style={{ color: theme.textSecondary }}>Squads</p>
            <div className="space-y-2">
              {squadUnits.map(unit => {
                const eligible     = getEligible(unit)
                const assignedId   = unitStates[unit.id]?.attachedLeaderId
                const assignedUnit = assignedId ? leaderUnits.find(l => l.id === assignedId) : null
                const unitKey      = unit.unitKey || baseId(unit.id)
                const abilities    = assignedId ? getLeaderAbilities(baseId(assignedId)) : []

                return (
                  <div key={unit.id} className="rounded-2xl border overflow-hidden"
                    style={{ background: theme.surface, borderColor: assignedUnit ? `${theme.secondary}55` : theme.border }}>

                    {/* Unit header */}
                    <div className="px-3 py-2.5 flex items-center gap-2"
                      style={{ background: theme.surfaceHigh, borderBottom: `1px solid ${theme.border}` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                        <p className="text-xs capitalize" style={{ color: theme.textSecondary }}>
                          {unit.category || unit.type || 'Infantry'}
                        </p>
                      </div>
                      {assignedUnit && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}33` }}>
                          ⭐ {assignedUnit.name.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    <div className="px-3 py-2.5">
                      {eligible.length === 0 ? (
                        <p className="text-xs italic" style={{ color: theme.textSecondary, opacity: 0.55 }}>
                          No eligible leaders in your army for this squad
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-bold mb-2" style={{ color: theme.textSecondary }}>
                            {assignedUnit ? 'Leader assigned' : 'Assign a leader'}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {eligible.map(leader => {
                              const isHere      = assignedId === leader.id
                              const isElsewhere = !isHere && leaderAssignmentMap[leader.id] != null
                              return (
                                <button key={leader.id}
                                  onClick={() => handleToggle(unit.id, leader.id)}
                                  disabled={isElsewhere}
                                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                                  style={{
                                    background:   isHere ? theme.secondary : isElsewhere ? theme.surfaceHigh : `${theme.secondary}12`,
                                    color:        isHere ? theme.bg : isElsewhere ? theme.textSecondary : theme.secondary,
                                    border:       `1px solid ${isHere ? theme.secondary : isElsewhere ? theme.border : theme.secondary + '33'}`,
                                    opacity:      isElsewhere ? 0.4 : 1,
                                  }}>
                                  {isHere ? '✓ ' : ''}{leader.name}
                                </button>
                              )
                            })}
                          </div>
                        </>
                      )}

                      {/* Ability preview */}
                      <AnimatePresence>
                        {abilities.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden mt-2.5 space-y-1.5">
                            {abilities.map((ability, i) => (
                              <div key={i} className="rounded-xl px-2.5 py-2"
                                style={{ background: `${theme.secondary}0d`, border: `1px solid ${theme.secondary}22` }}>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm">{PHASE_ICON[ability.phase] || '✦'}</span>
                                  <p className="text-xs font-bold flex-1" style={{ color: theme.secondary }}>{ability.name}</p>
                                  <span className="text-xs px-1.5 py-0.5 rounded font-bold uppercase shrink-0"
                                    style={{ background: `${theme.secondary}15`, color: theme.secondary, fontSize: 8 }}>
                                    {ability.phase}
                                  </span>
                                </div>
                                {(ability.description || ability.reminder) && (
                                  <p className="text-xs mt-1 leading-snug" style={{ color: theme.textPrimary }}>
                                    {ability.description || ability.reminder}
                                  </p>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Independent units / leaders */}
        {leaderUnits.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
              style={{ color: theme.textSecondary }}>Leaders & Independent Units</p>
            <div className="space-y-2">
              {leaderUnits.map(unit => {
                const assignedToId = leaderAssignmentMap[unit.id]
                const assignedToUnit = assignedToId ? squadUnits.find(u => u.id === assignedToId) : null
                const canLead = (unit.leadsUnits?.length ?? 0) > 0
                return (
                  <div key={unit.id} className="rounded-2xl border px-3 py-2.5 flex items-center gap-3"
                    style={{ background: theme.surface, borderColor: assignedToUnit ? `${theme.secondary}44` : theme.border }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 font-black"
                      style={{ background: `${theme.secondary}15`, color: theme.secondary, border: `1px solid ${theme.secondary}30` }}>
                      {unit.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                      {assignedToUnit ? (
                        <p className="text-xs" style={{ color: theme.secondary }}>Leading: {assignedToUnit.name}</p>
                      ) : (
                        <p className="text-xs" style={{ color: theme.textSecondary }}>
                          {canLead ? 'Not assigned to a squad' : 'Operates independently'}
                        </p>
                      )}
                    </div>
                    {assignedToUnit && (
                      <button onClick={() => detachLeader(assignedToId)}
                        className="text-xs px-2 py-1 rounded-lg font-bold shrink-0"
                        style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                        Detach
                      </button>
                    )}
                  </div>
                )
              })}
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
          style={{ background: theme.secondary, color: theme.bg }}>
          Begin Battle →
        </motion.button>
      </div>
    </div>
  )
}
