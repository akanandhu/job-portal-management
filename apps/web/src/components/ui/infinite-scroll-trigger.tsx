import type { RefObject } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type InfiniteScrollTriggerPropsI = {
  hasMore: boolean;
  isLoading: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
};

export function InfiniteScrollTrigger({
  hasMore,
  isLoading,
  triggerRef,
}: InfiniteScrollTriggerPropsI) {
  if (!hasMore && !isLoading) return null;

  return (
    <div ref={triggerRef} className="py-6 text-center">
      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
