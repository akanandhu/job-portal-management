import { ArrowLeft, ChevronRight, Pencil } from "lucide-react";
import type * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ListingShimmer } from "@/features/dashboard/components/listing-shimmer";
import type { AdminApplicationI, AdminJobI } from "../data/dashboard-data";

type JobDetailPropsI = {
  applications: AdminApplicationI[];
  job: AdminJobI;
  onBack: () => void;
  onEdit: (jobId: string) => void;
  onViewApplication: (applicationId: string) => void;
  isLoading?: boolean;
};

const applicationsPerPage = 10;

const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  );
}

export function JobDetail({
  applications,
  isLoading = false,
  job,
  onBack,
  onEdit,
  onViewApplication,
}: JobDetailPropsI) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(applications.length / applicationsPerPage),
  );
  const visibleApplications = applications.slice(
    (page - 1) * applicationsPerPage,
    page * applicationsPerPage,
  );

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

      <section className="grid gap-5 border-b py-6">
        <div>
          <h2 className="text-base font-semibold">Job details</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {job.description}
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DetailItem label="Category" value={formatOptionLabel(job.category)} />
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
                    className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {application.candidate.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                        <h3 className="truncate text-sm font-semibold">
                          {application.candidate}
                        </h3>
                        <span className="w-fit rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {formatOptionLabel(application.status)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {application.yearsOfExperience} years •{" "}
                        {application.education} • Expected ₹
                        {application.expectedSalary.toLocaleString("en-IN")}
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
                    <p className="hidden text-sm text-muted-foreground md:block">
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
