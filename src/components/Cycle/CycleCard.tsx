"use client";

import { useCycleStore } from "@/src/hooks/useCycleStore";
import { useTranslations } from "next-intl";

export function CycleCard() {
  const cycle = useCycleStore((state) => state.value);
  const t = useTranslations();

  const today = new Date();

  const diffTime = new Date(cycle.endDate).getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

  return (
    <section className="relative rounded-xl bg-surface-container-low p-8 text-center bg-gray-100 my-card">
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-8 border-blue border-t-transparent border-r-transparent -rotate-45"></div>
          <div>
            <p className="text-3xl font-extrabold">{daysLeft || 0}</p>
            <p className="text-xs uppercase">
              {t("cyclePage.days", { count: daysLeft })}
            </p>
          </div>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-bold">
        {cycle?.duration?.label
          ? t("cyclePage.cycleCardTitle", {
              cycle: t(`cycles.${cycle.duration.label.toLocaleLowerCase()}`),
            })
          : "No Active Cycle"}
      </h2>
      <p className="text-sm text-gray-500">
        {cycle?.endDate
          ? t("cyclePage.ends", { date: new Date(cycle.endDate) })
          : ""}
      </p>
    </section>
  );
}
