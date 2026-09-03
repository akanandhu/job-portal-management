import { ArrowRight, BriefcaseBusiness, Building2, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListFeaturedJobsQuery } from "@/features/jobs/store/jobs-api";
import { selectFeaturedJobs } from "@/features/jobs/store/jobs-slice";
import { formatOptionLabel } from "@/lib/utils";

export function FeaturedJobs() {
  const navigate = useNavigate();
  const { isLoading, isError, error, refetch } = useListFeaturedJobsQuery();
  const featuredJobs = useAppSelector(selectFeaturedJobs);

  return (
    <section id="featured" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Featured jobs</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Roles worth your attention
          </h2>
        </div>
        <Button variant="outline" onClick={() => navigate("/listing")}>
          View all jobs
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Shimmer loading state */}
      {isLoading && (
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 space-y-5">
              <div className="space-y-3">
                <Skeleton className="size-11 rounded-xl" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <Card className="border-destructive/30 bg-destructive/5 text-center p-8">
          <CardHeader className="items-center">
            <BriefcaseBusiness className="size-8 text-destructive mb-2" />
            <CardTitle className="text-lg">Failed to load featured jobs</CardTitle>
            <CardDescription>
              {"data" in (error ?? {})
                ? String((error as { data?: { message?: string } })?.data?.message)
                : "Unable to connect to the jobs service."}
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
      {!isLoading && !isError && featuredJobs.length === 0 && (
        <Card className="bg-background p-8 text-center">
          <CardHeader className="items-center pb-2">
            <BriefcaseBusiness className="size-8 text-muted-foreground mb-2" />
            <CardTitle className="text-lg">No featured jobs available</CardTitle>
            <CardDescription>Check back soon or explore all open job listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate("/listing")}>
              Browse all jobs
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Success state */}
      {!isLoading && !isError && featuredJobs.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Card
              key={job.id}
              className="flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <CardHeader>
                <div className="mb-3 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BriefcaseBusiness className="size-5" />
                </div>
                <CardTitle className="text-xl line-clamp-1">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building2 className="size-4 shrink-0" />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {job.location} ({formatOptionLabel(job.workplaceType)})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(job.skills ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/listing?jobId=${job.id}`}>
                  <Button variant="outline" className="w-full">
                    See role
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
