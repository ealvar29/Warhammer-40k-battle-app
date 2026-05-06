import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCrusadeStore, getRank, getNextRank, RANKS } from '../store/crusadeStore'
import TipCard from '../components/TipCard'
import { battleHonours } from '../data/crusade/battleHonours'
import { battleScars } from '../data/crusade/battleScars'
import { agendas as ALL_AGENDAS } from '../data/crusade/agendas'
import { rpActions as RP_ACTIONS } from '../data/crusade/rpActions'
import { FACTION_META, FACTION_DETACHMENTS, FACTION_UNITS } from '../data/factionRegistry'
import { FactionIcon } from '../components/GameIcon'
import {
  SW_AGENDAS, SW_BATTLE_TRAITS, SW_HEROIC_TRAITS,
  SW_REQUISITIONS, SW_CRUSADE_RELICS, SW_CRUSADE_BADGES,
  SW_SAGAS, SW_CAMPAIGN_PATHS,
} from '../data/spacewolves/swCrusade'

// ── Rank milestone thresholds — used to detect level-ups ──────────────────
const RANK_MILESTONES = RANKS.map(r => r.xpMin)

// ── Helpers ────────────────────────────────────────────────────────────────

function formatCode(code) {
  if (!code || code.length < 6) return code || '------'
  return `${code.slice(0, 3)}-${code.slice(3)}`
}

function timeAgo(iso) {
  if (!iso) return 'Never synced'
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const h = Math.floor(mins / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const ALLEGIANCE_GROUPS = [
  { id: 'imperium', label: 'Imperium', icon: '⚜️', factionIds: ['spacewolves', 'spacemarines', 'darkangels', 'bloodangels', 'blacktemplars', 'greyknights', 'deathwatch', 'adeptuscustodes', 'adeptasororitas', 'admech', 'astramilitarum', 'imperialknights'] },
  { id: 'chaos',    label: 'Chaos',    icon: '💀', factionIds: ['chaosspacemarines', 'deathguard', 'emperorschildren', 'thousandsons', 'worldeaters', 'chaosdaemons', 'chaosknights'] },
  { id: 'xenos',    label: 'Xenos',    icon: '👽', factionIds: ['tyranids', 'genestealercults', 'necrons', 'orks', 'aeldari', 'drukhari', 'tau', 'leaguesofvotann'] },
]

// Space Wolves get a set of thematically matching agendas
const SW_AGENDA_IDS = ['assassinate', 'no-prisoners', 'grind-them-down', 'bring-it-down', 'behind-enemy-lines', 'engage-on-all-fronts']

function getAgendasForFaction(faction) {
  if (faction === 'spacewolves') {
    const swRecommended = ALL_AGENDAS.filter(a => SW_AGENDA_IDS.includes(a.id))
    const rest = ALL_AGENDAS.filter(a => !SW_AGENDA_IDS.includes(a.id))
    return [...SW_AGENDAS, ...swRecommended, ...rest]
  }
  return ALL_AGENDAS
}

// ── Framer Motion variants ─────────────────────────────────────────────────

const tabFade = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.14 } },
}

const slideUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
}

// ── XP Bar ─────────────────────────────────────────────────────────────────

function XpBar({ xp, theme, compact = false }) {
  const rank = getRank(xp)
  const nextRank = getNextRank(xp)
  const pct = nextRank ? ((xp - rank.xpMin) / (nextRank.xpMin - rank.xpMin)) * 100 : 100
  return (
    <div>
      {!compact && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-bold" style={{ color: theme.secondary }}>{rank.label}</span>
          {nextRank
            ? <span className="text-xs" style={{ color: theme.textSecondary }}>{xp} / {nextRank.xpMin} XP → {nextRank.label}</span>
            : <span className="text-xs" style={{ color: theme.secondary }}>Max Rank</span>
          }
        </div>
      )}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.border }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: theme.secondary }}
        />
      </div>
    </div>
  )
}

// ── Dice Roller Modal ───────────────────────────────────────────────────────

const DIE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

