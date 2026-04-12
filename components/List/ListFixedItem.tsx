'use client';
import Delete from "@mui/icons-material/Delete";
import type { Item } from "@/types/types";
import { useAllItemsStore, useItemsFixedStore, useItemsStore } from "@/hooks/useItemsStore";

export default function ListFixedItem(props: Item) {
  const setFixedItems = useItemsFixedStore((state) => state.setValue);
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);

  function handleDelete() {
    setFixedItems((prev) => prev.filter((item) => item.name !== props.name));
    setItems((prev) => prev.filter((item) => item.name !== props.name));
    setAllItems((prev) => prev.filter((item) => item.name !== props.name));
  }

  return (
    <div className="p-4 rounded-xl shadow flex justify-between items-center cursor-pointer bg-white my-card">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium">{props.name}</span>
      </div>

      <div onClick={handleDelete} className="text-amber">
        <Delete />
      </div>
    </div>
  );
}
