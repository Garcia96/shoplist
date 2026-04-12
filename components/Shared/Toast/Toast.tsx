"use client";

import { useToastStore } from "@/hooks/toastStore";
import Close from "@mui/icons-material/Close";

export function Toast() {
  const toast = useToastStore((s) => s.toast);
  const hideToast = useToastStore((s) => s.hideToast);

  if (!toast.visible) return null;

  return (
    <div className="fixed top-18 right-2 left-2 bg-slate text-white pl-3 px-2 py-6 rounded shadow-xl/30">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">{toast.message}</span>
        <Close onClick={hideToast} className="ml-2" />
      </div>
    </div>
  );
}
