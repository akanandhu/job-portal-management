import { cn } from "@/lib/utils";
import type { DashboardTabsPropsI } from "@/types/dashboard";

export function DashboardTabs({
  activeTab,
  tabs,
  onTabChange,
}: DashboardTabsPropsI) {
  return (
    <div className="-mx-5 overflow-x-auto border-b px-5 lg:-mx-8 lg:px-8">
      <div className="flex min-w-max items-center gap-5 sm:gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={cn(
              "h-12 shrink-0 border-b-2 border-transparent text-sm font-semibold tracking-normal whitespace-nowrap text-muted-foreground uppercase",
            activeTab === tab.id && "border-primary text-primary",
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
      </div>
    </div>
  );
}
