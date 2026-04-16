"use client";
import { useRouter } from "next/navigation";
import { useCycleDurationStore, useCycleStore } from "@/src/hooks/useCycleStore";
import { useToastStore } from "@/src/hooks/toastStore";
import {
  useAllItemsStore,
  useItemsFixedStore,
  useItemsStore,
} from "@/src/hooks/useItemsStore";
import Info from "@mui/icons-material/Info";
import { initialCycleDuration } from "@/src/types/types";
import { useSettingsStore } from "@/src/hooks/settingsStore";
import { useTranslations } from "next-intl";

export function NewCycle() {
  const router = useRouter();
  const setItems = useItemsStore((state) => state.setValue);
  const setAllItems = useAllItemsStore((state) => state.setValue);
  const itemsFixed = useItemsFixedStore((state) => state.value);
  const setItemsFixed = useItemsFixedStore((state) => state.setValue);
  const cycleDuration = useCycleDurationStore((state) => state.value);
  const setCycleDuration = useCycleDurationStore((state) => state.setValue);
  const cycle = useCycleStore((state) => state.value);
  const setCycle = useCycleStore((state) => state.setValue);
  const showToast = useToastStore((s) => s.showToast);
  const settings = useSettingsStore((state) => state.value);
  const setSettings = useSettingsStore((state) => state.setValue);
  const t = useTranslations();

  const clearFixedItems = () => {
    setItemsFixed((prev) =>
      prev.map((item) => ({ ...item, isChecked: false })),
    );
  };

  const resetAllItems = () => {
    clearFixedItems();
    setItems(itemsFixed);
    setAllItems(itemsFixed);
  };

  const handleConfirm = () => {
    if (!cycleDuration.amount) {
      showToast("selectCycle", 4000);
      return;
    }

    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endDate = new Date(startDate);

    if (cycleDuration?.label === "Weekly") {
      endDate.setDate(startDate.getDate() + 6);
    } else if (cycleDuration?.label === "Biweekly") {
      endDate.setDate(startDate.getDate() + 14);
    } else if (cycleDuration?.label === "Monthly") {
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);
    } else if (cycleDuration.label === "Custom") {
      endDate.setDate(startDate.getDate() + cycleDuration.amount);
    }

    resetAllItems();
    setCycle({
      ...cycle,
      duration: cycleDuration,
      startDate: startDate,
      endDate: endDate,
    });
    setCycleDuration(initialCycleDuration);

    if (settings.firstTime) {
      setSettings({
        ...settings,
        firstTime: false
      })
    }
    router.push("/");
  };

  return (
    <>
      {!settings.firstTime && (
        <section className="relative mt-4 rounded-2xl bg-surface-container-low p-8 text-center bg-blue-50 border-l-5 border-blue-500 my-card">
          <div className="flex flex-row gap-3">
            <Info className="text-blue" />
            <p className="text-left font-light">
              {t("newCyclePage.warning")}
            </p>
          </div>
        </section>
      )}
      <section>
        <div className="flex flex-col items-center mt-8">
          <button
            onClick={handleConfirm}
            className="w-3xs py-3 rounded-xl bg-blue text-white font-bold text-center"
          >
            {t("newCyclePage.buttomConfirm")}
          </button>
          <button
            onClick={() => router.back()}
            className="w-3xs py-2 mt-2 rounded-xl font-bold text-center cancel"
          >
            {t("newCyclePage.buttomCancel")}
          </button>
        </div>
      </section>
    </>
  );
}
