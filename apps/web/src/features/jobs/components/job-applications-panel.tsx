import { ChevronRight } from "lucide-react";
import type { ApplicationStatusI } from "@job-portal/contracts";

import { Button } from "@/components/ui/button";
import { ApplicationStatusSelect } from "@/features/dashboard/components/application-status-select";
import { ListingShimmer } from "@/features/dashboard/components/listing-shimmer";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import useJobDetail from "@/features/jobs/hooks/useJobDetail";

type JobApplicationsPanelPropsI = {
  applications: AdminApplicationI[];
  isLoading?: boolean;
  onChangeApplicationStatus?: (applicationId: string, status: ApplicationStatusI) => void;
  onViewApplication?: (applicationId: string) => void;
};

export function JobApplicationsPanel({
  applications,
  isLoading = false,
  onChangeApplicationStatus,
  onViewApplication,
}: JobApplicationsPanelPropsI) {
  const { page, totalPages, visibleApplications, applicationsPerPage, setPage } = useJobDetail({
    applications,
  });

  return (
    <section className="py-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Applications</h2>
          <p className="text-sm text-muted-foreground">
            {applications.length} candidate snapshots submitted for this job.
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Page {page} of {totalPages}
        </p>
      </div>

      {isLoading ? (
        <ListingShimmer count={applicationsPerPage} />
      ) : (
        <>
          <div className="divide-y rounded-xl border">
            {visibleApplications.length ? (
              visibleApplications.map((application) => (
                <article
                  key={application.id}
                  className="flex gap-4 px-4 py-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {application.candidate.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">{application.candidate}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {application.yearsOfExperience} years • {application.education} • Expected
                          ₹{application.expectedSalary.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground md:hidden">
                          {application.appliedAt}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {application.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:shrink-0">
                        {onChangeApplicationStatus ? (
                          <ApplicationStatusSelect
                            applicationId={application.id}
                            candidate={application.candidate}
                            value={application.status}
                            onChange={onChangeApplicationStatus}
                          />
                        ) : null}
                        {onViewApplication ? (
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
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <p className="hidden text-sm text-muted-foreground md:block">
                    {application.appliedAt}
                  </p>
                </article>
              ))
            ) : (
              <p className="bg-muted/30 p-4 text-sm text-muted-foreground">
                No applications have been submitted for this job yet.
              </p>
            )}
          </div>

          {applications.length > applicationsPerPage && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * applicationsPerPage + 1}-
                {Math.min(page * applicationsPerPage, applications.length)} of {applications.length}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
