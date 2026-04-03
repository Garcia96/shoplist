export function DurationSelector() {
  const options = [
    { label: "Weekly", desc: "7-day restock", active: true },
    { label: "Bi-weekly", desc: "14-day cycle" },
    { label: "Monthly", desc: "30-day plan" },
    { label: "Custom", desc: "Choose days" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.label}
          className={`p-5 rounded-xl text-left transition ${
            opt.active
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