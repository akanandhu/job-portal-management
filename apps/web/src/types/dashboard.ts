import type { LucideIcon } from "lucide-react";

export type DashboardTabI = {
  id: string;
  label: string;
};

export type DashboardTabsPropsI = {
  activeTab: string;
  tabs: DashboardTabI[];
  onTabChange: (value: string) => void;
};

export type DashboardNavItemI = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type DashboardShellPropsI = {
  accountInitial?: string;
  accountName?: string;
  accountSubtitle?: string;
  accountAction?: React.ReactNode;
  activeNav: string;
  children: React.ReactNode;
  filters: React.ReactNode;
  navItems: DashboardNavItemI[];
  onLogout?: () => void;
  onNavChange: (value: string) => void;
  showFilters: boolean;
};
