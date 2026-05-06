import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { saveCrusade, loadCrusade } from '../lib/firebase'

const RANKS = [
  { id: 'battleReady', label: 'Battle Ready', xpMin: 0 },
  { id: 'blooded', label: 'Blooded', xpMin: 6 },
  { id: 'battlHardened', label: 'Battle-Hardened', xpMin: 16 },
  { id: 'heroic', label: 'Heroic', xpMin: 31 },
  { id: 'legendary', label: 'Legendary', xpMin: 51 },
]

export function getRank(xp) {
  return [...RANKS].reverse().find(r => xp >= r.xpMin) || RANKS[0]
}

export function getNextRank(xp) {
  return RANKS.find(r => r.xpMin > xp) || null
}

export { RANKS }

function generateSyncCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function blankOrder(id, name, faction, detachmentId) {
  return {
    id,
    name,
    faction: faction || 'spacewolves',
    detachmentId: detachmentId || null,
    requisitionPoints: 5,
    supplyLimit: 50,
    battlesPlayed: 0,
    battlesWon: 0,
    crusadePoints: 0,
    agendas: [],     // active agenda ids for the next battle
    rpLog: [],       // [{ id, actionId, actionName, cost, note, date }]
    battleLog: [],   // [{ id, date, opponent, mission, result, completedAgendaIds, unitXpAwards }]
    units: [],
  }
}

// Seed order for existing users — will be in localStorage already
const initialOrder = {
  id: 'order_sw_1',
  name: "Eduardo's Space Wolves",
  faction: 'spacewolves',
  detachmentId: 'sagaOfTheGreatWolf',
  requisitionPoints: 5,
  supplyLimit: 50,
  battlesPlayed: 0,
  battlesWon: 0,
  crusadePoints: 0,
  agendas: [],
  rpLog: [],
  battleLog: [],
  units: [
    {
      id: 'crusade_ragnar',
      name: 'Ragnar Blackmane',
      unitType: 'Character',
      powerRating: 5,
      xp: 12,
      battlesPlayed: 3,
      battleHonours: ['Fierce Determination'],
      battleScars: [],
      relics: ['Frostfang (Master-Crafted)'],
      notes: '',
    },
    {
      id: 'crusade_bloodclaws',
      name: 'Blood Claws',
      unitType: 'Infantry',
      powerRating: 4,
      xp: 6,
      battlesPlayed: 3,
      battleHonours: [],
      battleScars: ['Battle-Scarred (−1 Move)'],
      relics: [],
      notes: '',
    },
    {
      id: 'crusade_thunderwolf',
      name: 'Thunderwolf Cavalry',
      unitType: 'Mounted',
      powerRating: 7,
      xp: 3,
      battlesPlayed: 1,
      battleHonours: [],
      battleScars: [],
      relics: [],
      notes: '',
    },
  ],
}

