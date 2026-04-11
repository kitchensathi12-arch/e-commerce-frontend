import type { IAuthDocument } from "@kitchensathi12-arch/ecommerce-types";
import { create } from "zustand";

export interface IAuthStore {
  user: IAuthDocument | null;
  addUser: (user: IAuthDocument) => void;
  removeUser: () => void;
}

export const AuthStore = create<IAuthStore>((set) => ({
  user: null,
  addUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));