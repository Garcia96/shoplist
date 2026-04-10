"use client";

import { useCycleStore } from "@/hooks/useCycleStore";

export function CycleCard() {
  const cycle = useCycleStore((state) => state.value);

  const today = new Date();
  const diffTime = cycle.endDate?.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  const endMonth = cycle.endDate.toLocaleDateString("en-US", {
    month: "long"
  })

  return (
    <section className="relative rounded-xl bg-surface-container-low p-8 text-center bg-gray-100">
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-8 border-blue border-t-transparent border-r-transparent -rotate-45"></div>
          <div>
            <p className="text-3xl font-extrabold">{daysLeft || 0}</p>
            <p className="text-xs uppercase">Days Left</p>
          </div>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-bold">
        {cycle?.duration?.label
          ? `${cycle.duration.label} Cycle Active`
          : "No Active Cycle"}
      </h2>
      <p className="text-sm text-gray-500">{endMonth ? 'Ends on ' + endMonth + ' ' +  cycle.endDate.getDate(): ''}</p>
    </section>
  );
}
