"use client";

import { create } from "zustand";
import { DialogStore, initialDialog } from "@/src/types/types";

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: initialDialog,

  showDialog(dialog) {
    set({
      dialog: { ...dialog, visible: true },
    });
  },

  hideDialog() {
    set({
      dialog: initialDialog,
    });
  },
}));
