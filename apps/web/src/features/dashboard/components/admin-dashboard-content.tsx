import { ApplicationDetail } from "@/features/dashboard/components/application-detail";
import { ApplicationList } from "@/features/dashboard/components/application-list";
import { CandidateProfileEditor } from "@/features/dashboard/components/candidate-profile-editor";
import { JobDetail } from "@/features/dashboard/components/job-detail";
import { JobForm } from "@/features/dashboard/components/job-form";
import { JobList } from "@/features/dashboard/components/job-list";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { AdminDashboardViewI } from "@/features/dashboard/utils/admin-dashboard-view";

type AdminDashboardContentPropsI = {
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  onChangeApplicationStatus: (applicationId: string, status: ApplicationStatusI) => void;
  onAddJob: () => void;
  onBackToApplications: () => void;
  onBackToApplicationDetail: (applicationId: string) => void;
  onBackToJobDetail: (jobId: string) => void;
  onBackToJobs: () => void;
  onEditJob: (jobId: string) => void;
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: AdminDashboardViewI;
};

export function AdminDashboardContent({
  applications,
  jobs,
  onChangeApplicationStatus,
  onAddJob,
  onBackToApplicationDetail,
  onBackToApplications,
  onBackToJobDetail,
  onBackToJobs,
  onEditJob,
  onViewApplication,
  onViewJob,
  view,
}: AdminDashboardContentPropsI) {
  switch (view.type) {
    case "jobs.detail":
      return (
        <JobDetail
          applications={applications.filter((application) => application.jobId === view.job.id)}
          job={view.job}
          onBack={onBackToJobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onEdit={onEditJob}
          profileHref={`/dashboard?section=profile&tab=candidate-profile&jobId=${view.job.id}`}
          onViewApplication={onViewApplication}
        />
      );

    case "jobs.form":
      return <JobForm job={view.job} mode={view.mode} onCancel={onBackToJobs} />;

    case "jobs.list":
      return (
        <JobList jobs={jobs} onAddJob={onAddJob} onEditJob={onEditJob} onViewJob={onViewJob} />
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

    case "candidate-profile.form": {
      const profileJob = view.job;
      const profileApplication = view.application;
      const onBack = profileJob
        ? () => onBackToJobDetail(profileJob.id)
        : profileApplication
          ? () => onBackToApplicationDetail(profileApplication.id)
          : undefined;

      return (
        <CandidateProfileEditor application={profileApplication} job={profileJob} onBack={onBack} />
      );
    }

    case "applications.list":
      return (
        <ApplicationList
          applications={applications}
          jobs={jobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onViewApplication={onViewApplication}
        />
      );
  }
}
