import { ArrowLeft, LogIn, Pencil, Send } from "lucide-react";
import { Link } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { JobApplicationsPanel } from "@/features/dashboard/components/job-applications-panel";
import type { JobDetailPropsI } from "@/types/jobs";
import DetailItem from "./job-detail-item";
import { formatOptionLabel } from "@/lib/utils";

export function JobDetail({
  applications,
  applyHref,
  applyLabel,
  backLabel = "All jobs",
  isLoading = false,
  job,
  onBack,
  onApply,
  onChangeApplicationStatus,
  onEdit,
  onViewApplication,
  showApplications = true,
}: JobDetailPropsI) {
  return (
    <div className="py-5">
      <div className="border-b pb-5">
        <Button type="button" variant="ghost" className="-ml-2 mb-3 w-fit" onClick={onBack}>
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-1 ring-primary/15">
              {job.logo}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight">{job.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} • {job.location}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            {applyHref ? (
              <Link
                to={applyHref}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full sm:w-fit",
                })}
              >
                <LogIn className="size-4" />
                {applyLabel ?? "Login to apply"}
              </Link>
            ) : null}
            {onApply ? (
              <Button type="button" className="w-full sm:w-fit" onClick={() => onApply(job.id)}>
                <Send className="size-4" />
                {applyLabel ?? "Apply"}
              </Button>
            ) : null}
            {onEdit ? (
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-fit"
                onClick={() => onEdit(job.id)}
              >
                <Pencil className="size-4" />
                Edit job
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <section className="grid gap-5 border-b py-6">
        <div>
          <h2 className="text-base font-semibold">Job details</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{job.description}</p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DetailItem label="Category" value={formatOptionLabel(job.category)} />
          <DetailItem label="Experience" value={formatOptionLabel(job.experienceLevel)} />
          <DetailItem label="Workplace" value={formatOptionLabel(job.workplaceType)} />
          <DetailItem label="Status" value={formatOptionLabel(job.status)} />
          <DetailItem label="Featured" value={job.isFeatured ? "Featured" : "Not featured"} />
          <DetailItem label="Applications" value={job.applicationsCount} />
          <DetailItem label="Posted" value={job.postedAt} />
        </dl>

        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {showApplications ? (
        <JobApplicationsPanel
          applications={applications}
          isLoading={isLoading}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onViewApplication={onViewApplication}
        />
      ) : null}
    </div>
  );
}
