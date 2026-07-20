"use client";
import Delete from "@mui/icons-material/Delete";
import type { Item } from "@/src/types/types";
import {
  useAllItemsStore,
  useItemsFixedStore,
  useItemsStore,
} from "@/src/hooks/useItemsStore";
import { useDialogStore } from "@/src/hooks/dialogStore";
import { useTranslations } from "next-intl";

export default function ListFixedItem(props: Item) {
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const { showDialog } = useDialogStore();
  const t = useTranslations("common");

  function handleDelete() {
    showDialog({
      title: t("delete") + ` ${t("item")}`,
      type: "info",
      value: t("deleteConfirmation") + ` "${props.name}"?`,
      confirmText: t("delete"),
      onConfirm: async () => {
        await deleteItem();
      },
    });
  }

  const deleteItem = () => {
    setFixedItems((prev) => prev.filter((item) => item.name !== props.name));
    setItems((prev) => prev.filter((item) => item.name !== props.name));
    setAllItems((prev) => prev.filter((item) => item.name !== props.name));
  };

  return (
    <div className="p-4 rounded-xl shadow flex justify-between items-center cursor-pointer my-card animate-item-in">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium">{props.name}</span>
      </div>

      <div onClick={handleDelete} className="text-amber">
        <Delete />
      </div>
    </div>
  );
}
