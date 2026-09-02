import { ArrowRight, Briefcase, CheckCircle2, MapPin, Search, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const productSteps = [
  'Create your profile and upload a resume',
  'Browse open roles and filter by skills, location, or type',
  'Apply directly and track every application in one place',
]

const stats = [
  ['482', 'active listings'],
  ['1,204', 'applications sent'],
  ['96', 'companies hiring'],
] as const

const tags = ['Remote', 'Full-time', 'Posted 2 days ago']

export function Hero() {
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
              Browse open roles from verified companies, apply in a few
              clicks, and keep track of every application from one
              dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg">
              Browse open jobs
              <Search className="size-4" />
            </Button>
            <Button size="lg" variant="outline">
              Post a job opening
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-2xl border-2 bg-background/95 shadow-2xl shadow-black/5">
          <CardHeader className="space-y-1.5 border-b pb-6">
              <CardTitle className="text-2xl">Open positions</CardTitle>
            <CardDescription>
              A live look at roles you can apply to right now.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-3 gap-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-muted px-3 py-5 text-center"
                >
                  <p className="font-heading text-2xl font-semibold leading-none">
                    {value}
                  </p>
                  <p className="text-sm leading-tight text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>

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

            <div className="space-y-3">
              {productSteps.map((step) => (
                <div key={step} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}