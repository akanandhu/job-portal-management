import { Navigate } from "react-router";
import { AdminDashboardContent } from "@/features/dashboard/components/admin-dashboard-content";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import useAdminDashboard from "../hooks/useAdminDashboard";

export function AdminDashboard() {
  const {
    accountInitial,
    accountName,
    accountSubtitle,
    activeNav,
    activeTab,
    hasValidParams,
    searchParams,
    view,
    currentTabs,
    handleAddJob,
    handleBackToApplications,
    handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleJobSaved,
    handleLogout,
    handleNavChange,
    handleTabChange,
    navItems,
    handleViewApplication,
    handleViewJob,
  } = useAdminDashboard();

  if (!hasValidParams) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", activeTab);

    return <Navigate to={`/dashboard?${nextParams.toString()}`} replace />;
  }

  return (
    <DashboardShell
      accountInitial={accountInitial}
      accountName={accountName}
      accountSubtitle={accountSubtitle}
      activeNav={activeNav}
      header={
        <DashboardTabs activeTab={activeTab} tabs={currentTabs} onTabChange={handleTabChange} />
      }
      filters={<DashboardFilters section={activeNav} />}
      navItems={navItems}
      onLogout={handleLogout}
      onNavChange={handleNavChange}
      showFilters={view.type.endsWith(".list")}
    >
      <AdminDashboardContent
        activeTab={activeTab}
        onChangeApplicationStatus={handleChangeApplicationStatus}
        onAddJob={handleAddJob}
        onBackToApplications={handleBackToApplications}
        onBackToJobs={handleBackToJobs}
        onJobSaved={handleJobSaved}
        onEditJob={handleEditJob}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
