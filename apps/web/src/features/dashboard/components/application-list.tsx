import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  AdminApplicationI,
  AdminJobI,
} from "@/features/dashboard/data/dashboard-data";

type ApplicationListPropsI = {
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  onViewApplication: (applicationId: string) => void;
};

export function ApplicationList({
  applications,
  jobs,
  onViewApplication,
}: ApplicationListPropsI) {
  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl font-semibold">Applied candidates</h1>
        <p className="text-sm text-muted-foreground">
          Review candidates who submitted applications.
        </p>
      </div>

      <div className="divide-y">
        {applications.map((application) => (
          <article
            key={application.id}
            className="flex items-start gap-4 py-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground ring-1 ring-border">
              {application.candidate.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold">
                {application.candidate}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {jobs.find((job) => job.id === application.jobId)?.title} at{" "}
                {jobs.find((job) => job.id === application.jobId)?.company} •{" "}
                {application.yearsOfExperience} years
              </p>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {application.appliedAt}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`View ${application.candidate} application`}
              onClick={() => onViewApplication(application.id)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
