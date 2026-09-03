import { useNavigate, useSearchParams } from "react-router";

import { useLogoutMutation } from "@/features/auth/store/auth-api";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";
import { hasItem } from "../utils/admin-dashboard-view";

type DashboardParamUpdatesI = Record<string, string | undefined>;

type UseDashboardParamsI = {
  defaultSection: string;
  getDefaultTab: (section: string) => string;
  getTabs: (section: string) => DashboardTabI[];
  navItems: DashboardNavItemI[];
};

export function useDashboard({
  defaultSection,
  getDefaultTab,
  getTabs,
  navItems,
}: UseDashboardParamsI) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") ?? defaultSection;
  const activeNav = hasItem(navItems, sectionParam) ? sectionParam : defaultSection;
  const currentTabs = getTabs(activeNav);
  const defaultTab = getDefaultTab(activeNav);
  const tabParam = searchParams.get("tab") ?? defaultTab;
  const activeTab = hasItem(currentTabs, tabParam) ? tabParam : defaultTab;
  const hasValidParams = sectionParam === activeNav && tabParam === activeTab;

  const updateParams = (updates: DashboardParamUpdatesI) => {
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

  const handleViewJob = (jobId: string, tab = activeTab) => {
    updateParams({
      section: "jobs",
      tab,
      jobId,
      mode: undefined,
      applicationId: undefined,
    });
  };

  const handleBackToJobs = (tab = activeTab) => {
    updateParams({
      section: "jobs",
      tab,
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

  const getRedirectTo = (path: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", activeTab);
    nextParams.delete("jobId");
    nextParams.delete("applicationId");
    nextParams.delete("mode");

    return `${path}?${nextParams.toString()}`;
  };

  return {
    activeNav,
    activeTab,
    currentTabs,
    getRedirectTo,
    handleBackToApplications,
    handleBackToJobs,
    handleLogout,
    handleNavChange,
    handleTabChange,
    handleViewApplication,
    handleViewJob,
    hasValidParams,
    searchParams,
    updateParams,
  };
}
