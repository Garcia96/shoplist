import ActionButtons from "@/components/Cycle/ActionButtons";
import { CycleCard } from "@/components/Cycle/CycleCard";
import CycleStats from "@/components/Cycle/CycleStats";


export default function CyclePage() {

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <CycleCard />
      <CycleStats title="CYCLE STATS" />
      <ActionButtons  />
    </main>
  );
}