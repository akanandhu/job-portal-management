import { Button } from "@/components/ui/button";
import { ListingShimmer } from "@/features/dashboard/components/listing-shimmer";
import { BriefcaseBusiness, Pencil, Plus } from "lucide-react";
import type { AdminJobI } from "../data/dashboard-data";

type JobListPropsI = {
  jobs: AdminJobI[];
  onAddJob: () => void;
  onEditJob: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
  isLoading?: boolean;
};

const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

export function JobList({
  isLoading = false,
  jobs,
  onAddJob,
  onEditJob,
  onViewJob,
}: JobListPropsI) {
  return (
    <div>
      <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold">All jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage active job posts and candidate visibility.
          </p>
        </div>
        <Button className="w-full sm:w-fit" onClick={onAddJob}>
          <Plus className="size-4" />
          Add job
        </Button>
      </div>

      {isLoading ? (
        <ListingShimmer count={6} />
      ) : (
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
                  {job.title} <span className="font-normal text-foreground">at {job.company}</span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground break-words">
                  {formatOptionLabel(job.workplaceType)} ({job.location}) •{" "}
                  {formatOptionLabel(job.experienceLevel)}
                </p>
              </div>
              <div className="hidden items-start gap-2 pt-1 text-sm text-muted-foreground sm:flex">
                <BriefcaseBusiness className="mt-0.5 size-4" />
                {job.applicationsCount}
              </div>
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
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
