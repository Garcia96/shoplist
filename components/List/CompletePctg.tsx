"use client";

import { useAllItemsStore } from "@/hooks/useItemsStore";

export default function CompletePctg() {
  const items = useAllItemsStore((state) => state.value);
  let percentage = 0;

  const checkedItems = items.filter((item) => item.isChecked).length;
  percentage = (checkedItems / items.length) * 100;

  if (items.length === 0) {
    percentage = 0;
    return;
  }

  return (
    <div className="flex flex-col justify-between rounded-xl bg-surface-container-low p-4 my-4 text-center bg-gray-100 my-card">
      <div className="flex justify-between items-center w-full">
        <span className="font-semibold text-gray text-md">COMPLETION</span>
        {percentage == 0 && (
          <span className="font-bold text-lg ml-2 text-blue">0%</span>
        )}
        {percentage > 0 && (
          <span className="font-bold text-lg ml-2 text-blue">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            id="progress"
            className="bg-blue h-3 rounded-full w-0 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
