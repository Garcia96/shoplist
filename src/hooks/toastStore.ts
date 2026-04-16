"use client";

import { create } from "zustand";
import type { ToastStore } from "@/src/types/types";

export const useToastStore = create<ToastStore>((set, get) => ({
  toast: { message: "", visible: false },
  timeoutId: null,

  showToast: (message: string, duration = 3000) => {
    const currentTimeout = get().timeoutId;

    // 🧹 limpiar timeout anterior si existe
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // ⏱ crear nuevo timeout
    const newTimeout = setTimeout(() => {
      set({
        toast: { message: "", visible: false },
        timeoutId: null,
      });
    }, duration);

    // 🔥 actualizar estado
    set({
      toast: { message, visible: true },
      timeoutId: newTimeout,
    });
  },

  hideToast: () => {
    const currentTimeout = get().timeoutId;

    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    set({
      toast: { message: "", visible: false },
      timeoutId: null,
    });
  },
}));
