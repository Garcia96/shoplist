"use client";

import { useState } from "react";
import { useAllItemsStore, useItemsFixedStore, useItemsStore } from "@/hooks/useItemsStore";
import ListItem from "./ListItem";
import { useToastStore } from "@/hooks/toastStore";

export default function List({ isFixed }: { isFixed: boolean }) {
  const [inputValue, setInputValue] = useState("");
  const items = useItemsStore((state) => state.value);
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const fixedItems = useItemsFixedStore((state) => state.value);
  const showToast = useToastStore((s) => s.showToast);

  function addItem(name: string) {
    if (!name.trim()) return;

    const item = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (item) {
      showToast("Este item ya está en la lista", 3000);
      return;
    }

    const newItem = { name, isFixed, isChecked: false };
    setItems((prev) => [...prev, newItem]);
    setAllItems((prev) => [...prev, newItem]);

    if (isFixed) setFixedItems((prev) => [...prev, newItem]);

    setInputValue("");
  }

  return (
    <div>
      <div className="relative w-full mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addItem(inputValue);
            }
          }}
          placeholder="Add item..."
          id="search-list"
          className="w-full p-4 pr-14 rounded-xl bg-gray-100 focus:outline-none text-lg font-medium"
        />

        <button
          onClick={() => addItem(inputValue)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue text-white text-xl flex items-center justify-center shadow-md hover:bg-blue-600 active:scale-95 transition"
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {isFixed &&
          fixedItems
            .map((item) => (
              <ListItem
                key={item.name}
                name={item.name}
                isFixed={item.isFixed}
                isChecked={item.isChecked}
              />
            ))}
        {!isFixed &&
          items
            .sort((a, b) => Number(b.isFixed) - Number(a.isFixed))
            .map((item) => (
              <ListItem
                key={item.name}
                name={item.name}
                isFixed={item.isFixed}
                isChecked={item.isChecked}
              />
            ))}
      </div>
    </div>
  );
}
