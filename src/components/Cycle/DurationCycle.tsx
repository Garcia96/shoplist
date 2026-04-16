"use client";

import "react-day-picker/style.css";
import { useCycleDurationStore } from "@/src/hooks/useCycleStore";
import { CycleDuration } from "@/src/types/types";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function DurationSelector() {
  const cycleDuration = useCycleDurationStore((state) => state.value);
  const setCycleDuration = useCycleDurationStore((state) => state.setValue);
  const t = useTranslations();

  const [days, setDays] = useState(1);

  const options: CycleDuration[] = [
    { label: "Weekly", desc: "7-day cycle", amount: 7 },
    { label: "Biweekly", desc: "14-day cycle", amount: 14 },
    { label: "Monthly", desc: "30-day cycle", amount: 30 },
    { label: "Custom", desc: "Choose amount", amount: days },
  ];

  function handleSelect(label: CycleDuration["label"]) {
    const selected = options.find((opt) => opt.label === label);
    if (!selected) return;

    if (selected.label !== "Custom") {
      setDays(1);
    }
    setCycleDuration(selected);
  }

  const increment = () => {
    setDays((prev) => Math.min(prev + 1, 30));
    handleSelect("Custom");
  };
  const decrement = () => {
    setDays((prev) => Math.max(prev - 1, 1));
    handleSelect("Custom");
  };

  return (
    <section className="space-y-4 mt-6 p-4">
      <h3 className="text-sm font-bold uppercase text-gray-500">
        {t("newCyclePage.duration")}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleSelect(opt.label)}
            className={`p-5 rounded-xl text-left transition ${
              opt.label === cycleDuration?.label
                ? "bg-blue text-white "
                : "bg-white hover:bg-gray-100 my-card"
            }`}
          >
            <span className="block font-bold">{t(`cycles.${opt.label.toLowerCase()}`)}</span>
            <span className="text-xs opacity-70">{opt.desc}</span>
          </button>
        ))}
      </div>

      {cycleDuration?.label === "Custom" && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm text-gray-500">
            {t("newCyclePage.customCycleTitle")}
          </p>
          <div className="flex items-center justify-around bg-gray-100 rounded-xl p-4 w-full max-w-sm my-card">
            <button
              onClick={decrement}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-xl font-bold dark:text-black"
            >
              -
            </button>

            <div className="text-center">
              <p className="text-2xl font-bold">{days}</p>
              <p className="text-xs text-gray-500 uppercase">Days</p>
            </div>

            <button
              onClick={increment}
              className="w-10 h-10 rounded-full bg-blue text-white shadow flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
