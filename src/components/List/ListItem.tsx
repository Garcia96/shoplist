"use client";

import { useState, useRef } from "react";
import { usePathname } from "@/src/i18n/navigation";
import clsx from "clsx";
import {
  useAllItemsStore,
  useItemsFixedStore,
} from "@/src/hooks/useItemsStore";
import type { Item } from "@/src/types/types";
import { useContextMenuStore } from "@/src/hooks/contextMenu";
import ListFixedItem from "./ListFixedItem";
import { useTranslations } from "next-intl";
import MoreVert from "@mui/icons-material/MoreVert";
import { useDialogStore } from "@/src/hooks/dialogStore";

export default function ListItem(props: Item) {
  const itemRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const t = useTranslations("");

  const [isChecked, setIsChecked] = useState(props.isChecked || false);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);

  const { isOpen, selectedItem, showContextMenu } = useContextMenuStore();
  const showDialog = useDialogStore((state) => state.showDialog);

  const isSelected = isOpen && selectedItem?.name === props.name;

  function handleClick() {
    setIsChecked((prev) => !prev);

    const updatedItem: Item = {
      ...props,
      isChecked: !isChecked,
    };

    setAllItems((prev) =>
      prev.map((item) => (item.id === props.id ? updatedItem : item)),
    );

    setFixedItems((prev) =>
      prev.map((item) => (item.id === props.id ? updatedItem : item)),
    );

    if (!isChecked) {
      showDialog({
        type: "addHistorical",
        title: t("historicalPage.dialogTitle"),
        item: props,
        confirmText: t("common.save"),
      });
    }
  }

  function handleContextMenuClick() {
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
                {t("mainPage.fixedItem")}
              </span>
            </div>
          )}
          <MoreVert onClick={handleContextMenuClick} />
        </div>
      </div>
    </div>
  );
}
