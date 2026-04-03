"use client";
import { useState } from "react";

export default function AddItem({ onAdd }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <section className="mb-10">
      <div className="relative group">
        
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add something mindful..."
          className="w-full bg-surface-container-low border-none rounded-xl py-5 px-6 pr-20 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/60 transition-all"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={handleAdd}
            className="bg-primary text-on-primary p-2 rounded-full shadow-lg active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">
              add
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}