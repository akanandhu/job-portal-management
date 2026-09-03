import { ChevronRight, ClipboardX, RotateCcw } from "lucide-react";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";

import { Button } from "@/components/ui/button";
import { InfiniteScrollTrigger } from "@/components/ui/infinite-scroll-trigger";
import { ListStateCard } from "@/components/ui/list-state-card";
import { ListingShimmer } from "@/components/ui/shimmer";
import { ApplicationStatusSelect } from "@/features/applications/components/application-status-select";
import { useApplicationList } from "@/features/applications/hooks/useApplicationList";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { formatOptionLabel } from "@/lib/utils";

type ApplicationListPropsI = {
  description?: string;
  emptyMessage?: string;
  onChangeApplicationStatus?: (applicationId: string, status: ApplicationStatusI) => void;
  onViewApplication: (applicationId: string) => void;
  showStatusEditor?: boolean;
  status?: string;
  title?: string;
};

export function ApplicationList({
  description = "Review candidates who submitted applications.",
  emptyMessage = "No applications match this view.",
  onChangeApplicationStatus,
  onViewApplication,
  showStatusEditor = true,
  status,
  title = "Applied candidates",
}: ApplicationListPropsI) {
  const {
    applications,
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
  } = useApplicationList({ status });

  const jobsById = new Map(jobs.map((job) => [job.id, job]));

  const { triggerRef } = useInfiniteScroll({
    hasMore,
    isLoading: isFetchingMore,
    onLoadMore,
  });

  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {isLoading ? (
        <ListingShimmer count={6} />
      ) : isError ? (
        <ListStateCard
          actionIcon={RotateCcw}
          actionLabel="Try again"
          description={errorMessage ?? "Unable to connect to the applications service."}
          icon={ClipboardX}
          onAction={onRetry}
          title="Failed to load applications"
          variant="error"
        />
      ) : applications.length === 0 ? (
        <ListStateCard
          actionLabel={hasActiveFilters ? "Clear filters" : undefined}
          description={
            hasActiveFilters
              ? "No applications matched your current filter criteria. Try adjusting or clearing your filters."
              : emptyMessage
          }
          icon={ClipboardX}
          onAction={hasActiveFilters ? onClearFilters : undefined}
          title="No applications found"
        />
      ) : (
        <>
          <div className="divide-y">
            {applications.map((application) => {
              const job = jobsById.get(application.jobId);

              return (
                <article
                  key={application.id}
                  role="button"
                  tabIndex={0}
                  className="flex cursor-pointer gap-4 py-5 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  onClick={() => onViewApplication(application.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onViewApplication(application.id);
                    }
                  }}
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
                      <div
                        className="flex items-center gap-2 sm:shrink-0"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
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
                          onClick={(event) => {
                            event.stopPropagation();
                            onViewApplication(application.id);
                          }}
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
            })}
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
