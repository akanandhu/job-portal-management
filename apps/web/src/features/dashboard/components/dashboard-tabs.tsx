import { cn } from "@/lib/utils";
import type { DashboardTabsPropsI } from "@/types/dashboard";

export function DashboardTabs({
  activeTab,
  tabs,
  onTabChange,
}: DashboardTabsPropsI) {
  return (
    <div className="flex items-center gap-8 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={cn(
            "h-12 border-b-2 border-transparent text-sm font-semibold tracking-normal text-muted-foreground uppercase",
            activeTab === tab.id && "border-primary text-primary",
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
