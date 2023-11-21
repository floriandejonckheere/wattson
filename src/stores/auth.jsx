import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: null,
  signin: (token) => set({ token }),
  signout: () => set({ token: null }),
  isSignedIn: () => !!useStore.getState().token,
}))
