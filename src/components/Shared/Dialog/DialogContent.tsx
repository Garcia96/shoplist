"use client";

import { useDialogStore } from "@/src/hooks/dialogStore";
import { useTranslations } from "next-intl";

export function DialogContent() {
  const tc = useTranslations("common");
  const { dialog, setDialogValue } = useDialogStore();

  if (dialog.type == "edit") {
    return (
      <div className="flex flex-col space-y-2">
        <input
          value={dialog.value ?? ""}
          onChange={(e) => setDialogValue(e.target.value)}
          className="w-full p-4 pr-14 rounded-xl text-lg font-light shadow-sm border border-gray-300"
          id="edit_item"
          autoComplete="off"
          type="text"
          placeholder={tc("edit") + " Item"}
        />
      </div>
    );
  }

  if (dialog.type == "info") {
    return (
      <div className="flex flex-col space-y-2">
        <p>{dialog.value}</p>
      </div>
    );
  }

  return null;
}
