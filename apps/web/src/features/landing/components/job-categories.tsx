import { ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router";

import { useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListJobCategoriesQuery } from "@/features/jobs/store/jobs-api";
import { selectJobCategories } from "@/features/jobs/store/jobs-slice";
import { formatOptionLabel } from "@/lib/utils";

export function JobCategories() {
  const { isLoading, isError, error, refetch } = useListJobCategoriesQuery();
  const categories = useAppSelector(selectJobCategories);

  return (
    <section id="categories" className="border-y bg-muted/45">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 max-w-2xl space-y-2">
          <p className="text-sm font-medium text-primary">Category-wise listings</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Browse by how teams hire
          </h2>
          <p className="text-muted-foreground">
            Explore live job categories and open positions across different disciplines.
          </p>
        </div>

        {/* Shimmer loading state */}
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="h-36 bg-background">
                <CardHeader className="space-y-2 pb-3">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="size-4 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <Card className="border-destructive/30 bg-destructive/5 text-center p-8">
            <CardHeader className="items-center">
              <Layers className="size-8 text-destructive mb-2" />
              <CardTitle className="text-lg">Failed to load job categories</CardTitle>
              <CardDescription>
                {"data" in (error ?? {})
                  ? String((error as { data?: { message?: string } })?.data?.message)
                  : "Unable to connect to the categories service."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {!isLoading && !isError && categories.length === 0 && (
          <Card className="bg-background p-8 text-center">
            <CardHeader className="items-center pb-2">
              <Layers className="size-8 text-muted-foreground mb-2" />
              <CardTitle className="text-lg">No active categories found</CardTitle>
              <CardDescription>
                Published job categories will appear here once jobs are posted.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Success state */}
        {!isLoading && !isError && categories.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => {
              const label = formatOptionLabel(item.category);
              return (
                <Link
                  key={item.category}
                  to={`/listing?category=${item.category}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                >
                  <Card className="h-full bg-background transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {label}
                      </CardTitle>
                      <CardDescription className="text-xs">Open roles in {label}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between pt-0">
                      <span className="text-xs font-semibold text-primary">
                        {item.count} {item.count === 1 ? "open role" : "open roles"}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
