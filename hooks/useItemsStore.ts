import { localStorageStore } from "./localStorageStore";
import { Item } from "@/types/types";

export const useItemsStore = localStorageStore<Item[]>("items", [] as Item[]);
export const useAllItemsStore = localStorageStore<Item[]>("allItems", [] as Item[]);
export const useItemsFixedStore = localStorageStore<Item[]>("fixedItems", [] as Item[]);