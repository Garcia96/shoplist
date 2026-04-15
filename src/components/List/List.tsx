"use client";

import { useState, useRef } from "react";
import {
  useAllItemsStore,
  useItemsFixedStore,
  useItemsStore,
} from "@/src/hooks/useItemsStore";
import { useToastStore } from "@/src/hooks/toastStore";
import { useSettingsStore } from "@/src/hooks/settingsStore";
import { useDialogStore } from "@/src/hooks/dialogStore";
import ListItem from "./ListItem";

export default function List({ isFixed }: { isFixed: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const items = useItemsStore((state) => state.value);
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const fixedItems = useItemsFixedStore((state) => state.value);
  const showToast = useToastStore((s) => s.showToast);
  const settings = useSettingsStore((state) => state.value);
  const showDialog = useDialogStore((state) => state.showDialog);

  function addItem(name: string) {
    if (settings.firstTime) {
      showDialog({
        content: (
          <p>You haven’t set up a cycle yet. Create one now to get started.</p>
        ),
        link: "/cycle/start",
        title: "Set Up Your Cycle",
      });
      return;
    }

    if (!name.trim()) return;

    const item = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (item) {
      showToast("The item is already on the list", 3000);
      return;
    }

    const newItem = { name, isFixed, isChecked: false };
    setItems((prev) => [...prev, newItem]);
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
          placeholder="Add item..."
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
        {isFixed &&
          fixedItems.map((item) => (
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
