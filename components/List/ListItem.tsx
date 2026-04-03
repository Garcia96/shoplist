"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Item } from "@/types/types";

export default function ListItem({ name, isFixed }: Item) {
  const [isChecked, setIsChecked] = useState(false);

  function onClick() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-4 rounded-xl shadow flex justify-between items-center cursor-pointer",
        isChecked ? "bg-blue-50" : "bg-white",
      )}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked}
          readOnly
          className="w-5 h-5"
        />
        <span className={clsx("text-lg font-medium", isChecked ? "text-blue line-through" : "")}>{name}</span>
      </div>

      {isFixed && (
        <div className={clsx("px-2 rounded-lg", isChecked ? "bg-white" : "bg-blue-50")}>
          <span className="font-bold text-xs text-blue">FIXED</span>
        </div>
      )}
    </div>
  );
}
