import React, { useMemo, useState } from 'react'
import { parseTextWithKeywords } from '../components/KeywordChip'
import { PhaseIcon, PickOneIcon } from '../components/GameIcon'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleStore } from '../store/battleStore'
import { FACTION_META, findDetachment } from '../data/factionRegistry'
import { unitLeaderMap, leaderAbilities } from '../data/leaderData'
import OpponentProfile from '../components/OpponentProfile'
import { usePortraitStore } from '../store/portraitStore'

const PHASE_ICON_FALLBACK = '✦'
const PHASE_LABEL = { command: 'Command', movement: 'Move', shooting: 'Shoot', charge: 'Charge', fight: 'Fight', any: 'Any' }
const baseId = (id) => id?.replace(/_\d+$/, '') ?? id

function getPairingAbilities(leaderId, unitId) {
  const key = `${baseId(leaderId)}_${baseId(unitId)}`
  return leaderAbilities[key]?.abilities || []
}

// ── Ability row ───────────────────────────────────────────────────────────────
function AbilityCard({ ability, accent, theme }) {
  return (
    <div className="rounded-xl px-3 py-2.5"
      style={{ background: `${accent}0d`, border: `1px solid ${accent}22` }}>
      <div className="flex items-center gap-2 mb-1">
        {ability.phase && ability.phase !== 'any'
          ? <PhaseIcon phase={ability.phase} size={12} color={accent} />
          : <span style={{ fontSize: 12, color: accent }}>{PHASE_ICON_FALLBACK}</span>}
        <p className="text-xs font-black flex-1 leading-tight" style={{ color: accent }}>{ability.name}</p>
        <span className="font-bold uppercase rounded-md px-1.5 py-0.5 shrink-0"
          style={{ background: `${accent}18`, color: accent, fontSize: 7, letterSpacing: '0.06em' }}>
          {PHASE_LABEL[ability.phase] || ability.phase}
        </span>
      </div>
      {(ability.reminder || ability.description) && (
        <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary, opacity: 0.88 }}>
          {parseTextWithKeywords(ability.reminder || ability.description, theme)}
        </p>
      )}
    </div>
  )
}

