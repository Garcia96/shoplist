import { ReactNode } from "react";

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
  theme: string | undefined;
}

type Toast = {
  message: string;
  visible: boolean;
};

export type ToastStore = {
  toast: Toast;
  timeoutId: NodeJS.Timeout | null;

  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
};

type Dialog = {
  content?: ReactNode;
  link?: string;
  title?: string;
  visible: boolean;
  confirmText?: string;
  onConfirm?: () => void | Promise<void>;
}

export type DialogStore = {
  dialog: Dialog;

  showDialog: (dialog: Partial<Dialog>)=> void;
  hideDialog: () => void;
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

export const initialSettings: Settings = {
  firstTime: true,
  theme: "light",
};

export const initialDialog: Dialog = {
  visible: false,
  title: "",
}