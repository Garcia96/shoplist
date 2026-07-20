
import { create } from "zustand";
import { ContextMenuStore } from "../types/types";

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
    isOpen: false,
    selectedItem: null,
    coords: null,
    showContextMenu: (item, coords) => set({ isOpen: true, selectedItem: item, coords }),
    hideContextMenu: () => set({ isOpen: false, selectedItem: null, coords: null }),
}));