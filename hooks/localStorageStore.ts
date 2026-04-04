"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Store } from "@/types/types";


export function localStorageStore<T>(key: string, initialValue: T) {
  return create<Store<T>>()(
    persist(
      (set) => ({
        value: initialValue,
        setValue: (value) =>
          set((state) => ({
            value:
              typeof value === "function"
                ? (value as (prev: T) => T)(state.value)
                : value,
          })),
      }),
      {
        name: key,
      },
    ),
  );
}
