import { applicationStatuses } from "@job-portal/contracts/applications";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import { useState } from "react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatOptionLabel } from "@/features/dashboard/utils/admin-dashboard-view";
import { cn } from "@/lib/utils";

type ApplicationStatusSelectPropsI = {
  applicationId: string;
  candidate: string;
  className?: string;
  onChange: (applicationId: string, status: ApplicationStatusI) => void;
  value: ApplicationStatusI;
};

export function ApplicationStatusSelect({
  applicationId,
  candidate,
  className,
  onChange,
  value,
}: ApplicationStatusSelectPropsI) {
  const [pendingStatus, setPendingStatus] = useState<ApplicationStatusI | null>(
    null,
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPendingStatus(null);
    }
  };

  return (
    <>
      <Select
        value={value}
        onValueChange={(nextValue) => {
          const nextStatus = nextValue as ApplicationStatusI;

          if (nextStatus !== value) {
            setPendingStatus(nextStatus);
          }
        }}
      >
        <SelectTrigger className={cn("h-8 w-full sm:w-36", className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {applicationStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {formatOptionLabel(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ConfirmDialog
        open={Boolean(pendingStatus)}
        onOpenChange={handleOpenChange}
        title="Change status?"
        description={`Are you sure you want to change ${candidate}'s application status to ${pendingStatus ? formatOptionLabel(pendingStatus) : ""}?`}
        confirmLabel="Change status"
        onConfirm={() => {
          if (pendingStatus) {
            onChange(applicationId, pendingStatus);
          }
        }}
      />
    </>
  );
}
