import { LogOut } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import type { DashboardShellPropsI } from "@/types/dashboard";

export function DashboardShell({
  activeNav,
  children,
  filters,
  navItems,
  onLogout,
  onNavChange,
}: DashboardShellPropsI) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh lg:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="border-b bg-background px-5 py-5 lg:border-r lg:border-b-0">
          <div className="flex h-full flex-col gap-8">
            <BrandLogo />

            <nav className="flex gap-2 overflow-x-auto lg:grid lg:overflow-visible">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;

                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant="ghost"
                    className={cn(
                      "h-11 shrink-0 justify-start gap-3 px-3 text-base font-medium",
                      isActive && "bg-muted text-foreground",
                    )}
                    onClick={() => onNavChange(item.id)}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <div className="mt-auto rounded-xl border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  A
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Admin</p>
                  <p className="text-sm text-muted-foreground">TNP Portal</p>
                </div>
              </div>
              <ConfirmDialog
                title="Log out?"
                description="You will be returned to the login screen."
                confirmLabel="Log out"
                onConfirm={onLogout}
                trigger={({ onClick }) => (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4 w-full justify-start"
                    onClick={onClick}
                  >
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                )}
              />
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-4 lg:px-8">{children}</section>

        <aside className="border-t bg-background px-5 py-6 lg:border-t-0 lg:border-l lg:px-6">
          {filters}
        </aside>
      </div>
    </main>
  );
}
