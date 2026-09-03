import { ArrowRight, Briefcase, MapPin, Search, Sparkles } from "lucide-react";
import { Link } from "react-router";

import { useAppSelector } from "@/app/hook";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { selectIsAdmin } from "@/features/auth/store/auth-selectors";

const productSteps = [
  {
    title: "Build your profile",
    description: "Add your skills, and experience once.",
  },
  {
    title: "Apply to roles",
    description: "Find open listings that fit and apply in a click.",
  },
  {
    title: "Wait for shortlisting",
    description: "We'll reach out to you when we think you're a good fit.",
  },
];

const tags = ["Remote", "Full-time", "Posted 2 days ago"];

export function Hero() {
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_12%_8%,rgba(255,173,164,0.5),transparent_27%),radial-gradient(circle_at_26%_82%,rgba(128,205,255,0.42),transparent_25%)] lg:w-[47%]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="max-w-2xl space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            Jobs from teams that are actually hiring
          </p>

          <div className="space-y-5">
            <h1 className="font-heading text-5xl font-medium leading-[1.1] tracking-tight text-balance md:text-6xl">
              Find a job you're actually excited to start.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Browse open roles from verified companies, apply in a few clicks, and keep track of
              every application from one dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/listing" className={buttonVariants({ size: "lg" })}>
              Browse open jobs
              <Search className="size-4" />
            </Link>
            {isAdmin ? (
              <Link
                to="/dashboard?section=jobs&tab=all-jobs&mode=add"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Post a job opening
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <Card className="w-full max-w-2xl border-2 bg-background/95 shadow-2xl shadow-black/5">
          <CardHeader className="space-y-1.5 border-b pb-6">
            <CardTitle className="text-2xl">Open positions</CardTitle>
            <CardDescription>A live look at roles you can apply to right now.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="space-y-4 rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="font-heading text-lg font-medium leading-none">
                    Frontend Engineer
                  </h2>
                  <p className="text-sm text-muted-foreground">Nimbus Labs</p>
                </div>
                <Briefcase className="mt-0.5 size-5 shrink-0 text-primary" />
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-primary">
                  <MapPin className="size-3.5" />
                  {tags[0]}
                </span>
                {tags.slice(1).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg bg-secondary px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-base font-medium">How it works</h3>
              <p className="text-sm text-muted-foreground">
                Three steps from signing up to your first offer.
              </p>
            </div>

            <div className="space-y-4">
              {productSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-snug">{step.title}</p>
                    <p className="text-sm leading-snug text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
