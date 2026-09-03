import { LogIn, UserRoundPen } from "lucide-react";
import { Link, Navigate } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import { UserDashboardContent } from "@/features/dashboard/components/user-dashboard-content";
import useUserDashboard from "@/features/dashboard/hooks/useUserDashboard";

export function UserDashboard() {
  const {
    accountInitial,
    accountName,
    accountSubtitle,
    activeNav,
    activeTab,
    currentTabs,
    handleBackToApplications,
    handleBackToJobs,
    handleLogout,
    handleNavChange,
    handleTabChange,
    handleViewApplication,
    handleViewJob,
    hasValidParams,
    isAuthenticated,
    isCandidate,
    navItems,
    redirectTo,
    showFilters,
    view,
  } = useUserDashboard();

  if (!hasValidParams) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <DashboardShell
      accountAction={
        isCandidate ? (
          <Link
            to="/listing?section=profile&tab=candidate-profile"
            className={buttonVariants({
              variant: "outline",
              className: "w-full justify-start",
            })}
          >
            <UserRoundPen className="size-4" />
            Update profile
          </Link>
        ) : !isAuthenticated ? (
          <Link
            to="/login"
            className={buttonVariants({
              variant: "outline",
              className: "w-full justify-start",
            })}
          >
            <LogIn className="size-4" />
            Login
          </Link>
        ) : undefined
      }
      accountInitial={accountInitial}
      accountName={accountName}
      accountSubtitle={accountSubtitle}
      activeNav={activeNav}
      header={
        <DashboardTabs activeTab={activeTab} tabs={currentTabs} onTabChange={handleTabChange} />
      }
      filters={<DashboardFilters section={activeNav} />}
      navItems={navItems}
      onLogout={isAuthenticated ? handleLogout : undefined}
      onNavChange={handleNavChange}
      showFilters={showFilters}
    >
      <UserDashboardContent
        activeTab={activeTab}
        isAuthenticated={isAuthenticated}
        isCandidate={isCandidate}
        onBackToApplications={handleBackToApplications}
        onBackToJobs={handleBackToJobs}
        onNavChange={handleNavChange}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
