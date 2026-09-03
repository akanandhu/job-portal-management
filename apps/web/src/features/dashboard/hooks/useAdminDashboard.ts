import { useState } from "react";
import { useAppSelector } from "@/app/hook";
import { selectCurrentUser } from "@/features/auth/store/auth-selectors";
import { getNameInitial } from "@/lib/utils";
import { adminApplications, adminJobs } from "../data/dashboard-data";
import {
  defaultJobTab,
  defaultSection,
  getAdminDashboardView,
  getDashboardTabs,
  getDefaultTab,
} from "../utils/admin-dashboard-view";
import type { ApplicationStatusI } from "@job-portal/contracts";
import type { DashboardNavItemI } from "@/types/dashboard";
import { BriefcaseBusiness, ClipboardList } from "lucide-react";
import { useDashboard } from "./useDashboard";

const navItems: DashboardNavItemI[] = [
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applications", label: "Applications", icon: ClipboardList },
];

const useAdminDashboard = () => {
  const [applications, setApplications] = useState(adminApplications);
  const currentUser = useAppSelector(selectCurrentUser);
  const dashboard = useDashboard({
    defaultSection,
    getDefaultTab,
    getTabs: getDashboardTabs,
    navItems,
  });
  const view = getAdminDashboardView({
    activeNav: dashboard.activeNav,
    applications,
    jobs: adminJobs,
    searchParams: dashboard.searchParams,
  });

  const handleAddJob = () => {
    dashboard.updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "add",
      jobId: undefined,
      applicationId: undefined,
    });
  };

  const handleEditJob = (jobId: string) => {
    dashboard.updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "edit",
      jobId,
      applicationId: undefined,
    });
  };

  const handleChangeApplicationStatus = (applicationId: string, status: ApplicationStatusI) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId ? { ...application, status } : application,
      ),
    );
  };

  return {
    accountInitial: getNameInitial(currentUser?.name, "A"),
    accountName: currentUser?.name ?? "Admin",
    accountSubtitle: "Admin",
    activeNav: dashboard.activeNav,
    activeTab: dashboard.activeTab,
    applications,
    currentTabs: dashboard.currentTabs,
    handleAddJob,
    handleBackToApplicationDetail: dashboard.handleViewApplication,
    handleBackToApplications: dashboard.handleBackToApplications,
    handleBackToJobDetail: dashboard.handleViewJob,
    handleBackToJobs: dashboard.handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleLogout: dashboard.handleLogout,
    handleNavChange: dashboard.handleNavChange,
    handleTabChange: dashboard.handleTabChange,
    handleViewApplication: dashboard.handleViewApplication,
    handleViewJob: dashboard.handleViewJob,
    hasValidParams: dashboard.hasValidParams,
    view,
    navItems,
    updateParams: dashboard.updateParams,
    searchParams: dashboard.searchParams,
  };
};

export default useAdminDashboard;
