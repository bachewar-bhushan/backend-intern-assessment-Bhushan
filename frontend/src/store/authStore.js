import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  // set user after login / fetch
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  // clear on logout
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
