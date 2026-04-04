export type Item = {
  name: string;
  isFixed: boolean;
  isChecked?: boolean;
};

type CycleDurationLabel = "Weekly" | "Bi-weekly" | "Monthly" | "Custom";

export type CycleDuration = {
  label: CycleDurationLabel;
  desc: string;
}

export type Cycle = {
  duration: CycleDuration;
  startDate: Date; // JavaScript Date object
  endDate: Date; // JavaScript Date object
  checked: boolean;
};

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export type Store<T> = {
  value: T;
  setValue: SetValue<T>;
};