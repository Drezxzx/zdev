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
  is_verified: number;
  image: string;
  setUsernameContex : (usernameContex: string) => void
  setEmailContex : (email: string) => void
  setNameContext: (name: string) => void
  setImageContext: (image: string) => void
  setIs_verified: (is_verified: number) => void
}

export const useChangeProfile = create<ChnageType>()((set) => ({
  isChange: false,
  isChangePost : false,
  setChangePost : (isChangePost) => set((state) => ({ isChangePost:  isChangePost })),
  setChange: (by) => set((state) => ({ isChange:  by })),
}))

export const useUser = create<User>()((set) => ({
  usernameContex: "",
  is_verified: 0,
  name: "",
  email: "",
  image: "",
  setIs_verified: (is_verified) => set((state) => ({ is_verified: is_verified })),
  setUsernameContex: (username) => set((state) => ({ usernameContex: username })),
  setEmailContex: (email) => set((state) => ({ email })),
  setNameContext: (name) => set((state) => ({ name })),
  setImageContext: (image) => set((state) => ({ image })),
}))
