"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAllItemsStore, useItemsStore } from "@/hooks/useItemsStore";
import type { Item } from "@/types/types";
import ListFixedItem from "./ListFixedItem";

export default function ListItem(props: Item) {
  const pathname = usePathname();
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const [isChecked, setIsChecked] = useState(props.isChecked || false);

  function handleSelect() {
    setIsChecked((prev) => !prev);
    const updatedItems: Item = { ...props, isChecked: !isChecked };

    setAllItems((prev) =>
      prev.map((item) => (item.name === props.name ? updatedItems : item)),
    );
    setItems((prev) =>
      prev.map((item) => (item.name === props.name ? updatedItems : item)),
    );

    if (!props.isFixed) {
      setItems((prev) => prev.filter((item) => item.name !== props.name));
    }
  }

  if (pathname === "/recurring") {
    return (
      <ListFixedItem {...props} />
    )
  }


  return (
    <div
      onClick={handleSelect}
      className={clsx(
        "p-4 rounded-xl shadow flex justify-between items-center cursor-pointer my-card",
        isChecked ? "bg-blue-50" : "bg-white",
      )}
    >
      <div className="flex items-center space-x-3 wrap-anywhere">
        <input
          type="checkbox"
          checked={isChecked}
          readOnly
          className="w-5 h-5 shrink-0"
        />
        <p
          className={clsx(
            "text-lg font-medium",
            isChecked ? "text-blue line-through" : "",
          )}
        >
          {props.name}
        </p>
      </div>

      {props.isFixed && (
        <div
          className={clsx(
            "px-2 rounded-lg",
            isChecked ? "bg-white" : "bg-blue-50",
          )}
        >
          <span className="font-bold text-xs text-blue">FIXED</span>
        </div>
      )}
    </div>
  );
}
