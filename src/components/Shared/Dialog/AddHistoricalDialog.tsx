"use client";

import { useState } from "react";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useShopsStore } from "@/src/hooks/shopsStore";
import { useAllItemsStore } from "@/src/hooks/useItemsStore";
import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";
import { useTranslations } from "next-intl";
import { HistoricalPrice, Item, Units } from "@/src/types/types";
import Select from "react-select";
import clsx from "clsx";

export function AddHistoricalDialog({ type }: { type: string }) {
  const [store, setStore] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [unit, setUnit] = useState<Units>("Lbs");
  const [product, setProduct] = useState<Item | null>(null);

  const [isPrice, setIsPrice] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isStore, setIsStore] = useState(false);

  const shopsStore = useShopsStore((state) => state.value);
  const allitems = useAllItemsStore((state) => state.value);

  const { addPrice } = useHistoricalPriceStore();
  const setHistoricalPrices = useHistoricalPriceStore(
    (state) => state.setValue,
  );
  const historicalPrices = useHistoricalPriceStore((state) => state.value);

  const { dialog, setDialogValue, hideDialog } = useDialogStore();

  const tc = useTranslations();

  const selectedProduct = type === "addNewHistorical" ? product : dialog.item;
  const productOptions = allitems.map((item) => ({
    value: item,
    label: item.name,
  }));

  const storeOptions = shopsStore.map((shop) => ({
    value: shop.name,
    label: shop.name,
  }));

  const handleConfirm = () => {
    let hasError = false;

    if (type === "addNewHistorical" && !product) {
      setIsProduct(true);
      hasError = true;
    } else {
      setIsProduct(false);
    }

    if (!store) {
      setIsStore(true);
      hasError = true;
    } else {
      setIsStore(false);
    }

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    if (price === "" || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setIsPrice(true);
      hasError = true;
    } else {
      setIsPrice(false);
    }

    if (hasError) {
      return;
    }

    handleAddHistoricalPrice(numericPrice);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setPrice("");
      setIsPrice(false);
      return;
    }

    const newPrice = parseFloat(value);

    setPrice(newPrice);
    setIsPrice(false);
  };

  const handleAddHistoricalPrice = (numericPrice: number) => {
    if (!selectedProduct) {
      return;
    }

    const hp = historicalPrices.find(
      (prev) => prev.item.id === selectedProduct.id,
    );

    const newPrice = {
      id: crypto.randomUUID(),
      value: numericPrice,
      date: new Date(),
      store,
      unit,
    };

    if (hp) {
      addPrice(selectedProduct, newPrice);
    } else {
      const newHistoricalPrice: HistoricalPrice = {
        name: selectedProduct.name,
        item: selectedProduct,
        prices: [newPrice],
      };

      setHistoricalPrices((prev) => [...prev, newHistoricalPrice]);
    }

    hideDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {type === "addNewHistorical" && (
        <div className="flex flex-col">
          <label htmlFor="product">{tc("common.product")}</label>

          <Select
            inputId="product"
            name="product"
            value={
              product
                ? {
                    value: product,
                    label: product.name,
                  }
                : null
            }
            onChange={(selectedOption) => {
              setProduct(selectedOption?.value ?? null);
              setIsProduct(false);
            }}
            placeholder={`${tc("common.product")}...`}
            options={productOptions}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "var(--surface)",
              }),

              singleValue: (base) => ({
                ...base,
                color: "var(--foreground)",
              }),

              menu: (base) => ({
                ...base,
                marginTop: "4px",
                borderRadius: "0.75rem",
                overflow: "hidden",
                backgroundColor: "var(--surface)",
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.20)",
                zIndex: 50,
              }),

              placeholder: (base) => ({
                ...base,
                color: "rgb(var(--neutral))",
                fontSize: "0.875rem",
              }),

              option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isSelected ? "#ffffff" : "var(--foreground)",

                backgroundColor: state.isSelected
                  ? "rgb(var(--primary))"
                  : state.isFocused
                    ? "rgb(var(--primary) / 0.10)"
                    : "var(--surface)",

                "&:active": {
                  backgroundColor: "rgb(var(--primary) / 0.20)",
                },
              }),
            }}
          />

          {isProduct && (
            <p className="text-red-500 text-sm mt-1">
              {tc("common.product")} es obligatorio.
            </p>
          )}
        </div>
      )}
      {type === "addHistorical" && (
        <div className="flex flex-col">
          <label htmlFor="name">{tc("common.product")}</label>

          <input
            value={dialog.item?.name ?? ""}
            onChange={(e) => setDialogValue(e.target.value)}
            className="w-auto p-2 pr-14 rounded-lg text-base font-light shadow-sm border border-gray-300"
            id="name"
            name="name"
            autoComplete="off"
            type="text"
            readOnly
            placeholder={tc("common.product")}
          />
        </div>
      )}

      <div className="flex flex-col">
        <label htmlFor="store">{tc("historicalPage.store")}</label>

        <Select
          inputId="store"
          name="store"
          value={
            store
              ? (storeOptions.find((option) => option.value === store) ?? null)
              : null
          }
          onChange={(selectedOption) => {
            setStore(selectedOption?.value ?? "");
            setIsStore(false);
          }}
          placeholder={`${tc("historicalPage.store")}...`}
          options={storeOptions}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--surface)",
            }),

            singleValue: (base) => ({
              ...base,
              color: "var(--foreground)",
            }),

            menu: (base) => ({
              ...base,
              marginTop: "4px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              backgroundColor: "var(--surface)",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.20)",
              zIndex: 50,
            }),

            placeholder: (base) => ({
              ...base,
              color: "rgb(var(--neutral))",
              fontSize: "0.875rem",
            }),

            option: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isSelected ? "#ffffff" : "var(--foreground)",

              backgroundColor: state.isSelected
                ? "rgb(var(--primary))"
                : state.isFocused
                  ? "rgb(var(--primary) / 0.10)"
                  : "var(--surface)",

              "&:active": {
                backgroundColor: "rgb(var(--primary) / 0.20)",
              },
            }),
          }}
        />

        {isStore && (
          <p className="text-red-500 text-sm mt-1">
            {tc("historicalPage.store")} es obligatoria.
          </p>
        )}
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
          min="0"
          step="any"
          placeholder={"0"}
        />

        {isPrice && (
          <p className="text-red-500 text-sm mt-1">
            El precio debe ser mayor que cero.
          </p>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <div>
          <label
            htmlFor="Lbs"
            className={clsx(
              "flex items-center rounded-xl border py-1 px-3 cursor-pointer transition-colors",
              unit === "Lbs" &&
                "border-blue-500 text-white bg-blue-100 dark:bg-blue",
            )}
          >
            {tc("historicalPage.Lbs")}
          </label>

          <input
            type="radio"
            id="Lbs"
            name="unit"
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
              unit === "Unit" &&
                "border-blue-500 text-white bg-blue-100 dark:bg-blue",
            )}
          >
            {tc("historicalPage.Unit")}
          </label>

          <input
            type="radio"
            id="Unit"
            name="unit"
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
          {type === "addNewHistorical" && tc("common.cancel")}
          {type === "addHistorical" && tc("common.ommit")}
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
