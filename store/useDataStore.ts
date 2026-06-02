import { create } from "zustand";
import { mockUsers } from "../lib/mockData";

interface DataState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataset: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDataset: (data: any[]) => void;
}

export const useDataStore = create<DataState>((set) => ({
  dataset: mockUsers,
  setDataset: (dataset) => set({ dataset }),
}));
