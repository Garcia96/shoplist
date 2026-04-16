import CycleStats from "@/src/components/Cycle/CycleStats";

import { DurationSelector } from "@/src/components/Cycle/DurationCycle";
import { NewCycle } from "@/src/components/Cycle/NewCycle";
import { useTranslations } from "next-intl";

export default function CycleStartPage() {
  const t = useTranslations('newCyclePage');
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <section>
        <span className="text-blue text-xs font-semibold">
          {t("subTitle")}
        </span>
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      </section>

      <CycleStats title="titleConfirmPage" />
      <DurationSelector />
      <NewCycle />
    </main>
  );
}
