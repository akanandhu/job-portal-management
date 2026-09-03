import { ApplicationDetail } from "@/features/applications/components/application-detail";
import { ApplicationList } from "@/features/applications/components/application-list";
import { JobDetail } from "@/features/jobs/components/job-detail";
import { JobForm } from "@/features/jobs/components/job-form";
import { JobList } from "@/features/jobs/components/job-list";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { AdminDashboardViewI } from "@/features/dashboard/utils/admin-dashboard-view";
import type { JobFormPropsI } from "@/types/jobs";
import type { JobStatusI } from "@job-portal/contracts";

type AdminDashboardContentPropsI = {
  activeTab?: string;
  onAddJob: () => void;
  onBackToApplications: () => void;
  onBackToJobs: () => void;
  onChangeApplicationStatus: (applicationId: string, status: ApplicationStatusI) => void;
  onEditJob: (jobId: string) => void;
  onJobSaved: JobFormPropsI["onSaved"];
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: AdminDashboardViewI;
};

export function AdminDashboardContent({
  activeTab,
  onChangeApplicationStatus,
  onAddJob,
  onBackToApplications,
  onBackToJobs,
  onEditJob,
  onJobSaved,
  onViewApplication,
  onViewJob,
  view,
}: AdminDashboardContentPropsI) {
  switch (view.type) {
    case "jobs.detail":
      return (
        <JobDetail
          job={view.job}
          onBack={onBackToJobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onEdit={onEditJob}
          onViewApplication={onViewApplication}
          showApplyButton={false}
        />
      );

    case "jobs.form":
      return (
        <JobForm job={view.job} mode={view.mode} onCancel={onBackToJobs} onSaved={onJobSaved} />
      );

    case "jobs.list":
      return (
        <JobList
          status={activeTab === "all-jobs" ? "all" : (activeTab as JobStatusI)}
          onAddJob={onAddJob}
          onEditJob={onEditJob}
          onViewJob={onViewJob}
        />
      );

    case "applications.detail":
      return (
        <ApplicationDetail
          application={view.application}
          company={view.job.company}
          jobTitle={view.job.title}
          onChangeStatus={onChangeApplicationStatus}
          onBack={onBackToApplications}
        />
      );

    case "applications.list":
      return (
        <ApplicationList
          status={activeTab}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onViewApplication={onViewApplication}
        />
      );
  }
}
