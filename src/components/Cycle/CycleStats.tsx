"use client";

import { useAllItemsStore } from "@/src/hooks/useItemsStore";
import { useSettingsStore } from "@/src/hooks/settingsStore";
import { useTranslations } from "next-intl";

export default function CycleStats({ title }: { title: string }) {
  const settings = useSettingsStore((state) => state.value);
  const items = useAllItemsStore((state) => state.value);
  const t = useTranslations('stats');
  let percentage = 0;

  const checkedItems = items.filter((item) => item.isChecked).length;
  percentage = (checkedItems / items.length) * 100;
  return (
    <>
      {!settings.firstTime && (
        <section className="relative rounded-xl bg-surface-container-low p-4 text-center bg-gray-100 mt-8 my-card">
          <div className="flex flex-col items-start space-y-4">
            <h3 className="font-semibold text-gray text-sm">{t(title).toUpperCase()}</h3>

            <div className="grid grid-cols-2 w-full gap-4">
              <div className="flex flex-col">
                <span className="font-bold text-3xl text-blue">
                  {Math.round(percentage || 0)}%
                </span>
                <span className="text-gray text-sm">{t("completed")}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl text-blue">
                  {checkedItems}
                </span>
                <span className="text-gray text-sm">{t("items")}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
