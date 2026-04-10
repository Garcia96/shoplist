"use client";

import { usePathname } from "next/navigation";
import Autorenew from "@mui/icons-material/Autorenew";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import HistoryToggleOff from "@mui/icons-material/HistoryToggleOff";
import Link from "next/link";
import clsx from "clsx";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/", label: "List", icon: ShoppingBasket },
  { href: "/recurring", label: "Recurring", icon: HistoryToggleOff },
  { href: "/cycle", label: "Cycle", icon: Autorenew },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl ">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-200 active:scale-90",
                isActive
                  ? "bg-blue/10 text-blue"
                  : "text-zinc-500 hover:text-blue",
              )}
            >
              <span className="material-symbols-outlined">
                <item.icon
                  className={clsx(
                    "w-5 h-5 mb-1 transition-all",
                    isActive ? "stroke-[2.5]" : "stroke-[1.5]",
                  )}
                />
              </span>
              <span className="text-[10px] font-bold tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
