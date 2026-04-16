import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function ActionButtons() {
  const t = useTranslations("cyclePage");
  return (
    <section className="flex flex-col items-center mt-8">
      <Link
        key={"start"}
        href="/cycle/start"
        className="w-3xs py-3 rounded-xl bg-blue text-white font-bold text-center"
      >
        <span>{t("button")}</span>
      </Link>
    </section>
  );
}
