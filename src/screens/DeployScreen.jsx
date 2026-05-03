import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { unitLeaderMap, leaders as leaderMeta, leaderAbilities } from '../data/leaderData'
import MultiplayerSetup from '../components/MultiplayerSetup'
import OpponentProfile from '../components/OpponentProfile'

const PHASE_ICON  = { command: '📋', movement: '🏃', shooting: '🎯', charge: '⚡', fight: '⚔️', any: '✦' }
const PHASE_LABEL = { command: 'Command', movement: 'Move', shooting: 'Shoot', charge: 'Charge', fight: 'Fight', any: 'Any' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

function getPairingAbilities(leaderId, unitId) {
  const key = `${baseId(leaderId)}_${baseId(unitId)}`
  return leaderAbilities[key]?.abilities || []
}

// ── Art tile — fills its parent, handles fallback ────────────────────────────
function ArtTile({ unit, accent, overlayStrength = 0.8, children }) {
  return (
    <div className="absolute inset-0">
      {unit.artUrl ? (
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url(${unit.artUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: unit.artPosition || 'center top',
          }} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-black text-2xl"
          style={{ background: `${accent}18`, color: `${accent}66` }}>
          {unit.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
        </div>
      )}
      {/* Gradient overlay — heavier at bottom for legibility */}
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayStrength}) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.05) 100%)` }} />
      {children}
    </div>
  )
}

// ── Ability card — phase icon + name + full reminder text ────────────────────
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

// ── Portrait atom — tall portrait tile used in the bond row ──────────────────
function PortraitAtom({ unit, accent, theme, glowing, label, onPress }) {
  const initials = unit.name.split(' ').slice(0, 2).map(w => w[0]).join('')
  const el = (
    <div className="flex flex-col items-center gap-1.5" style={{ width: 96 }}>
      <motion.div
        className="w-full rounded-2xl overflow-hidden relative border-2"
        style={{
          height: 128,
          borderColor: glowing ? accent : `${accent}44`,
          flexShrink: 0,
        }}
        animate={glowing ? {
          boxShadow: [`0 0 6px ${accent}44`, `0 0 22px ${accent}99`, `0 0 6px ${accent}44`],
        } : { boxShadow: 'none' }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <ArtTile unit={unit} accent={accent} overlayStrength={0.72}>
          <p className="absolute bottom-1.5 left-0 right-0 text-center font-black leading-tight px-1 z-10"
            style={{ color: '#fff', fontSize: 9, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {unit.name.split(' ').slice(0, 2).join(' ')}
          </p>
        </ArtTile>
      </motion.div>
      <p className="text-center leading-tight px-1 truncate w-full"
        style={{ color: glowing ? accent : theme.textSecondary, fontSize: 9, fontWeight: 600 }}>
        {label || (leaderMeta[baseId(unit.id)]?.role || 'Character')}
      </p>
    </div>
  )

  if (onPress) {
    return <motion.button whileTap={{ scale: 0.95 }} onClick={onPress}>{el}</motion.button>
  }
  return el
}

// ── Bond line ────────────────────────────────────────────────────────────────
function BondLine({ abilities, accent }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2 min-w-0">
      <motion.div className="w-full h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}00, ${accent}bb, ${accent}00)` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} />
      {abilities.slice(0, 2).map((ab, i) => (
        <div key={i}
          className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 max-w-full"
          style={{ background: `${accent}20`, border: `1px solid ${accent}35` }}>
          <span style={{ fontSize: 8 }}>{PHASE_ICON[ab.phase] || '✦'}</span>
          <p className="font-bold truncate" style={{ color: accent, fontSize: 7.5, lineHeight: '11px' }}>
            {ab.name}
          </p>
        </div>
      ))}
      {abilities.length > 2 && (
        <p style={{ color: accent, fontSize: 7, fontWeight: 700 }}>+{abilities.length - 2} more</p>
      )}
    </div>
  )
}

