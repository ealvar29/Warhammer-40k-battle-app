import React, { useMemo, useState } from 'react'
import { PhaseIcon } from '../components/GameIcon'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { FACTION_META } from '../data/factionRegistry'
import { unitLeaderMap, leaderAbilities } from '../data/leaderData'
import OpponentProfile from '../components/OpponentProfile'

const PHASE_ICON_FALLBACK = '✦'
const PHASE_LABEL = { command: 'Command', movement: 'Move', shooting: 'Shoot', charge: 'Charge', fight: 'Fight', any: 'Any' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

function getPairingAbilities(leaderId, unitId) {
  const key = `${baseId(leaderId)}_${baseId(unitId)}`
  return leaderAbilities[key]?.abilities || []
}

// ── Ability row card ──────────────────────────────────────────────────────────
function AbilityCard({ ability, accent, theme }) {
  return (
    <div className="rounded-xl px-2.5 py-2"
      style={{ background: `${accent}0d`, border: `1px solid ${accent}22` }}>
      <div className="flex items-center gap-1.5 mb-0.5">
        {ability.phase && ability.phase !== 'any'
          ? <PhaseIcon phase={ability.phase} size={11} color={accent} />
          : <span style={{ fontSize: 11, color: accent }}>{PHASE_ICON_FALLBACK}</span>}
        <p className="text-xs font-bold flex-1 leading-tight" style={{ color: accent }}>{ability.name}</p>
        <span className="font-bold uppercase rounded px-1.5 py-0.5 shrink-0"
          style={{ background: `${accent}18`, color: accent, fontSize: 7 }}>
          {PHASE_LABEL[ability.phase] || ability.phase}
        </span>
      </div>
      {(ability.reminder || ability.description) && (
        <p className="text-xs leading-snug" style={{ color: theme.textPrimary, opacity: 0.9 }}>
          {ability.reminder || ability.description}
        </p>
      )}
    </div>
  )
}

// ── Squad assignment tile ─────────────────────────────────────────────────────
function SquadTile({ squad, leader, unitState, isAssigned, takenByOther, factionMeta, accent, theme, onAssign }) {
  const abilities = getPairingAbilities(leader.id, squad.id)
  const firstName = leader.name.split(' ')[0]

  return (
    <motion.button
      whileTap={!takenByOther ? { scale: 0.985 } : undefined}
      onClick={() => !takenByOther && onAssign(squad.id, leader.id)}
      disabled={takenByOther}
      className="w-full rounded-2xl overflow-hidden text-left"
      style={{
        background: theme.surface,
        border: `2px solid ${isAssigned ? accent : takenByOther ? theme.border : `${accent}30`}`,
        opacity: takenByOther ? 0.4 : 1,
        boxShadow: isAssigned ? `0 0 20px ${accent}30` : 'none',
      }}
    >
      {/* Portrait strip */}
      <div className="relative" style={{ height: 96 }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: squad.artUrl ? `url(${squad.artUrl})` : factionMeta?.gradient,
            backgroundSize: 'cover',
            backgroundPosition: squad.artPosition || 'center center',
          }} />
        {/* Gradient: strong left fade so text is always readable */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)' }} />
        <div className="absolute inset-0 flex items-center px-3 gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm leading-tight" style={{ color: '#fff' }}>{squad.name}</p>
            <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {squad.models} models · {squad.points}pts
            </p>
          </div>
          <div className="shrink-0">
            {isAssigned ? (
              <span className="font-black px-2.5 py-1 rounded-xl block"
                style={{ background: accent, color: '#000', fontSize: 10 }}>✓ Leading</span>
            ) : takenByOther ? (
              <span className="font-bold px-2 py-1 rounded-xl block"
                style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>Taken</span>
            ) : (
              <span className="font-black px-2.5 py-1 rounded-xl block"
                style={{ background: `${accent}cc`, color: '#000', fontSize: 10 }}>Assign →</span>
            )}
          </div>
        </div>
      </div>

      {/* Pairing bonuses */}
      {!takenByOther && (
        <div className="px-3 py-2.5 space-y-1.5">
          {abilities.length > 0 ? (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: accent }}>
                What {firstName} gives this squad:
              </p>
              {abilities.map((ab, i) => <AbilityCard key={i} ability={ab} accent={accent} theme={theme} />)}
            </>
          ) : (
            <p className="text-xs italic" style={{ color: theme.textSecondary }}>
              General leadership — {firstName} brings their stats and personal abilities to this unit.
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}

// ── Guided leader step ────────────────────────────────────────────────────────
function LeaderStep({ leader, leaderIdx, totalLeaders, eligibleSquads, unitStates, leaderAssignmentMap,
  factionMeta, accent, theme, onAssign, onDetach }) {

  const currentSquadId = leaderAssignmentMap[leader.id]
  const currentSquad = currentSquadId ? eligibleSquads.find(s => s.id === currentSquadId) : null

  const roleLabel = leader.category === 'epicHero' ? 'Epic Hero' : 'Character'

  return (
    <motion.div
      key={leader.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className="flex flex-col"
      style={{ minHeight: 0 }}
    >
      {/* Full-bleed portrait */}
      <div className="relative shrink-0" style={{ height: 'clamp(200px, 38vh, 320px)' }}>
        {leader.artUrl && (
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url(${leader.artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: leader.artPosition || 'center center',
            }} />
        )}
        {/* Dark top vignette */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)' }} />
        {/* Fade bottom into page bg */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '55%',
          background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)` }} />

        {/* Name + role at bottom of portrait */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3">
          <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: accent }}>{roleLabel}</p>
          <p className="font-black text-2xl leading-tight" style={{ color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
            {leader.name}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-2 pb-4 space-y-4" style={{ background: theme.bg }}>

        {/* Context blurb */}
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          {eligibleSquads.length > 0
            ? `Choose a squad for ${leader.name} to join. Your choice determines which abilities this unit gains during battle.`
            : `${leader.name} has no eligible squads in your army and will operate as an independent unit on the battlefield.`
          }
        </p>

        {/* Currently assigned — detach option */}
        {currentSquad && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl"
            style={{ background: `${accent}12`, border: `1px solid ${accent}33` }}>
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
              style={{
                backgroundImage: `url(${currentSquad.artUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: currentSquad.artPosition || 'center center',
              }} />
            <p className="text-xs font-bold flex-1" style={{ color: accent }}>
              Leading {currentSquad.name}
            </p>
            <button
              onClick={() => onDetach(currentSquadId)}
              className="text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
              Detach
            </button>
          </div>
        )}

        {/* Squad options */}
        <div className="space-y-3">
          {eligibleSquads.map(squad => (
            <SquadTile
              key={squad.id}
              squad={squad}
              leader={leader}
              unitState={unitStates[squad.id]}
              isAssigned={unitStates[squad.id]?.attachedLeaderId === leader.id}
              takenByOther={!!(unitStates[squad.id]?.attachedLeaderId) && unitStates[squad.id]?.attachedLeaderId !== leader.id}
              factionMeta={factionMeta}
              accent={accent}
              theme={theme}
              onAssign={onAssign}
            />
          ))}
        </div>

        {/* Independent character note */}
        {eligibleSquads.length === 0 && (
          <div className="rounded-2xl px-4 py-3 border"
            style={{ background: theme.surface, borderColor: theme.border }}>
            {leader.abilities?.some(a => a.name === 'Deep Strike') && (
              <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                <span className="font-bold" style={{ color: accent }}>Deep Strike available — </span>
                this character can be held in Reserves and arrive anywhere on the battlefield 9"+ from enemies.
              </p>
            )}
            {!leader.abilities?.some(a => a.name === 'Deep Strike') && (
              <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                Deploy this character on the battlefield during setup and use them as a solo threat.
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Review / summary step ─────────────────────────────────────────────────────
function ReviewStep({ leaderUnits, squadUnits, unitStates, leaderAssignmentMap, factionMeta, accent, theme, onEditLeader }) {
  const unledSquads = squadUnits.filter(u => !unitStates[u.id]?.attachedLeaderId)

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className="px-4 py-4 space-y-4"
    >
      {/* Summary header */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
          Deployment Summary
        </p>
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          Review your assignments before the battle begins. Tap a leader to reassign.
        </p>
      </div>

      <OpponentProfile theme={theme} />

      {/* Leader assignments */}
      {leaderUnits.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>
            Leaders
          </p>
          {leaderUnits.map(leader => {
            const squadId = leaderAssignmentMap[leader.id]
            const squad = squadId ? squadUnits.find(u => u.id === squadId) : null
            return (
              <motion.button key={leader.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEditLeader(leaderUnits.indexOf(leader))}
                className="w-full rounded-2xl border overflow-hidden flex items-stretch text-left"
                style={{
                  background: theme.surface,
                  borderColor: squad ? `${accent}44` : theme.border,
                  boxShadow: squad ? `0 0 12px ${accent}18` : 'none',
                }}>
                {/* Leader portrait strip */}
                <div className="relative shrink-0" style={{ width: 60 }}>
                  <div className="absolute inset-0"
                    style={{
                      backgroundImage: leader.artUrl ? `url(${leader.artUrl})` : factionMeta?.gradient,
                      backgroundSize: 'cover',
                      backgroundPosition: leader.artPosition || 'center top',
                    }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))' }} />
                </div>
                <div className="flex-1 px-3 py-2.5 min-w-0">
                  <p className="font-black text-sm leading-tight truncate" style={{ color: squad ? accent : theme.textPrimary }}>
                    {leader.name}
                  </p>
                  {squad ? (
                    <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>→ Leading {squad.name}</p>
                  ) : (
                    <p className="text-xs mt-0.5 italic" style={{ color: theme.textSecondary }}>Operating independently</p>
                  )}
                </div>
                <div className="flex items-center px-3 shrink-0">
                  {squad ? (
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg"
                      style={{ background: `${accent}20`, color: accent }}>✓</span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>Edit</span>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      {/* Unled squads */}
      {unledSquads.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>
            Unled Units
          </p>
          {unledSquads.map(unit => (
            <div key={unit.id}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border"
              style={{ background: theme.surface, borderColor: theme.border }}>
              <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: unit.artUrl ? `url(${unit.artUrl})` : factionMeta?.gradient,
                    backgroundSize: 'cover',
                    backgroundPosition: unit.artPosition || 'center center',
                  }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                <p className="text-[10px]" style={{ color: theme.textSecondary }}>{unit.points}pts · No leader attached</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-1" />
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DeployScreen({ theme, onNavigate }) {
  const { faction, selectedUnits, unitStates, attachLeader, detachLeader, startBattle } = useBattleStore()
  const factionMeta = faction ? FACTION_META[faction] : null
  const accent = theme.secondary

  // Compute leader/squad split first so useState can use it for initial value
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

  // Guided wizard state — if no leaders, start on review
  const [step, setStep] = useState(() => leaderUnits.length > 0 ? 'guided' : 'review')
  const [leaderIdx, setLeaderIdx] = useState(0)

  const isReview = step === 'review'
  const currentLeader = leaderUnits[leaderIdx]
  const isLastLeader = leaderIdx === leaderUnits.length - 1

  const goNext = () => {
    if (!isLastLeader) setLeaderIdx(i => i + 1)
    else setStep('review')
  }

  const goPrev = () => {
    if (isReview) {
      if (leaderUnits.length > 0) { setStep('guided'); setLeaderIdx(leaderUnits.length - 1) }
      else onNavigate('armyBuilder')
    } else if (leaderIdx > 0) {
      setLeaderIdx(i => i - 1)
    } else {
      onNavigate('armyBuilder')
    }
  }

  const handleAssign = (unitId, leaderId) => {
    const prevUnit = leaderAssignmentMap[leaderId]
    if (prevUnit && prevUnit !== unitId) detachLeader(prevUnit)
    const currentLeaderOfUnit = unitStates[unitId]?.attachedLeaderId
    if (currentLeaderOfUnit === leaderId) detachLeader(unitId)
    else attachLeader(unitId, leaderId)
  }

  const assignedCount = leaderUnits.filter(l => leaderAssignmentMap[l.id]).length

  return (
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>

      {/* ── Header ── */}
      <div className="px-4 py-3 border-b flex items-center gap-3 shrink-0"
        style={{ background: theme.navBg || theme.surface, borderColor: theme.border }}>
        <button onClick={goPrev}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: accent }}>Pre-Battle</p>
          <p className="font-black text-sm leading-tight truncate" style={{ color: theme.textPrimary }}>
            {isReview
              ? 'Deployment Summary'
              : `Leader ${leaderIdx + 1} of ${leaderUnits.length}`}
          </p>
        </div>

        {/* Progress dots — one per leader */}
        {leaderUnits.length > 0 && (
          <div className="flex gap-1.5 shrink-0">
            {leaderUnits.map((_, i) => (
              <motion.div key={i}
                animate={{
                  background: isReview || i < leaderIdx
                    ? accent
                    : i === leaderIdx
                      ? accent
                      : theme.border,
                  scale: !isReview && i === leaderIdx ? 1.3 : 1,
                  opacity: isReview || i <= leaderIdx ? 1 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                className="rounded-full"
                style={{ width: 6, height: 6 }}
              />
            ))}
            {/* Review dot */}
            <motion.div
              animate={{ background: isReview ? accent : theme.border, opacity: isReview ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
              className="rounded-full"
              style={{ width: 6, height: 6 }}
            />
          </div>
        )}

        {/* Assignment counter */}
        {leaderUnits.length > 0 && (
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
            {assignedCount}/{leaderUnits.length}
          </span>
        )}
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          {isReview ? (
            <ReviewStep
              key="review"
              leaderUnits={leaderUnits}
              squadUnits={squadUnits}
              unitStates={unitStates}
              leaderAssignmentMap={leaderAssignmentMap}
              factionMeta={factionMeta}
              accent={accent}
              theme={theme}
              onEditLeader={(idx) => { setLeaderIdx(idx); setStep('guided') }}
            />
          ) : currentLeader ? (
            <LeaderStep
              key={currentLeader.id}
              leader={currentLeader}
              leaderIdx={leaderIdx}
              totalLeaders={leaderUnits.length}
              eligibleSquads={leaderEligibleSquads[currentLeader.id] || []}
              unitStates={unitStates}
              leaderAssignmentMap={leaderAssignmentMap}
              factionMeta={factionMeta}
              accent={accent}
              theme={theme}
              onAssign={handleAssign}
              onDetach={detachLeader}
            />
          ) : null}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3 border-t shrink-0 flex items-center gap-3"
        style={{ background: theme.surface, borderColor: theme.border }}>
        {isReview ? (
          <>
            <button
              onClick={goPrev}
              className="px-4 py-3 rounded-2xl text-sm font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              ← Back
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { startBattle(); onNavigate('battle') }}
              className="flex-1 py-3 rounded-2xl font-black text-sm"
              style={{ background: accent, color: theme.bg }}>
              Begin Battle →
            </motion.button>
          </>
        ) : (
          <>
            {/* Skip — subtle ghost, moves to next without assigning */}
            <button
              onClick={goNext}
              className="px-4 py-3 rounded-2xl text-sm font-bold"
              style={{ background: 'transparent', color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              Skip
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={goNext}
              className="flex-1 py-3 rounded-2xl font-black text-sm"
              style={{ background: accent, color: theme.bg }}>
              {isLastLeader ? 'Review Deployment →' : 'Next Leader →'}
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}
