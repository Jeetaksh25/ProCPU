import { create } from "zustand";

export const useProcessStore = create((set) => ({
  processes: [],
  selectedId: null,

  schedulingType: "non-preemptive",
  timeQuantum: 2,

  timeline: [],
  currentTime: 0,
  isPlaying: false,

  selectedAlgo: "FCFS",

  setSelectedAlgo: (algo) => set({ selectedAlgo: algo }),

  setTimeline: (timeline) => set({ timeline }),

  setCurrentTime: (t) =>
    set((state) => ({
      currentTime: typeof t === "function" ? t(state.currentTime) : t,
    })),

  setProcesses: (processes) =>
    set(() => ({
      processes,
      selectedId: null,
    })),

  addProcess: (process) =>
    set((state) => ({
      processes: [
        ...state.processes,
        {
          ...process,
          id: crypto.randomUUID(),
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

  setSchedulingType: (type) => set({ schedulingType: type }),
  setTimeQuantum: (q) => set({ timeQuantum: Number(q) }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  reset: () =>
    set({
      currentTime: 0,
      isPlaying: false,
    }),
}));