// ── Squad assignment card ─────────────────────────────────────────────────────
function SquadCard({ squad, leader, isAssigned, takenByOther, factionMeta, accent, theme, onAssign }) {
  const abilities = getPairingAbilities(leader.id, squad.id)
  const firstName = leader.name.split(' ')[0]
  const portraits = usePortraitStore(s => s.portraits)
  const portraitOverride = portraits[squad.id]
  const resolvedArtUrl = portraitOverride?.artUrl ?? squad.artUrl
  const resolvedArtPos = portraitOverride?.artPosition ?? squad.artPosition ?? 'center center'

  return (
    <motion.button
      whileTap={!takenByOther ? { scale: 0.985 } : undefined}
      onClick={() => !takenByOther && onAssign(squad.id, leader.id)}
      disabled={takenByOther}
      className="w-full rounded-2xl overflow-hidden text-left"
      style={{
        background: theme.surface,
        border: `2px solid ${isAssigned ? accent : takenByOther ? theme.border : `${accent}28`}`,
        opacity: takenByOther ? 0.38 : 1,
        boxShadow: isAssigned ? `0 0 24px ${accent}28, 0 2px 8px rgba(0,0,0,0.25)` : '0 2px 8px rgba(0,0,0,0.15)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Portrait strip */}
      <div className="relative" style={{ height: 140 }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: resolvedArtUrl ? `url(${resolvedArtUrl})` : factionMeta?.gradient,
            backgroundSize: 'cover',
            backgroundPosition: resolvedArtPos,
          }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.08) 100%)' }} />

        <div className="absolute inset-0 flex items-center px-4 gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-black text-base leading-tight truncate" style={{ color: '#fff' }}>{squad.name}</p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {squad.models} models · {squad.points}pts
            </p>
          </div>
          <div className="shrink-0">
            {isAssigned ? (
              <span className="font-black px-3 py-1.5 rounded-xl block text-xs"
                style={{ background: accent, color: '#000' }}>✓ Leading</span>
            ) : takenByOther ? (
              <span className="font-bold px-3 py-1.5 rounded-xl block text-xs"
                style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.3)' }}>Taken</span>
            ) : (
              <span className="font-black px-3 py-1.5 rounded-xl block text-xs"
                style={{ background: `${accent}dd`, color: '#000' }}>Assign →</span>
            )}
          </div>
        </div>
      </div>

      {/* Pairing bonuses */}
      {!takenByOther && (
        <div className="px-4 py-3 space-y-2">
          {abilities.length > 0 ? (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${accent}bb` }}>
                What {firstName} gives this squad:
              </p>
              {abilities.map((ab, i) => <AbilityCard key={i} ability={ab} accent={accent} theme={theme} />)}
            </>
          ) : (
            <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
              General leadership — {firstName} fights alongside this unit and contributes their personal stats and abilities.
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}

// ── Guided leader step — responsive 2-col on desktop ─────────────────────────
function LeaderStep({ leader, leaderIdx, totalLeaders, eligibleSquads, unitStates,
  leaderAssignmentMap, factionMeta, accent, theme, onAssign, onDetach, onNext, onSkip, isLast }) {

  const portraits = usePortraitStore(s => s.portraits)
  const currentSquadId = leaderAssignmentMap[leader.id]
  const currentSquad = currentSquadId ? eligibleSquads.find(s => s.id === currentSquadId) : null
  const roleLabel = leader.category === 'epicHero' ? 'Epic Hero' : 'Character'

  return (
    <motion.div
      key={leader.id}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="flex-1 flex flex-col md:flex-row min-h-0"
    >
      {/* ── LEFT: Portrait panel ── */}
      <div className="relative shrink-0 md:w-2/5 md:h-full h-[clamp(220px,42vh,360px)]">

        {/* Portrait image */}
        {leader.artUrl && (
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url(${leader.artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: leader.artPosition || 'center top',
            }} />
        )}

        {/* Subtle top darkening */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%)' }} />

        {/* Mobile: fade to page bg at bottom */}
        <div className="absolute bottom-0 left-0 right-0 md:hidden"
          style={{ height: '60%', background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)` }} />

        {/* Desktop: subtle bottom fade for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:block"
          style={{ height: '25%', background: `linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)` }} />

        {/* Name + role overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 md:pb-6">
          <p className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: accent }}>
            {roleLabel}
          </p>
          <p className="font-black leading-tight"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            }}>
            {leader.name}
          </p>
        </div>
      </div>

      {/* ── RIGHT: Squad assignment panel ── */}
      <div className="flex-1 flex flex-col min-h-0" style={{ background: theme.bg }}>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-6 pt-3 md:pt-6 pb-3 space-y-4">

          {/* Context */}
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {eligibleSquads.length > 0
              ? `Choose a squad for ${leader.name} to join. Your choice determines which bonuses this unit gains during battle.`
              : `${leader.name} has no eligible squads in your current army and will operate as an independent unit.`}
          </p>

          {/* Detach row — only if currently assigned */}
          {currentSquad && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}>
              <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0"
                style={{
                  backgroundImage: `url(${portraits[currentSquad.id]?.artUrl ?? currentSquad.artUrl ?? ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: portraits[currentSquad.id]?.artPosition ?? currentSquad.artPosition ?? 'center center',
                }} />
              <p className="text-xs font-bold flex-1 min-w-0 truncate" style={{ color: accent }}>
                Currently leading {currentSquad.name}
              </p>
              <button
                onClick={() => onDetach(currentSquadId)}
                className="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                Detach
              </button>
            </div>
          )}

          {/* Squad cards */}
          <div className="space-y-3">
            {eligibleSquads.map(squad => (
              <SquadCard
                key={squad.id}
                squad={squad}
                leader={leader}
                isAssigned={unitStates[squad.id]?.attachedLeaderId === leader.id}
                takenByOther={!!(unitStates[squad.id]?.attachedLeaderId) && unitStates[squad.id]?.attachedLeaderId !== leader.id}
                factionMeta={factionMeta}
                accent={accent}
                theme={theme}
                onAssign={onAssign}
              />
            ))}
          </div>

          {/* Standalone note */}
          {eligibleSquads.length === 0 && (
            <div className="rounded-2xl px-4 py-3.5 border"
              style={{ background: theme.surface, borderColor: theme.border }}>
              {leader.abilities?.some(a => a.name === 'Deep Strike') ? (
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  <span className="font-bold" style={{ color: accent }}>Deep Strike — </span>
                  this character can be held in Reserves and arrive anywhere on the battlefield 9″+ from enemies at the start of any of your Movement phases.
                </p>
              ) : (
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Deploy this character on the battlefield during setup. They'll fight as a solo unit and contribute their own powerful stat line.
                </p>
              )}
            </div>
          )}

          <div className="h-1" />
        </div>

        {/* ── Inline footer (desktop shows here; mobile footer overrides) ── */}
        <div className="shrink-0 hidden md:flex items-center gap-3 px-6 py-4 border-t"
          style={{ borderColor: theme.border, background: theme.surface }}>
          <button onClick={onSkip}
            className="px-5 py-3 rounded-2xl text-sm font-bold"
            style={{ background: 'transparent', color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            Skip
          </button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onNext}
            className="flex-1 py-3 rounded-2xl font-black text-sm"
            style={{ background: accent, color: theme.bg }}>
            {isLast ? 'Review Deployment →' : 'Next Leader →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Review step ───────────────────────────────────────────────────────────────
function HuntingPacksPreview({ faction, detachmentId, theme }) {
  if (faction !== 'spacewolves' || detachmentId !== 'sagaOfTheGreatWolf') return null
  const detachment = findDetachment('spacewolves', 'sagaOfTheGreatWolf')
  const packs = detachment?.commandPhaseAction?.options || []
  if (!packs.length) return null
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.border}`, background: theme.surface }}>
      <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: theme.border, background: theme.surfaceHigh }}>
        <PhaseIcon phase="command" size={12} color="#fbbf24" />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#fbbf24' }}>
          Hunting Packs — pick one each Command Phase
        </p>
      </div>
      <div className="divide-y" style={{ borderColor: theme.border }}>
        {packs.map(p => (
          <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
            <PickOneIcon icon={p.icon} size={18} color={p.unitEffects?.badgeColor || theme.secondary} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black" style={{ color: p.unitEffects?.badgeColor || theme.secondary }}>{p.label}</p>
              <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{p.shortEffect}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t" style={{ borderColor: theme.border }}>
        <p style={{ color: theme.textSecondary, fontSize: 10, opacity: 0.7 }}>
          Each pack usable once per battle. Logan Grimnar on field unlocks Howling Onslaught — re-select one used pack.
        </p>
      </div>
    </div>
  )
}

function ReviewStep({ leaderUnits, squadUnits, unitStates, leaderAssignmentMap, factionMeta, accent, theme, onEditLeader, faction, detachmentId }) {
  const portraits = usePortraitStore(s => s.portraits)
  const unledSquads = squadUnits.filter(u => !unitStates[u.id]?.attachedLeaderId)

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="px-4 md:px-8 py-5 space-y-5 max-w-2xl md:mx-auto w-full"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>Ready to deploy</p>
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          Your leaders are assigned. Tap any entry to reassign before battle.
        </p>
      </div>

      <OpponentProfile theme={theme} />

      <HuntingPacksPreview faction={faction} detachmentId={detachmentId} theme={theme} />

      {leaderUnits.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest px-1" style={{ color: theme.textSecondary }}>Leaders</p>
          {leaderUnits.map((leader, i) => {
            const squadId = leaderAssignmentMap[leader.id]
            const squad = squadId ? squadUnits.find(u => u.id === squadId) : null
            return (
              <motion.button key={leader.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEditLeader(i)}
                className="w-full rounded-2xl overflow-hidden flex items-stretch text-left"
                style={{
                  background: theme.surface,
                  border: `2px solid ${squad ? `${accent}44` : theme.border}`,
                  boxShadow: squad ? `0 0 14px ${accent}18` : 'none',
                  minHeight: 72,
                }}>
                {/* Portrait */}
                <div className="relative shrink-0" style={{ width: 72 }}>
                  <div className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${portraits[leader.id]?.artUrl ?? leader.artUrl ?? ''})` ,
                      backgroundSize: 'cover',
                      backgroundPosition: portraits[leader.id]?.artPosition ?? leader.artPosition ?? 'center top',
                    }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.25))' }} />
                </div>
                {/* Info */}
                <div className="flex-1 px-4 py-3 min-w-0 flex flex-col justify-center">
                  <p className="font-black text-sm truncate" style={{ color: squad ? accent : theme.textPrimary }}>{leader.name}</p>
                  {squad
                    ? <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>→ Leading {squad.name}</p>
                    : <p className="text-xs mt-0.5 italic" style={{ color: theme.textSecondary }}>Operating independently</p>}
                </div>
                {/* Status chip */}
                <div className="flex items-center px-4 shrink-0">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg"
                    style={{
                      background: squad ? `${accent}20` : theme.surfaceHigh,
                      color: squad ? accent : theme.textSecondary,
                      border: `1px solid ${squad ? `${accent}33` : theme.border}`,
                    }}>
                    {squad ? '✓ Set' : 'Edit'}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      {unledSquads.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest px-1" style={{ color: theme.textSecondary }}>Unled Units</p>
          {unledSquads.map(unit => (
            <div key={unit.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
              style={{ background: theme.surface, borderColor: theme.border }}>
              <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${portraits[unit.id]?.artUrl ?? unit.artUrl ?? ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: portraits[unit.id]?.artPosition ?? unit.artPosition ?? 'center center',
                  }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{unit.name}</p>
                <p className="text-[11px]" style={{ color: theme.textSecondary }}>{unit.points}pts · No leader attached</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-2" />
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DeployScreen({ theme, onNavigate }) {
  const { faction, detachmentId, selectedUnits, unitStates, attachLeader, detachLeader, startBattle } = useBattleStore()
  const factionMeta = faction ? FACTION_META[faction] : null
  const accent = theme.secondary

  const leaderUnits = useMemo(() => selectedUnits.filter(u => u.isLeader), [selectedUnits])
  const squadUnits  = useMemo(() => selectedUnits.filter(u => !u.isLeader),  [selectedUnits])

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

  const [step, setStep]       = useState(() => leaderUnits.length > 0 ? 'guided' : 'review')
  const [leaderIdx, setLeaderIdx] = useState(0)

  const isReview    = step === 'review'
  const currentLeader = leaderUnits[leaderIdx]
  const isLastLeader  = leaderIdx === leaderUnits.length - 1

  const goNext = () => { if (!isLastLeader) setLeaderIdx(i => i + 1); else setStep('review') }
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
          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
          ←
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: accent }}>Pre-Battle</p>
          <p className="font-black text-sm leading-tight truncate" style={{ color: theme.textPrimary }}>
            {isReview ? 'Deployment Summary' : `Leader ${leaderIdx + 1} of ${leaderUnits.length}`}
          </p>
        </div>

        {/* Progress dots */}
        {leaderUnits.length > 0 && (
          <div className="flex items-center gap-1.5 shrink-0">
            {leaderUnits.map((_, i) => (
              <motion.div key={i}
                className="rounded-full"
                animate={{
                  width:   !isReview && i === leaderIdx ? 14 : 6,
                  background: (isReview || i < leaderIdx) ? accent : i === leaderIdx ? accent : theme.border,
                  opacity: isReview || i <= leaderIdx ? 1 : 0.35,
                }}
                transition={{ duration: 0.22 }}
                style={{ height: 6 }}
              />
            ))}
            {/* Review dot */}
            <motion.div
              className="rounded-full"
              animate={{ background: isReview ? accent : theme.border, opacity: isReview ? 1 : 0.25 }}
              transition={{ duration: 0.22 }}
              style={{ width: 6, height: 6 }}
            />
          </div>
        )}

        {leaderUnits.length > 0 && (
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}28` }}>
            {assignedCount}/{leaderUnits.length}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden flex flex-col">
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
              faction={faction}
              detachmentId={detachmentId}
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
              onNext={goNext}
              onSkip={goNext}
              isLast={isLastLeader}
            />
          ) : null}
        </AnimatePresence>
      </div>

      {/* ── Mobile-only footer (hidden on md+) ── */}
      <div className="md:hidden px-4 py-3 border-t shrink-0 flex items-center gap-3"
        style={{ background: theme.surface, borderColor: theme.border }}>
        {isReview ? (
          <>
            <button onClick={goPrev}
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
          </>
        ) : (
          <>
            <button onClick={goNext}
              className="px-4 py-3 rounded-2xl text-sm font-bold"
              style={{ background: 'transparent', color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              Skip
            </button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={goNext}
              className="flex-1 py-3 rounded-2xl font-black text-sm"
              style={{ background: accent, color: theme.bg }}>
              {isLastLeader ? 'Review Deployment →' : 'Next Leader →'}
            </motion.button>
          </>
        )}
      </div>

      {/* ── Desktop review footer (replaces inline, stays at bottom) ── */}
      {isReview && (
        <div className="hidden md:flex px-8 py-4 border-t shrink-0 items-center gap-4"
          style={{ background: theme.surface, borderColor: theme.border }}>
          <button onClick={goPrev}
            className="px-5 py-3 rounded-2xl text-sm font-bold"
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
      )}
    </div>
  )
}
