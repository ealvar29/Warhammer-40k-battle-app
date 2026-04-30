import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useListStore = create(
  persist(
    (set, get) => ({
      savedLists: [], // [{ id, name, faction, targetPts, units: [{unitId, name, count, pts}] }]

      saveList: (list) => set(s => {
        const existing = s.savedLists.findIndex(l => l.id === list.id)
        if (existing >= 0) {
          const updated = [...s.savedLists]
          updated[existing] = list
          return { savedLists: updated }
        }
        return { savedLists: [list, ...s.savedLists] }
      }),

      deleteList: (id) => set(s => ({
        savedLists: s.savedLists.filter(l => l.id !== id),
      })),
    }),
    { name: 'w40k-lists' }
  )
)
