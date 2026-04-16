"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function changeLanguage(locale: string) {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);

    router.push(newPathname);
  }

  return (
    <div className="flex">
      {currentLocale === "en" && (
        <button onClick={() => changeLanguage("es")}>ES</button>
      )}
      {currentLocale === "es" && (
        <button onClick={() => changeLanguage("en")}>EN</button>
      )}
    </div>
  );
}
