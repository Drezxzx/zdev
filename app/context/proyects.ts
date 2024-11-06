import { create } from 'zustand'


interface ProyectsContext {
  isHiddenFullScreenProyects: boolean
  isHiddenCreateProyect: boolean 
  setIsHiddenFullScreenProyects: (isHiddenFullScreenProyects: boolean) => void
  setisHiddenCreateProyect: (isHiddenCreateProyect: boolean) => void
}



export const useProyects = create<ProyectsContext>()((set) => ({
  isHiddenFullScreenProyects: true,
  isHiddenCreateProyect: true,
  setIsHiddenFullScreenProyects: (isHiddenFullScreenProyects: boolean) => set({ isHiddenFullScreenProyects }),
  setisHiddenCreateProyect: (isHiddenCreateProyect: boolean) => set({ isHiddenCreateProyect }),
}));
