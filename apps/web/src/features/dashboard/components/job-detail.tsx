import { ArrowLeft, ChevronRight, Pencil, UserRoundPen } from "lucide-react";
import { Link } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { ApplicationStatusSelect } from "@/features/dashboard/components/application-status-select";
import { ListingShimmer } from "@/features/dashboard/components/listing-shimmer";
import type { JobDetailPropsI } from "@/types/jobs";
import DetailItem from "./job-detail-item";
import { formatOptionLabel } from "../utils/admin-dashboard-view";
import useJobDetail from "../hooks/useJobDetail";

export function JobDetail({
  applications,
  isLoading = false,
  job,
  onBack,
  onChangeApplicationStatus,
  onEdit,
  profileHref,
  onViewApplication,
}: JobDetailPropsI) {
  const { page, totalPages, visibleApplications, applicationsPerPage, setPage } =
    useJobDetail({
      applications,
    });

  return (
    <div className="py-5">
      <div className="border-b pb-5">
        <Button
          type="button"
          variant="ghost"
          className="-ml-2 mb-3 w-fit"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" />
          All jobs
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-1 ring-primary/15">
              {job.logo}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight">
                {job.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} • {job.location}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to={profileHref}
              className={buttonVariants({
                variant: "outline",
                className: "w-full sm:w-fit",
              })}
            >
              <UserRoundPen className="size-4" />
              Update profile
            </Link>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-fit"
              onClick={() => onEdit(job.id)}
            >
              <Pencil className="size-4" />
              Edit job
            </Button>
          </div>
        </div>
      </div>

      <section className="grid gap-5 border-b py-6">
        <div>
          <h2 className="text-base font-semibold">Job details</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {job.description}
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DetailItem
            label="Category"
            value={formatOptionLabel(job.category)}
          />
          <DetailItem
            label="Experience"
            value={formatOptionLabel(job.experienceLevel)}
          />
          <DetailItem
            label="Workplace"
            value={formatOptionLabel(job.workplaceType)}
          />
          <DetailItem label="Status" value={formatOptionLabel(job.status)} />
          <DetailItem
            label="Featured"
            value={job.isFeatured ? "Featured" : "Not featured"}
          />
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
                          <h3 className="truncate text-sm font-semibold">
                            {application.candidate}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {application.yearsOfExperience} years •{" "}
                            {application.education} • Expected ₹
                            {application.expectedSalary.toLocaleString("en-IN")}
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
                          <ApplicationStatusSelect
                            applicationId={application.id}
                            candidate={application.candidate}
                            value={application.status}
                            onChange={onChangeApplicationStatus}
                          />
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
                  {Math.min(page * applicationsPerPage, applications.length)} of{" "}
                  {applications.length}
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
                    onClick={() =>
                      setPage((value) => Math.min(totalPages, value + 1))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
