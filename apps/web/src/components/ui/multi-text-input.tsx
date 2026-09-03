import { X } from "lucide-react";
import type * as React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type MultiTextInputPropsI = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: string[];
  onValueChange: (value: string[]) => void;
};

function MultiTextInput({
  className,
  value,
  onValueChange,
  placeholder,
  onBlur,
  onKeyDown,
  ...props
}: MultiTextInputPropsI) {
  const [inputValue, setInputValue] = useState("");

  const addValue = () => {
    const nextValue = inputValue.trim();

    if (!nextValue || value.includes(nextValue)) {
      setInputValue("");
      return;
    }

    onValueChange([...value, nextValue]);
    setInputValue("");
  };

  const removeValue = (valueToRemove: string) => {
    onValueChange(value.filter((item) => item !== valueToRemove));
  };

  const removeLastValue = () => {
    onValueChange(value.slice(0, -1));
  };

  return (
    <div
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-2 rounded-lg border border-input px-2 py-1 shadow-xs has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        className,
      )}
    >
      {value.map((item) => (
        <span
          key={item}
          className="inline-flex h-6 items-center gap-1 rounded-md bg-primary/10 px-2 text-xs font-medium text-primary"
        >
          {item}
          <button
            type="button"
            className="rounded-sm text-primary/75 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove ${item}`}
            onClick={() => removeValue(item)}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <Input
        value={inputValue}
        placeholder={value.length ? "Add another" : placeholder}
        className="h-7 min-w-32 flex-1 border-0 px-1 shadow-none focus-visible:ring-0"
        {...props}
        onBlur={(event) => {
          addValue();
          onBlur?.(event);
        }}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addValue();
          }

          if (event.key === "Backspace" && !inputValue && value.length) {
            event.preventDefault();
            removeLastValue();
          }
          onKeyDown?.(event);
        }}
      />
    </div>
  );
}

export { MultiTextInput };
