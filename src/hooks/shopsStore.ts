import { localStorageStore } from "./localStorageStore";
import { Shops } from "@/src/types/types";

export const useShopsStore = localStorageStore<Shops[]>("shops", [] as Shops[]);