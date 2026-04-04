import { CycleCard } from "@/components/Cycle/CycleCard";
import { DurationSelector } from "@/components/Cycle/DurationCycle";

export default function CyclePage() {

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <CycleCard />

      <section className="space-y-4 mt-8">
        <h3 className="text-sm font-bold uppercase text-gray-500">
          Cycle Duration
        </h3>
        <DurationSelector />
      </section>

      <section className="space-y-4 mt-8">
        <button className="w-full py-5 rounded-full bg-blue text-white font-bold">
          Start New Cycle
        </button>
        <button className="w-full py-4 rounded-full bg-amber text-white font-bold">
          Reset Current Cycle
        </button>
      </section>
    </main>
  );
}