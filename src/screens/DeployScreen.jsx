import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { FACTION_META } from '../data/factionRegistry'
import { unitLeaderMap, leaders as leaderMeta, leaderAbilities } from '../data/leaderData'
import OpponentProfile from '../components/OpponentProfile'

const PHASE_ICON  = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }
const PHASE_LABEL = { command: 'Command', movement: 'Move', shooting: 'Shoot', charge: 'Charge', fight: 'Fight', any: 'Any' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

function getPairingAbilities(leaderId, unitId) {
  const key = `${baseId(leaderId)}_${baseId(unitId)}`
  return leaderAbilities[key]?.abilities || []
}

// ── Unit tile — identical look to army builder cards ─────────────────────────
function UnitTile({ unit, factionMeta, accent, theme, onPress, topBadge, bottomBadge }) {
  return (
    <motion.div
      whileTap={onPress ? { scale: 0.97 } : undefined}
      onClick={onPress}
      className="relative rounded-2xl overflow-hidden flex flex-col justify-end"
      style={{
        minHeight: 'clamp(130px, 18vw, 200px)',
        cursor: onPress ? 'pointer' : 'default',
        border: `2px solid ${bottomBadge?.assigned ? accent : 'transparent'}`,
        boxShadow: bottomBadge?.assigned ? `0 0 14px ${accent}44` : 'none',
      }}
    >
      {/* Background art or faction gradient */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: unit.artUrl ? `url(${unit.artUrl})` : factionMeta?.gradient,
          backgroundSize: unit.artUrl ? 'cover' : '100% 100%',
          backgroundPosition: unit.artPosition || 'center center',
        }} />

      {/* Overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.08) 100%)' }} />

      {/* Top badge */}
      {topBadge && (
        <div className="absolute top-2 right-2 z-10">{topBadge}</div>
      )}

      {/* Bottom content */}
      <div className="relative z-10 px-2.5 pb-2.5">
        <div className="flex gap-2 mb-1">
          {['M','T','Sv','W'].map(stat => unit[stat] != null && (
            <span key={stat} className="text-[8px] md:text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {stat}{unit[stat]}
            </span>
          ))}
        </div>
        <p className="text-xs md:text-sm font-black leading-tight truncate" style={{ color: '#fff' }}>
          {unit.name}
        </p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[9px] md:text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {unit.category || ''}
          </p>
          {unit.points && (
            <p className="text-[10px] md:text-xs font-bold" style={{ color: accent }}>{unit.points}pts</p>
          )}
        </div>
        {bottomBadge?.label && (
          <div className="mt-1.5">
            <span className="font-bold rounded px-1.5 py-0.5"
              style={{
                background: bottomBadge.assigned ? `${accent}cc` : 'rgba(255,255,255,0.12)',
                color: bottomBadge.assigned ? '#000' : 'rgba(255,255,255,0.5)',
                fontSize: 9,
              }}>
              {bottomBadge.label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Ability card ──────────────────────────────────────────────────────────────
function AbilityCard({ ability, accent, theme }) {
  return (
    <div className="rounded-xl px-2.5 py-2"
      style={{ background: `${accent}0d`, border: `1px solid ${accent}1a` }}>
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: 11 }}>{PHASE_ICON[ability.phase] || '✦'}</span>
        <p className="text-xs font-bold flex-1" style={{ color: accent }}>{ability.name}</p>
        <span className="font-bold uppercase rounded px-1.5 py-0.5 shrink-0"
          style={{ background: `${accent}18`, color: accent, fontSize: 7 }}>
          {PHASE_LABEL[ability.phase] || ability.phase}
        </span>
      </div>
      {(ability.reminder || ability.description) && (
        <p className="text-xs mt-0.5 leading-snug" style={{ color: theme.textPrimary }}>
          {ability.reminder || ability.description}
        </p>
      )}
    </div>
  )
}

// ── Leader assignment sheet ───────────────────────────────────────────────────
function AssignSheet({ leader, eligibleSquads, unitStates, leaderAssignmentMap, factionMeta, accent, theme, onAssign, onDetach, onClose }) {
  const currentSquadId = leaderAssignmentMap[leader.id]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: '82vh', background: theme.surface }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sheet header */}
        <div className="px-5 pt-4 pb-3 shrink-0 border-b" style={{ borderColor: theme.border }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 rounded-xl overflow-hidden relative shrink-0">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: leader.artUrl ? `url(${leader.artUrl})` : factionMeta?.gradient,
                  backgroundSize: 'cover',
                  backgroundPosition: leader.artPosition || 'center top',
                }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm" style={{ color: accent }}>{leader.name}</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>
                {currentSquadId ? 'Reassign or detach below' : 'Select a squad to lead'}
              </p>
            </div>
          </div>
          {currentSquadId && (
            <button
              onClick={() => { onDetach(currentSquadId); onClose() }}
              className="mt-3 w-full py-2 rounded-xl font-bold text-xs"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              Detach from current squad
            </button>
          )}
        </div>

        {/* Squad options */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {eligibleSquads.length === 0 ? (
            <p className="text-xs italic text-center py-8" style={{ color: theme.textSecondary }}>
              No eligible squads in your army — this leader operates independently
            </p>
          ) : eligibleSquads.map(squad => {
            const takenByOther = !!(unitStates[squad.id]?.attachedLeaderId) &&
              unitStates[squad.id]?.attachedLeaderId !== leader.id
            const isAssigned = unitStates[squad.id]?.attachedLeaderId === leader.id
            const abilities = getPairingAbilities(leader.id, squad.id)

            return (
              <motion.button key={squad.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => { if (!takenByOther) { onAssign(squad.id, leader.id); onClose() } }}
                disabled={takenByOther}
                className="w-full rounded-2xl border overflow-hidden text-left"
                style={{
                  background: theme.unitBg,
                  borderColor: isAssigned ? accent : takenByOther ? theme.border : `${accent}44`,
                  opacity: takenByOther ? 0.45 : 1,
                }}>

                {/* Portrait strip */}
                <div className="relative w-full" style={{ height: 110 }}>
                  <div className="absolute inset-0"
                    style={{
                      backgroundImage: squad.artUrl ? `url(${squad.artUrl})` : factionMeta?.gradient,
                      backgroundSize: 'cover',
                      backgroundPosition: squad.artPosition || 'center top',
                    }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between">
                    <p className="font-black text-sm leading-tight" style={{ color: '#fff' }}>{squad.name}</p>
                    {isAssigned ? (
                      <span className="font-black px-2 py-0.5 rounded-lg"
                        style={{ background: accent, color: '#000', fontSize: 9 }}>✓ Leading</span>
                    ) : takenByOther ? (
                      <span className="font-bold px-2 py-0.5 rounded-lg"
                        style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.4)', fontSize: 9 }}>Already led</span>
                    ) : (
                      <span className="font-black px-2 py-0.5 rounded-lg"
                        style={{ background: accent, color: '#000', fontSize: 9 }}>Assign →</span>
                    )}
                  </div>
                </div>

                {/* Abilities */}
                {abilities.length > 0 && !takenByOther && (
                  <div className="px-3 py-2.5 space-y-1.5">
                    {abilities.map((ab, i) => (
                      <AbilityCard key={i} ability={ab} accent={accent} theme={theme} />
                    ))}
                  </div>
                )}
                {abilities.length === 0 && !takenByOther && (
                  <p className="px-3 py-2 text-xs italic" style={{ color: theme.textSecondary, opacity: 0.5 }}>
                    General leadership — no special bonuses for this pairing
                  </p>
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DeployScreen({ theme, onNavigate }) {
  const { faction, selectedUnits, unitStates, attachLeader, detachLeader, startBattle } = useBattleStore()
  const factionMeta = faction ? FACTION_META[faction] : null
  const accent = theme.secondary

  const [activeLeader, setActiveLeader] = useState(null)

  const leaderUnits = useMemo(() => selectedUnits.filter(u => u.isLeader), [selectedUnits])
  const squadUnits  = useMemo(() => selectedUnits.filter(u => !u.isLeader), [selectedUnits])

  const leaderAssignmentMap = useMemo(() => {
    const map = {}
    for (const [unitId, state] of Object.entries(unitStates)) {
      if (state?.attachedLeaderId) map[state.attachedLeaderId] = unitId
    }
    return map
  }, [unitStates])

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

  const assignableCount = squadUnits.filter(squad => {
    const key = squad.unitKey || baseId(squad.id)
    return leaderUnits.some(l => (unitLeaderMap[key] || []).includes(baseId(l.id)))
  }).length
  const assignedCount = squadUnits.filter(u => unitStates[u.id]?.attachedLeaderId).length

  const activeLeaderObj = activeLeader ? leaderUnits.find(l => l.id === activeLeader) : null

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
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Pre-Battle</p>
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

      {/* Scroll content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">

        <OpponentProfile theme={theme} />

        {/* Characters */}
        {leaderUnits.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
              style={{ color: theme.textSecondary }}>
              Characters
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {leaderUnits.map(leader => {
                const squadId = leaderAssignmentMap[leader.id]
                const squad   = squadId ? squadUnits.find(u => u.id === squadId) : null
                const hasEligible = (leaderEligibleSquads[leader.id] || []).length > 0
                return (
                  <UnitTile
                    key={leader.id}
                    unit={leader}
                    factionMeta={factionMeta}
                    accent={accent}
                    theme={theme}
                    onPress={hasEligible ? () => setActiveLeader(leader.id) : undefined}
                    topBadge={
                      <span className="font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: squad ? `${accent}cc` : 'rgba(0,0,0,0.6)',
                          color: squad ? '#000' : 'rgba(255,255,255,0.5)',
                          fontSize: 8,
                        }}>
                        {squad ? '★ LEADER' : 'CHARACTER'}
                      </span>
                    }
                    bottomBadge={hasEligible ? {
                      label: squad ? `→ ${squad.name}` : 'Tap to assign squad',
                      assigned: !!squad,
                    } : undefined}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Units */}
        {squadUnits.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
              style={{ color: theme.textSecondary }}>
              Units
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {squadUnits.map(unit => {
                const leaderId = unitStates[unit.id]?.attachedLeaderId
                const leader   = leaderId ? leaderUnits.find(l => l.id === leaderId) : null
                return (
                  <UnitTile
                    key={unit.id}
                    unit={unit}
                    factionMeta={factionMeta}
                    accent={accent}
                    theme={theme}
                    bottomBadge={leader ? { label: `← ${leader.name}`, assigned: true } : undefined}
                  />
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
          onClick={() => { startBattle(); onNavigate('battle') }}
          className="flex-1 py-3 rounded-2xl font-black text-sm"
          style={{ background: accent, color: theme.bg }}>
          Begin Battle →
        </motion.button>
      </div>

      {/* Leader assignment sheet */}
      <AnimatePresence>
        {activeLeaderObj && (
          <AssignSheet
            leader={activeLeaderObj}
            eligibleSquads={leaderEligibleSquads[activeLeaderObj.id] || []}
            unitStates={unitStates}
            leaderAssignmentMap={leaderAssignmentMap}
            factionMeta={factionMeta}
            accent={accent}
            theme={theme}
            onAssign={handleAssign}
            onDetach={detachLeader}
            onClose={() => setActiveLeader(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
