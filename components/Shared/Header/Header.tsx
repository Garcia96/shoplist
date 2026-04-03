'use client';
import { usePathname } from "next/navigation";
import WaterDrop from "@mui/icons-material/WaterDrop";
import Waves from "@mui/icons-material/Waves";
import Autorenew from "@mui/icons-material/Autorenew";
import Settings from "@mui/icons-material/Settings";

const routes = [
  { name: "Shopping List", href: "/", icon: <WaterDrop /> },
  { name: "Recurring Items", href: "/recurring", icon: <Waves /> },
  { name: "Your Cycle Period", href: "/cycle", icon: <Autorenew /> },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue">
            {routes.find((route) => route.href === pathname)?.icon || <WaterDrop />}
          </span>
          <h1 className="font-bold tracking-tight">
            {routes.find((route) => route.href === pathname)?.name || "Shopping List"}
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