function DiceRollerModal({ table, title, onApply, onClose, theme }) {
  const [shown, setShown] = useState(1)
  const [result, setResult] = useState(null)
  const [rolling, setRolling] = useState(true)

  useEffect(() => {
    const finalRoll = Math.floor(Math.random() * 6) + 1
    const delays = [55, 70, 90, 115, 150, 200, 260, 330, 420, 520]
    let i = 0
    const tick = () => {
      if (i < delays.length) {
        setShown(Math.floor(Math.random() * 6) + 1)
        setTimeout(tick, delays[i++])
      } else {
        setShown(finalRoll)
        setRolling(false)
        setResult(table.find(r => r.roll === finalRoll) || table[0])
      }
    }
    setTimeout(tick, 40)
  }, [table])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.88)' }}>
      <motion.div
        variants={slideUp} initial="hidden" animate="visible"
        className="w-full max-w-xs rounded-3xl p-6 space-y-4"
        style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
      >
        <p className="text-xs font-bold tracking-widest uppercase text-center" style={{ color: theme.secondary }}>{title}</p>

        <div className="flex flex-col items-center gap-1">
          <motion.span
            key={shown}
            initial={{ scale: rolling ? 1.3 : 1.1, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.08 }}
            className="leading-none select-none"
            style={{ fontSize: 84 }}
          >
            {DIE_FACES[shown - 1]}
          </motion.span>
          <span className="text-3xl font-black" style={{ color: theme.textPrimary }}>{shown}</span>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="rounded-2xl p-4 text-center"
              style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}
            >
              <p className="font-black text-sm mb-1" style={{ color: theme.secondary }}>{result.name}</p>
              <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>{result.effect}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          {result && (
            <button onClick={() => onApply(result)}
              className="flex-1 py-3 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}>
              Apply
            </button>
          )}
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl font-bold text-sm"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
            {result ? 'Dismiss' : 'Cancel'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Onboarding Overlay (first-time) ────────────────────────────────────────

function OnboardingOverlay({ theme, onStart }) {
  return (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 text-center gap-5"
      style={{ background: theme.bg }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 22 }}
        className="rounded-3xl p-6 w-full max-w-sm space-y-4"
        style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
      >
        <p className="text-4xl">📜</p>
        <div>
          <h2 className="text-xl font-black mb-2" style={{ color: theme.textPrimary }}>What is Crusade?</h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
            Crusade is the <span style={{ color: theme.secondary, fontWeight: 700 }}>narrative campaign mode</span> for Warhammer 40,000.
            Your army grows between battles — units earn XP, unlock Battle Honours (permanent bonuses), and can suffer Battle Scars (permanent penalties).
          </p>
        </div>

        <div className="space-y-3 text-left">
          {[
            { icon: '📋', heading: 'Order of Battle', body: 'Your permanent roster of units. Each one has its own history.' },
            { icon: '✨', heading: 'XP & Ranks',       body: 'Units earn XP each game. At rank milestones you roll for a Battle Honour.' },
            { icon: '💰', heading: 'Requisition Points', body: 'Earn 1 RP per battle. Spend them to resupply, recruit, or repair your force.' },
            { icon: '🎯', heading: 'Agendas',           body: 'Pick goals before each battle. Completing them earns bonus XP for specific units.' },
          ].map(item => (
            <div key={item.heading} className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
              style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs font-black" style={{ color: theme.textPrimary }}>{item.heading}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onStart}
          className="w-full py-3.5 rounded-2xl font-bold text-sm"
          style={{ background: theme.secondary, color: theme.bg }}>
          Create my Crusade Force
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Create Roster Sheet ─────────────────────────────────────────────────────

function CreateRosterSheet({ onClose, onCreate, theme }) {
  const [name, setName] = useState('')
  const [allegianceTab, setAllegianceTab] = useState('imperium')
  const [faction, setFaction] = useState(null)
  const [detachmentId, setDetachmentId] = useState(null)

  const detachments = faction ? Object.values(FACTION_DETACHMENTS[faction] || {}) : []
  const factionMeta = faction ? FACTION_META[faction] : null
  const canCreate = name.trim() && faction

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <motion.div
        variants={slideUp} initial="hidden" animate="visible"
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '92vh' }}
      >
        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>New Crusade Force</p>
          <h2 className="text-lg font-black mt-0.5 mb-4" style={{ color: theme.textPrimary }}>Create your Order of Battle</h2>

          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. The Ironjaws Warband"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none mb-4"
            style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />

          <div className="flex rounded-xl overflow-hidden border mb-3" style={{ borderColor: theme.border }}>
            {ALLEGIANCE_GROUPS.map((g, i) => (
              <button key={g.id} onClick={() => { setAllegianceTab(g.id); setFaction(null); setDetachmentId(null) }}
                className="flex-1 py-2 text-xs font-black transition-all"
                style={{
                  background: allegianceTab === g.id ? `${theme.secondary}18` : theme.surfaceHigh,
                  color: allegianceTab === g.id ? theme.secondary : theme.textSecondary,
                  borderRight: i < 2 ? `1px solid ${theme.border}` : 'none',
                }}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {ALLEGIANCE_GROUPS.find(g => g.id === allegianceTab)?.factionIds.map(id => {
              const f = FACTION_META[id]
              if (!f) return null
              const sel = faction === id
              return (
                <button key={id} onClick={() => { setFaction(id); setDetachmentId(null) }}
                  className="rounded-2xl border-2 p-2.5 flex flex-col items-center text-center transition-all"
                  style={{ background: sel ? `${f.color}18` : theme.surfaceHigh, borderColor: sel ? f.color : theme.border }}>
                  <FactionIcon id={id} size={22} color={sel ? f.color : theme.textSecondary} />
                  <p className="text-xs font-bold leading-tight" style={{ color: sel ? f.color : theme.textPrimary, fontSize: 10 }}>{f.name}</p>
                </button>
              )
            })}
          </div>

          {detachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Detachment (optional)</p>
              {detachments.map(d => (
                <button key={d.id} onClick={() => setDetachmentId(d.id)}
                  className="w-full rounded-xl border p-3 text-left transition-all"
                  style={{
                    background: detachmentId === d.id ? `${factionMeta.color}12` : theme.surfaceHigh,
                    borderColor: detachmentId === d.id ? factionMeta.color : theme.border,
                  }}>
                  <p className="text-xs font-bold" style={{ color: detachmentId === d.id ? factionMeta.color : theme.textPrimary }}>{d.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{d.detachmentRule?.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 pb-8 pt-3 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          <button onClick={() => canCreate && onCreate(name.trim(), faction, detachmentId)}
            className="w-full py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: canCreate ? theme.secondary : theme.border, color: canCreate ? theme.bg : theme.textSecondary }}>
            Create Force
          </button>
          {onClose && (
            <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab({ order, onAddBattle, onSpendRP, theme }) {
  const store = useCrusadeStore()
  const factionMeta = FACTION_META[order.faction]
  const isSW = order.faction === 'spacewolves'
  const supplyUsed = order.units.reduce((s, u) => s + (u.powerRating || 0), 0)
  const winRate = order.battlesPlayed > 0
    ? Math.round((order.battlesWon / order.battlesPlayed) * 100)
    : null

  const topUnit = [...order.units].sort((a, b) => b.xp - a.xp)[0] || null
  const activeAgendaNames = (order.agendas || [])
    .map(id => [...SW_AGENDAS, ...ALL_AGENDAS].find(a => a.id === id)?.name)
    .filter(Boolean)
  const [showBadgePicker, setShowBadgePicker] = useState(false)
  const [showPathPicker, setShowPathPicker] = useState(false)
  const activeBadge = isSW ? SW_CRUSADE_BADGES.find(b => b.id === order.crusadeBadge) : null
  const activePath = isSW ? SW_CAMPAIGN_PATHS.find(p => p.id === order.campaignPath) : null

  return (
    <motion.div variants={tabFade} initial="hidden" animate="visible" exit="exit"
      className="px-4 py-4 space-y-4">

      <TipCard id="tip_overview" theme={theme}
        body="This is your campaign summary. Track your force's record, Requisition Points, and supply limit here. Tap the tabs above to manage units, agendas, and RP spending." />

      {/* SW Campaign Path + Badge */}
      {isSW && (
        <div className="grid grid-cols-2 gap-2">
          {/* Campaign Path */}
          <button onClick={() => setShowPathPicker(!showPathPicker)}
            className="rounded-2xl p-3 text-left"
            style={{ background: activePath ? `${theme.secondary}12` : theme.surfaceHigh, border: `1px solid ${activePath ? theme.secondary + '44' : theme.border}` }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.textSecondary, fontSize: 8 }}>Campaign Path</p>
            {activePath ? (
              <>
                <p style={{ fontSize: 18, lineHeight: 1 }}>{activePath.icon}</p>
                <p className="text-xs font-black mt-1 leading-tight" style={{ color: theme.secondary }}>{activePath.name}</p>
              </>
            ) : (
              <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>+ Choose path</p>
            )}
          </button>

          {/* Crusade Badge */}
          <button onClick={() => setShowBadgePicker(!showBadgePicker)}
            className="rounded-2xl p-3 text-left"
            style={{ background: activeBadge ? `${theme.primary}12` : theme.surfaceHigh, border: `1px solid ${activeBadge ? theme.primary + '44' : theme.border}` }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.textSecondary, fontSize: 8 }}>Crusade Badge</p>
            {activeBadge ? (
              <>
                <p style={{ fontSize: 18, lineHeight: 1 }}>{activeBadge.icon}</p>
                <p className="text-xs font-black mt-1 leading-tight" style={{ color: theme.primary }}>{activeBadge.name}</p>
              </>
            ) : (
              <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>+ Choose badge</p>
            )}
          </button>
        </div>
      )}

      {/* Campaign Path picker */}
      {isSW && showPathPicker && (
        <div className="rounded-2xl border p-3 space-y-2" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Choose Campaign Path</p>
          {SW_CAMPAIGN_PATHS.map(path => (
            <button key={path.id} onClick={() => { store.setCampaignPath(order.id, path.id); setShowPathPicker(false) }}
              className="w-full rounded-xl border p-3 text-left transition-all"
              style={{ background: order.campaignPath === path.id ? `${theme.secondary}12` : theme.surface, borderColor: order.campaignPath === path.id ? theme.secondary : theme.border }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 18 }}>{path.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-black" style={{ color: order.campaignPath === path.id ? theme.secondary : theme.textPrimary }}>{path.name}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{path.bonus}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Crusade Badge picker */}
      {isSW && showBadgePicker && (
        <div className="rounded-2xl border p-3 space-y-2" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Choose Crusade Badge</p>
          {SW_CRUSADE_BADGES.map(badge => (
            <button key={badge.id} onClick={() => { store.setCrusadeBadge(order.id, badge.id); setShowBadgePicker(false) }}
              className="w-full rounded-xl border p-3 text-left transition-all"
              style={{ background: order.crusadeBadge === badge.id ? `${theme.primary}12` : theme.surface, borderColor: order.crusadeBadge === badge.id ? theme.primary : theme.border }}>
              <div className="flex items-start gap-2">
                <span style={{ fontSize: 18 }}>{badge.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-black" style={{ color: order.crusadeBadge === badge.id ? theme.primary : theme.textPrimary }}>{badge.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.secondary, fontStyle: 'italic' }}>{badge.bonus}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{badge.thematic}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Faction hero banner */}
      {factionMeta && (
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: `${factionMeta.color}14`, border: `1px solid ${factionMeta.color}35` }}>
          <FactionIcon id={order.faction} size={30} color={factionMeta.color} />
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm truncate" style={{ color: factionMeta.color }}>{order.name}</p>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
              {factionMeta.name}{order.detachmentId ? ` · ${Object.values(FACTION_DETACHMENTS[order.faction] || {}).find(d => d.id === order.detachmentId)?.name || ''}` : ''}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs" style={{ color: theme.textSecondary }}>Units</p>
            <p className="font-black text-lg" style={{ color: theme.textPrimary }}>{order.units.length}</p>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Battles played */}
        <div className="rounded-2xl p-3 flex flex-col items-center gap-1"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <p className="text-xs font-bold tracking-wide" style={{ color: theme.textSecondary }}>Battles</p>
          <p className="text-2xl font-black" style={{ color: theme.textPrimary }}>{order.battlesPlayed}</p>
          <div className="flex gap-1 mt-0.5">
            <button onClick={() => store.recordBattle(order.id, false)}
              className="w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center"
              style={{ background: theme.surface, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
              +
            </button>
          </div>
        </div>

        {/* Wins */}
        <div className="rounded-2xl p-3 flex flex-col items-center gap-1"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <p className="text-xs font-bold tracking-wide" style={{ color: theme.textSecondary }}>Wins</p>
          <p className="text-2xl font-black" style={{ color: theme.hpFull }}>{order.battlesWon}</p>
          {winRate !== null && (
            <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>{winRate}%</p>
          )}
        </div>

        {/* Crusade Points */}
        <div className="rounded-2xl p-3 flex flex-col items-center gap-1"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <p className="text-xs font-bold tracking-wide" style={{ color: theme.textSecondary }}>CP</p>
          <p className="text-2xl font-black" style={{ color: theme.primary }}>{order.crusadePoints || 0}</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>points</p>
        </div>
      </div>

      {/* RP + Supply row */}
      <div className="grid grid-cols-2 gap-2">
        {/* RP */}
        <div className="rounded-2xl p-4"
          style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.secondary }}>Requisition</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black" style={{ color: theme.secondary }}>{order.requisitionPoints}</p>
            <div className="flex gap-1.5">
              <button onClick={() => store.adjustRP(order.id, -1)}
                className="w-8 h-8 rounded-xl font-black text-base flex items-center justify-center"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>−</button>
              <button onClick={() => store.adjustRP(order.id, 1)}
                className="w-8 h-8 rounded-xl font-black text-base flex items-center justify-center"
                style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>+</button>
            </div>
          </div>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Points available</p>
        </div>

        {/* Supply */}
        <div className="rounded-2xl p-4"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.textSecondary }}>Supply</p>
          <p className="text-xl font-black" style={{ color: supplyUsed > order.supplyLimit ? theme.hpLow : theme.textPrimary }}>
            {supplyUsed} <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>/ {order.supplyLimit}</span>
          </p>
          <div className="mt-2 w-full h-2 rounded-full overflow-hidden" style={{ background: theme.border }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (supplyUsed / order.supplyLimit) * 100)}%`, background: supplyUsed > order.supplyLimit ? theme.hpLow : theme.secondary }} />
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onAddBattle}
          className="py-3 rounded-2xl font-bold text-sm"
          style={{ background: theme.secondary, color: theme.bg }}>
          + Record Battle
        </button>
        <button onClick={onSpendRP}
          className="py-3 rounded-2xl font-bold text-sm"
          style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
          Spend RP
        </button>
      </div>

      {/* Active agendas summary */}
      {activeAgendaNames.length > 0 && (
        <div className="rounded-2xl p-3" style={{ background: `${theme.secondary}0d`, border: `1px solid ${theme.secondary}25` }}>
          <p className="text-xs font-bold mb-1.5" style={{ color: theme.secondary }}>Active Agendas for next battle</p>
          {activeAgendaNames.map(n => (
            <p key={n} className="text-xs" style={{ color: theme.textPrimary }}>· {n}</p>
          ))}
        </div>
      )}

      {/* Top warrior callout */}
      {topUnit && (
        <div className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${theme.secondary}18` }}>
            <span className="text-sm">★</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black truncate" style={{ color: theme.textPrimary }}>{topUnit.name}</p>
            <p className="text-xs" style={{ color: theme.textSecondary }}>{getRank(topUnit.xp).label} · {topUnit.xp} XP</p>
          </div>
          <p className="text-xs shrink-0" style={{ color: theme.secondary }}>Top warrior</p>
        </div>
      )}

      {/* Sync panel */}
      <SyncPanel theme={theme} />

      {/* Battle History */}
      {(order.battleLog || []).length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>Battle History</p>
          {(order.battleLog || []).slice(0, 8).map(entry => (
            <div key={entry.id} className="rounded-2xl border px-3 py-2.5 flex items-center gap-3"
              style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
              <span className="text-xs font-black px-2.5 py-1 rounded-xl shrink-0"
                style={{
                  background: entry.result === 'victory' ? `${theme.hpFull}22` : `${theme.hpLow}22`,
                  color: entry.result === 'victory' ? theme.hpFull : theme.hpLow,
                  border: `1px solid ${entry.result === 'victory' ? theme.hpFull + '44' : theme.hpLow + '44'}`,
                }}>
                {entry.result === 'victory' ? 'W' : 'L'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: theme.textPrimary }}>
                  vs. {entry.opponent}
                </p>
                <p className="text-xs truncate mt-0.5" style={{ color: theme.textSecondary }}>
                  {entry.mission || 'Unknown mission'} · {formatDate(entry.date)}
                </p>
              </div>
              <div className="text-right shrink-0">
                {(entry.unitXpAwards || []).some(a => a.xp > 0) && (
                  <p className="text-xs font-black" style={{ color: theme.secondary }}>
                    +{(entry.unitXpAwards || []).reduce((s, a) => s + (a.xp || 0), 0)} XP
                  </p>
                )}
                {(entry.completedAgendaIds || []).length > 0 && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    {entry.completedAgendaIds.length} agenda{entry.completedAgendaIds.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Sync Panel ─────────────────────────────────────────────────────────────

function SyncPanel({ theme }) {
  const store = useCrusadeStore()
  const [showLoadInput, setShowLoadInput] = useState(false)
  const [loadCodeInput, setLoadCodeInput] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)
  const { syncCode, lastSynced, syncStatus, syncError } = store

  const handleCopyCode = () => {
    navigator.clipboard.writeText(formatCode(syncCode)).catch(() => {})
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  const handleLoadFromCode = async () => {
    const ok = await store.syncFromCloud(loadCodeInput)
    if (ok) { setShowLoadInput(false); setLoadCodeInput('') }
  }

  return (
    <div className="rounded-2xl border px-3 py-2.5 space-y-2" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
      <div className="flex items-center gap-2">
        <button onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all"
          style={{
            background: codeCopied ? `${theme.secondary}22` : `${theme.primary}18`,
            color: codeCopied ? theme.secondary : theme.primary,
            border: `1px solid ${codeCopied ? theme.secondary + '55' : theme.primary + '44'}`,
            letterSpacing: '0.08em',
          }}>
          ☁ {formatCode(syncCode)}
          <span style={{ fontSize: 9, opacity: 0.8 }}>{codeCopied ? '✓ Copied' : 'tap to copy'}</span>
        </button>
        <p className="text-xs flex-1 truncate" style={{ color: theme.textSecondary }}>
          {syncStatus === 'syncing' ? 'Syncing…' : syncStatus === 'success' ? '✓ Synced' : syncStatus === 'error' ? `⚠ ${syncError}` : timeAgo(lastSynced)}
        </p>
        <button onClick={store.syncToCloud} disabled={syncStatus === 'syncing'}
          className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all"
          style={{ background: syncStatus === 'syncing' ? theme.border : theme.secondary, color: syncStatus === 'syncing' ? theme.textSecondary : theme.bg, opacity: syncStatus === 'syncing' ? 0.6 : 1 }}>
          {syncStatus === 'syncing' ? '…' : '↑ Sync'}
        </button>
      </div>
      {!showLoadInput ? (
        <button onClick={() => setShowLoadInput(true)} className="text-xs w-full text-left" style={{ color: theme.textSecondary, opacity: 0.7 }}>
          ↓ Load roster from another device…
        </button>
      ) : (
        <div className="flex gap-2 items-center">
          <input value={loadCodeInput} onChange={e => setLoadCodeInput(e.target.value.toUpperCase())}
            placeholder="ABC-DEF" maxLength={7}
            className="flex-1 rounded-xl px-3 py-1.5 text-xs font-black tracking-widest outline-none"
            style={{ background: theme.surface, border: `1px solid ${syncStatus === 'error' ? theme.hpLow : theme.border}`, color: theme.textPrimary }} />
          <button onClick={handleLoadFromCode} disabled={syncStatus === 'syncing'}
            className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
            style={{ background: theme.primary, color: theme.bg }}>Load ↓</button>
          <button onClick={() => { setShowLoadInput(false); setLoadCodeInput('') }}
            className="px-2 py-1.5 rounded-xl text-xs font-bold shrink-0"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>✕</button>
        </div>
      )}
      <TipCard id="tip_sync" theme={theme}
        body="Your 6-character code keeps this roster backed up. Tap the code to copy it — use it on another device to load the same roster." />
    </div>
  )
}

// ── Saga Picker Sheet ────────────────────────────────────────────────────────

function SagaPickerSheet({ unit, orderId, onClose, theme }) {
  const store = useCrusadeStore()
  const [selected, setSelected] = useState(null)

  const completedIds = (unit.completedSagas || []).map(s => s.sagaId)
  const CATEGORY_COLORS = { Glory: theme.secondary, Endurance: theme.hpFull, Hunt: '#f59e0b', Hold: '#6366f1', Brotherhood: '#ec4899', Assault: '#ef4444', Tactics: '#06b6d4', Fear: '#8b5cf6' }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <motion.div variants={slideUp} initial="hidden" animate="visible"
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}>

        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Undertake a Saga</p>
          <h2 className="text-base font-black mt-0.5" style={{ color: theme.textPrimary }}>{unit.name}</h2>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Choose one oath for this unit to pursue. Complete the condition across battles to earn a permanent reward.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-2">
          {SW_SAGAS.map(saga => {
            const done = completedIds.includes(saga.id)
            const isCurrent = unit.activeSaga === saga.id
            const color = CATEGORY_COLORS[saga.category] || theme.secondary
            const sel = selected === saga.id
            return (
              <button key={saga.id}
                onClick={() => !done && !isCurrent && setSelected(sel ? null : saga.id)}
                disabled={done || isCurrent}
                className="w-full rounded-2xl border p-3.5 text-left transition-all"
                style={{
                  background: sel ? `${color}12` : done || isCurrent ? theme.surfaceHigh : theme.surface,
                  borderColor: sel ? color : done || isCurrent ? theme.border : theme.border,
                  opacity: done || isCurrent ? 0.5 : 1,
                }}>
                <div className="flex items-start gap-2.5">
                  <span style={{ fontSize: 20, lineHeight: 1.2 }}>{saga.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-xs font-black" style={{ color: sel ? color : theme.textPrimary }}>{saga.name}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: `${color}18`, color, fontSize: 9 }}>{saga.category}</span>
                      {done && <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${theme.hpFull}20`, color: theme.hpFull, fontSize: 9 }}>✅ Done</span>}
                      {isCurrent && <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${theme.secondary}20`, color: theme.secondary, fontSize: 9 }}>Active</span>}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{saga.conditionShort}</p>
                    {sel && (
                      <p className="text-xs mt-1.5 font-bold" style={{ color }}>Reward: {saga.rewardShort}</p>
                    )}
                  </div>
                  {sel && <span className="text-base shrink-0">✓</span>}
                </div>

                {sel && (
                  <div className="mt-2.5 pt-2.5 border-t" style={{ borderColor: `${color}30` }}>
                    <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{saga.condition}</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="px-5 pb-8 pt-3 space-y-2 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
          <button
            onClick={() => { if (selected) { store.setUnitSaga(orderId, unit.id, selected); onClose() } }}
            disabled={!selected}
            className="w-full py-3.5 rounded-2xl text-sm font-bold"
            style={{ background: selected ? theme.secondary : theme.border, color: selected ? theme.bg : theme.textSecondary }}>
            Undertake Saga →
          </button>
          <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Crusade Relic Picker ──────────────────────────────────────────────────────

function RelicPickerSheet({ unit, orderId, onClose, theme }) {
  const store = useCrusadeStore()
  const [selected, setSelected] = useState(null)

  const existing = (unit.relics || []).map(r => r.toLowerCase())
  const TIER_COLOR = { relic: theme.secondary, legendary: '#f59e0b' }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <motion.div variants={slideUp} initial="hidden" animate="visible"
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '88vh' }}>

        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Crusade Relics</p>
          <h2 className="text-base font-black mt-0.5" style={{ color: theme.textPrimary }}>Bestow a Relic</h2>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>Award a Space Wolves Crusade Relic to {unit.name}. Costs RP when granted — record the spend in the RP tab.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-2">
          {SW_CRUSADE_RELICS.map(relic => {
            const alreadyHas = existing.includes(relic.name.toLowerCase())
            const color = TIER_COLOR[relic.tier] || theme.secondary
            const sel = selected === relic.id
            return (
              <button key={relic.id}
                onClick={() => !alreadyHas && setSelected(sel ? null : relic.id)}
                disabled={alreadyHas}
                className="w-full rounded-2xl border p-3.5 text-left transition-all"
                style={{ background: sel ? `${color}12` : alreadyHas ? theme.surfaceHigh : theme.surface, borderColor: sel ? color : theme.border, opacity: alreadyHas ? 0.45 : 1 }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-xs font-black" style={{ color: sel ? color : theme.textPrimary }}>{relic.name}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: `${color}18`, color, fontSize: 9 }}>{relic.tier === 'legendary' ? '★ Legendary' : 'Relic'}</span>
                      {relic.bearer !== 'Any' && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: theme.surfaceHigh, color: theme.textSecondary, fontSize: 9, border: `1px solid ${theme.border}` }}>{relic.bearer} only</span>
                      )}
                      {alreadyHas && <span className="text-xs font-bold" style={{ color: theme.hpFull }}>✓ Held</span>}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{relic.description}</p>
                  </div>
                  <span className="text-xs font-black px-2 py-1 rounded-lg shrink-0"
                    style={{ background: sel ? color : theme.surfaceHigh, color: sel ? theme.bg : theme.textSecondary, border: `1px solid ${sel ? color : theme.border}` }}>
                    {relic.rpCost} RP
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="px-5 pb-8 pt-3 space-y-2 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
          <button
            onClick={() => {
              if (!selected) return
              const relic = SW_CRUSADE_RELICS.find(r => r.id === selected)
              store.addRelic(orderId, unit.id, relic.name)
              onClose()
            }}
            disabled={!selected}
            className="w-full py-3.5 rounded-2xl text-sm font-bold"
            style={{ background: selected ? theme.secondary : theme.border, color: selected ? theme.bg : theme.textSecondary }}>
            Bestow Relic →
          </button>
          <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Unit Crusade Card ───────────────────────────────────────────────────────

function UnitCrusadeCard({ unit, orderId, isSW, onRollHonour, onRollScar, theme }) {
  const store = useCrusadeStore()
  const [expanded, setExpanded] = useState(false)
  const [addingHonour, setAddingHonour] = useState(false)
  const [addingScar, setAddingScar] = useState(false)
  const [addingRelic, setAddingRelic] = useState(false)
  const [showSagaPicker, setShowSagaPicker] = useState(false)
  const [showRelicPicker, setShowRelicPicker] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const rank = getRank(unit.xp)
  const nextRank = getNextRank(unit.xp)

  const activeSagaData = isSW ? SW_SAGAS.find(s => s.id === unit.activeSaga) : null
  const SAGA_CATEGORY_COLORS = { Glory: theme.secondary, Endurance: theme.hpFull, Hunt: '#f59e0b', Hold: '#6366f1', Brotherhood: '#ec4899', Assault: '#ef4444', Tactics: '#06b6d4', Fear: '#8b5cf6' }

  const atMilestone = RANK_MILESTONES.includes(unit.xp) && unit.xp > 0

  return (
    <motion.div
      layout
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: atMilestone ? theme.secondary : theme.border }}
    >
      {atMilestone && (
        <div className="px-4 pt-2.5 pb-0 flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-xs font-black tracking-widest uppercase"
            style={{ color: theme.secondary }}>
            Rank-Up!
          </motion.span>
          <p className="text-xs" style={{ color: theme.textSecondary }}>Roll for a Battle Honour</p>
        </div>
      )}

      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{unit.name}</p>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${theme.secondary}22`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                {rank.label}
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
              {unit.unitType} · {unit.battlesPlayed} battles · {unit.powerRating} PR
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {unit.battleScars?.length > 0 && <span className="text-xs font-bold" style={{ color: theme.hpLow }}>⚠{unit.battleScars.length}</span>}
            {unit.battleHonours?.length > 0 && <span className="text-xs font-bold" style={{ color: theme.secondary }}>★{unit.battleHonours.length}</span>}
            <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: theme.surfaceHigh, color: theme.textPrimary }}>
              {unit.xp} XP
            </span>
            <span style={{ color: theme.textSecondary, fontSize: 9 }}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
        <div className="mt-3"><XpBar xp={unit.xp} theme={theme} /></div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: theme.border }}>

              {/* XP adder */}
              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Add XP</p>
                  {nextRank && (
                    <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
                      {nextRank.xpMin - unit.xp} XP to {nextRank.label}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(amt => (
                    <button key={amt} onClick={() => store.addXp(orderId, unit.id, amt)}
                      className="w-9 h-9 rounded-xl text-xs font-bold"
                      style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Remove unit */}
              <div className="flex justify-end">
                <button onClick={() => store.removeUnit(orderId, unit.id)}
                  className="text-xs px-2.5 py-1 rounded-lg"
                  style={{ color: theme.hpLow, background: `${theme.hpLow}12`, border: `1px solid ${theme.hpLow}30` }}>
                  Remove from roster
                </button>
              </div>

              {/* Battle Honours */}
              <div>
                <TipCard id="tip_honours" theme={theme}
                  body="Roll for a Battle Honour when a unit reaches a new rank milestone. It's a permanent upgrade — or type one in manually from your codex." />
                <div className="flex items-center justify-between mb-2 mt-2">
                  <p className="text-xs font-bold" style={{ color: theme.secondary }}>★ Battle Honours</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => onRollHonour(unit)}
                      className="text-xs px-2 py-1 rounded-lg font-bold"
                      style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                      Roll D6
                    </button>
                    <button onClick={() => { setAddingHonour(!addingHonour); setInputVal('') }}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      + Manual
                    </button>
                  </div>
                </div>
                {unit.battleHonours?.length === 0 && !addingHonour && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>No battle honours yet.</p>
                )}
                {unit.battleHonours?.map((h, i) => (
                  <div key={i} className="flex items-center justify-between mb-1">
                    <p className="text-xs flex-1" style={{ color: theme.textPrimary }}>★ {h}</p>
                    <button onClick={() => store.removeBattleHonour(orderId, unit.id, i)}
                      className="text-xs px-1.5 py-0.5 rounded ml-2"
                      style={{ color: theme.textSecondary, background: theme.surfaceHigh }}>✕</button>
                  </div>
                ))}
                {addingHonour && (
                  <div className="flex gap-2 mt-1">
                    <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                      placeholder="e.g. Fierce Determination"
                      className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                      style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                    <button onClick={() => { if (inputVal) { store.addBattleHonour(orderId, unit.id, inputVal); setInputVal(''); setAddingHonour(false) } }}
                      className="px-3 py-2 rounded-xl text-xs font-bold"
                      style={{ background: theme.secondary, color: theme.bg }}>Add</button>
                  </div>
                )}
              </div>

              {/* Battle Scars */}
              <div>
                <TipCard id="tip_scars" theme={theme}
                  body="Roll a Battle Scar when a unit is destroyed in battle. These are permanent penalties. Use 'Repair and Recuperate' RP action to remove one between games." />
                <div className="flex items-center justify-between mb-2 mt-2">
                  <p className="text-xs font-bold" style={{ color: theme.hpLow }}>⚠ Battle Scars</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => onRollScar(unit)}
                      className="text-xs px-2 py-1 rounded-lg font-bold"
                      style={{ background: `${theme.hpLow}18`, color: theme.hpLow, border: `1px solid ${theme.hpLow}44` }}>
                      Roll D6
                    </button>
                    <button onClick={() => { setAddingScar(!addingScar); setInputVal('') }}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      + Manual
                    </button>
                  </div>
                </div>
                {unit.battleScars?.length === 0 && !addingScar && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>No battle scars.</p>
                )}
                {unit.battleScars?.map((s, i) => (
                  <div key={i} className="flex items-center justify-between mb-1">
                    <p className="text-xs flex-1" style={{ color: theme.hpLow }}>⚠ {s}</p>
                    <button onClick={() => store.removeBattleScar(orderId, unit.id, i)}
                      className="text-xs px-1.5 py-0.5 rounded ml-2"
                      style={{ color: theme.textSecondary, background: theme.surfaceHigh }}>✕</button>
                  </div>
                ))}
                {addingScar && (
                  <div className="flex gap-2 mt-1">
                    <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                      placeholder="e.g. −1 Move"
                      className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                      style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                    <button onClick={() => { if (inputVal) { store.addBattleScar(orderId, unit.id, inputVal); setInputVal(''); setAddingScar(false) } }}
                      className="px-3 py-2 rounded-xl text-xs font-bold"
                      style={{ background: theme.hpLow, color: '#fff' }}>Add</button>
                  </div>
                )}
              </div>

              {/* Relics */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold" style={{ color: theme.primary }}>Relics</p>
                  <div className="flex gap-1.5">
                    {isSW && (
                      <button onClick={() => setShowRelicPicker(true)}
                        className="text-xs px-2 py-1 rounded-lg font-bold"
                        style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                        SW Relics
                      </button>
                    )}
                    <button onClick={() => { setAddingRelic(!addingRelic); setInputVal('') }}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                      + Custom
                    </button>
                  </div>
                </div>
                {unit.relics?.length === 0 && !addingRelic && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>No relics.</p>
                )}
                {unit.relics?.map((r, i) => (
                  <p key={i} className="text-xs mb-1" style={{ color: theme.textPrimary }}>· {r}</p>
                ))}
                {addingRelic && (
                  <div className="flex gap-2 mt-1">
                    <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                      placeholder="e.g. Frostfang"
                      className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                      style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                    <button onClick={() => { if (inputVal) { store.addRelic(orderId, unit.id, inputVal); setInputVal(''); setAddingRelic(false) } }}
                      className="px-3 py-2 rounded-xl text-xs font-bold"
                      style={{ background: theme.primary, color: theme.bg }}>Add</button>
                  </div>
                )}
              </div>

              {/* ── Sagas (SW only) ── */}
              {isSW && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold" style={{ color: theme.secondary }}>⚔️ Saga</p>
                    {!unit.activeSaga && (
                      <button onClick={() => setShowSagaPicker(true)}
                        className="text-xs px-2 py-1 rounded-lg font-bold"
                        style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}44` }}>
                        + Undertake Saga
                      </button>
                    )}
                  </div>

                  {/* Active saga */}
                  {activeSagaData ? (
                    <div className="rounded-xl p-3 space-y-2.5"
                      style={{ background: `${SAGA_CATEGORY_COLORS[activeSagaData.category] || theme.secondary}0d`, border: `1px solid ${SAGA_CATEGORY_COLORS[activeSagaData.category] || theme.secondary}35` }}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span>{activeSagaData.icon}</span>
                            <p className="text-xs font-black" style={{ color: SAGA_CATEGORY_COLORS[activeSagaData.category] || theme.secondary }}>{activeSagaData.name}</p>
                          </div>
                          <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>{activeSagaData.conditionShort}</p>
                        </div>
                        <button onClick={() => store.setUnitSaga(orderId, unit.id, null)}
                          className="text-xs px-1.5 py-0.5 rounded shrink-0"
                          style={{ color: theme.textSecondary, background: theme.surfaceHigh }}>Abandon</button>
                      </div>
                      <div>
                        <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Progress</p>
                        {activeSagaData.target ? (() => {
                          const sagaColor = SAGA_CATEGORY_COLORS[activeSagaData.category] || theme.secondary
                          const current = Math.max(0, parseInt(unit.sagaProgress || '0', 10) || 0)
                          const pct = Math.min(100, Math.round((current / activeSagaData.target) * 100))
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => store.updateSagaProgress(orderId, unit.id, String(Math.max(0, current - 1)))}
                                  className="w-9 h-9 rounded-xl font-black text-base flex items-center justify-center shrink-0"
                                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                                  −
                                </button>
                                <div className="flex-1 text-center">
                                  <p className="font-black text-2xl leading-none" style={{ color: sagaColor }}>{current}</p>
                                  <p className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>of {activeSagaData.target}</p>
                                </div>
                                <button
                                  onClick={() => store.updateSagaProgress(orderId, unit.id, String(Math.min(activeSagaData.target, current + 1)))}
                                  className="w-9 h-9 rounded-xl font-black text-base flex items-center justify-center shrink-0"
                                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                                  +
                                </button>
                              </div>
                              <div className="w-full rounded-full overflow-hidden h-2" style={{ background: theme.surfaceHigh }}>
                                <div className="h-full rounded-full transition-all duration-300"
                                  style={{ width: `${pct}%`, background: pct >= 100 ? theme.hpFull : sagaColor }} />
                              </div>
                              {pct >= 100 && (
                                <p className="text-xs font-bold text-center" style={{ color: theme.hpFull }}>
                                  ✓ Condition met — mark complete!
                                </p>
                              )}
                            </div>
                          )
                        })() : (
                          <textarea value={unit.sagaProgress || ''}
                            onChange={e => store.updateSagaProgress(orderId, unit.id, e.target.value)}
                            placeholder="Track your progress here…"
                            rows={2}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none resize-none"
                            style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                        )}
                      </div>
                      <div className="rounded-xl p-2.5" style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                        <p className="text-xs font-bold mb-0.5" style={{ color: theme.textSecondary }}>Reward on completion:</p>
                        <p className="text-xs" style={{ color: theme.textPrimary }}>{activeSagaData.rewardShort}</p>
                      </div>
                      <button onClick={() => store.completeSaga(orderId, unit.id)}
                        className="w-full py-2.5 rounded-xl text-xs font-black"
                        style={{ background: theme.hpFull, color: '#fff' }}>
                        ✓ Mark Saga Complete
                      </button>
                    </div>
                  ) : (unit.completedSagas || []).length === 0 ? (
                    <p className="text-xs" style={{ color: theme.textSecondary }}>No saga active. Undertake a saga to earn permanent rewards for this unit.</p>
                  ) : null}

                  {/* Completed sagas */}
                  {(unit.completedSagas || []).length > 0 && (
                    <div className="space-y-1 mt-2">
                      {unit.completedSagas.map(cs => {
                        const saga = SW_SAGAS.find(s => s.id === cs.sagaId)
                        return (
                          <div key={cs.sagaId} className="flex items-start gap-2 rounded-xl px-2.5 py-1.5"
                            style={{ background: `${theme.hpFull}10`, border: `1px solid ${theme.hpFull}25` }}>
                            <span className="text-xs" style={{ color: theme.hpFull }}>✅</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold" style={{ color: theme.hpFull }}>{saga?.name || cs.sagaId}</p>
                              <p className="text-xs" style={{ color: theme.textSecondary }}>{saga?.rewardShort}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saga picker overlay */}
      <AnimatePresence>
        {showSagaPicker && (
          <SagaPickerSheet key="saga-picker" unit={unit} orderId={orderId}
            onClose={() => setShowSagaPicker(false)} theme={theme} />
        )}
      </AnimatePresence>

      {/* Relic picker overlay */}
      <AnimatePresence>
        {showRelicPicker && (
          <RelicPickerSheet key="relic-picker" unit={unit} orderId={orderId}
            onClose={() => setShowRelicPicker(false)} theme={theme} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Order of Battle Tab ─────────────────────────────────────────────────────

function deriveUnitType(unit) {
  const kws = unit.keywords || []
  if (kws.includes('VEHICLE')) return 'Vehicle'
  if (kws.includes('MONSTER')) return 'Monster'
  if (kws.includes('CAVALRY')) return 'Cavalry'
  if (kws.includes('BATTLELINE')) return 'Battleline'
  if (unit.category === 'epicHero' || unit.category === 'character') return 'Character'
  return 'Infantry'
}

function RosterTab({ order, onRollHonour, onRollScar, theme }) {
  const store = useCrusadeStore()
  const [addingUnit, setAddingUnit] = useState(false)
  const [search, setSearch] = useState('')

  const factionUnits = FACTION_UNITS[order.faction] || []
  const existingIds  = new Set(order.units.map(u => u.sourceId || u.id))

  const filtered = factionUnits.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  const handlePickUnit = (u) => {
    store.addUnit(order.id, {
      id:          `crusade_${u.id}_${Date.now()}`,
      sourceId:    u.id,
      name:        u.name,
      unitType:    deriveUnitType(u),
      powerRating: u.points || 0,
      xp: 0, battlesPlayed: 0,
      battleHonours: [], battleScars: [], relics: [], notes: '',
    })
    setSearch('')
    setAddingUnit(false)
  }

  return (
    <motion.div variants={tabFade} initial="hidden" animate="visible" exit="exit"
      className="px-4 py-4 space-y-3">

      <TipCard id="tip_roster" theme={theme}
        body="Your Order of Battle is your permanent campaign roster. Units earn XP after each battle and level up from Battle Ready all the way to Legendary. Tap any unit to expand it." />

      {/* Add unit button */}
      <button onClick={() => setAddingUnit(true)}
        className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
        style={{ background: `${theme.secondary}14`, color: theme.secondary, border: `2px dashed ${theme.secondary}40` }}>
        + Add Unit to Roster
      </button>

      {order.units.length === 0 && (
        <div className="text-center py-8 space-y-2">
          <p className="text-3xl">⚔️</p>
          <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>No units yet</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>Tap "Add Unit" above to recruit your first warrior to the crusade.</p>
        </div>
      )}

      {order.units.map(u => (
        <UnitCrusadeCard key={u.id} unit={u} orderId={order.id}
          isSW={order.faction === 'spacewolves'}
          onRollHonour={onRollHonour} onRollScar={onRollScar} theme={theme} />
      ))}

      {/* Add unit sheet — roster picker */}
      <AnimatePresence>
        {addingUnit && (
          <div className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => { setAddingUnit(false); setSearch('') }}>
            <motion.div variants={slideUp} initial="hidden" animate="visible"
              className="w-full max-w-sm rounded-t-3xl pb-8"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}>

              {/* Handle + header */}
              <div className="px-5 pt-5 pb-3 shrink-0">
                <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
                <h2 className="font-black text-base mb-1" style={{ color: theme.textPrimary }}>Add Unit to Roster</h2>
                <p className="text-xs mb-3" style={{ color: theme.textSecondary }}>
                  Pick from your {FACTION_META[order.faction]?.name || 'faction'} roster.
                </p>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search units…"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                />
              </div>

              {/* Scrollable unit list */}
              <div className="overflow-y-auto flex-1 px-5 space-y-1.5 pb-2">
                {filtered.length === 0 && (
                  <p className="text-xs text-center py-6" style={{ color: theme.textSecondary }}>No units found</p>
                )}
                {filtered.map(u => {
                  const alreadyAdded = existingIds.has(u.id)
                  return (
                    <button key={u.id}
                      disabled={alreadyAdded}
                      onClick={() => handlePickUnit(u)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                      style={{
                        background: alreadyAdded ? `${theme.surfaceHigh}80` : theme.surfaceHigh,
                        border: `1px solid ${theme.border}`,
                        opacity: alreadyAdded ? 0.5 : 1,
                      }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{u.name}</p>
                        <p className="text-xs" style={{ color: theme.textSecondary }}>{deriveUnitType(u)} · {u.points} pts</p>
                      </div>
                      {alreadyAdded
                        ? <span className="text-xs font-bold shrink-0" style={{ color: theme.secondary }}>✓ Added</span>
                        : <span className="text-xs shrink-0" style={{ color: theme.textSecondary }}>+</span>
                      }
                    </button>
                  )
                })}
              </div>

              <div className="px-5 pt-2 shrink-0">
                <button onClick={() => { setAddingUnit(false); setSearch('') }}
                  className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Agendas Tab ─────────────────────────────────────────────────────────────

function AgendasTab({ order, theme }) {
  const store = useCrusadeStore()
  const active = order.agendas || []
  const agendaList = getAgendasForFaction(order.faction)
  const isSW = order.faction === 'spacewolves'

  const toggle = (id) => {
    if (active.includes(id)) {
      store.setOrderAgendas(order.id, active.filter(a => a !== id))
    } else if (active.length < 3) {
      store.setOrderAgendas(order.id, [...active, id])
    }
  }

  const CATEGORY_COLORS = { Recon: '#00b4d8', Destroy: '#ef4444', Hold: '#22c55e', Achieve: '#a855f7' }

  return (
    <motion.div variants={tabFade} initial="hidden" animate="visible" exit="exit"
      className="px-4 py-4 space-y-3">

      <TipCard id="tip_agendas" theme={theme}
        body="Pick up to 3 Agendas before you play. Complete the agenda's goal during the battle to earn bonus XP for specific units on top of the standard award." />

      {isSW && (
        <div className="rounded-2xl px-3 py-2"
          style={{ background: `${theme.secondary}0e`, border: `1px solid ${theme.secondary}25` }}>
          <p className="text-xs font-bold" style={{ color: theme.secondary }}>Oathsworn Campaigns — SW agendas shown first</p>
          <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>SW-exclusive agendas (marked ⚔️) and recommended picks shown at the top.</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.textSecondary }}>
          Pre-Battle Agendas
        </p>
        <span className="text-xs px-2 py-1 rounded-full font-bold"
          style={{ background: theme.surfaceHigh, color: active.length === 3 ? theme.secondary : theme.textSecondary }}>
          {active.length} / 3 selected
        </span>
      </div>

      {active.length > 0 && (
        <div className="rounded-2xl p-3 space-y-2" style={{ background: `${theme.secondary}10`, border: `1px solid ${theme.secondary}30` }}>
          <p className="text-xs font-bold" style={{ color: theme.secondary }}>Active for next battle:</p>
          {active.map(id => {
            const a = [...SW_AGENDAS, ...ALL_AGENDAS].find(ag => ag.id === id)
            if (!a) return null
            return (
              <div key={id} className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{a.name}</span>
                  <span className="text-xs ml-2 px-1.5 py-0.5 rounded font-bold"
                    style={{ background: `${CATEGORY_COLORS[a.category]}22`, color: CATEGORY_COLORS[a.category], fontSize: 9 }}>
                    {a.category}
                  </span>
                </div>
                <span className="text-xs font-bold" style={{ color: theme.secondary }}>+{a.xpReward} XP</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="space-y-2 pt-1">
        {agendaList.map(a => {
          const sel = active.includes(a.id)
          const disabled = !sel && active.length >= 3
          const color = CATEGORY_COLORS[a.category] || theme.secondary
          const isRecommended = isSW && SW_AGENDA_IDS.includes(a.id)
          const isSWExclusive = isSW && a.swExclusive
          return (
            <button key={a.id} onClick={() => !disabled && toggle(a.id)}
              className="w-full rounded-2xl border p-3.5 text-left transition-all"
              style={{
                background: sel ? `${color}12` : theme.surfaceHigh,
                borderColor: sel ? color : isSWExclusive ? `${theme.secondary}50` : isRecommended ? `${theme.secondary}30` : theme.border,
                opacity: disabled ? 0.4 : 1,
              }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-black" style={{ color: sel ? color : theme.textPrimary }}>{a.name}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                      style={{ background: `${color}18`, color, fontSize: 9 }}>{a.category}</span>
                    {isSWExclusive && !sel && (
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: `${theme.secondary}22`, color: theme.secondary, fontSize: 9 }}>⚔️ SW</span>
                    )}
                    {isRecommended && !isSWExclusive && !sel && (
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: `${theme.secondary}18`, color: theme.secondary, fontSize: 9 }}>SW pick</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{a.description}</p>
                  {a.unitReward && (
                    <p className="text-xs mt-1 italic" style={{ color: theme.textSecondary }}>
                      Earns XP: {a.unitReward}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs font-black" style={{ color: sel ? color : theme.textSecondary }}>+{a.xpReward} XP</span>
                  {sel && <span className="text-xs font-bold" style={{ color }}>✓</span>}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

// ── RP Tab (log + spend inline) ─────────────────────────────────────────────

function RPTab({ order, theme }) {
  const store = useCrusadeStore()
  const rpLog = order.rpLog || []
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [showActions, setShowActions] = useState(false)
  const [showSWActions, setShowSWActions] = useState(false)

  const isSW = order.faction === 'spacewolves'
  const canAfford = selected && order.requisitionPoints >= selected.cost

  const CATEGORY_LABELS = { Unit: 'Unit upgrade', Recovery: 'Recovery', Roster: 'Roster' }
  const categoryColor = { Unit: theme.secondary, Recovery: theme.hpFull, Roster: theme.primary }

  const handleSpend = () => {
    if (!canAfford) return
    store.spendRP(order.id, selected, note)
    setSelected(null)
    setNote('')
    setShowActions(false)
    setShowSWActions(false)
  }

  return (
    <motion.div variants={tabFade} initial="hidden" animate="visible" exit="exit"
      className="px-4 py-4 space-y-3">

      <TipCard id="tip_rp" theme={theme}
        body="You earn 1 Requisition Point after every battle. Spend them between games to upgrade your force — resupply units, recruit reinforcements, or grant relics." />

      {/* RP Balance card */}
      <div className="rounded-2xl p-4 flex items-center justify-between"
        style={{ background: `${theme.secondary}12`, border: `1px solid ${theme.secondary}30` }}>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Requisition Points</p>
          <p className="text-4xl font-black mt-0.5" style={{ color: theme.secondary }}>{order.requisitionPoints}</p>
          <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>Earn 1 RP after each battle</p>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => store.adjustRP(order.id, 1)}
            className="w-10 h-10 rounded-xl font-black text-xl flex items-center justify-center"
            style={{ background: `${theme.secondary}20`, color: theme.secondary, border: `1px solid ${theme.secondary}40` }}>+</button>
          <button onClick={() => store.adjustRP(order.id, -1)}
            className="w-10 h-10 rounded-xl font-black text-xl flex items-center justify-center"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>−</button>
        </div>
      </div>

      {/* SW Requisitions */}
      {isSW && (
        <>
          <button onClick={() => setShowSWActions(!showSWActions)}
            className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ background: `${theme.secondary}18`, color: theme.secondary, border: `1px solid ${theme.secondary}40` }}>
            {showSWActions ? 'Hide SW Requisitions' : '⚔️ Space Wolves Requisitions →'}
          </button>
          <AnimatePresence>
            {showSWActions && (
              <motion.div key="sw-actions" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden space-y-2">
                <p className="text-xs font-bold tracking-widest uppercase pt-1" style={{ color: theme.textSecondary }}>Oathsworn Requisitions</p>
                {SW_REQUISITIONS.map(action => {
                  const affordable = order.requisitionPoints >= action.cost
                  const sel = selected?.id === action.id
                  const catColor = categoryColor[action.category] || theme.secondary
                  return (
                    <button key={action.id} onClick={() => affordable && setSelected(sel ? null : action)}
                      className="w-full rounded-2xl border p-3.5 text-left transition-all"
                      style={{ background: sel ? `${theme.secondary}12` : theme.surfaceHigh, borderColor: sel ? theme.secondary : affordable ? `${theme.secondary}40` : `${theme.border}60`, opacity: affordable ? 1 : 0.45 }}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="text-xs font-black" style={{ color: sel ? theme.secondary : theme.textPrimary }}>{action.name}</p>
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${theme.secondary}18`, color: theme.secondary, fontSize: 9 }}>⚔️ SW</span>
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${catColor}15`, color: catColor, fontSize: 9 }}>{CATEGORY_LABELS[action.category]}</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{action.description}</p>
                        </div>
                        <span className="text-xs font-black px-2 py-1 rounded-lg shrink-0"
                          style={{ background: sel ? theme.secondary : theme.border, color: sel ? theme.bg : theme.textSecondary }}>
                          {action.cost} RP
                        </span>
                      </div>
                    </button>
                  )
                })}
                {selected?.sw && (
                  <motion.div key="sw-confirm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-1">
                    <input value={note} onChange={e => setNote(e.target.value)}
                      placeholder="Note (optional — e.g. which unit)"
                      className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                      style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                    <button onClick={handleSpend}
                      className="w-full py-3 rounded-2xl font-bold text-sm"
                      style={{ background: canAfford ? theme.secondary : theme.border, color: canAfford ? theme.bg : theme.textSecondary }}>
                      Spend {selected.cost} RP — {selected.name}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Spend RP section (generic) */}
      <button onClick={() => setShowActions(!showActions)}
        className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
        style={{ background: theme.secondary, color: theme.bg }}>
        {showActions ? 'Hide Actions' : 'Spend Requisition Points →'}
      </button>

      <AnimatePresence>
        {showActions && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden space-y-2"
          >
            <p className="text-xs font-bold tracking-widest uppercase pt-1" style={{ color: theme.textSecondary }}>
              Available Actions
            </p>
            {RP_ACTIONS.map(action => {
              const affordable = order.requisitionPoints >= action.cost
              const sel = selected?.id === action.id
              const catColor = categoryColor[action.category] || theme.secondary
              return (
                <button key={action.id} onClick={() => affordable && setSelected(sel ? null : action)}
                  className="w-full rounded-2xl border p-3.5 text-left transition-all"
                  style={{
                    background: sel ? `${theme.secondary}12` : theme.surfaceHigh,
                    borderColor: sel ? theme.secondary : affordable ? theme.border : `${theme.border}60`,
                    opacity: affordable ? 1 : 0.45,
                  }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-xs font-black" style={{ color: sel ? theme.secondary : theme.textPrimary }}>{action.name}</p>
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                          style={{ background: `${catColor}15`, color: catColor, fontSize: 9 }}>
                          {CATEGORY_LABELS[action.category] || action.category}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{action.description}</p>
                    </div>
                    <span className="text-xs font-black px-2 py-1 rounded-lg shrink-0"
                      style={{ background: sel ? theme.secondary : theme.border, color: sel ? theme.bg : theme.textSecondary }}>
                      {action.cost} RP
                    </span>
                  </div>
                </button>
              )
            })}

            {selected && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 pt-1"
              >
                <input value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Note (optional — e.g. which unit)"
                  className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={handleSpend}
                  className="w-full py-3 rounded-2xl font-bold text-sm"
                  style={{ background: canAfford ? theme.secondary : theme.border, color: canAfford ? theme.bg : theme.textSecondary }}>
                  Spend {selected.cost} RP — {selected.name}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log */}
      <p className="text-xs font-bold tracking-widest uppercase pt-1" style={{ color: theme.textSecondary }}>
        Spending History
      </p>
      {rpLog.length === 0 ? (
        <div className="text-center py-6 space-y-1">
          <p className="text-2xl">💰</p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>No RP spent yet. Earn RP by recording battles and spend them to upgrade your force.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rpLog.map(entry => (
            <div key={entry.id} className="rounded-xl p-3 flex items-start justify-between gap-2"
              style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{entry.actionName}</p>
                {entry.note && <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{entry.note}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black" style={{ color: theme.hpLow }}>−{entry.cost} RP</p>
                <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{formatDate(entry.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Record Battle Sheet (3-step) ────────────────────────────────────────────

const CATEGORY_COLORS_AGENDA = { Recon: '#00b4d8', Destroy: '#ef4444', Hold: '#22c55e', Achieve: '#a855f7' }

function RecordBattleSheet({ order, onClose, theme }) {
  const store = useCrusadeStore()
  const [step, setStep] = useState(1)
  const [opponent, setOpponent] = useState('')
  const [mission, setMission] = useState('')
  const [won, setWon] = useState(null)

  const activeAgendas = (order.agendas || [])
    .map(id => ALL_AGENDAS.find(a => a.id === id))
    .filter(Boolean)

  const [agendaResults, setAgendaResults] = useState(() =>
    Object.fromEntries(activeAgendas.map(a => [a.id, { completed: false, unitIds: [] }]))
  )
  const [participated, setParticipated] = useState(() =>
    Object.fromEntries(order.units.map(u => [u.id, true]))
  )

  const toggleAgendaUnit = (agendaId, unitId) => {
    setAgendaResults(prev => {
      const cur = prev[agendaId] || { completed: true, unitIds: [] }
      const ids = cur.unitIds.includes(unitId)
        ? cur.unitIds.filter(id => id !== unitId)
        : [...cur.unitIds, unitId]
      return { ...prev, [agendaId]: { ...cur, unitIds: ids } }
    })
  }

  const calcUnitXp = (unitId) => {
    if (!participated[unitId]) return 0
    let xp = 1
    if (won) xp += 1
    activeAgendas.forEach(agenda => {
      const r = agendaResults[agenda.id]
      if (r?.completed && r.unitIds.includes(unitId)) xp += agenda.xpReward
    })
    return xp
  }

  const handleConfirm = () => {
    if (won === null) return
    const unitXpAwards = order.units.map(u => ({
      unitId: u.id,
      xp: calcUnitXp(u.id),
      participated: !!participated[u.id],
    }))
    const completedAgendaIds = Object.entries(agendaResults)
      .filter(([, v]) => v.completed)
      .map(([id]) => id)
    store.recordBattle(order.id, {
      won,
      opponent: opponent.trim() || 'Unknown',
      mission: mission.trim() || '',
      unitXpAwards,
      completedAgendaIds,
    })
    onClose()
  }

  const STEP_LABELS = ['Mission Info', 'Agenda Results', 'XP & Result']

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.78)' }}>
      <motion.div variants={slideUp} initial="hidden" animate="visible"
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{ background: theme.surface, border: `1px solid ${theme.border}`, maxHeight: '92vh' }}>

        {/* Header */}
        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: theme.border }} />
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Record Battle</p>
            <div className="flex gap-1">
              {STEP_LABELS.map((_, i) => (
                <div key={i} className="h-1.5 rounded-full transition-all"
                  style={{ width: step === i + 1 ? 20 : 8, background: step > i ? theme.secondary : theme.border }} />
              ))}
            </div>
          </div>
          <h2 className="text-base font-black" style={{ color: theme.textPrimary }}>{STEP_LABELS[step - 1]}</h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-2">

          {/* ── Step 1: Mission Info ── */}
          {step === 1 && (
            <div className="space-y-4 pb-4">
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Opponent</p>
                <input value={opponent} onChange={e => setOpponent(e.target.value)}
                  placeholder="Who did you fight?"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
              </div>
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Mission</p>
                <input value={mission} onChange={e => setMission(e.target.value)}
                  placeholder="e.g. Priority Target"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
              </div>

              {activeAgendas.length > 0 ? (
                <div className="rounded-2xl p-3.5 space-y-1.5"
                  style={{ background: `${theme.secondary}0d`, border: `1px solid ${theme.secondary}28` }}>
                  <p className="text-xs font-bold mb-2" style={{ color: theme.secondary }}>Active Agendas this battle</p>
                  {activeAgendas.map(a => (
                    <div key={a.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                          style={{ background: `${CATEGORY_COLORS_AGENDA[a.category] || theme.secondary}20`, color: CATEGORY_COLORS_AGENDA[a.category] || theme.secondary, fontSize: 9 }}>
                          {a.category}
                        </span>
                        <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{a.name}</p>
                      </div>
                      <p className="text-xs font-bold shrink-0 ml-2" style={{ color: theme.secondary }}>+{a.xpReward} XP</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl p-3.5" style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  <p className="text-xs font-bold mb-1" style={{ color: theme.textSecondary }}>No agendas set</p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary, opacity: 0.8 }}>
                    Go to the Agendas tab before your next battle to earn bonus XP for units that complete them.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Step 2: Agenda Completions ── */}
          {step === 2 && (
            <div className="space-y-3 pb-4">
              {activeAgendas.length === 0 ? (
                <div className="rounded-2xl p-4 text-center"
                  style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
                  <p className="text-sm font-bold mb-1" style={{ color: theme.textSecondary }}>No agendas to track</p>
                  <p className="text-xs" style={{ color: theme.textSecondary, opacity: 0.8 }}>
                    Proceed to the next step to record your result and award XP.
                  </p>
                </div>
              ) : (
                activeAgendas.map(agenda => {
                  const result = agendaResults[agenda.id] || { completed: false, unitIds: [] }
                  const color = CATEGORY_COLORS_AGENDA[agenda.category] || theme.secondary
                  return (
                    <div key={agenda.id} className="rounded-2xl border p-3.5 space-y-3"
                      style={{ background: result.completed ? `${color}0d` : theme.surfaceHigh, borderColor: result.completed ? color : theme.border }}>
                      {/* Agenda header with toggle */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => setAgendaResults(prev => ({
                            ...prev,
                            [agenda.id]: { ...result, completed: !result.completed, unitIds: result.completed ? [] : result.unitIds }
                          }))}
                          className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5"
                          style={{ borderColor: result.completed ? color : theme.border, background: result.completed ? color : 'transparent' }}>
                          {result.completed && <span className="font-black" style={{ color: theme.bg, fontSize: 9 }}>✓</span>}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-black" style={{ color: result.completed ? color : theme.textPrimary }}>{agenda.name}</p>
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{ background: `${color}18`, color, fontSize: 9 }}>{agenda.category}</span>
                            <span className="text-xs font-bold" style={{ color: theme.textSecondary }}>+{agenda.xpReward} XP</span>
                          </div>
                          {agenda.unitReward && (
                            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{agenda.unitReward}</p>
                          )}
                        </div>
                      </div>

                      {/* Unit selector when completed */}
                      {result.completed && order.units.length > 0 && (
                        <div className="space-y-1.5 pl-8">
                          <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Which units earned XP?</p>
                          {order.units.map(u => {
                            const checked = result.unitIds.includes(u.id)
                            return (
                              <button key={u.id} onClick={() => toggleAgendaUnit(agenda.id, u.id)}
                                className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left"
                                style={{ background: checked ? `${color}18` : theme.surface, border: `1px solid ${checked ? color + '55' : theme.border}` }}>
                                <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0"
                                  style={{ borderColor: checked ? color : theme.border, background: checked ? color : 'transparent' }}>
                                  {checked && <span className="font-black" style={{ color: theme.bg, fontSize: 8 }}>✓</span>}
                                </div>
                                <p className="text-xs font-bold" style={{ color: checked ? color : theme.textPrimary }}>{u.name}</p>
                                <p className="text-xs ml-auto shrink-0" style={{ color: theme.textSecondary }}>{getRank(u.xp).label}</p>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* ── Step 3: XP & Result ── */}
          {step === 3 && (
            <div className="space-y-4 pb-4">
              {/* Result picker */}
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: theme.textSecondary }}>Battle Result</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setWon(true)}
                    className="py-3 rounded-2xl font-bold text-sm transition-all"
                    style={{ background: won === true ? theme.hpFull : theme.surfaceHigh, color: won === true ? '#fff' : theme.textSecondary, border: `1px solid ${won === true ? theme.hpFull : theme.border}` }}>
                    Victory
                  </button>
                  <button onClick={() => setWon(false)}
                    className="py-3 rounded-2xl font-bold text-sm transition-all"
                    style={{ background: won === false ? theme.hpLow : theme.surfaceHigh, color: won === false ? '#fff' : theme.textSecondary, border: `1px solid ${won === false ? theme.hpLow : theme.border}` }}>
                    Defeat
                  </button>
                </div>
                {won !== null && (
                  <p className="text-xs mt-1.5 text-center" style={{ color: theme.textSecondary }}>
                    {won ? '+1 XP victory bonus applied to all participating units' : 'No victory bonus'}
                  </p>
                )}
              </div>

              {/* Unit participation + XP */}
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: theme.textSecondary }}>Unit Participation & XP</p>
                <div className="space-y-2">
                  {order.units.map(u => {
                    const xp = calcUnitXp(u.id)
                    const agendaXp = activeAgendas
                      .filter(a => agendaResults[a.id]?.completed && agendaResults[a.id]?.unitIds.includes(u.id))
                      .reduce((s, a) => s + a.xpReward, 0)
                    const breakdownParts = []
                    if (participated[u.id]) {
                      breakdownParts.push('1 base')
                      if (won) breakdownParts.push('+1 victory')
                      if (agendaXp) breakdownParts.push(`+${agendaXp} agenda`)
                    }
                    return (
                      <div key={u.id} className="rounded-xl border px-3 py-2.5 flex items-center gap-3 transition-all"
                        style={{ background: participated[u.id] ? theme.surface : theme.surfaceHigh, borderColor: participated[u.id] ? theme.border : `${theme.border}50`, opacity: participated[u.id] ? 1 : 0.55 }}>
                        <button onClick={() => setParticipated(p => ({ ...p, [u.id]: !p[u.id] }))}
                          className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0"
                          style={{ borderColor: participated[u.id] ? theme.secondary : theme.border, background: participated[u.id] ? theme.secondary : 'transparent' }}>
                          {participated[u.id] && <span className="font-black" style={{ color: theme.bg, fontSize: 9 }}>✓</span>}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate" style={{ color: theme.textPrimary }}>{u.name}</p>
                          {participated[u.id] && (
                            <p className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>{breakdownParts.join(' ')}</p>
                          )}
                        </div>
                        {participated[u.id] && xp > 0 && (
                          <span className="text-sm font-black shrink-0" style={{ color: theme.secondary }}>+{xp} XP</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                {won === null && (
                  <p className="text-xs mt-2 text-center" style={{ color: theme.hpLow }}>Select a battle result above to confirm.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="px-5 pb-8 pt-3 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          {step < 3 ? (
            <div className="flex gap-2">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold"
                  style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                  ← Back
                </button>
              )}
              <button onClick={() => setStep(s => s + 1)}
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold"
                style={{ background: theme.secondary, color: theme.bg }}>
                Continue →
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-2xl text-sm font-bold"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                ← Back
              </button>
              <button onClick={handleConfirm} disabled={won === null}
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all"
                style={{ background: won !== null ? theme.secondary : theme.border, color: won !== null ? theme.bg : theme.textSecondary }}>
                Record Battle →
              </button>
            </div>
          )}
          <button onClick={onClose} className="w-full py-2 text-xs font-medium" style={{ color: theme.textSecondary }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Screen ─────────────────────────────────────────────────────────────

export default function CrusadeScreen({ theme }) {
  const store = useCrusadeStore()
  const activeOrder = store.getActiveOrder()

  const [tab, setTab] = useState('overview')
  const [showCreateRoster, setShowCreateRoster] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [recordingBattle, setRecordingBattle] = useState(false)
  const [diceRoll, setDiceRoll] = useState(null) // { table, title, unit, type }
  const [showSpendRP, setShowSpendRP] = useState(false)

  const handleRollHonour = (unit) => {
    const isSW = activeOrder?.faction === 'spacewolves'
    const table = isSW ? SW_BATTLE_TRAITS : battleHonours
    const title = isSW ? `${unit.name} — Battle Trait` : `${unit.name} — Battle Honour`
    setDiceRoll({ table, title, unit, type: 'honour' })
  }
  const handleRollScar = (unit) => setDiceRoll({ table: battleScars, title: `${unit.name} — Battle Scar`, unit, type: 'scar' })

  const handleDiceApply = (result) => {
    if (!diceRoll || !activeOrder) return
    if (diceRoll.type === 'honour') {
      store.addBattleHonour(activeOrder.id, diceRoll.unit.id, result.name)
    } else {
      store.addBattleScar(activeOrder.id, diceRoll.unit.id, result.name)
    }
    setDiceRoll(null)
  }

  // No orders at all — show onboarding
  if (!activeOrder && store.orders.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>
        <AnimatePresence>
          {!showCreateRoster && (
            <OnboardingOverlay
              theme={theme}
              onStart={() => setShowCreateRoster(true)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCreateRoster && (
            <CreateRosterSheet theme={theme} onClose={() => setShowCreateRoster(false)}
              onCreate={(name, faction, detachmentId) => { store.createOrder(name, faction, detachmentId); setShowCreateRoster(false) }} />
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (!activeOrder) return null

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'roster',   label: `Roster (${activeOrder.units.length})` },
    { id: 'agendas',  label: `Agendas (${(activeOrder.agendas || []).length})` },
    { id: 'rp',       label: `RP (${activeOrder.requisitionPoints})` },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>

      {/* ── Header ── */}
      <div className="shrink-0" style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>Crusade</p>
              <h1 className="text-base font-black truncate" style={{ color: theme.textPrimary }}>{activeOrder.name}</h1>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setShowCreateRoster(true)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                + New
              </button>
              {store.orders.length > 1 && (
                <select value={store.activeOrderId}
                  onChange={e => store.setActiveOrder(e.target.value)}
                  className="px-2 py-1.5 rounded-xl text-xs font-bold outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                  {store.orders.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t overflow-x-auto" style={{ borderColor: theme.border }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 py-2.5 text-xs font-black transition-all whitespace-nowrap px-2"
              style={{
                color: tab === t.id ? theme.secondary : theme.textSecondary,
                borderBottom: tab === t.id ? `2px solid ${theme.secondary}` : '2px solid transparent',
                background: 'transparent',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <OverviewTab key="overview" order={activeOrder} theme={theme}
              onAddBattle={() => setRecordingBattle(true)}
              onSpendRP={() => { setTab('rp') }} />
          )}
          {tab === 'roster' && (
            <RosterTab key="roster" order={activeOrder}
              onRollHonour={handleRollHonour} onRollScar={handleRollScar} theme={theme} />
          )}
          {tab === 'agendas' && (
            <AgendasTab key="agendas" order={activeOrder} theme={theme} />
          )}
          {tab === 'rp' && (
            <RPTab key="rp" order={activeOrder} theme={theme} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Modals ── */}

      <AnimatePresence>
        {diceRoll && (
          <DiceRollerModal key="dice" table={diceRoll.table} title={diceRoll.title} theme={theme}
            onApply={handleDiceApply} onClose={() => setDiceRoll(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateRoster && (
          <CreateRosterSheet key="create" theme={theme} onClose={() => setShowCreateRoster(false)}
            onCreate={(name, faction, detachmentId) => { store.createOrder(name, faction, detachmentId); setShowCreateRoster(false) }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {recordingBattle && (
          <RecordBattleSheet key="record-battle"
            order={activeOrder}
            onClose={() => setRecordingBattle(false)}
            theme={theme} />
        )}
      </AnimatePresence>
    </div>
  )
}
