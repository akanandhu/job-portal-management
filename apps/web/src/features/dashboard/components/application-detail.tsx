import { ArrowLeft } from "lucide-react";
import type * as React from "react";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";

import { Button } from "@/components/ui/button";
import { ApplicationStatusSelect } from "@/features/dashboard/components/application-status-select";
import type { AdminApplicationI } from "../data/dashboard-data";

type ApplicationDetailPropsI = {
  application: AdminApplicationI;
  company: string;
  jobTitle: string;
  onBack: () => void;
  onChangeStatus: (applicationId: string, status: ApplicationStatusI) => void;
};

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

export function ApplicationDetail({
  application,
  company,
  jobTitle,
  onBack,
  onChangeStatus,
}: ApplicationDetailPropsI) {
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
          Applications
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-semibold text-secondary-foreground ring-1 ring-border">
              {application.candidate.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight">
                {application.candidate}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {jobTitle} at {company} • {formatOptionLabel(application.status)}
              </p>
            </div>
          </div>
          <ApplicationStatusSelect
            applicationId={application.id}
            candidate={application.candidate}
            className="sm:w-40"
            value={application.status}
            onChange={onChangeStatus}
          />
        </div>
      </div>

      <section className="grid gap-5 py-6">
        <h2 className="text-base font-semibold">Candidate snapshot</h2>
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <DetailItem label="Education" value={application.education} />
          <DetailItem
            label="Experience"
            value={`${application.yearsOfExperience} years`}
          />
          <DetailItem
            label="Current company"
            value={application.currentCompany ?? "Not provided"}
          />
          <DetailItem
            label="Current role"
            value={application.currentRole ?? "Not provided"}
          />
          <DetailItem
            label="Expected salary"
            value={`₹${application.expectedSalary.toLocaleString("en-IN")}`}
          />
          <DetailItem
            label="Notice period"
            value={`${application.noticePeriodDays} days`}
          />
          <DetailItem label="Applied" value={application.appliedAt} />
        </dl>

        <div className="flex flex-wrap gap-2">
          {application.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
