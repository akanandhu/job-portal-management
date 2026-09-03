import { ChevronRight } from "lucide-react";
import type { ApplicationStatusI } from "@job-portal/contracts";

import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/ui/data-table";
import { ListingShimmer } from "@/components/ui/shimmer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplicationStatusSelect } from "@/features/applications/components/application-status-select";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import { useJobDetail } from "@/features/jobs/hooks/useJobDetail";

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
    applicationsPerPage: 10,
  });

  const totalCount = applications.length;

  return (
    <section className="py-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">Job Applications</h2>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Candidate applications submitted for this job role.
          </p>
        </div>
      </div>

      {isLoading ? (
        <ListingShimmer count={5} />
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-50">Candidate</TableHead>
                <TableHead>Experience & Education</TableHead>
                <TableHead>Expected Salary</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Status & Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleApplications.length ? (
                visibleApplications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="cursor-pointer transition-colors hover:bg-muted/40"
                    onClick={() => onViewApplication?.(application.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/15">
                          {application.candidate.slice(0, 1)}
                        </div>
                        <span className="max-w-35 truncate font-semibold text-foreground">
                          {application.candidate}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-foreground">
                        {application.yearsOfExperience} years exp
                      </div>
                      <div className="max-w-45 truncate text-xs text-muted-foreground">
                        {application.education}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium">
                      ₹{application.expectedSalary.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {application.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {application.skills.length > 2 && (
                          <span className="pt-0.5 text-[10px] text-muted-foreground">
                            +{application.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {application.appliedAt}
                    </TableCell>
                    <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
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
                            className="size-8 shrink-0"
                            aria-label={`View ${application.candidate} application`}
                            onClick={(event) => {
                              event.stopPropagation();
                              onViewApplication(application.id);
                            }}
                          >
                            <ChevronRight className="size-4" />
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No applications have been submitted for this job yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalCount > 0 && (
            <div className="border-t bg-muted/20">
              <DataTablePagination
                itemLabel="applications"
                onPageChange={(newPage) => setPage(newPage)}
                page={page}
                pageSize={applicationsPerPage}
                totalItems={totalCount}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
