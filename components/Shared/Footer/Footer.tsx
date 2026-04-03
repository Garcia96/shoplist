import { Settings } from "@mui/icons-material";
import { ShoppingBasket } from "@mui/icons-material";
import { HistoryToggleOff } from "@mui/icons-material";
import Link from "next/link";

export function Footer() {
  return (
    <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t">
      <div className="flex justify-around items-center h-20">
        <Link href="/" className="flex flex-col items-center text-zinc-500">
          <span className="material-symbols-outlined">
            <ShoppingBasket />
          </span>
          <span className="text-[10px] font-bold">List</span>
        </Link>
        <Link href="/recurring" className="flex flex-col items-center text-zinc-500">
          <span className="material-symbols-outlined">
            <HistoryToggleOff />
          </span>
          <span className="text-[10px] font-bold">Recurring</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined">
            <Settings />
          </span>
          <span className="text-[10px] font-bold">Settings</span>
        </Link>
      </div>
    </nav>
  );
}