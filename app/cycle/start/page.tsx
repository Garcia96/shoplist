import CycleStats from "@/components/Cycle/CycleStats";
import Info from "@mui/icons-material/Info";

import { DurationSelector } from "@/components/Cycle/DurationCycle";
import { NewCycle } from "@/components/Cycle/NewCycle";

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

      <section className="relative mt-4 rounded-2xl bg-surface-container-low p-8 text-center bg-blue-50 border-l-5 border-blue-500">
        <div className="flex flex-row gap-3">
          <Info className="text-blue" />
          <p className="text-left font-light">
            Starting a new cycle will reset your current progress and
            automatically refresh your recurring pantry essentials for the
            upcoming cycle.
          </p>
        </div>
      </section>

      <NewCycle />
    </main>
  );
}
