"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import type { HistoricalPrice } from "@/src/types/types";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Delete from "@mui/icons-material/Delete";
import MoreVert from "@mui/icons-material/MoreVert";
import { useContextMenuStore } from "@/src/hooks/contextMenu";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";
import { useTranslations } from "next-intl";

export default function HistoricalItem({
  historical,
}: {
  historical: HistoricalPrice;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { isOpen, selectedId, showContextMenu } = useContextMenuStore();
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const { showDialog } = useDialogStore();
  const setHistoricalPrices = useHistoricalPriceStore(
    (state) => state.setValue,
  );

  const t = useTranslations("");
  const isSelected = isOpen && selectedId === historical.item.id;

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

  function handleContextMenuClick(props: HistoricalPrice) {
    if (!itemRef.current) return;

    showContextMenu(props.item.id, itemRef.current, [
      {
        label: t("common.delete"),
        icon: <Delete />,
        hidden: false,
        onClick: () => handleDelete(props),
      },
    ]);
  }

  const convertDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <>
      <div className={clsx("flex flex-col relative", isSelected && "z-50")}>
        <div
          ref={itemRef}
          onContextMenu={(e) => e.preventDefault()}
          className={clsx(
            "select-none no-touch-callout flex justify-between bg-surface-container-low bg-gray-100 my-card rounded-xl p-3 my-1 border-b border-gray-300 cursor-pointer w-full",
            isSelected ? "shadow-sm ring-blue-300" : "shadow",
          )}
        >
          <div
            className="flex items-center"
            onClick={() => handleClick(historical)}
          >
            {expandedItemId === historical.item.id ? (
              <ArrowDropUp />
            ) : (
              <ArrowDropDown />
            )}
            <span className="text-lg">{historical.name}</span>
          </div>
          <span>
            <MoreVert onClick={() => handleContextMenuClick(historical)} />
          </span>
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
              <span className="mb-2 text-sm text-gray">{price.store}</span>
            </div>
          ))}
      </div>
    </>
  );
}
