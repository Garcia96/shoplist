"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function changeLanguage(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <div className={isPending ? "opacity-50 flex" : "flex"}>
      {currentLocale === "en" && (
        <button onClick={() => changeLanguage("es")}>ES</button>
      )}
      {currentLocale === "es" && (
        <button onClick={() => changeLanguage("en")}>EN</button>
      )}
    </div>
  );
}
