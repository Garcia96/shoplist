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
import Edit from "@mui/icons-material/Edit";
import PushPin from "@mui/icons-material/PushPin";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useToastStore } from "@/src/hooks/toastStore";
import { useHistoricalPriceStore } from "@/src/hooks/historicalPriceStore";

export default function ListItem(props: Item) {
  const itemRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const t = useTranslations("");

  const [isChecked, setIsChecked] = useState(props.isChecked || false);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const allItems = useAllItemsStore((state) => state.value);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const setHistoricalPrices = useHistoricalPriceStore(
    (state) => state.setValue,
  );

  const { isOpen, selectedId, showContextMenu } = useContextMenuStore();
  const showDialog = useDialogStore((state) => state.showDialog);
  const showToast = useToastStore((state) => state.showToast);

  const isSelected = isOpen && selectedId === props.id;

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

    showContextMenu(props.id, itemRef.current, [
      {
        label: t("common.edit"),
        icon: <Edit />,
        hidden: false,
        onClick: () => handleEdit(),
      },
      {
        label: props.isFixed ? t("common.unpin") : t("common.pin"),
        icon: <PushPin />,
        hidden: false,
        onClick: () => handlePin(),
      },
    ]);
  }

  if (pathname === "/recurring") {
    return <ListFixedItem {...props} />;
  }

  const handleEdit = () => {
    showDialog({
      title: t("common.edit") + " Item",
      confirmText: t("common.confirm"),
      type: "edit",
      value: props?.name || "",
      onConfirm: async (value) => {
        await renameItem(props!, value ?? "");
      },
    });
  };

  const renameItem = (selectedItem: Item, newName: string) => {
    if (
      allItems.some((item) => item.name.toLowerCase() === newName.toLowerCase())
    ) {
      showToast("itemAlready", 3000);
      return;
    }

    setAllItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, name: newName } : item,
      ),
    );

    setFixedItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, name: newName } : item,
      ),
    );

    setHistoricalPrices((prices) =>
      prices.map((price) =>
        price.item.id === selectedItem.id
          ? { ...price, name: newName, item: { ...price.item, name: newName } }
          : price,
      ),
    );

    showToast("itemRenamed", 3000);
  };

  const handlePin = () => {
    if (props?.isFixed) {
      setFixedItems((prev) => prev.filter((item) => item.id !== props?.id));
    } else {
      const newItem: Item = { ...props, isFixed: true } as Item;
      setFixedItems((prev) => [...prev, newItem]);
    }

    saveEditedItem();
  };

  const saveEditedItem = () => {
    setAllItems((prev) =>
      prev.map((item) =>
        item.id === props?.id ? { ...item, isFixed: !props?.isFixed } : item,
      ),
    );
  };

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
