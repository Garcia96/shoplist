import WaterDrop from "@mui/icons-material/WaterDrop";
import Help from "@mui/icons-material/Help";

export default function Header({ title }: { title: string }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            <WaterDrop />
          </span>
          <h1 className="font-bold tracking-tight">{title}</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-primary/5">
          <span className="material-symbols-outlined text-zinc-500">
            <Help />
          </span>
        </button>
      </div>
    </header>
  );
}