'use client';
import { useCycleStore } from "@/hooks/useCycleStore";
import { CycleDuration } from "@/types/types";

export function DurationSelector() {
  const cycle = useCycleStore((state) => state.value);
  const setCycle = useCycleStore((state) => state.setValue);


  const options: CycleDuration[] = [
    { label: "Weekly", desc: "7-day restock"},
    { label: "Bi-weekly", desc: "14-day cycle" },
    { label: "Monthly", desc: "30-day plan" },
    { label: "Custom", desc: "Choose days" },
  ];

  function handleSelect(label: CycleDuration["label"]) {
    const selected = options.find((opt) => opt.label === label);
    if (!selected) return;

    setCycle({
      ...cycle,
      duration: selected,
    });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => handleSelect(opt.label)}
          className={`p-5 rounded-xl text-left transition ${
            opt.label === cycle.duration?.label
              ? "bg-blue text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <span className="block font-bold">{opt.label}</span>
          <span className="text-xs opacity-70">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}