import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTipsStore = create(
  persist(
    (set, get) => ({
      dismissedTips: [],
      dismissTip: (id) => set(s => ({
        dismissedTips: s.dismissedTips.includes(id) ? s.dismissedTips : [...s.dismissedTips, id],
      })),
      resetTips: () => set({ dismissedTips: [] }),
    }),
    { name: 'w40k-tips' }
  )
)
