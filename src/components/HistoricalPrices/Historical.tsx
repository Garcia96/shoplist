"use client";

import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";
import { useTranslations } from "next-intl";
import AddHistorical from "./AddHistorical";
import HistoricalItem from "./HistoricalItem";

export default function Historical() {
  const historicalPrices = useHistoricalPriceStore((state) => state.value);
  const t = useTranslations("");

  return (
    <>
      <AddHistorical />
      {historicalPrices.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">
            {t("historicalPage.noHistoricalPrices")}
          </p>
        </div>
      )}
      {historicalPrices.length > 0 &&
        historicalPrices.map((historical) => (
          <HistoricalItem key={historical.item.id} historical={historical} />
        ))}
    </>
  );
}
