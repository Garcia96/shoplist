import { localStorageStore } from "./localStorageStore";
import { Settings, initialSettings } from "@/src/types/types";

export const useSettingsStore = localStorageStore<Settings>(
  "settings",
  initialSettings,
);
