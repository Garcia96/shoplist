export type Item = {
  id: number;
  name: string;
  isFixed: boolean;
  isChecked?: boolean;
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

export type Dialog = {
  visible: boolean;
  type: string;
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
  selectedId:string | number | null;
  selectedElement: HTMLElement | null;
  options: ContextMenuOption[];
  showContextMenu: (selectedId: string | number | null, selectedElement: HTMLElement | null, options: ContextMenuOption[]) => void;
  hideContextMenu: () => void;
};

export type ContextMenuOption = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  hidden?: boolean;
};

export type ContextMenuProps = {
  options: ContextMenuOption[];
};

export type Shops = {
  id: string;
  name: string;
};

export type Units = "Lbs" | "Unit";

export type Price = {
  id: string;
  value: number;
  date: Date;
  store?: string;
  unit: string;
}

export type HistoricalPrice = {
  name: string;
  item: Item;
  prices: Price[];
}

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export type Store<T> = {
  value: T;
  setValue: SetValue<T>;
};

export const initialSettings: Settings = {
  firstTime: true,
  theme: "light",
};

export const initialDialog: Dialog = {
  visible: false,
  title: "",
  type: "",
};
