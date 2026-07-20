"use client";

import { useState, useRef } from "react";
import { usePathname } from "@/src/i18n/navigation";
import clsx from "clsx";
import { useAllItemsStore, useItemsStore } from "@/src/hooks/useItemsStore";
import type { Item } from "@/src/types/types";
import { useContextMenuStore } from "@/src/hooks/contextMenu";
import ListFixedItem from "./ListFixedItem";
import { useTranslations } from "next-intl";
import MoreVert from "@mui/icons-material/MoreVert";

export default function ListItem(props: Item) {
  const itemRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const t = useTranslations("mainPage");

  const [isChecked, setIsChecked] = useState(props.isChecked || false);

  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);

  const { isOpen, selectedItem, showContextMenu } =
    useContextMenuStore();

  const isSelected = isOpen && selectedItem?.name === props.name;

  function handleClick() {
    setIsChecked((prev) => !prev);

    const updatedItem: Item = {
      ...props,
      isChecked: !isChecked,
    };

    setAllItems((prev) =>
      prev.map((item) => (item.name === props.name ? updatedItem : item)),
    );

    setItems((prev) =>
      prev.map((item) => (item.name === props.name ? updatedItem : item)),
    );

    if (!props.isFixed) {
      setItems((prev) => prev.filter((item) => item.name !== props.name));
    }
  }

  function handleLongPress() {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();

    showContextMenu(props, { x: rect.right, y: rect.top });
  }

  if (pathname === "/recurring") {
    return <ListFixedItem {...props} />;
  }

  return (
    <div className={clsx("relative", isSelected && "z-50")}>
      <div
        ref={itemRef}
        onContextMenu={(e) => e.preventDefault()}
        className={clsx(
          "select-none no-touch-callout p-4 rounded-xl flex justify-between items-center cursor-pointer my-card animate-item-in transition-all duration-200",
          isChecked ? "bg-blue-50" : "bg-white",
          isSelected ? "shadow-sm ring-blue-300" : "shadow",
        )}
      >
        <div className="flex items-center space-x-3 wrap-anywhere">
          <input
            onClick={handleClick}
            type="checkbox"
            checked={isChecked}
            readOnly
            className="w-5 h-5 shrink-0"
          />

          <p
            className={clsx(
              "text-lg font-medium transition-all duration-200",
              isChecked ? "text-blue line-through opacity-50" : "opacity-100",
            )}
          >
            {props.name}
          </p>
        </div>

        <div className="flex space-x-2">
          {props.isFixed && (
            <div
              className={clsx(
                "px-2 rounded-lg",
                isChecked ? "bg-white" : "bg-blue-50",
              )}
            >
              <span
                className="font-bold text-xs text-blue select-none"
                draggable={false}
              >
                {t("fixedItem")}
              </span>
            </div>
          )}
          <MoreVert onClick={handleLongPress} />
        </div>
      </div>
    </div>
  );
}
