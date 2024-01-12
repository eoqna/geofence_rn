import { create } from "zustand";

export interface DataState {
  position: ApiResponse.position;
  setPosition: (data: ApiResponse.position) => void;
};

const defaultPosition: ApiResponse.position = {
  latitude: 0,
  longitude: 0,
}

const useDataStore = create<DataState>()((set, get) => ({
  position: defaultPosition,
  setPosition: (data) => set({ position: data }),
}));

export default useDataStore;