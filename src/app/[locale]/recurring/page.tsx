import List from "@/src/components/List/List";
import { useTranslations } from "next-intl";

export default function RecurringPage() {
  const t = useTranslations('recurringPage');
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-extrabold">{t("title")}</h2>
      <p className="mb-6">{t("paragraph")}</p>
      <List isFixed={true} />
    </main>
  );
}