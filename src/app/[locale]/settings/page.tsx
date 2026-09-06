"use client";

import { useRouter } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const router = useRouter();
  const t = useTranslations("header");

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">{t("settings")}</h1>
      <div
        onClick={() => router.push("/settings/shops")}
        className="flex-col justify-between items-center shadow-lg bg-gray-100 my-card rounded-xl p-3 my-1 border-b border-gray-300"
      >
        <h2 className="text-xl">{t("shops")}</h2>
      </div>
    </main>
  );
}
