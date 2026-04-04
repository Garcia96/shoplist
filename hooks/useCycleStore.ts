import { localStorageStore } from "./localStorageStore";
import { Cycle } from "@/types/types";

export const useCycleStore = localStorageStore<Cycle>(
  "cycle",
  {} as Cycle
);