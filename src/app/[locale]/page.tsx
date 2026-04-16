import CompletePctg from "@/src/components/List/CompletePctg";
import { useTranslations } from "next-intl";

import List from "@/src/components/List/List";

export default function ListPage() {
  const t = useTranslations('mainPage');

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-extrabold mb-6">{t('title')}</h2>
      <CompletePctg />
      <List isFixed={false} />
    </main>
  );
}
