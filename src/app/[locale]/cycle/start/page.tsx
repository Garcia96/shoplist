import CycleStats from "@/src/components/Cycle/CycleStats";

import { DurationSelector } from "@/src/components/Cycle/DurationCycle";
import { NewCycle } from "@/src/components/Cycle/NewCycle";

export default function CycleStartPage() {
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <section>
        <span className="text-blue text-xs font-semibold">
          NEW CYCLE CONFIRMATION
        </span>
        <h1 className="text-4xl font-bold mb-4">Ready for your fresh start?</h1>
      </section>

      <CycleStats title="PREVIOUS CYCLE STATS" />
      <DurationSelector />
      <NewCycle />
    </main>
  );
}
