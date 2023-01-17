import { create } from "zustand";

export const useStore = create((set) => ({
  page: 1,
  setPage: (page: number) => set({ page: page }),
}));
