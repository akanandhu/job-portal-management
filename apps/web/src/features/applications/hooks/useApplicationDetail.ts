import { useAppSelector } from "@/app/hook";
import {
  selectAllApplications,
  selectMyApplications,
} from "@/features/applications/store/applications-slice";
import { formatApplication } from "@/features/applications/utils/format-application";
import { selectCurrentUser, selectIsAdmin } from "@/features/auth/store/auth-selectors";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import { selectJobs } from "@/features/jobs/store/jobs-slice";

type UseApplicationDetailOptionsI = {
  applicationId?: string;
};

export function useApplicationDetail({ applicationId }: UseApplicationDetailOptionsI = {}) {
  const isAdmin = useAppSelector(selectIsAdmin);
  const currentUser = useAppSelector(selectCurrentUser);

  const allApplications = useAppSelector(selectAllApplications);
  const myApplications = useAppSelector(selectMyApplications);
  const jobs = useAppSelector(selectJobs);

  const rawApplications = isAdmin ? allApplications : myApplications;
  const rawApplication = applicationId
    ? rawApplications.find((item) => item.id === applicationId)
    : undefined;

  const application: AdminApplicationI | undefined = rawApplication
    ? formatApplication(rawApplication, currentUser?.name ?? "Candidate")
    : undefined;

  const job: AdminJobI | undefined = application
    ? jobs.find((item) => item.id === application.jobId)
    : undefined;

  return {
    application,
    job,
  };
}
