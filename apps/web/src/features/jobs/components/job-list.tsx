import { BriefcaseBusiness, Pencil, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfiniteScrollTrigger } from "@/components/ui/infinite-scroll-trigger";
import { ListStateCard } from "@/components/ui/list-state-card";
import { ListingShimmer } from "@/components/ui/shimmer";
import { useJobList } from "@/features/jobs/hooks/useJobList";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { formatOptionLabel } from "@/lib/utils";
import type { JobStatusI } from "@job-portal/contracts/jobs";

type JobListPropsI = {
  description?: string;
  onAddJob?: () => void;
  onEditJob?: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
  showApplicationsCount?: boolean;
  status?: JobStatusI | "all";
  title?: string;
};

export function JobList({
  description = "Manage active job posts and candidate visibility.",
  onAddJob,
  onEditJob,
  onViewJob,
  showApplicationsCount = true,
  status,
  title = "All jobs",
}: JobListPropsI) {
  const {
    errorMessage,
    hasActiveFilters,
    hasMore,
    isError,
    isFetchingMore,
    isLoading,
    jobs,
    onClearFilters,
    onLoadMore,
    onRetry,
  } = useJobList({
    status,
  });

  const { triggerRef } = useInfiniteScroll({
    hasMore,
    isLoading: isFetchingMore,
    onLoadMore,
  });

  return (
    <div>
      <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {onAddJob ? (
          <Button className="w-full sm:w-fit" onClick={onAddJob}>
            <Plus className="size-4" />
            Add job
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <ListingShimmer count={6} />
      ) : isError ? (
        <ListStateCard
          actionIcon={RotateCcw}
          actionLabel="Try again"
          description={errorMessage ?? "Unable to connect to the jobs service."}
          icon={BriefcaseBusiness}
          onAction={onRetry}
          title="Failed to load jobs"
          variant="error"
        />
      ) : jobs.length === 0 ? (
        <ListStateCard
          actionLabel={hasActiveFilters ? "Clear filters" : undefined}
          description={
            hasActiveFilters
              ? "No job listings matched your active filter criteria. Try adjusting or clearing your filters."
              : "There are currently no job postings available in this view."
          }
          icon={BriefcaseBusiness}
          onAction={hasActiveFilters ? onClearFilters : undefined}
          title="No jobs found"
        />
      ) : (
        <>
          <div className="divide-y">
            {jobs.map((job) => (
              <article
                key={job.id}
                role="button"
                tabIndex={0}
                className="flex cursor-pointer gap-4 py-5 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                onClick={() => onViewJob(job.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onViewJob(job.id);
                  }
                }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/15">
                  {job.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold">
                    {job.title}{" "}
                    <span className="font-normal text-foreground">at {job.company}</span>
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground wrap-break-word">
                    {formatOptionLabel(job.workplaceType)} ({job.location}) •{" "}
                    {formatOptionLabel(job.experienceLevel)}
                  </p>
                </div>
                {showApplicationsCount ? (
                  <div className="hidden items-start gap-2 pt-1 text-sm text-muted-foreground sm:flex">
                    <BriefcaseBusiness className="mt-0.5 size-4" />
                    {job.applicationsCount}
                  </div>
                ) : null}
                {onEditJob ? (
                  <div className="flex shrink-0 items-start gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${job.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onEditJob(job.id);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
          <InfiniteScrollTrigger
            hasMore={hasMore}
            isLoading={isFetchingMore}
            triggerRef={triggerRef}
          />
        </>
      )}
    </div>
  );
}