export const useCrusadeStore = create(
  persist(
    (set, get) => ({
      orders: [initialOrder],
      activeOrderId: 'order_sw_1',

      // ── Cloud sync ──
      syncCode: generateSyncCode(),
      lastSynced: null,
      syncStatus: 'idle',
      syncError: null,

      getActiveOrder: () => {
        const s = get()
        return s.orders.find(o => o.id === s.activeOrderId) || null
      },

      setActiveOrder: (id) => set({ activeOrderId: id }),

      // ── Roster management ──

      createOrder: (name, faction, detachmentId) => {
        const id = `order_${Date.now()}`
        const order = blankOrder(id, name, faction, detachmentId)
        set(s => ({ orders: [...s.orders, order], activeOrderId: id }))
      },

      deleteOrder: (orderId) => set(s => {
        const remaining = s.orders.filter(o => o.id !== orderId)
        const newActiveId = remaining.length > 0 ? remaining[0].id : null
        return { orders: remaining, activeOrderId: newActiveId }
      }),

      // ── Unit actions ──

      addUnit: (orderId, unit) => set(s => ({
        orders: s.orders.map(o =>
          o.id === orderId ? { ...o, units: [...o.units, unit] } : o
        ),
      })),

      removeUnit: (orderId, unitId) => set(s => ({
        orders: s.orders.map(o =>
          o.id === orderId ? { ...o, units: o.units.filter(u => u.id !== unitId) } : o
        ),
      })),

      addXp: (orderId, unitId, amount) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, xp: u.xp + amount, battlesPlayed: u.battlesPlayed + 1 }
            ),
          }
        ),
      })),

      addBattleHonour: (orderId, unitId, honour) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, battleHonours: [...u.battleHonours, honour] }
            ),
          }
        ),
      })),

      removeBattleHonour: (orderId, unitId, index) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, battleHonours: u.battleHonours.filter((_, i) => i !== index) }
            ),
          }
        ),
      })),

      addBattleScar: (orderId, unitId, scar) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, battleScars: [...u.battleScars, scar] }
            ),
          }
        ),
      })),

      removeBattleScar: (orderId, unitId, index) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, battleScars: u.battleScars.filter((_, i) => i !== index) }
            ),
          }
        ),
      })),

      addRelic: (orderId, unitId, relic) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u =>
              u.id !== unitId ? u : { ...u, relics: [...(u.relics || []), relic] }
            ),
          }
        ),
      })),

      updateNotes: (orderId, unitId, notes) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            units: o.units.map(u => u.id !== unitId ? u : { ...u, notes }),
          }
        ),
      })),

      addUnitFromBattle: (orderId, unit) => set(s => {
        const order = s.orders.find(o => o.id === orderId)
        if (!order) return s
        if (order.units.some(u => u.name.toLowerCase() === unit.name.toLowerCase())) return s
        const newUnit = {
          id: `crusade_${unit.id}_${Date.now()}`,
          name: unit.name,
          unitType: unit.type || unit.category || 'Infantry',
          powerRating: unit.powerRating || 1,
          xp: 0, battlesPlayed: 0,
          battleHonours: [], battleScars: [], relics: [], notes: '',
        }
        return { orders: s.orders.map(o => o.id === orderId ? { ...o, units: [...o.units, newUnit] } : o) }
      }),

      recordBattle: (orderId, battleData) => {
        // Support legacy boolean call: recordBattle(id, true/false)
        const isLegacy = typeof battleData === 'boolean'
        const won = isLegacy ? battleData : battleData.won
        const opponent = isLegacy ? 'Unknown' : (battleData.opponent || 'Unknown')
        const mission = isLegacy ? '' : (battleData.mission || '')
        const unitXpAwards = isLegacy ? [] : (battleData.unitXpAwards || [])
        const completedAgendaIds = isLegacy ? [] : (battleData.completedAgendaIds || [])

        set(s => ({
          orders: s.orders.map(o => {
            if (o.id !== orderId) return o
            const entry = {
              id: `battle_${Date.now()}`,
              date: new Date().toISOString(),
              opponent,
              mission,
              result: won ? 'victory' : 'defeat',
              completedAgendaIds,
              unitXpAwards,
            }
            const updatedUnits = o.units.map(u => {
              const award = unitXpAwards.find(a => a.unitId === u.id)
              if (!award || (!award.xp && !award.participated)) return u
              return {
                ...u,
                xp: u.xp + (award.xp || 0),
                battlesPlayed: award.participated ? u.battlesPlayed + 1 : u.battlesPlayed,
              }
            })
            return {
              ...o,
              battlesPlayed: o.battlesPlayed + 1,
              battlesWon: won ? o.battlesWon + 1 : o.battlesWon,
              requisitionPoints: o.requisitionPoints + 1,
              agendas: [],
              battleLog: [entry, ...(o.battleLog || [])],
              units: updatedUnits,
            }
          }),
        }))
      },

      // ── Agendas ──

      setOrderAgendas: (orderId, agendaIds) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : { ...o, agendas: agendaIds }
        ),
      })),

      // ── Requisition Points ──

      spendRP: (orderId, action, note) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            requisitionPoints: Math.max(0, o.requisitionPoints - action.cost),
            rpLog: [
              {
                id: `rp_${Date.now()}`,
                actionId: action.id,
                actionName: action.name,
                cost: action.cost,
                note: note || '',
                date: new Date().toISOString(),
              },
              ...(o.rpLog || []),
            ],
          }
        ),
      })),

      adjustRP: (orderId, delta) => set(s => ({
        orders: s.orders.map(o =>
          o.id !== orderId ? o : {
            ...o,
            requisitionPoints: Math.max(0, o.requisitionPoints + delta),
          }
        ),
      })),

      // ── Cloud sync ──

      syncToCloud: async () => {
        const { syncCode, orders, activeOrderId } = get()
        set({ syncStatus: 'syncing', syncError: null })
        try {
          await saveCrusade(syncCode, { orders, activeOrderId })
          set({ syncStatus: 'success', lastSynced: new Date().toISOString() })
          setTimeout(() => set({ syncStatus: 'idle' }), 3000)
        } catch (err) {
          set({ syncStatus: 'error', syncError: err.message || 'Sync failed.' })
        }
      },

      syncFromCloud: async (code) => {
        const cleanCode = code.replace(/-/g, '').toUpperCase().trim()
        if (cleanCode.length !== 6) {
          set({ syncStatus: 'error', syncError: 'Enter a valid 6-character code.' })
          return false
        }
        set({ syncStatus: 'syncing', syncError: null })
        try {
          const data = await loadCrusade(cleanCode)
          if (!data) {
            set({ syncStatus: 'error', syncError: 'No crusade found for that code.' })
            return false
          }
          set({
            orders: data.orders,
            activeOrderId: data.activeOrderId,
            syncCode: cleanCode,
            syncStatus: 'success',
            lastSynced: new Date().toISOString(),
          })
          setTimeout(() => set({ syncStatus: 'idle' }), 3000)
          return true
        } catch (err) {
          set({ syncStatus: 'error', syncError: err.message || 'Load failed.' })
          return false
        }
      },
    }),
    { name: 'w40k-crusade' }
  )
)
