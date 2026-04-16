"use client";

import { Link } from "@/src/i18n/navigation";
import { useDialogStore } from "@/src/hooks/dialogStore";

export function Dialog() {
  const { dialog, hideDialog } = useDialogStore();

  if (!dialog.visible) return null;

  const handleConfirm = async () => {
    if (!dialog.onConfirm) return hideDialog();

    try {
      await dialog.onConfirm();
      hideDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className="w-full max-w-md mx-4 dialog rounded-2xl shadow-xl 
              animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-5">
          <h2 className="text-lg font-semibold">
            {dialog.title}
          </h2>

          <button
            onClick={hideDialog}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 leading-relaxed">
          {dialog?.content}
        </div>

        {dialog.onConfirm && (
          <div className="flex justify-end gap-3 p-5 border-gray-100">
            <button
              onClick={hideDialog}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-xl bg-blue text-white hover:bg-blue-700 transition shadow-sm"
            >
              {dialog?.confirmText || "Send"}
            </button>
          </div>
        )}

        {dialog.link ? (
          <div className="flex justify-end gap-3 p-5 border-gray-100">
            <button
              onClick={hideDialog}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <Link
              onClick={hideDialog}
              key={dialog.link}
              href="/cycle/start"
              className="px-4 py-2 rounded-xl bg-blue text-white hover:bg-blue-700 transition shadow-sm"
            >
              Go!
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
