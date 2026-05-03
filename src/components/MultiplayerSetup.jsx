import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBattleSync } from '../hooks/useBattleSync'
import { useBattleStore } from '../store/battleStore'
import { FACTION_META } from '../data/factionRegistry'

export default function MultiplayerSetup({ theme }) {
  const { status, isInRoom, roomCode, opponentInfo, createRoom, joinRoom } = useBattleSync()
  const faction = useBattleStore(s => s.faction)
  const factionMeta = faction ? FACTION_META[faction] : null
  const accent = theme.secondary

  const [mode, setMode] = useState(null)   // null | 'host' | 'join'
  const [nameInput, setNameInput] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleHost = async () => {
    if (!nameInput.trim()) return
    setLoading(true)
    setError(null)
    const res = await createRoom(nameInput.trim(), faction || 'unknown')
    setLoading(false)
    if (!res?.success) setError(res?.error || 'Could not create room')
  }

  const handleJoin = async () => {
    if (!nameInput.trim() || codeInput.trim().length < 4) return
    setLoading(true)
    setError(null)
    const res = await joinRoom(codeInput.trim(), nameInput.trim(), faction || 'unknown')
    setLoading(false)
    if (!res.success) setError(res.error || 'Could not join room')
  }

  // ── Connected state ────────────────────────────────────────────────────────
  if (isInRoom) {
    const opFaction = opponentInfo?.faction
    const opMeta = opFaction ? FACTION_META[opFaction] : null
    return (
      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border overflow-hidden"
        style={{ background: theme.surface, borderColor: `${accent}55` }}>
        <div className="px-3.5 py-3 flex items-center gap-3">
          <motion.div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: accent }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black" style={{ color: accent }}>Live Battle Active</p>
            {opponentInfo?.name ? (
              <p className="text-xs leading-tight" style={{ color: theme.textSecondary }}>
                vs {opponentInfo.name}
                {opMeta ? ` · ${opMeta.name}` : ''}
              </p>
            ) : (
              <p className="text-xs italic" style={{ color: theme.textSecondary }}>
                Waiting for opponent to join — room code: <span className="font-black not-italic" style={{ color: accent }}>{roomCode}</span>
              </p>
            )}
          </div>
          {opponentInfo?.disconnected && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440' }}>
              Disconnected
            </span>
          )}
        </div>

        {/* Room code display — still visible if waiting */}
        {!opponentInfo?.name && (
          <div className="px-3.5 pb-3">
            <div className="rounded-xl py-3 flex items-center justify-center gap-3"
              style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}` }}>
              <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Room Code</p>
              <p className="font-black tracking-[0.2em] text-xl" style={{ color: accent }}>{roomCode}</p>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  // ── Default: invite card ───────────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="rounded-2xl border px-3.5 py-3"
        style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
            ⚡
          </div>
          <div className="flex-1">
            <p className="text-xs font-black" style={{ color: theme.textPrimary }}>Play with a Friend</p>
            <p className="text-xs" style={{ color: status === 'disconnected' ? '#ef4444' : theme.textSecondary }}>
              {status === 'connecting'   ? 'Connecting to server…'
               : status === 'disconnected' ? 'Server offline — check connection'
               : 'Sync phases, CP and stratagem alerts in real time'}
            </p>
          </div>
        </div>
        {/* Buttons disabled until we have a live connection */}
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setMode('host')}
            disabled={status !== 'connected' && status !== 'joined'}
            className="flex-1 py-2.5 rounded-xl font-black text-xs"
            style={{ background: accent, color: theme.bg, opacity: (status !== 'connected' && status !== 'joined') ? 0.4 : 1 }}>
            Host Game
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setMode('join')}
            disabled={status !== 'connected' && status !== 'joined'}
            className="flex-1 py-2.5 rounded-xl font-black text-xs"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}40`, opacity: (status !== 'connected' && status !== 'joined') ? 0.4 : 1 }}>
            Join Game
          </motion.button>
        </div>
      </div>
    )
  }

  // ── Host / Join form ───────────────────────────────────────────────────────
  const isHost = mode === 'host'
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: theme.surface, borderColor: `${accent}44` }}>

      <div className="px-3.5 pt-3 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => { setMode(null); setError(null) }}
            className="text-xs px-2 py-1 rounded-lg font-bold"
            style={{ background: theme.surfaceHigh, color: theme.textSecondary }}>
            ← Back
          </button>
          <p className="text-xs font-black" style={{ color: accent }}>
            {isHost ? 'Host a Game' : 'Join a Game'}
          </p>
        </div>

        {/* Name field */}
        <div className="mb-2">
          <p className="text-xs font-bold mb-1" style={{ color: theme.textSecondary }}>Your name</p>
          <input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder={isHost ? 'e.g. Eduardo' : 'Your name'}
            className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none"
            style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
          />
        </div>

        {/* Code field (join only) */}
        {!isHost && (
          <div className="mb-2">
            <p className="text-xs font-bold mb-1" style={{ color: theme.textSecondary }}>Room code</p>
            <input
              value={codeInput}
              onChange={e => setCodeInput(e.target.value.toUpperCase().slice(0, 4))}
              placeholder="XXXX"
              className="w-full px-3 py-2.5 rounded-xl text-sm font-black tracking-[0.2em] outline-none uppercase"
              style={{ background: theme.surfaceHigh, color: accent, border: `1px solid ${accent}44` }}
            />
          </div>
        )}

        {/* Faction indicator */}
        {factionMeta && (
          <p className="text-xs mb-3" style={{ color: theme.textSecondary }}>
            Playing as: <span className="font-bold" style={{ color: accent }}>{factionMeta.name}</span>
          </p>
        )}

        {error && (
          <p className="text-xs mb-2 font-bold" style={{ color: '#ef4444' }}>{error}</p>
        )}

        <motion.button whileTap={{ scale: 0.97 }}
          onClick={isHost ? handleHost : handleJoin}
          disabled={loading || !nameInput.trim() || (!isHost && codeInput.length < 4) || (status !== 'connected' && status !== 'joined')}
          className="w-full py-3 rounded-xl font-black text-sm"
          style={{
            background: accent, color: theme.bg,
            opacity: (loading || !nameInput.trim() || (!isHost && codeInput.length < 4) || (status !== 'connected' && status !== 'joined')) ? 0.5 : 1
          }}>
          {loading ? 'Connecting…' : isHost ? 'Create Room' : 'Join Room'}
        </motion.button>
      </div>
    </motion.div>
  )
}
