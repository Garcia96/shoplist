"use client";

import { useState } from "react";
import { usePathname } from "@/src/i18n/navigation";
import clsx from "clsx";
import { useAllItemsStore, useItemsStore } from "@/src/hooks/useItemsStore";
import type { Item } from "@/src/types/types";
import ListFixedItem from "./ListFixedItem";
import { useTranslations } from "next-intl";

export default function ListItem(props: Item) {
  const pathname = usePathname();
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const [isChecked, setIsChecked] = useState(props.isChecked || false);
  const t = useTranslations("mainPage");

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
    return <ListFixedItem {...props} />;
  }

  return (
    <div
      onClick={handleSelect}
      className={clsx(
        "p-4 rounded-xl shadow flex justify-between items-center cursor-pointer my-card animate-item-in transition-all duration-200",
        isChecked ? "bg-blue-50" : "bg-white",
      )}
    >
      <div className="transition-transform duration-200 flex items-center space-x-3 wrap-anywhere">
        <input
          type="checkbox"
          checked={isChecked}
          readOnly
          className="w-5 h-5 shrink-0"
        />
        <p
          className={clsx(
            "text-lg font-medium transition-all duration-200",
            isChecked
              ? "text-blue line-through opacity-50 scale-[0.98]"
              : "opacity-100 scale-100",
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
          <span className="font-bold text-xs text-blue">{t("fixedItem")}</span>
        </div>
      )}
    </div>
  );
}
