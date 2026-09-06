import ShopsList from "@/src/components/Settings/Shops";
import { useTranslations } from "next-intl";

export default function ShopsPage() {
  const t = useTranslations("header");

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">{t("shops")}</h1>
        <ShopsList />
    </main>
  );
}
