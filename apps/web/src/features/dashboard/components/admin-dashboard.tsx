import { BriefcaseBusiness, ClipboardList, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";

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
  { id: "profile", label: "Candidate Profile", icon: UserRoundPen },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(adminApplications);
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
    applications,
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
      tab: getDefaultTab(nextSection),
      jobId: undefined,
      applicationId: undefined,
      mode: undefined,
      profileMode: undefined,
    });
  };

  const handleTabChange = (nextTab: string) => {
    updateParams({
      section: activeNav,
      tab: nextTab,
      jobId: undefined,
      applicationId: undefined,
      mode: undefined,
      profileMode: undefined,
    });
  };

  const handleAddJob = () => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "add",
      jobId: undefined,
      applicationId: undefined,
      profileMode: undefined,
    });
  };

  const handleEditJob = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "edit",
      jobId,
      applicationId: undefined,
      profileMode: undefined,
    });
  };

  const handleViewJob = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      jobId,
      mode: undefined,
      applicationId: undefined,
      profileMode: undefined,
    });
  };

  const handleBackToJobDetail = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      jobId,
      mode: undefined,
      applicationId: undefined,
      profileMode: undefined,
    });
  };

  const handleBackToJobs = () => {
    updateParams({
      section: "jobs",
      tab: defaultJobTab,
      jobId: undefined,
      mode: undefined,
      applicationId: undefined,
      profileMode: undefined,
    });
  };

  const handleViewApplication = (applicationId: string) => {
    updateParams({
      section: "applications",
      tab: defaultApplicationTab,
      applicationId,
      jobId: undefined,
      mode: undefined,
      profileMode: undefined,
    });
  };

  const handleBackToApplicationDetail = (applicationId: string) => {
    updateParams({
      section: "applications",
      tab: activeTab,
      applicationId,
      jobId: undefined,
      mode: undefined,
      profileMode: undefined,
    });
  };

  const handleBackToApplications = () => {
    updateParams({
      section: "applications",
      tab: activeTab,
      applicationId: undefined,
      jobId: undefined,
      mode: undefined,
      profileMode: undefined,
    });
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChangeApplicationStatus = (
    applicationId: string,
    status: ApplicationStatusI,
  ) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? { ...application, status }
          : application,
      ),
    );
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
      showFilters={view.type.endsWith(".list")}
    >
      <DashboardTabs
        activeTab={activeTab}
        tabs={currentTabs}
        onTabChange={handleTabChange}
      />
      <AdminDashboardContent
        applications={applications}
        jobs={adminJobs}
        onChangeApplicationStatus={handleChangeApplicationStatus}
        onAddJob={handleAddJob}
        onBackToApplicationDetail={handleBackToApplicationDetail}
        onBackToApplications={handleBackToApplications}
        onBackToJobDetail={handleBackToJobDetail}
        onBackToJobs={handleBackToJobs}
        onEditJob={handleEditJob}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
