"use client";

import { useState } from "react";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";
import { useTranslations } from "next-intl";
import { HistoricalPrice, Units } from "@/src/types/types";
import clsx from "clsx";

export function AddHistoricalDialog() {
  const [store, setStore] = useState("");
  const [price, setPrice] = useState(0 as number | string);
  const [unit, setUnit] = useState<Units>("Lbs");
  const [isPrice, setIsPrice] = useState(false);
  const { addPrice } = useHistoricalPriceStore();
  const setHistoricalPrices = useHistoricalPriceStore(
    (state) => state.setValue,
  );
  const historicalPrices = useHistoricalPriceStore((state) => state.value);
  const { dialog, setDialogValue, hideDialog } = useDialogStore();
  const tc = useTranslations();

  const handleConfirm = () => {
    console.log("Confirm clicked with values:", {
      name: dialog.item?.name,
      store,
      price,
      unit,
    });

    if (price === 0 || isNaN(price as number) || price === "") {
      setIsPrice(true);
      return;
    }

    handleAddHistoricalPrice();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const newPrice = parseFloat(e.target.value);
      setPrice(Number.isNaN(newPrice) ? "" : newPrice);
      setIsPrice(false);

  };

  const handleAddHistoricalPrice = () => {
    const hp = historicalPrices.find((prev) => prev.item.id === dialog.item?.id);
    if (hp) {
      addPrice(dialog.item!, {
        id: crypto.randomUUID(),
        value: price as number,
        date: new Date(),
        store: store || "",
        unit
      });
    } else {
      const newHistoricalPrice: HistoricalPrice = {
        name: dialog.item!.name,
        item: dialog.item!,
        prices: [
          {
            id: crypto.randomUUID(),
            value: price as number,
            date: new Date(),
            store: store || "",
            unit
          },
        ],
      };
      setHistoricalPrices((prev) => [...prev, newHistoricalPrice]);
    }
    hideDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-col">
        <label htmlFor="name">{tc("common.product")}</label>
        <input
          value={dialog.item?.name}
          onChange={(e) => setDialogValue(e.target.value)}
          className="w-auto p-2 pr-14 rounded-lg text-base font-light shadow-sm border border-gray-300"
          id="name"
          name="name"
          autoComplete="off"
          type="text"
          readOnly
          placeholder={tc("common.edit") + " Item"}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="store">{tc("historicalPage.store")}</label>
        <input
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className="w-auto p-2 pr-14 rounded-xl text-base font-light shadow-sm border border-gray-300"
          id="store"
          name="store"
          autoComplete="off"
          type="text"
          placeholder="(opcional)"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">{tc("historicalPage.price")}</label>
        <input
          value={price}
          onChange={handlePriceChange}
          className="w-auto p-2 pr-14 rounded-xl text-base font-light shadow-sm border border-gray-300"
          id="price"
          name="price"
          autoComplete="off"
          type="number"
        />
        {isPrice && (
          <p className="text-red-500">El precio no puede ser cero.</p>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <div>
          <label
            htmlFor="Lbs"
            className={clsx(
              "flex items-center rounded-xl border py-1 px-3 cursor-pointer transition-colors",
              unit === "Lbs" && "border-blue-500 text-white bg-blue-100 dark:bg-blue",
            )}
          >
            {tc("historicalPage.Lbs")}
          </label>
          <input
            type="radio"
            id="Lbs"
            name="Lbs"
            value="Lbs"
            checked={unit === "Lbs"}
            onChange={() => setUnit("Lbs")}
            className="sr-only"
          />
        </div>
        <div>
          <label
            htmlFor="Unit"
            className={clsx(
              "flex items-center rounded-xl border py-1 px-3 cursor-pointer transition-colors",
              unit === "Unit" && "border-blue-500 text-white bg-blue-100 dark:bg-blue",
            )}
          >
            {tc("historicalPage.Unit")}
          </label>
          <input
            type="radio"
            id="Unit"
            name="Unit"
            value="Unit"
            checked={unit === "Unit"}
            onChange={() => setUnit("Unit")}
            className="sr-only"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 p-5 border-gray-100">
        <button
          onClick={hideDialog}
          className="px-4 py-2 rounded-xl cancel transition dark:bg-gray-800"
        >
          {tc("common.omit")}
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 rounded-xl bg-blue text-white hover:bg-blue-700 transition shadow-sm"
        >
          {dialog?.confirmText || tc("common.confirm")}
        </button>
      </div>
    </div>
  );
}
