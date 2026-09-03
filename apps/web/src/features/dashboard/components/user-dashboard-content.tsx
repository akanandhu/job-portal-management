import { ApplicationDetail } from "@/features/applications/components/application-detail";
import { ApplicationList } from "@/features/applications/components/application-list";
import { CandidateProfileEditor } from "@/features/profile/components/candidate-profile-editor";
import { JobDetail } from "@/features/jobs/components/job-detail";
import { JobList } from "@/features/jobs/components/job-list";
import { formatOptionLabel } from "@/lib/utils";
import type { UserDashboardContentPropsI } from "@/types/user-dashboard";

export function UserDashboardContent({
  activeTab,
  isAuthenticated,
  isCandidate,
  onBackToApplications,
  onBackToJobs,
  onNavChange,
  onViewApplication,
  onViewJob,
  view,
}: UserDashboardContentPropsI) {
  switch (view.type) {
    case "jobs.detail":
      return (
        <JobDetail
          applications={[]}
          applyHref={!isAuthenticated ? "/login" : undefined}
          applyLabel={isCandidate ? "Apply" : "Login to apply"}
          backLabel="Suggested jobs"
          job={view.job}
          onBack={onBackToJobs}
          showApplications={false}
        />
      );

    case "applications.detail":
      return (
        <ApplicationDetail
          application={view.application}
          company={view.job.company}
          jobTitle={view.job.title}
          onBack={onBackToApplications}
        />
      );

    case "candidate-profile.form":
      return <CandidateProfileEditor onBack={() => onNavChange("jobs")} />;

    case "applications.list":
      return (
        <ApplicationList
          description="Status filtering is handled by the application tabs."
          emptyMessage={`No ${formatOptionLabel(activeTab)} applications yet.`}
          onViewApplication={onViewApplication}
          showStatusEditor={false}
          status={activeTab}
          title="My applications"
        />
      );

    case "jobs.list":
      return (
        <JobList
          description="Browse open roles and read the complete job description before applying."
          onViewJob={onViewJob}
          showApplicationsCount={false}
          title="Recommended jobs"
        />
      );
  }
}
