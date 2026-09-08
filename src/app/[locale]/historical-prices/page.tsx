import Historical from "@/src/components/HistoricalPrices/Historical";
import { useTranslations } from "next-intl";


export default function HistoricalPricesPage() {
  const t = useTranslations('historicalPage');
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-extrabold">{t("title")}</h2>
      <p className="mb-6">{t("paragraph")}</p>
      <Historical />
      <p className="text-sm text-center text-gray-500 mt-4 px-10">
        {t("disclaimer")}
      </p>
    </main>
  );
}