import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Stores user-supplied portrait URLs per unit ID.
// These override whatever artUrl is in the faction data files.
export const usePortraitStore = create(
  persist(
    (set, get) => ({
      portraits: {}, // { [unitId]: { artUrl: string, artPosition: string } }

      setPortrait: (unitId, artUrl, artPosition = 'center center') =>
        set(s => ({
          portraits: {
            ...s.portraits,
            [unitId]: { artUrl: artUrl.trim(), artPosition },
          },
        })),

      clearPortrait: (unitId) =>
        set(s => {
          const next = { ...s.portraits }
          delete next[unitId]
          return { portraits: next }
        }),

      getPortrait: (unitId) => get().portraits[unitId] ?? null,
    }),
    { name: 'w40k-portraits' }
  )
)

// Hook that returns the resolved artUrl + artPosition for a unit,
// merging the portrait store override on top of the unit's own data.
export function useUnitPortrait(unit) {
  const portraits = usePortraitStore(s => s.portraits)
  const override = unit?.id ? portraits[unit.id] : null
  return {
    artUrl:      override?.artUrl      ?? unit?.artUrl      ?? null,
    artPosition: override?.artPosition ?? unit?.artPosition ?? 'center center',
    hasOverride: !!override,
  }
}