// ── Formation row — assigned leader ↔ squad bond ─────────────────────────────
function FormationRow({ leader, squad, accent, theme, onDetach }) {
  const abilities = getPairingAbilities(leader.id, squad.id)
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: `${accent}55` }}>

      {/* Bond row */}
      <div className="flex items-center justify-center px-3 pt-3 pb-3 gap-0">
        <PortraitAtom unit={leader} accent={accent} theme={theme} glowing />
        <BondLine abilities={abilities} accent={accent} />
        <PortraitAtom unit={squad} accent={accent} theme={theme} label="tap to detach" onPress={onDetach} />
      </div>

      {/* Ability cards */}
      {abilities.length > 0 && (
        <div className="px-3 pb-3 space-y-1.5 border-t pt-2.5"
          style={{ borderColor: `${accent}20` }}>
          {abilities.map((ab, i) => (
            <AbilityCard key={i} ability={ab} accent={accent} theme={theme} />
          ))}
        </div>
      )}

      <div className="flex justify-end px-3 pb-3">
        <button onClick={onDetach}
          className="text-xs px-3 py-1.5 rounded-xl font-bold"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
          Detach ✕
        </button>
      </div>
    </motion.div>
  )
}

// ── Squad option card — full-width portrait + abilities ──────────────────────
function SquadOptionCard({ squad, leader, takenByOther, accent, theme, onAssign }) {
  const abilities = getPairingAbilities(leader.id, squad.id)
  return (
    <motion.button whileTap={{ scale: 0.985 }}
      onClick={() => !takenByOther && onAssign(squad.id, leader.id)}
      disabled={takenByOther}
      className="w-full rounded-2xl border overflow-hidden text-left"
      style={{
        background: theme.surface,
        borderColor: takenByOther ? theme.border : `${accent}44`,
        opacity: takenByOther ? 0.45 : 1,
      }}>

      {/* Portrait art — full width, tall enough to see the unit */}
      <div className="relative w-full" style={{ height: 130 }}>
        <ArtTile unit={squad} accent={accent} overlayStrength={0.72}>
          {/* Bottom overlay strip */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between">
            <div>
              <p className="font-black leading-tight" style={{ color: '#fff', fontSize: 13, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                {squad.name}
              </p>
              {squad.category && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>{squad.category}</p>
              )}
            </div>
            {takenByOther ? (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.45)', fontSize: 9 }}>
                Already led
              </span>
            ) : (
              <span className="font-black px-2.5 py-1 rounded-xl"
                style={{ background: accent, color: '#000', fontSize: 10 }}>
                Assign →
              </span>
            )}
          </div>
        </ArtTile>
      </div>

      {/* Abilities below the portrait */}
      {abilities.length > 0 && !takenByOther && (
        <div className="px-3 py-2.5 space-y-1.5">
          {abilities.map((ab, i) => (
            <AbilityCard key={i} ability={ab} accent={accent} theme={theme} />
          ))}
        </div>
      )}
      {abilities.length === 0 && !takenByOther && (
        <div className="px-3 py-2">
          <p className="text-xs italic" style={{ color: theme.textSecondary, opacity: 0.5 }}>
            General leadership — no special bonuses for this pairing
          </p>
        </div>
      )}
    </motion.button>
  )
}

// ── Leader assign card — portrait header + squad option tiles ────────────────
function LeaderAssignCard({ leader, eligibleSquads, unitStates, accent, theme, onAssign }) {
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: theme.border }}>

      {/* Leader portrait — tall enough to show the character properly */}
      <div className="relative w-full" style={{ height: 180 }}>
        <ArtTile unit={leader} accent={accent} overlayStrength={0.65}>
          {/* Unassigned badge top-right */}
          <div className="absolute top-2.5 right-2.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Unassigned
            </span>
          </div>
          {/* Name + role at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
            <p className="font-black text-base leading-tight"
              style={{ color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
              {leader.name}
            </p>
            <p className="text-xs mt-0.5"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              {leaderMeta[baseId(leader.id)]?.role || 'Character'}
            </p>
          </div>
        </ArtTile>
      </div>

      {/* Squad options */}
      <div className="px-3 py-3">
        {eligibleSquads.length === 0 ? (
          <p className="text-xs italic py-1" style={{ color: theme.textSecondary, opacity: 0.5 }}>
            No eligible squads in your army — operates independently
          </p>
        ) : (
          <div className="space-y-2.5">
            <p className="text-xs font-black tracking-widest uppercase"
              style={{ color: theme.textSecondary, fontSize: 9 }}>
              Can lead:
            </p>
            {eligibleSquads.map(squad => (
              <SquadOptionCard
                key={squad.id}
                squad={squad}
                leader={leader}
                takenByOther={
                  !!(unitStates[squad.id]?.attachedLeaderId) &&
                  unitStates[squad.id]?.attachedLeaderId !== leader.id
                }
                accent={accent}
                theme={theme}
                onAssign={onAssign}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
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

  const independentSquads = squadUnits.filter(squad => {
    if (unitStates[squad.id]?.attachedLeaderId) return false
    const key = squad.unitKey || baseId(squad.id)
    return !leaderUnits.some(l => (unitLeaderMap[key] || []).includes(baseId(l.id)))
  })

  const assignableCount = squadUnits.filter(squad => {
    const key = squad.unitKey || baseId(squad.id)
    return leaderUnits.some(l => (unitLeaderMap[key] || []).includes(baseId(l.id)))
  }).length
  const assignedCount = squadUnits.filter(u => unitStates[u.id]?.attachedLeaderId).length
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

        {/* Multiplayer setup */}
        <MultiplayerSetup theme={theme} />

        {/* Opponent profile tags */}
        <OpponentProfile theme={theme} />

        <div className="rounded-2xl px-3.5 py-3"
          style={{ background: `${accent}0d`, border: `1px solid ${accent}20` }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
            Each leader brings unique abilities to the squad they command. Review the bonuses each pairing unlocks, then assign. One leader per squad.
          </p>
        </div>

        {/* Formation Bonds */}
        <AnimatePresence>
          {assignedLeaders.length > 0 && (
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
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
                    <FormationRow key={leader.id}
                      leader={leader} squad={squad}
                      accent={accent} theme={theme}
                      onDetach={() => detachLeader(squadId)} />
                  )
                })}
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* Assign a Leader */}
        {unassignedLeaders.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-3"
              style={{ color: theme.textSecondary }}>
              {assignedLeaders.length > 0 ? 'More Leaders' : 'Assign a Leader'}
            </p>
            <div className="space-y-3">
              {unassignedLeaders.map(leader => (
                <LeaderAssignCard key={leader.id}
                  leader={leader}
                  eligibleSquads={leaderEligibleSquads[leader.id] || []}
                  unitStates={unitStates}
                  accent={accent}
                  theme={theme}
                  onAssign={handleAssign} />
              ))}
            </div>
          </section>
        )}

        {/* Independent */}
        {independentSquads.length > 0 && (
          <section>
            <p className="text-xs font-black tracking-widest uppercase px-1 mb-2"
              style={{ color: theme.textSecondary }}>
              Independent
            </p>
            <div className="flex flex-wrap gap-2">
              {independentSquads.map(u => (
                <div key={u.id} className="rounded-xl border px-3 py-2"
                  style={{ background: theme.surface, borderColor: theme.border }}>
                  <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{u.name}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary, opacity: 0.5 }}>No leader available</p>
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
          onClick={() => { startBattle(); onNavigate('battle') }}
          className="flex-1 py-3 rounded-2xl font-black text-sm"
          style={{ background: accent, color: theme.bg }}>
          Begin Battle →
        </motion.button>
      </div>
    </div>
  )
}
