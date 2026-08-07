import { localStorageStore } from "./localStorageStore";
import { Item } from "@/src/types/types";

export const useAllItemsStore = localStorageStore<Item[]>("allItems", [] as Item[]);
export const useItemsFixedStore = localStorageStore<Item[]>("fixedItems", [] as Item[]);