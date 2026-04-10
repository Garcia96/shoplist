export type Item = {
  name: string;
  isFixed: boolean;
  isChecked?: boolean;
};

export type CycleDuration = {
  label: string;
  desc: string;
  amount: number;
};

export type Cycle = {
  duration: CycleDuration;
  startDate: Date; // JavaScript Date object
  endDate: Date; // JavaScript Date object
  checked: boolean;
};

export type Settings = {
  firstTime: boolean;
  theme: string;
}

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export type Store<T> = {
  value: T;
  setValue: SetValue<T>;
};

export const initialCycleDuration: CycleDuration = {
  desc: "",
  amount: 1,
  label: "",
};
