import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

export const getNameInitial = (name: string | null | undefined, fallback = "G") => {
  const initial = name?.trim().match(/[a-z0-9]/i)?.[0];

  return initial?.toUpperCase() ?? fallback;
};
