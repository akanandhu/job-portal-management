import { Eye, EyeOff } from "lucide-react";
import type * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function PasswordInput({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-1 right-1"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((value) => !value)}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}

export { PasswordInput };
