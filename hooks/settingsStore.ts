import { localStorageStore } from "./localStorageStore";
import { Settings } from "@/types/types";

export const useSettingsStore = localStorageStore<Settings>(
  "settings",
  {} as Settings,
);
