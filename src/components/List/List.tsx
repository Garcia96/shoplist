"use client";

import { useState, useRef } from "react";
import {
  useAllItemsStore,
  useItemsFixedStore,
} from "@/src/hooks/useItemsStore";
import { useToastStore } from "@/src/hooks/toastStore";
import ListItem from "./ListItem";
import { useTranslations } from "next-intl";
import { Item } from "@/src/types/types";

export default function List({ isFixed }: { isFixed: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const allItems = useAllItemsStore((state) => state.value);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const fixedItems = useItemsFixedStore((state) => state.value);
  const showToast = useToastStore((s) => s.showToast);
  const t = useTranslations("common");

  function addItem(name: string) {


    if (!name.trim()) return;

    if (
      allItems.some((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      showToast("itemAlready", 3000);
      return;
    }

    const nextId = Math.max(0, ...allItems.map((i) => i.id)) + 1;
    const newItem: Item = { id: nextId, name, isFixed, isChecked: false };
    setAllItems((prev) => [...prev, newItem]);

    if (isFixed) setFixedItems((prev) => [...prev, newItem]);

    setInputValue("");
    inputRef.current?.blur();
  }

  return (
    <div>
      <div className="relative w-full mb-6">
        <input
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addItem(inputValue);
            }
          }}
          placeholder={t("addItem")}
          id="add-list"
          autoComplete="off"
          className="w-full p-4 pr-14 rounded-xl text-lg font-medium shadow-lg/20 border border-gray-300"
        />

        <button
          onClick={() => addItem(inputValue)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue text-white text-xl flex items-center justify-center shadow-md hover:bg-blue-600 active:scale-95 transition"
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {/* Lista pagina de Fijos */}
        {isFixed &&
          fixedItems.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              isFixed={item.isFixed}
              isChecked={item.isChecked}
            />
          ))}

        {/* Lista pagina principal ordenado por fijos */}
        {!isFixed &&
          allItems
            .sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
            .filter((item) => !item.isChecked)
            .map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                name={item.name}
                isFixed={item.isFixed}
                isChecked={item.isChecked}
              />
            ))}

        {/* Lista pagina principal Completados */}
        {!isFixed && allItems.some((item) => item.isChecked) && (
          <div className="mt-10">
            <span className="text-lg">{t("completed")}</span>
          </div>
        )}
        {!isFixed &&
          allItems.find((item) => item.isChecked) &&
          allItems
            .sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
            .filter((item) => item.isChecked)
            .map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                name={item.name}
                isFixed={item.isFixed}
                isChecked={item.isChecked}
              />
            ))}
      </div>
    </div>
  );
}
