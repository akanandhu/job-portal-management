import { ChevronRight } from "lucide-react";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";

import { Button } from "@/components/ui/button";
import { ApplicationStatusSelect } from "@/features/dashboard/components/application-status-select";
import { ListingShimmer } from "@/features/dashboard/components/listing-shimmer";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import { formatOptionLabel } from "@/lib/utils";

type ApplicationListPropsI = {
  applications: AdminApplicationI[];
  description?: string;
  emptyMessage?: string;
  jobs: AdminJobI[];
  onChangeApplicationStatus?: (applicationId: string, status: ApplicationStatusI) => void;
  onViewApplication: (applicationId: string) => void;
  showStatusEditor?: boolean;
  title?: string;
  isLoading?: boolean;
};

export function ApplicationList({
  applications,
  description = "Review candidates who submitted applications.",
  emptyMessage = "No applications match this view.",
  isLoading = false,
  jobs,
  onChangeApplicationStatus,
  onViewApplication,
  showStatusEditor = true,
  title = "Applied candidates",
}: ApplicationListPropsI) {
  const jobsById = new Map(jobs.map((job) => [job.id, job]));

  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {isLoading ? (
        <ListingShimmer count={6} />
      ) : (
        <div className="divide-y">
          {applications.length ? (
            applications.map((application) => {
              const job = jobsById.get(application.jobId);

              return (
                <article
                  key={application.id}
                  className="flex gap-4 py-5 transition-colors hover:bg-muted/30"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground ring-1 ring-border">
                    {application.candidate.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold">
                          {application.candidate}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {job?.title} at {job?.company} • {application.yearsOfExperience} years
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                          {application.appliedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:shrink-0">
                        {showStatusEditor && onChangeApplicationStatus ? (
                          <ApplicationStatusSelect
                            applicationId={application.id}
                            candidate={application.candidate}
                            value={application.status}
                            onChange={onChangeApplicationStatus}
                          />
                        ) : (
                          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                            {formatOptionLabel(application.status)}
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          aria-label={`View ${application.candidate} application`}
                          onClick={() => onViewApplication(application.id)}
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="hidden text-sm text-muted-foreground sm:block">
                    {application.appliedAt}
                  </p>
                </article>
              );
            })
          ) : (
            <p className="bg-muted/30 py-5 text-sm text-muted-foreground">{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
