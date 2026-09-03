import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ListStateCardPropsI = {
  actionIcon?: LucideIcon;
  actionLabel?: string;
  description: string;
  icon?: LucideIcon;
  onAction?: () => void;
  title: string;
  variant?: "empty" | "error";
};

export function ListStateCard({
  actionIcon: ActionIcon,
  actionLabel,
  description,
  icon: Icon,
  onAction,
  title,
  variant = "empty",
}: ListStateCardPropsI) {
  return (
    <Card
      className={cn(
        "p-8 text-center",
        variant === "error"
          ? "border-destructive/30 bg-destructive/5"
          : "border-dashed bg-muted/20",
      )}
    >
      <CardHeader className="items-center justify-center pb-2">
        {Icon ? (
          variant === "error" ? (
            <Icon className="mb-2 size-8  text-destructive" />
          ) : (
            <div className="mb-2 flex size-12 items-center mx-auto justify-center rounded-full bg-muted/80">
              <Icon className="size-6 text-muted-foreground" />
            </div>
          )
        ) : null}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="max-w-md text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      {onAction && actionLabel ? (
        <CardContent className="pt-3">
          <Button type="button" variant="outline" onClick={onAction}>
            {ActionIcon ? <ActionIcon className="size-4" /> : null}
            {actionLabel}
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
}
