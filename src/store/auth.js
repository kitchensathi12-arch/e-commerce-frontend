import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      addUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',       // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist user, not actions
    }
  )
);