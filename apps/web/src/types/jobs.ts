import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";

export type JobFormPropsI = {
  job?: AdminJobI;
  mode: "add" | "edit";
  onCancel: () => void;
};

export type JobSelectPropsI = {
  error?: string;
  label: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string | undefined;
};