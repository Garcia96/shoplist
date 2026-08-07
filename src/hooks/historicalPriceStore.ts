"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  HistoricalPrice,
  Item,
  Price,
} from "@/src/types/types";

type HistoricalPriceStore = {
  value: HistoricalPrice[];

  setValue: (
    value:
      | HistoricalPrice[]
      | ((prev: HistoricalPrice[]) => HistoricalPrice[])
  ) => void;

  addPrice: (item: Item, price: Price) => void;

  removePrice: (itemId: number, priceId: string) => void;

  updatePrice: (
    itemId: number,
    priceId: string,
    price: Partial<Price>
  ) => void;
};

export const useHistoricalPriceStore = create<HistoricalPriceStore>()(
  persist(
    (set) => ({
      value: [],

      setValue: (value) =>
        set((state) => ({
          value:
            typeof value === "function"
              ? value(state.value)
              : value,
        })),

      addPrice: (item, price) =>
        set((state) => {
          const exists = state.value.some(
            (h) => h.item.id === item.id
          );

          if (!exists) {
            return {
              value: [
                ...state.value,
                {
                  name: item.name,
                  item,
                  prices: [price],
                },
              ],
            };
          }

          return {
            value: state.value.map((history) =>
              history.item.id === item.id
                ? {
                    ...history,
                    prices: [...history.prices, price]
                    .sort((a,b) => a.value - b.value)
                    .slice(0,5),
                  }
                : history
            ),
          };
        }),

      removePrice: (itemId, priceId) =>
        set((state) => ({
          value: state.value.map((history) =>
            history.item.id === itemId
              ? {
                  ...history,
                  prices: history.prices.filter(
                    (price) => price.id !== priceId
                  ),
                }
              : history
          ),
        })),

      updatePrice: (itemId, priceId, newPrice) =>
        set((state) => ({
          value: state.value.map((history) =>
            history.item.id === itemId
              ? {
                  ...history,
                  prices: history.prices.map((price) =>
                    price.id === priceId
                      ? {
                          ...price,
                          ...newPrice,
                        }
                      : price
                  ),
                }
              : history
          ),
        })),
    }),
    {
      name: "historical-prices",
    }
  )
);