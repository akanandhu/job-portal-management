import { cn } from "@/lib/utils";

type ListingShimmerPropsI = {
  count?: number;
  showAction?: boolean;
};

function ShimmerBlock({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] bg-size-[200%_100%]",
        className,
      )}
    />
  );
}

export function ListingShimmer({ count = 6, showAction = true }: ListingShimmerPropsI) {
  return (
    <div className="divide-y">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex gap-4 py-5">
          <ShimmerBlock className="size-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-3">
            <ShimmerBlock className="h-4 w-3/5" />
            <ShimmerBlock className="h-3 w-4/5" />
          </div>
          {showAction && <ShimmerBlock className="size-8 shrink-0" />}
        </div>
      ))}
    </div>
  );
}
