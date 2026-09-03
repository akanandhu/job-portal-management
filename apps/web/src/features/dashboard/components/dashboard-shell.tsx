import { Filter, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import type { DashboardShellPropsI } from "@/types/dashboard";

export function DashboardShell({
  accountAction,
  accountInitial = "A",
  accountName = "Admin",
  accountSubtitle = "TNP Portal",
  activeNav,
  children,
  filters,
  navItems,
  onLogout,
  onNavChange,
  showFilters,
}: DashboardShellPropsI) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNavItems = (onSelect?: () => void) => (
    <nav className="grid gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;

        return (
          <Button
            key={item.id}
            type="button"
            variant="ghost"
            className={cn(
              "h-11 justify-start gap-3 px-3 text-base font-medium",
              isActive && "bg-muted text-foreground",
            )}
            onClick={() => {
              onNavChange(item.id);
              onSelect?.();
            }}
          >
            <Icon className="size-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );

  const renderAccountCard = () => (
    <div className="mt-auto rounded-xl border bg-muted/40 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {accountInitial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{accountName}</p>
          <p className="truncate text-sm text-muted-foreground">{accountSubtitle}</p>
        </div>
      </div>
      {accountAction ? <div className="mt-4">{accountAction}</div> : null}
      {onLogout ? (
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
      ) : null}
    </div>
  );

  return (
    <main className="min-h-svh bg-background text-foreground lg:h-svh lg:overflow-hidden">
      <div
        className={cn(
          "grid min-h-svh transition-[grid-template-columns] duration-200 lg:h-full lg:min-h-0 lg:grid-cols-[280px_minmax(0,1fr)_0px]",
          showFilters && "lg:grid-cols-[280px_minmax(0,1fr)_360px]",
        )}
      >
        <aside className="hidden bg-background lg:block lg:h-svh lg:overflow-y-auto lg:border-r lg:px-5 lg:py-5">
          <div className="flex min-h-full flex-col gap-8">
            <BrandLogo />
            {renderNavItems()}
            {renderAccountCard()}
          </div>
        </aside>

        <section className="min-w-0 px-5 py-4 lg:h-svh lg:overflow-y-auto lg:px-8">
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
            {showFilters ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Open filters"
                onClick={() => setFiltersOpen(true)}
              >
                <Filter className="size-4" />
              </Button>
            ) : (
              <span />
            )}
          </div>
          {children}
        </section>

        {((filtersOpen && showFilters) || sidebarOpen) && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-xs lg:hidden"
            aria-label="Close dashboard drawer"
            onClick={() => {
              setFiltersOpen(false);
              setSidebarOpen(false);
            }}
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-8 overflow-y-auto border-r bg-background px-5 py-5 shadow-xl transition-transform duration-200 lg:hidden",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <BrandLogo />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          {renderNavItems(() => setSidebarOpen(false))}
          {renderAccountCard()}
        </aside>

        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-y-auto border-l bg-background px-5 py-6 shadow-xl transition-transform duration-200 lg:static lg:z-auto lg:w-auto lg:border-t-0 lg:px-6 lg:shadow-none",
            showFilters && filtersOpen ? "translate-x-0" : "translate-x-full",
            showFilters
              ? "lg:h-svh lg:translate-x-0"
              : "pointer-events-none lg:translate-x-full lg:overflow-hidden lg:border-l-0 lg:px-0",
          )}
        >
          <div className="mb-5 flex justify-end lg:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          {filters}
        </aside>
      </div>
    </main>
  );
}
