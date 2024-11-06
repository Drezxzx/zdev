import { create } from 'zustand'

interface ChnageType {
  isChange: boolean
  isChangePost : boolean
  setChange: (by: boolean) => void
  setChangePost : ( isChangePost: boolean) => void
}

interface User {
  usernameContex: string
  name: string
  email: string
  image: string
  setUsernameContex : (usernameContex: string) => void
  setEmailContex : (email: string) => void
  setNameContext: (name: string) => void
  setImageContext: (image: string) => void
}

export const useChangeProfile = create<ChnageType>()((set) => ({
  isChange: false,
  isChangePost : false,
  setChangePost : (isChangePost) => set((state) => ({ isChangePost:  isChangePost })),
  setChange: (by) => set((state) => ({ isChange:  by })),
}))

export const useUser = create<User>()((set) => ({
  usernameContex: "",
  name: "",
  email: "",
  image: "",
  setUsernameContex: (username) => set((state) => ({ usernameContex: username })),
  setEmailContex: (email) => set((state) => ({ email })),
  setNameContext: (name) => set((state) => ({ name })),
  setImageContext: (image) => set((state) => ({ image })),
}))
