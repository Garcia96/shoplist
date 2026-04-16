"use client";
import { usePathname } from "@/src/i18n/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import WaterDrop from "@mui/icons-material/WaterDrop";
import HistoryToggleOff from "@mui/icons-material/HistoryToggleOff";
import Autorenew from "@mui/icons-material/Autorenew";
import Sunny from "@mui/icons-material/Sunny";
import ModeNight from "@mui/icons-material/ModeNight";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useSettingsStore } from "@/src/hooks/settingsStore";
import { initialSettings } from "@/src/types/types";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

const routes = [
  { name: "list", href: "/", icon: <WaterDrop />, link: "" },
  {
    name: "recurring",
    href: "/recurring",
    icon: <HistoryToggleOff />,
    link: "",
  },
  {
    name: "cycle",
    href: "/cycle",
    icon: <Autorenew />,
    link: "",
  },
  {
    name: "newCycle",
    href: "/cycle/start",
    icon: <ArrowBack />,
    link: "/cycle",
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const { theme, setTheme } = useTheme();
  const settings = useSettingsStore((state) => state.value);
  const setSettings = useSettingsStore((state) => state.setValue);

  if (!settings) {
    setSettings(initialSettings);
  }

  const items = routes.map((item) => ({ ...item, name: t(item.name) }));
  const route = items.find((route) => route.href === pathname);
  const handleClick = route?.link ? () => router.push(route.link) : undefined;

  const handleSwitchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setSettings({
      ...settings,
      theme: newTheme,
    });
    setTheme(newTheme);
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-sm bg-shared">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <span
            onClick={handleClick}
            className="material-symbols-outlined text-blue"
          >
            {route?.icon || <WaterDrop />}
          </span>

          <h1 className="font-bold tracking-tight">
            {route?.name || "Shopping List"}
          </h1>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSwitchTheme}
            className="p-2 rounded-full hover:bg-blue/5"
          >
            <span className="material-symbols-outlined bg-shared">
              {settings?.theme === "light" ? <ModeNight /> : <Sunny />}
            </span>
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
