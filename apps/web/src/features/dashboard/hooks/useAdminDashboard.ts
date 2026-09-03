import { useLogoutMutation } from "@/features/auth/store/auth-api";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
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
  hasItem,
} from "../utils/admin-dashboard-view";
import type { ApplicationStatusI } from "@job-portal/contracts";
import type { DashboardNavItemI } from "@/types/dashboard";
import { BriefcaseBusiness, ClipboardList } from "lucide-react";

const navItems: DashboardNavItemI[] = [
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applications", label: "Applications", icon: ClipboardList },
];

const useAdminDashboard = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [applications, setApplications] = useState(adminApplications);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const sectionParam = searchParams.get("section") ?? defaultSection;
  const activeNav = hasItem(navItems, sectionParam) ? sectionParam : defaultSection;

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
      tab: activeTab,
      jobId,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleBackToJobDetail = (jobId: string) => {
    updateParams({
      section: "jobs",
      tab: activeTab,
      jobId,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleBackToJobs = () => {
    updateParams({
      section: "jobs",
      tab: activeTab,
      jobId: undefined,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleViewApplication = (applicationId: string) => {
    updateParams({
      section: "applications",
      tab: activeTab,
      applicationId,
      jobId: undefined,
      mode: undefined,
    });
  };

  const handleBackToApplicationDetail = (applicationId: string) => {
    updateParams({
      section: "applications",
      tab: activeTab,
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

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .catch(() => undefined)
      .finally(() => {
        navigate("/login", { replace: true });
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
    activeNav,
    activeTab,
    applications,
    currentTabs,
    handleAddJob,
    handleBackToApplicationDetail,
    handleBackToApplications,
    handleBackToJobDetail,
    handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleLogout,
    handleNavChange,
    handleTabChange,
    handleViewApplication,
    handleViewJob,
    hasValidParams,
    view,
    navItems,
    updateParams,
    searchParams,
  };
};

export default useAdminDashboard;
