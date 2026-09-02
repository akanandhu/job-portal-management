import { BriefcaseBusiness, ClipboardList } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { applicationStatuses } from "@job-portal/contracts/applications";
import { ApplicationList } from "@/features/dashboard/components/application-list";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import { JobList } from "@/features/dashboard/components/job-list";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";

const navItems: DashboardNavItemI[] = [
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applications", label: "Applications", icon: ClipboardList },
];

const jobTabs: DashboardTabI[] = [{ id: "all-jobs", label: "All Jobs" }];

const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

const applicationTabs: DashboardTabI[] = applicationStatuses.map((status) => ({
  id: status,
  label: formatOptionLabel(status),
}));

const defaultSection = "jobs";
const defaultJobTab = "all-jobs";
const defaultApplicationTab = applicationStatuses[0];

const hasItem = <Item extends { id: string }>(items: Item[], id: string) =>
  items.some((item) => item.id === id);

export function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") ?? defaultSection;
  const activeNav = hasItem(navItems, sectionParam)
    ? sectionParam
    : defaultSection;

  const isJobsView = activeNav === "jobs";
  const currentTabs = isJobsView ? jobTabs : applicationTabs;
  const defaultTab = isJobsView ? defaultJobTab : defaultApplicationTab;
  const tabParam = searchParams.get("tab") ?? defaultTab;
  const activeTab = hasItem(currentTabs, tabParam) ? tabParam : defaultTab;
  const hasValidParams = sectionParam === activeNav && tabParam === activeTab;

  const handleNavChange = (nextSection: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", nextSection);
    nextParams.set(
      "tab",
      nextSection === "jobs" ? defaultJobTab : defaultApplicationTab,
    );
    setSearchParams(nextParams);
  };

  const handleTabChange = (nextTab: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", nextTab);
    setSearchParams(nextParams);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (!hasValidParams) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", activeTab);

    return <Navigate to={`/dashboard?${nextParams.toString()}`} replace />;
  }

  return (
    <DashboardShell
      activeNav={activeNav}
      filters={<DashboardFilters section={activeNav} />}
      navItems={navItems}
      onLogout={handleLogout}
      onNavChange={handleNavChange}
    >
      <DashboardTabs
        activeTab={activeTab}
        tabs={currentTabs}
        onTabChange={handleTabChange}
      />
      {isJobsView ? <JobList /> : <ApplicationList />}
    </DashboardShell>
  );
}
