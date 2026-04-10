"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import WaterDrop from "@mui/icons-material/WaterDrop";
import HistoryToggleOff from "@mui/icons-material/HistoryToggleOff";
import Autorenew from "@mui/icons-material/Autorenew";
import Settings from "@mui/icons-material/Settings";
import ArrowBack from "@mui/icons-material/ArrowBack";

const routes = [
  { name: "Shopping List", href: "/", icon: <WaterDrop />, link: false },
  {
    name: "Recurring Items",
    href: "/recurring",
    icon: <HistoryToggleOff />,
    link: false,
  },
  {
    name: "Your Cycle Period",
    href: "/cycle",
    icon: <Autorenew />,
    link: false,
  },
  {
    name: "Confirm New Cycle",
    href: "/cycle/start",
    icon: <ArrowBack />,
    link: true,
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const route = routes.find((route) => route.href === pathname);
  const handleClick = route?.link ? () => router.back() : undefined;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
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
        <button className="p-2 rounded-full hover:bg-blue/5">
          <span className="material-symbols-outlined text-zinc-500">
            <Settings />
          </span>
        </button>
      </div>
    </header>
  );
}
