import { useDialogStore } from "@/src/hooks/dialogStore";
import { useTranslations } from "next-intl";

export default function AddHistorical() {
  const { showDialog } = useDialogStore();
  const t = useTranslations("");

  const handleAddHistorical = () => {
    showDialog({
      title: t("historicalPage.dialogAddTitle"),
      type: "addNewHistorical",
      confirmText: t("common.save"),
    });
  };

  return (
    <>
      <button
        onClick={() => handleAddHistorical()}
        className="fixed right-3 bottom-20 mb-4 w-12 h-12 rounded-full bg-blue text-white text-3xl shadow-md hover:bg-blue-600 active:scale-95 transition z-40"
      >
        +
      </button>
    </>
  );
}
