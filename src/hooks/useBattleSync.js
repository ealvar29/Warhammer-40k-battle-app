import { useEffect, useState, useCallback } from 'react'
import * as signalR from '@microsoft/signalr'

const HUB_URL = 'https://warhammer-40k-battle-app-production-99a9.up.railway.app/battlehub'

// Module-level singletons so the connection survives React re-renders and screen changes
let _conn = null
let _roomCode = null
let _playerIndex = null

export function useBattleSync() {
  const [status, setStatus]             = useState(() => _conn?.state === 'Connected' ? (_roomCode ? 'joined' : 'connected') : 'disconnected')
  const [roomCode, setRoomCode]         = useState(_roomCode)
  const [playerIndex, setPlayerIndex]   = useState(_playerIndex)
  const [opponentInfo, setOpponentInfo] = useState(null)   // { name, faction }
  const [opponentCp, setOpponentCp]     = useState(null)
  const [opponentPhase, setOpponentPhase] = useState(null)
  const [stratagemAlert, setStratagemAlert] = useState(null)
  const [chargeAlert, setChargeAlert]   = useState(null)   // unit name that declared charge

  useEffect(() => {
    if (_conn) {
      // Reconnect listeners on every mount (component might have remounted)
      attach(_conn)
      return
    }

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build()

    _conn = conn
    setStatus('connecting')

    conn.start()
      .then(() => setStatus(_roomCode ? 'joined' : 'connected'))
      .catch(() => { setStatus('disconnected'); _conn = null })

    conn.onreconnected(() => setStatus(_roomCode ? 'joined' : 'connected'))
    conn.onclose(() => setStatus('disconnected'))

    attach(conn)
  }, [])

  function attach(conn) {
    // Clear before re-registering to avoid duplicates
    const events = ['OpponentJoined', 'PhaseChanged', 'CpUpdated',
                    'OpponentUsedStratagem', 'TurnAdvanced', 'ChargeDeClared', 'OpponentDisconnected']
    events.forEach(e => conn.off(e))

    conn.on('OpponentJoined', ({ playerName, faction, room }) => {
      setOpponentInfo({ name: playerName, faction })
      setOpponentCp(room?.cp?.[0] ?? 6)
      setStatus('joined')
    })

    conn.on('PhaseChanged', (phaseIdx) => {
      setOpponentPhase(phaseIdx)
    })

    conn.on('CpUpdated', (_playerIdx, newCp) => {
      setOpponentCp(newCp)
    })

    conn.on('OpponentUsedStratagem', (data) => {
      setStratagemAlert(data)
      setTimeout(() => setStratagemAlert(null), 9000)
    })

    conn.on('TurnAdvanced', () => {
      setOpponentPhase(0)
    })

    conn.on('ChargeDeClared', (unitName) => {
      setChargeAlert(unitName)
      setTimeout(() => setChargeAlert(null), 6000)
    })

    conn.on('OpponentDisconnected', () => {
      setOpponentInfo(prev => prev ? { ...prev, disconnected: true } : null)
    })
  }

  // ── Outgoing calls ────────────────────────────────────────────────────────

  const createRoom = useCallback(async (playerName, faction) => {
    if (!_conn) return null
    try {
      const res = await _conn.invoke('CreateRoom', playerName || 'Player 1', faction || 'unknown')
      _roomCode    = res.code
      _playerIndex = res.playerIndex
      setRoomCode(res.code)
      setPlayerIndex(res.playerIndex)
      setStatus('joined')
      return res.code
    } catch (e) {
      console.error('CreateRoom failed', e)
      return null
    }
  }, [])

  const joinRoom = useCallback(async (code, playerName, faction) => {
    if (!_conn) return { success: false, error: 'Not connected to server' }
    try {
      const res = await _conn.invoke('JoinRoom', code.trim().toUpperCase(), playerName || 'Player 2', faction || 'unknown')
      if (res.success) {
        _roomCode    = code.toUpperCase()
        _playerIndex = res.playerIndex
        setRoomCode(code.toUpperCase())
        setPlayerIndex(res.playerIndex)
        setStatus('joined')
        setOpponentInfo({ name: res.room?.playerNames?.[0], faction: res.room?.factions?.[0] })
        setOpponentCp(res.room?.cp?.[0] ?? 6)
      }
      return res
    } catch (e) {
      return { success: false, error: e.message }
    }
  }, [])

  const syncPhase = useCallback((phaseIdx) => {
    if (_conn?.state === 'Connected' && _roomCode)
      _conn.invoke('AdvancePhase', _roomCode, phaseIdx).catch(console.error)
  }, [])

  const syncCp = useCallback((cp) => {
    if (_conn?.state === 'Connected' && _roomCode && _playerIndex !== null)
      _conn.invoke('UpdateCp', _roomCode, _playerIndex, cp).catch(console.error)
  }, [])

  const syncStratagem = useCallback((id, name, cost, phase, effect) => {
    if (_conn?.state === 'Connected' && _roomCode && _playerIndex !== null)
      _conn.invoke('UseStratagem', _roomCode, _playerIndex, id, name, cost, phase, effect).catch(console.error)
  }, [])

  const syncTurn = useCallback(() => {
    if (_conn?.state === 'Connected' && _roomCode)
      _conn.invoke('AdvanceTurn', _roomCode).catch(console.error)
  }, [])

  const notifyCharge = useCallback((unitName) => {
    if (_conn?.state === 'Connected' && _roomCode)
      _conn.invoke('DeclareCharge', _roomCode, unitName).catch(console.error)
  }, [])

  return {
    status,                                      // 'disconnected'|'connecting'|'connected'|'joined'
    isConnected: _conn?.state === 'Connected',
    isInRoom: status === 'joined',
    roomCode,
    playerIndex,
    opponentInfo,
    opponentCp,
    opponentPhase,
    stratagemAlert,
    chargeAlert,
    clearStratagemAlert: () => setStratagemAlert(null),
    clearChargeAlert: () => setChargeAlert(null),
    createRoom,
    joinRoom,
    syncPhase,
    syncCp,
    syncStratagem,
    syncTurn,
    notifyCharge,
  }
}
