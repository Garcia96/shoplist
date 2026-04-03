'use client';

import { useState } from "react";
import ListItem from "./ListItem";
import type { Item } from "@/types/types";

export default function List({ isFixed }: { isFixed: boolean }) {
  const [toast, setToast] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  function addItem(name: string) {
    if (!name.trim()) return;
    
    const item = items.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (item) {
      setToast("Este item ya está en la lista");

      setTimeout(() => {
        setToast("");
      }, 3000);

      return;
    }

    setItems((prev) => [...prev, { name, isFixed: isFixed }]);
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
          className="w-full p-4 pr-14 rounded-xl bg-gray-200 focus:outline-none text-lg font-medium"
        />

        <button 
          onClick={() => addItem(inputValue)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue text-white text-xl flex items-center justify-center shadow-md hover:bg-blue-600 active:scale-95 transition"
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <ListItem key={item.name} name={item.name} isFixed={item.isFixed} />
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out">
          {toast}
        </div>
      )}
    </div>
  );
}