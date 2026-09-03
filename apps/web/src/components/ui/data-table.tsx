import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataTablePaginationPropsI = {
  className?: string;
  itemLabel?: string;
  onPageChange: (page: number) => void;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export function DataTablePagination({
  className,
  itemLabel = "items",
  onPageChange,
  page,
  pageSize,
  totalItems,
  totalPages,
}: DataTablePaginationPropsI) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-2 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{from}</span> to{" "}
        <span className="font-medium text-foreground">{to}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> {itemLabel}
      </p>
      <div className="flex items-center gap-2 sm:shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeft className="mr-1 size-4" />
          Previous
        </Button>
        <span className="px-2 text-xs font-semibold text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
          <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}
