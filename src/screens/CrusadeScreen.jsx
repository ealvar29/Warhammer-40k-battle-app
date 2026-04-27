import React, { useState } from 'react'
import { useCrusadeStore, getRank, getNextRank, RANKS } from '../store/crusadeStore'

function XpBar({ xp, theme }) {
  const rank = getRank(xp)
  const nextRank = getNextRank(xp)
  const pct = nextRank
    ? ((xp - rank.xpMin) / (nextRank.xpMin - rank.xpMin)) * 100
    : 100
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-bold" style={{ color: theme.secondary }}>{rank.label}</span>
        {nextRank && (
          <span className="text-xs" style={{ color: theme.textSecondary }}>{xp} / {nextRank.xpMin} XP → {nextRank.label}</span>
        )}
        {!nextRank && <span className="text-xs" style={{ color: theme.secondary }}>Max Rank</span>}
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.border }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: theme.secondary }} />
      </div>
    </div>
  )
}

function UnitCrusadeCard({ unit, orderId, theme }) {
  const store = useCrusadeStore()
  const [expanded, setExpanded] = useState(false)
  const [addingHonour, setAddingHonour] = useState(false)
  const [addingScar, setAddingScar] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const rank = getRank(unit.xp)

  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: theme.unitBg, borderColor: theme.border }}>
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
              {unit.unitType} · {unit.battlesPlayed} battles
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {unit.battleScars.length > 0 && (
              <span className="text-xs" style={{ color: theme.hpLow }}>⚠ {unit.battleScars.length}</span>
            )}
            {unit.battleHonours.length > 0 && (
              <span className="text-xs" style={{ color: theme.secondary }}>★ {unit.battleHonours.length}</span>
            )}
            <span className="text-xs font-black px-2.5 py-1 rounded-full"
              style={{ background: theme.surfaceHigh, color: theme.textPrimary }}>
              {unit.xp} XP
            </span>
            <span style={{ color: theme.textSecondary, fontSize: 9 }}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
        <div className="mt-3">
          <XpBar xp={unit.xp} theme={theme} />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: theme.border }}>

          {/* XP controls */}
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Add XP after battle:</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(amt => (
                <button key={amt}
                  onClick={() => store.addXp(orderId, unit.id, amt)}
                  className="w-9 h-9 rounded-xl text-xs font-bold"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Battle Honours */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold" style={{ color: theme.secondary }}>★ Battle Honours</p>
              <button onClick={() => setAddingHonour(!addingHonour)}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                + Add
              </button>
            </div>
            {unit.battleHonours.length === 0 && !addingHonour && (
              <p className="text-xs" style={{ color: theme.textSecondary }}>No battle honours yet.</p>
            )}
            {unit.battleHonours.map((h, i) => (
              <p key={i} className="text-xs mb-1" style={{ color: theme.textPrimary }}>• {h}</p>
            ))}
            {addingHonour && (
              <div className="flex gap-2 mt-1">
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. Fierce Determination"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={() => { if (inputVal) { store.addBattleHonour(orderId, unit.id, inputVal); setInputVal(''); setAddingHonour(false) } }}
                  className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.secondary, color: theme.bg }}>
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Battle Scars */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold" style={{ color: theme.hpLow }}>⚠ Battle Scars</p>
              <button onClick={() => setAddingScar(!addingScar)}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ background: theme.surfaceHigh, color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                + Add
              </button>
            </div>
            {unit.battleScars.length === 0 && !addingScar && (
              <p className="text-xs" style={{ color: theme.textSecondary }}>No battle scars.</p>
            )}
            {unit.battleScars.map((s, i) => (
              <p key={i} className="text-xs mb-1" style={{ color: theme.hpLow }}>• {s}</p>
            ))}
            {addingScar && (
              <div className="flex gap-2 mt-1">
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. −1 Move"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }} />
                <button onClick={() => { if (inputVal) { store.addBattleScar(orderId, unit.id, inputVal); setInputVal(''); setAddingScar(false) } }}
                  className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: theme.hpLow, color: '#fff' }}>
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Relics */}
          {unit.relics.length > 0 && (
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: theme.cpColor }}>💎 Relics</p>
              {unit.relics.map((r, i) => (
                <p key={i} className="text-xs mb-1" style={{ color: theme.textPrimary }}>• {r}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const UNIT_TYPES = ['Infantry', 'Character', 'Cavalry', 'Monster', 'Vehicle', 'Battleline']

export default function CrusadeScreen({ theme }) {
  const store = useCrusadeStore()
  const activeOrder = store.getActiveOrder()
  const [recordingBattle, setRecordingBattle] = useState(false)
  const [addingUnit, setAddingUnit] = useState(false)
  const [newUnitForm, setNewUnitForm] = useState({ name: '', unitType: 'Infantry', powerRating: '1' })

  if (!activeOrder) return (
    <div className="flex items-center justify-center h-full" style={{ background: theme.bg }}>
      <p style={{ color: theme.textSecondary }}>No crusade order found.</p>
    </div>
  )

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 shrink-0"
        style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
          Crusade Roster
        </p>
        <h1 className="text-xl font-black mt-0.5" style={{ color: theme.textPrimary }}>
          {activeOrder.name}
        </h1>

        {/* Stats row */}
        <div className="flex gap-4 mt-3">
          {[
            { label: 'Battles', value: activeOrder.battlesPlayed },
            { label: 'Wins', value: activeOrder.battlesWon },
            { label: 'Req. Pts', value: activeOrder.requisitionPoints },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xl font-black" style={{ color: theme.secondary }}>{s.value}</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>{s.label}</p>
            </div>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setAddingUnit(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold"
              style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
              + Unit
            </button>
            <button
              onClick={() => setRecordingBattle(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold"
              style={{ background: theme.secondary, color: theme.bg }}>
              + Battle
            </button>
          </div>
        </div>
      </div>

      {/* Units list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: theme.textSecondary }}>
          Order of Battle — {activeOrder.units.length} units
        </p>
        {activeOrder.units.map(u => (
          <UnitCrusadeCard
            key={u.id}
            unit={u}
            orderId={activeOrder.id}
            theme={theme}
          />
        ))}
      </div>

      {/* Add Unit Modal */}
      {addingUnit && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-t-3xl p-5 pb-8"
            style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
            <h2 className="font-black text-base mb-1" style={{ color: theme.textPrimary }}>Add Unit to Roster</h2>
            <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
              Manually add a unit to your Order of Battle.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Unit Name</p>
                <input
                  value={newUnitForm.name}
                  onChange={e => setNewUnitForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Wolf Guard"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                />
              </div>
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Unit Type</p>
                <div className="flex flex-wrap gap-2">
                  {UNIT_TYPES.map(t => (
                    <button key={t} onClick={() => setNewUnitForm(f => ({ ...f, unitType: t }))}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: newUnitForm.unitType === t ? theme.secondary : theme.surfaceHigh,
                        color: newUnitForm.unitType === t ? theme.bg : theme.textSecondary,
                        border: `1px solid ${newUnitForm.unitType === t ? theme.secondary : theme.border}`,
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold mb-1.5" style={{ color: theme.textSecondary }}>Power Rating</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7,8,10].map(n => (
                    <button key={n} onClick={() => setNewUnitForm(f => ({ ...f, powerRating: String(n) }))}
                      className="flex-1 py-2 rounded-xl text-xs font-bold"
                      style={{
                        background: newUnitForm.powerRating === String(n) ? theme.secondary : theme.surfaceHigh,
                        color: newUnitForm.powerRating === String(n) ? theme.bg : theme.textSecondary,
                        border: `1px solid ${newUnitForm.powerRating === String(n) ? theme.secondary : theme.border}`,
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (!newUnitForm.name.trim()) return
                store.addUnit(activeOrder.id, {
                  id: `crusade_manual_${Date.now()}`,
                  name: newUnitForm.name.trim(),
                  unitType: newUnitForm.unitType,
                  powerRating: parseInt(newUnitForm.powerRating) || 1,
                  xp: 0, battlesPlayed: 0,
                  battleHonours: [], battleScars: [], relics: [], notes: '',
                })
                setNewUnitForm({ name: '', unitType: 'Infantry', powerRating: '1' })
                setAddingUnit(false)
              }}
              className="w-full mt-5 py-3.5 rounded-2xl font-bold text-sm"
              style={{
                background: newUnitForm.name.trim() ? theme.secondary : theme.border,
                color: newUnitForm.name.trim() ? theme.bg : theme.textSecondary,
              }}>
              Add to Roster
            </button>
            <button onClick={() => setAddingUnit(false)}
              className="w-full mt-2 py-2 text-xs font-medium"
              style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Record Battle Modal */}
      {recordingBattle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-t-3xl p-5 pb-8"
            style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <h2 className="font-black text-base mb-1" style={{ color: theme.textPrimary }}>Record Battle Result</h2>
            <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
              This will add 1 Requisition Point and increment battle counts.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { store.recordBattle(activeOrder.id, true); setRecordingBattle(false) }}
                className="flex-1 py-3 rounded-2xl font-bold text-sm"
                style={{ background: theme.hpFull, color: '#fff' }}>
                Victory
              </button>
              <button
                onClick={() => { store.recordBattle(activeOrder.id, false); setRecordingBattle(false) }}
                className="flex-1 py-3 rounded-2xl font-bold text-sm"
                style={{ background: theme.surfaceHigh, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
                Defeat
              </button>
            </div>
            <button onClick={() => setRecordingBattle(false)}
              className="w-full mt-2 py-2 text-xs font-medium"
              style={{ color: theme.textSecondary }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
