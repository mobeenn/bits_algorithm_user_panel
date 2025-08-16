import { create } from "zustand";
import { createGlobalSlice } from "./slices/global";

export const useStore = create((...a) => ({
   ...createGlobalSlice(...a),
}));
