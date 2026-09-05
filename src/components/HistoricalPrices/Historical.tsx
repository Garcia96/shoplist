"use client";

import { useState } from "react";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Delete from "@mui/icons-material/Delete";
import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { HistoricalPrice } from "@/src/types/types";
import { useTranslations } from "next-intl";

export default function Historical() {
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const historicalPrices = useHistoricalPriceStore((state) => state.value);
  const { showDialog } = useDialogStore();
  const setHistoricalPrices = useHistoricalPriceStore(
    (state) => state.setValue,
  );
  const t = useTranslations("");

  const handleClick = (historical: HistoricalPrice) => {
    console.log("Clicked historical price:", historical);
    setExpandedItemId((prev) =>
      prev === historical.item.id ? null : historical.item.id,
    );
  };

  const handleDelete = (historical: HistoricalPrice) => {
    showDialog({
      type: "delete",
      title: t("historicalPage.dialogDeleteTitle"),
      item: historical.item,
      confirmText: t("common.delete"),
      onConfirm: () => {
        setHistoricalPrices((prev) =>
          prev.filter((price) => price.item.id !== historical.item.id),
        );
      },
    });
  };

  const convertDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <>
      {historicalPrices.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">
            {t("historicalPage.noHistoricalPrices")}
          </p>
        </div>
      )}
      {historicalPrices.length > 0 &&
        historicalPrices.map((historical) => (
          <div key={historical.item.id} className="flex items-start">
            <div className=" w-full">
              <div
                onClick={() => handleClick(historical)}
                className="flex justify-between bg-surface-container-low bg-gray-100 my-card rounded-xl p-3 my-1 border-b border-gray-300 cursor-pointer"
              >
                <span className="text-lg">{historical.name}</span>
                {expandedItemId === historical.item.id ? (
                  <ArrowDropUp />
                ) : (
                  <ArrowDropDown />
                )}
              </div>
              {expandedItemId === historical.item.id &&
                historical.prices.map((price) => (
                  <div
                    key={price.id}
                    className="flex flex-col bg-surface-container px-4 my-3 border-b border-gray-300 last:border-b-0 transition-all duration-200 animate-item-in"
                  >
                    <div className="flex justify-between">
                      <div>
                        <span>${price.value}</span>
                        <span className="ml-2">
                          {t(`historicalPage.${price.unit}`)}
                        </span>
                      </div>
                      <span>{convertDate(price.date)}</span>
                    </div>
                    <span className="mb-2 text-sm text-gray">
                      {price.store}
                    </span>
                  </div>
                ))}
            </div>
            <div className="mt-4 px-2">
              <div onClick={() => handleDelete(historical)}>
                <Delete />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
