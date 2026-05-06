import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBattleStore = create(
  persist(
    (set, get) => ({
      // ── Setup ──────────────────────────────────────────────────────
      faction: null,
      detachmentId: null,
      selectedUnits: [],
      opponentTags: [],
      opponentArmy: null, // { faction, detachmentId, units, detachment }

      // ── Mission ────────────────────────────────────────────────────
      mission: null,          // rolled MISSION_POOL entry
      secondaryMode: 'tactical', // 'fixed' | 'tactical'
      secondaries: [],        // array of active secondary mission objects (max 2)
      secondaryDeck: [],      // remaining shuffled deck for tactical draws
      primaryVP:   { you: 0, them: 0 },
      secondaryVP: { you: 0, them: 0 },
      battleReady: { you: false, them: false },

      // ── In-battle ──────────────────────────────────────────────────
      turn: 1,
      isYourTurn: true,
      activePhaseIdx: 0,
      cp: 6,
      cpLog: [], // [{ id, type:'gain'|'spend', amount, reason, cpBefore, cpAfter, phase, round }]
      cpGainedRounds: [], // array of round numbers where command-phase CP was already claimed
      unitStates: {}, // { [unitId]: { currentWounds, attachedLeaderId } }
      enhancementAssignments: {}, // { [baseUnitId]: enhancementName }
      battleActive: false,
      crusadeBattle: false,
      vpScores: { you: [0,0,0,0,0], them: [0,0,0,0,0] },
      warlordUnitId: null,
      detachmentState: { activeSelection: null, usedSelections: [], targetNote: '', onceBuffUsed: false },

      // ── Mission actions ────────────────────────────────────────────
      setMission: (mission) => set({ mission }),
      setSecondaryMode: (mode) => set({ secondaryMode: mode }),
      setSecondaries: (secondaries) => set({ secondaries }),
      setSecondaryDeck: (deck) => set({ secondaryDeck: deck }),

      // Discard a tactical secondary (free) — gain 1CP if it's your turn
      discardSecondary: (id) => set((s) => {
        const remaining = s.secondaries.filter(sec => sec.id !== id)
        return { secondaries: remaining, cp: Math.min(12, s.cp + 1) }
      }),

      // New Orders (1CP) — discard one tactical secondary, draw from deck
      newOrders: (id) => set((s) => {
        if (s.cp < 1 || s.secondaryDeck.length === 0) return s
        const [drawn, ...rest] = s.secondaryDeck
        const remaining = s.secondaries.filter(sec => sec.id !== id)
        return {
          cp: s.cp - 1,
          secondaries: [...remaining, drawn],
          secondaryDeck: rest,
        }
      }),

      // Replenish to 2 tactical secondaries at start of Command phase
      replenishSecondaries: () => set((s) => {
        if (s.secondaryMode !== 'tactical') return s
        const needed = 2 - s.secondaries.length
        if (needed <= 0 || s.secondaryDeck.length === 0) return s
        const drawn = s.secondaryDeck.slice(0, needed)
        const rest   = s.secondaryDeck.slice(needed)
        return { secondaries: [...s.secondaries, ...drawn], secondaryDeck: rest }
      }),

      adjustPrimaryVP: (player, delta) => set((s) => ({
        primaryVP: {
          ...s.primaryVP,
          [player]: Math.max(0, Math.min(50, s.primaryVP[player] + delta)),
        },
      })),

      adjustSecondaryVP: (player, delta) => set((s) => ({
        secondaryVP: {
          ...s.secondaryVP,
          [player]: Math.max(0, Math.min(40, s.secondaryVP[player] + delta)),
        },
      })),

      toggleBattleReady: (player) => set((s) => ({
        battleReady: { ...s.battleReady, [player]: !s.battleReady[player] },
      })),

      // ── Setup actions ──────────────────────────────────────────────
      setFaction: (faction) => set({ faction }),
      setDetachment: (detachmentId) => set({ detachmentId }),

      addUnit: (unit) => set((s) => {
        if (s.selectedUnits.find(u => u.id === unit.id)) return s
        return {
          selectedUnits: [...s.selectedUnits, unit],
          unitStates: {
            ...s.unitStates,
            [unit.id]: { currentWounds: unit.maxWounds, attachedLeaderId: null },
          },
        }
      }),

      removeUnit: (unitId) => set((s) => {
        const states = { ...s.unitStates }
        delete states[unitId]
        return { selectedUnits: s.selectedUnits.filter(u => u.id !== unitId), unitStates: states }
      }),

      setOpponentArmy: (army) => set({ opponentArmy: army }),
      clearOpponentArmy: () => set({ opponentArmy: null }),

      setOpponentTags: (tags) => set({ opponentTags: tags }),
      toggleOpponentTag: (tag) => set((s) => ({
        opponentTags: s.opponentTags.includes(tag)
          ? s.opponentTags.filter(t => t !== tag)
          : [...s.opponentTags, tag],
      })),

      // ── Battle actions ─────────────────────────────────────────────
      startBattle: () => set({ battleActive: true, turn: 1, isYourTurn: true, activePhaseIdx: 0 }),
      setCrusadeBattle: (val) => set({ crusadeBattle: val }),

      setEnhancement: (unitId, enhancementName) => set(s => ({
        enhancementAssignments: enhancementName
          ? { ...s.enhancementAssignments, [unitId]: enhancementName }
          : Object.fromEntries(Object.entries(s.enhancementAssignments).filter(([k]) => k !== unitId)),
      })),

      resetBattle: () => set({
        battleActive: false, turn: 1, isYourTurn: true, activePhaseIdx: 0,
        cp: 6, unitStates: {}, selectedUnits: [], faction: null, detachmentId: null,
        enhancementAssignments: {},
        vpScores: { you: [0,0,0,0,0], them: [0,0,0,0,0] },
        warlordUnitId: null,
        detachmentState: { activeSelection: null, usedSelections: [], targetNote: '', onceBuffUsed: false },
        cpLog: [],
        cpGainedRounds: [],
        crusadeBattle: false,
        mission: null, secondaryMode: 'tactical', secondaries: [], secondaryDeck: [],
        primaryVP: { you: 0, them: 0 }, secondaryVP: { you: 0, them: 0 },
        battleReady: { you: false, them: false },
      }),

      setWarlord: (unitId) => set((s) => ({
        warlordUnitId: s.warlordUnitId === unitId ? null : unitId,
      })),

      adjustVp: (player, roundIdx, delta) => set((s) => {
        const scores = [...s.vpScores[player]]
        scores[roundIdx] = Math.max(0, scores[roundIdx] + delta)
        return { vpScores: { ...s.vpScores, [player]: scores } }
      }),

      setPhase: (idx) => set({ activePhaseIdx: idx }),

      nextPhase: () => set((s) => {
        const next = s.activePhaseIdx + 1
        if (next > 4) {
          if (s.isYourTurn) return { isYourTurn: false, activePhaseIdx: 0 }
          return { isYourTurn: true, activePhaseIdx: 0, turn: s.turn + 1 }
        }
        return { activePhaseIdx: next }
      }),

      toggleTurn: () => set((s) => ({ isYourTurn: !s.isYourTurn, activePhaseIdx: 0 })),
      setDetachmentSelection: (id) => set((s) => ({
        detachmentState: {
          ...s.detachmentState,
          activeSelection: id,
          usedSelections: s.detachmentState.usedSelections.includes(id)
            ? s.detachmentState.usedSelections
            : [...s.detachmentState.usedSelections, id],
        },
      })),
      clearDetachmentSelection: () => set((s) => ({
        detachmentState: { ...s.detachmentState, activeSelection: null },
      })),
      setTargetNote: (note) => set((s) => ({
        detachmentState: { ...s.detachmentState, targetNote: note },
      })),
      setOnceBuffUsed: () => set((s) => ({
        detachmentState: { ...s.detachmentState, onceBuffUsed: true },
      })),

      setCp: (cp) => set({ cp: Math.max(0, Math.min(12, cp)) }),
      gainCp: (amount) => set((s) => ({ cp: Math.max(0, Math.min(12, s.cp + amount)) })),
      spendCp: (amount) => set((s) => ({ cp: Math.max(0, s.cp - amount) })),

      logCpGain: (amount, reason, phase, round) => set(s => {
        const cpBefore = s.cp
        const cpAfter = Math.min(12, cpBefore + amount)
        return {
          cp: cpAfter,
          cpLog: [{ id: Date.now() + Math.random(), type: 'gain', amount, reason, cpBefore, cpAfter, phase, round }, ...s.cpLog].slice(0, 80),
        }
      }),
      logCpSpend: (amount, reason, phase, round) => set(s => {
        const cpBefore = s.cp
        const cpAfter = Math.max(0, cpBefore - amount)
        return {
          cp: cpAfter,
          cpLog: [{ id: Date.now() + Math.random(), type: 'spend', amount, reason, cpBefore, cpAfter, phase, round }, ...s.cpLog].slice(0, 80),
        }
      }),
      markCpGainedForRound: (round) => set(s => ({
        cpGainedRounds: s.cpGainedRounds.includes(round) ? s.cpGainedRounds : [...s.cpGainedRounds, round],
      })),

      setWounds: (unitId, wounds) => set((s) => ({
        unitStates: {
          ...s.unitStates,
          [unitId]: { ...s.unitStates[unitId], currentWounds: Math.max(0, wounds) },
        },
      })),

      attachLeader: (unitId, leaderId) => set((s) => ({
        unitStates: {
          ...s.unitStates,
          [unitId]: { ...s.unitStates[unitId], attachedLeaderId: leaderId },
        },
      })),

      detachLeader: (unitId) => set((s) => ({
        unitStates: {
          ...s.unitStates,
          [unitId]: { ...s.unitStates[unitId], attachedLeaderId: null },
        },
      })),
    }),
    {
      name: 'w40k-battle',
      // Only persist the state that matters for resuming a battle
      partialize: (state) => ({
        faction: state.faction,
        detachmentId: state.detachmentId,
        selectedUnits: state.selectedUnits,
        opponentTags: state.opponentTags,
        opponentArmy: state.opponentArmy,
        turn: state.turn,
        isYourTurn: state.isYourTurn,
        activePhaseIdx: state.activePhaseIdx,
        cp: state.cp,
        unitStates: state.unitStates,
        enhancementAssignments: state.enhancementAssignments,
        battleActive: state.battleActive,
        crusadeBattle: state.crusadeBattle,
        vpScores: state.vpScores,
        warlordUnitId: state.warlordUnitId,
        detachmentState: state.detachmentState,
        cpLog: state.cpLog,
        cpGainedRounds: state.cpGainedRounds,
        mission: state.mission,
        secondaryMode: state.secondaryMode,
        secondaries: state.secondaries,
        secondaryDeck: state.secondaryDeck,
        primaryVP: state.primaryVP,
        secondaryVP: state.secondaryVP,
        battleReady: state.battleReady,
      }),
    }
  )
)
