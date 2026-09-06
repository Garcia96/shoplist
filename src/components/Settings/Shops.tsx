"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useShopsStore } from "@/src/hooks/shopsStore";
import Delete from "@mui/icons-material/Delete";
import { Shops } from "@/src/types/types";

export default function ShopsList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  
  const { showDialog } = useDialogStore();
  const shopsStore = useShopsStore((state) => state.value);
  const setShops = useShopsStore((state) => state.setValue);

  const t = useTranslations("common");

  const handleAddShop = (name: string) => {
    if (!name.trim()) return;

    const newShop = {
      id: crypto.randomUUID(),
      name: name.trim(),
    };

    setShops((prev) => [...prev, newShop]);
    setInputValue("");

    inputRef.current?.focus();
  };

  const handleDeleteShop = (shop: Shops) => {
    showDialog({
      title: t("delete") + ` ${t("shop")}`,
      type: "delete",
      value: t("deleteConfirmation") + ` "${shopsStore.find((s) => s.id === shop.id)?.name}"?`,
      confirmText: t("delete"),
      onConfirm: async () => {
        setShops((prev) => prev.filter((s) => s.id !== shop.id));
      },
    });
  }

  return (
    <>
      <div className="relative w-full my-4">
        <input
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddShop(inputValue);
            }
          }}
          placeholder={t("addShop")}
          id="add-list"
          autoComplete="off"
          className="w-full p-2 pr-14 rounded-xl text-md font-medium shadow-md/20 border border-gray-300"
        />

        <button
          onClick={() => handleAddShop(inputValue)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue text-white text-xl flex items-center justify-center shadow-md hover:bg-blue-600 active:scale-95 transition"
        >
          +
        </button>
      </div>

      {shopsStore.length > 0 && (
        <div className="w-full">
          <table className="border-collapse rounded-md border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border bg-gray-200 border-gray-300 p-2">
                  {t("name")}
                </th>
                <th className="border bg-gray-200 border-gray-300 p-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {shopsStore.map((shop) => (
                <tr key={shop.id}>
                  <td className="border border-gray-300 p-2">{shop.name}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDeleteShop(shop)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
