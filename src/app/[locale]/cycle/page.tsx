import ActionButtons from "@/src/components/Cycle/ActionButtons";
import { CycleCard } from "@/src/components/Cycle/CycleCard";
import CycleStats from "@/src/components/Cycle/CycleStats";


export default function CyclePage() {

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <CycleCard />
      <CycleStats title="CYCLE STATS" />
      <ActionButtons  />
    </main>
  );
}