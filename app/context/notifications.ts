import { create } from 'zustand'


interface NotificationContext {
  isHiddenFullScreenNotifications: boolean
  thereAreNewNotifications: boolean | undefined
  setThereAreNewNotifications: (thereAreNewNotifications: boolean) => void
  setIsHiddenFullScreenNotifications: (isHiddenFullScreenNotifications: boolean) => void
}



export const useNotifications= create<NotificationContext>()((set) => ({
    isHiddenFullScreenNotifications: true,
    thereAreNewNotifications: false,
    setThereAreNewNotifications: (thereAreNewNotifications: boolean) => set({ thereAreNewNotifications }),
    setIsHiddenFullScreenNotifications: (isHiddenFullScreenNotifications: boolean) => set({ isHiddenFullScreenNotifications }) 
}));