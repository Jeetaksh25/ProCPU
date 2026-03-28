import { create } from "zustand";

export const useProcessStore = create((set) => ({
  processes: [],
  selectedId: null,

  addProcess: (process) =>
    set((state) => ({
      processes: [
        ...state.processes,
        {
          ...process,
          id: crypto.randomUUID(), // ✅ immutable internal key
        },
      ],
    })),

  removeProcess: (id) =>
    set((state) => ({
      processes: state.processes.filter((p) => p.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  updateAndClearSelected: (id, updated) =>
    set((state) => ({
      processes: state.processes.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
      selectedId: null,
    })),

  clearProcesses: () => set({ processes: [], selectedId: null }),

  setSelected: (id) =>
    set((state) => ({
      selectedId: state.selectedId === id ? null : id,
    })),

  clearSelected: () => set({ selectedId: null }),
}));