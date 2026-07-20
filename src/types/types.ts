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
};

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

export type DialogType = "info" | "edit" | "delete" | null;

export type Dialog = {
  visible: boolean;
  type: DialogType;
  title?: string;
  confirmText?: string;
  value?: string;
  item?: Item;
  link?: string;
  onConfirm?: (value?: string) => void | Promise<void>;
};

export type DialogStore = {
  dialog: Dialog;

  showDialog: (dialog: Partial<Dialog>) => void;
  hideDialog: () => void;
  setDialogValue: (value: string) => void;
};

export type ContextMenuStore = {
  isOpen: boolean;
  selectedItem: Item | null;
  coords: { x: number; y: number } | null;
  showContextMenu: (item: Item, coords: { x: number; y: number }) => void;
  hideContextMenu: () => void;
};

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
  type: null,
};
