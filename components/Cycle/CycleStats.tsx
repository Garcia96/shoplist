'use client';

import { useAllItemsStore } from "@/hooks/useItemsStore";

export default function CycleStats({title}: {title: string}) {
  const items = useAllItemsStore((state) => state.value);
  let percentage = 0;

  const checkedItems = items.filter((item) => item.isChecked).length;
  percentage = (checkedItems / items.length) * 100;
  return (
    <section className="relative rounded-xl bg-surface-container-low p-4 text-center bg-gray-100">
      <div className="flex flex-col items-start space-y-4">
        <h3 className="font-semibold text-gray text-sm">
          {title}
        </h3>

        <div className="grid grid-cols-2 w-full gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-3xl text-blue">{Math.round(percentage || 0)}%</span>
            <span className="text-gray text-sm">Completed</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-3xl text-blue">{checkedItems}</span>
            <span className="text-gray text-sm">Items Bought</span>
          </div>
        </div>
      </div>
    </section>
  );
}
