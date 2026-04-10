import { localStorageStore } from "./localStorageStore";
import { Cycle, CycleDuration } from "@/types/types";

export const useCycleStore = localStorageStore<Cycle>("cycle", {} as Cycle);

export const useCycleDurationStore = localStorageStore<CycleDuration>(
  "cycleDuration",
  {} as CycleDuration,
);