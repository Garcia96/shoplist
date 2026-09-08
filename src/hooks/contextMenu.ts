import { create } from "zustand";
import { ContextMenuStore } from "../types/types";

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
  isOpen: false,
  selectedId: null,
  selectedElement: null,
  coords: null,
  options: [],
  showContextMenu: (selectedId, selectedElement, options) =>
    set({ isOpen: true, selectedId, selectedElement, options }),
  hideContextMenu: () =>
    set({
      isOpen: false,
      selectedId: null,
      selectedElement: null,
      options: [],
    }),
}));
