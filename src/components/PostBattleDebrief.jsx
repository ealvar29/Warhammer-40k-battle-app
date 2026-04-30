import React, { useState } from 'react'
import { useCrusadeStore } from '../store/crusadeStore'

const XP_OPTIONS = [1, 2, 3, 4]

export default function PostBattleDebrief({ units, faction, isCrusadeMatch = false, onComplete, onCancel, theme }) {
  const crusadeStore = useCrusadeStore()
  const activeOrder = isCrusadeMatch ? crusadeStore.getActiveOrder() : null

  const [step, setStep] = useState('result') // 'result' | 'xp'
  const [result, setResult] = useState(null)  // 'victory' | 'defeat'
  const [opponentName, setOpponentName] = useState('')
  const [unitXp, setUnitXp] = useState(() =>
    Object.fromEntries(units.map(u => [u.id, 2]))
  )
  const [destroyed, setDestroyed] = useState(() =>
    Object.fromEntries(units.map(u => [u.id, false]))
  )

  const crusadeUnitNames = new Set(
    (activeOrder?.units || []).map(u => u.name.toLowerCase())
  )
  const notInCrusade = units.filter(u => !crusadeUnitNames.has(u.name.toLowerCase()))

  const syncToCrusade = () => {
    if (!activeOrder) { onComplete(); return }

    // Record the battle result
    crusadeStore.recordBattle(activeOrder.id, result === 'victory')

    // Add any new units to the Order of Battle
    notInCrusade.forEach(u => {
      crusadeStore.addUnitFromBattle(activeOrder.id, u)
    })

    // Re-fetch after potential additions so XP goes to the right records
    const updatedOrder = crusadeStore.getActiveOrder()
    if (!updatedOrder) { onComplete(); return }

    // Award XP to each battle unit matched by name
    units.forEach(u => {
      const crusadeUnit = updatedOrder.units.find(
        cu => cu.name.toLowerCase() === u.name.toLowerCase()
      )
      if (crusadeUnit && unitXp[u.id] > 0) {
        crusadeStore.addXp(updatedOrder.id, crusadeUnit.id, unitXp[u.id])
      }
    })

    onComplete('crusade')
  }

  const skipCrusade = () => onComplete('home')

  // ── Step 1: Result ─────────────────────────────────────────────────
  if (step === 'result') {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
        <div
          className="w-full max-w-sm rounded-t-3xl px-5 pt-6 pb-8"
          style={{ background: theme.surface, borderTop: `1px solid ${theme.border}` }}
        >
          {/* Handle bar */}
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />

          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.secondary }}>
            Battle Complete
          </p>
          <h2 className="text-xl font-black mb-1" style={{ color: theme.textPrimary }}>
            How did it go?
          </h2>
          <p className="text-xs mb-5" style={{ color: theme.textSecondary }}>
            {isCrusadeMatch
              ? 'Record the result to update your Crusade roster.'
              : 'Record the result for your records.'}
          </p>

          {/* Result buttons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => setResult('victory')}
              className="flex-1 py-4 rounded-2xl font-black text-base transition-all"
              style={{
                background: result === 'victory' ? theme.hpFull : theme.surfaceHigh,
                color: result === 'victory' ? '#fff' : theme.textSecondary,
                border: `2px solid ${result === 'victory' ? theme.hpFull : theme.border}`,
              }}
            >
              Victory
            </button>
            <button
              onClick={() => setResult('defeat')}
              className="flex-1 py-4 rounded-2xl font-black text-base transition-all"
              style={{
                background: result === 'defeat' ? theme.hpLow : theme.surfaceHigh,
                color: result === 'defeat' ? '#fff' : theme.textSecondary,
                border: `2px solid ${result === 'defeat' ? theme.hpLow : theme.border}`,
              }}
            >
              Defeat
            </button>
          </div>

          {/* Opponent name (optional) */}
          <div className="mb-5">
            <p className="text-xs font-bold mb-2" style={{ color: theme.textSecondary }}>
              Opponent's Army (optional)
            </p>
            <input
              value={opponentName}
              onChange={e => setOpponentName(e.target.value)}
              placeholder="e.g. Chaos Space Marines"
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: theme.surfaceHigh,
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
              }}
            />
          </div>

          <button
            onClick={() => result && (isCrusadeMatch ? setStep('xp') : onComplete('home'))}
            className="w-full py-3.5 rounded-2xl font-bold text-sm"
            style={{
              background: result ? theme.secondary : theme.border,
              color: result ? theme.bg : theme.textSecondary,
            }}
          >
            {isCrusadeMatch ? 'Next: Award XP →' : 'End Battle'}
          </button>
          <button
            onClick={onCancel}
            className="w-full mt-2 py-2 text-xs font-medium"
            style={{ color: theme.textSecondary }}
          >
            Cancel — keep battle active
          </button>
        </div>
      </div>
    )
  }

  // ── Step 2: XP ────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div
        className="w-full max-w-sm rounded-t-3xl flex flex-col"
        style={{
          background: theme.surface,
          borderTop: `1px solid ${theme.border}`,
          maxHeight: '88vh',
        }}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-4 shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: theme.secondary }}>
                {result === 'victory' ? 'Victory' : 'Defeat'} — XP Awards
              </p>
              <h2 className="text-xl font-black" style={{ color: theme.textPrimary }}>
                How did each unit do?
              </h2>
            </div>
            <button
              onClick={() => setStep('result')}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textSecondary }}
            >
              ←
            </button>
          </div>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
            Tap to select XP earned. Default is +2 (1 for participating, 1 for surviving).
          </p>
        </div>

        {/* Unit list */}
        <div className="flex-1 overflow-y-auto px-5 space-y-3 pb-2">
          {units.map(u => {
            const inCrusade = crusadeUnitNames.has(u.name.toLowerCase())
            return (
              <div
                key={u.id}
                className="rounded-2xl border p-4"
                style={{ background: theme.unitBg, borderColor: theme.border }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{u.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {inCrusade ? (
                        <span className="text-xs" style={{ color: theme.secondary }}>In Crusade roster</span>
                      ) : (
                        <span className="text-xs" style={{ color: theme.textSecondary }}>Will be added to roster</span>
                      )}
                    </div>
                  </div>
                  {/* Destroyed toggle */}
                  <button
                    onClick={() => setDestroyed(prev => ({ ...prev, [u.id]: !prev[u.id] }))}
                    className="text-xs px-2.5 py-1 rounded-xl font-bold"
                    style={{
                      background: destroyed[u.id] ? `${theme.hpLow}22` : theme.surfaceHigh,
                      color: destroyed[u.id] ? theme.hpLow : theme.textSecondary,
                      border: `1px solid ${destroyed[u.id] ? theme.hpLow : theme.border}`,
                    }}
                  >
                    {destroyed[u.id] ? '☠ Destroyed' : 'Survived'}
                  </button>
                </div>

                {/* XP selector */}
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold shrink-0" style={{ color: theme.textSecondary }}>XP earned:</p>
                  <div className="flex gap-1.5 flex-1">
                    {XP_OPTIONS.map(amt => (
                      <button
                        key={amt}
                        onClick={() => setUnitXp(prev => ({ ...prev, [u.id]: amt }))}
                        className="flex-1 py-2 rounded-xl text-xs font-black transition-all"
                        style={{
                          background: unitXp[u.id] === amt ? theme.secondary : theme.surfaceHigh,
                          color: unitXp[u.id] === amt ? theme.bg : theme.textSecondary,
                          border: `1px solid ${unitXp[u.id] === amt ? theme.secondary : theme.border}`,
                        }}
                      >
                        +{amt}
                      </button>
                    ))}
                    <button
                      onClick={() => setUnitXp(prev => ({ ...prev, [u.id]: 0 }))}
                      className="flex-1 py-2 rounded-xl text-xs font-black transition-all"
                      style={{
                        background: unitXp[u.id] === 0 ? theme.border : theme.surfaceHigh,
                        color: theme.textSecondary,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      —
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* New units notice */}
          {notInCrusade.length > 0 && (
            <div
              className="rounded-2xl p-4 border"
              style={{ background: `${theme.secondary}10`, borderColor: `${theme.secondary}44` }}
            >
              <p className="text-xs font-bold" style={{ color: theme.secondary }}>
                {notInCrusade.length} unit{notInCrusade.length > 1 ? 's' : ''} will be added to your Order of Battle
              </p>
              <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                {notInCrusade.map(u => u.name).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 pb-8 pt-4 shrink-0 space-y-2" style={{ borderTop: `1px solid ${theme.border}` }}>
          {activeOrder ? (
            <button
              onClick={syncToCrusade}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: theme.secondary, color: theme.bg }}
            >
              Save to Crusade: {activeOrder.name}
            </button>
          ) : (
            <p className="text-xs text-center pb-2" style={{ color: theme.textSecondary }}>
              No active Crusade order — XP will not be saved.
            </p>
          )}
          <button
            onClick={skipCrusade}
            className="w-full py-2 text-xs font-medium"
            style={{ color: theme.textSecondary }}
          >
            Skip — end battle without saving
          </button>
        </div>
      </div>
    </div>
  )
}
