"use client";

import { useRef, useEffect } from "react";
import Edit from "@mui/icons-material/Edit";
import PushPin from "@mui/icons-material/PushPin";
import type { Item } from "@/src/types/types";
import {
  useAllItemsStore,
  useItemsFixedStore,
  useItemsStore,
} from "@/src/hooks/useItemsStore";
import { useContextMenuStore } from "@/src/hooks/contextMenu";
import { useTranslations } from "next-intl";
import { useDialogStore } from "@/src/hooks/dialogStore";

export function ContextMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isOpen, hideContextMenu, selectedItem, coords } =
    useContextMenuStore();
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const { showDialog } = useDialogStore();
  const tc = useTranslations("common");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        hideContextMenu();
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [hideContextMenu]);

  const handleEdit = () => {
    showDialog({
      title: tc("edit") + " Item",
      confirmText: tc("confirm"),
      type: "edit",
      value: selectedItem?.name || "",
      onConfirm: async (value) => {
        await renameItem(selectedItem!.name, value ?? "");
      },
    });
  };

  const renameItem = (oldName: string, newName: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === oldName ? { ...item, name: newName } : item,
      ),
    );

    setAllItems((prev) =>
      prev.map((item) =>
        item.name === oldName ? { ...item, name: newName } : item,
      ),
    );

    setFixedItems((prev) =>
      prev.map((item) =>
        item.name === oldName ? { ...item, name: newName } : item,
      ),
    );
  };

  const handlePin = () => {
    if (selectedItem?.isFixed) {
      setFixedItems((prev) =>
        prev.filter((item) => item.name !== selectedItem?.name),
      );
    } else {
      const newItem: Item = { ...selectedItem, isFixed: true } as Item;
      setFixedItems((prev) => [...prev, newItem]);
    }

    saveEditedItem();
  };

  const saveEditedItem = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === selectedItem?.name
          ? { ...item, isFixed: !selectedItem?.isFixed }
          : item,
      ),
    );

    setAllItems((prev) =>
      prev.map((item) =>
        item.name === selectedItem?.name
          ? { ...item, isFixed: !selectedItem?.isFixed }
          : item,
      ),
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/5"
          onClick={hideContextMenu}
        >
          <div
            ref={menuRef}
            className="animate-item-in transition-all duration-200 fixed top-full mt-1 rounded-xl my-card shadow-xl py-1 z-60 backdrop-blur-xs"
            style={{
              top: "calc(60px + " + coords?.y + "px)",
              right: "calc(100vw - " + coords?.x + "px)",
            }}
          >
            <button
              onClick={handleEdit}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
            >
              <Edit className="size-5 text-blue" />
              <span className="ml-2">{tc("edit")}</span>
            </button>

            <button
              onClick={handlePin}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
            >
              <PushPin className="size-5 text-amber" />
              <span className="ml-2">
                {selectedItem?.isFixed ? tc("unpin") : tc("pin")}{" "}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
