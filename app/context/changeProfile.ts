import { create } from 'zustand'

interface ChnageType {
  isChange: boolean
  setChange: (by: boolean) => void
}

export const useChangeProfile = create<ChnageType>()((set) => ({
  isChange: false,
  setChange: (by) => set((state) => ({ isChange:  by })),
}))
