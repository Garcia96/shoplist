"use client";

import { create } from "zustand";
import { DialogStore } from "@/types/types";

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: { content: null, visible: false, link: "", title: "" },

  showDialog(content, link, title) {
    setTimeout(() => {
      set({
        dialog: { content, visible: true, link, title },
      });
    }, 3);
  },

  hideDialog() {
    set({
      dialog: { content: null, visible: false, link: "", title: "" },
    });
  },
}));
