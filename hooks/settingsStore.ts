import { localStorageStore } from "./localStorageStore";
import { Settings, initialSettings } from "@/types/types";

export const useSettingsStore = localStorageStore<Settings>(
  "settings",
  initialSettings,
);
