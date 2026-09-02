import { BriefcaseBusiness, ClipboardList } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { AdminDashboardContent } from "@/features/dashboard/components/admin-dashboard-content";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import {
  adminApplications,
  adminJobs,
} from "@/features/dashboard/data/dashboard-data";
import {
  defaultApplicationTab,
  defaultJobTab,
  defaultSection,
  getAdminDashboardView,
  getDashboardTabs,
  getDefaultTab,
  hasItem,
} from "@/features/dashboard/utils/admin-dashboard-view";
import type { DashboardNavItemI } from "@/types/dashboard";

const navItems: DashboardNavItemI[] = [
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applications", label: "Applications", icon: ClipboardList },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") ?? defaultSection;
  const activeNav = hasItem(navItems, sectionParam)
    ? sectionParam
    : defaultSection;

  const currentTabs = getDashboardTabs(activeNav);
  const defaultTab = getDefaultTab(activeNav);
  const tabParam = searchParams.get("tab") ?? defaultTab;
  const activeTab = hasItem(currentTabs, tabParam) ? tabParam : defaultTab;
  const view = getAdminDashboardView({
    activeNav,
    applications: adminApplications,
    jobs: adminJobs,
    searchParams,
  });
  const hasValidParams = sectionParam === activeNav && tabParam === activeTab;

  const updateParams = (updates: Record<string, string | undefined>) => {
    const nextParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    }

    setSearchParams(nextParams);
  };

  const handleNavChange = (nextSection: string) => {
    updateParams({
      section: nextSection,
      tab: nextSection === "jobs" ? defaultJobTab : defaultApplicationTab,
      jobId: undefined,
      applicationId: undefined,
      mode: undefined,
    });
  };

  const handleTabChange = (nextTab: string) => {
    updateParams({
      section: activeNav,
      tab: nextTab,
      jobId: undefined,
      applicationId: undefined,
      mode: undefined,
    });
  };

  const handleAddJob = () => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "add",
      jobId: undefined,
      applicationId: undefined,
    });
  };

  const handleEditJob = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "edit",
      jobId,
      applicationId: undefined,
    });
  };

  const handleViewJob = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      jobId,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleBackToJobs = () => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      jobId: undefined,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleViewApplication = (applicationId: string) => {
    updateParams({
      section: "applications",
      tab: defaultApplicationTab,
      applicationId,
      jobId: undefined,
      mode: undefined,
    });
  };

  const handleBackToApplications = () => {
    updateParams({
      section: "applications",
      tab: activeTab,
      applicationId: undefined,
      jobId: undefined,
      mode: undefined,
    });
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
      <AdminDashboardContent
        applications={adminApplications}
        jobs={adminJobs}
        onAddJob={handleAddJob}
        onBackToApplications={handleBackToApplications}
        onBackToJobs={handleBackToJobs}
        onEditJob={handleEditJob}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
