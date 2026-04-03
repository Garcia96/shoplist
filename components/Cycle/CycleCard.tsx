export function CycleCard() {
  return (
    <section className="relative rounded-xl bg-surface-container-low p-8 text-center bg-gray-100">
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-8 border-blue border-t-transparent border-r-transparent -rotate-45"></div>
          <div>
            <p className="text-3xl font-extrabold">4</p>
            <p className="text-xs uppercase">Days Left</p>
          </div>
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-extrabold">Weekly Cycle Active</h2>
      <p className="text-sm text-gray-500">Ends Friday</p>
    </section>
  );
}