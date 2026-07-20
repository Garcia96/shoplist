"use client";

import { create } from "zustand";
import { DialogStore, initialDialog } from "@/src/types/types";

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: initialDialog,

  showDialog(dialog) {
    set({
      dialog: {
        ...initialDialog,
        ...dialog,
        visible: true,
      },
    });
  },

  hideDialog() {
    set({
      dialog: initialDialog,
    });
  },

  setDialogValue(value) {
    set((state) => ({
      dialog: {
        ...state.dialog,
        value,
      },
    }));
  },
}));
