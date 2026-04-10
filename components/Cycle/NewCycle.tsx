"use client";
import { useRouter } from "next/navigation";
import { useCycleDurationStore, useCycleStore } from "@/hooks/useCycleStore";
import { useToastStore } from "@/hooks/toastStore";
import {
  useAllItemsStore,
  useItemsFixedStore,
  useItemsStore,
} from "@/hooks/useItemsStore";
import { initialCycleDuration } from "@/types/types";

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
      showToast("Select a cycle duration please!", 4000);
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
    } else if (cycleDuration?.label === "Bi-weekly") {
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
    router.push("/");
  };

  return (
    <section>
      <div className="flex flex-col items-center mt-8">
        <button
          onClick={handleConfirm}
          className="w-3xs py-3 rounded-xl bg-blue text-white font-bold text-center"
        >
          Confirm & Start New Cycle
        </button>
        <button
          onClick={() => router.back()}
          className="w-3xs py-2 mt-2 rounded-xl text-black font-bold text-center"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
