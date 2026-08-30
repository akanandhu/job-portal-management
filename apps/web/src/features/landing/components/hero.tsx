import { ArrowRight, BadgeCheck, CheckCircle2, Search, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const proofAvatars = ['AK', 'ML', 'SR', 'TN', 'CP', 'JW']

const productSteps = [
  'Create a proof-first professional profile',
  'Get matched with jobs through skills and intent',
  'Start warmer conversations with founders and hiring teams',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_12%_8%,rgba(255,173,164,0.5),transparent_27%),radial-gradient(circle_at_26%_82%,rgba(128,205,255,0.42),transparent_25%)] lg:w-[47%]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-8 px-6 py-12 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <section className="flex flex-col justify-between gap-14">
          <div className="max-w-2xl space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-4 text-primary" />
              Where ambitious professionals get discovered
            </p>

            <div className="space-y-5">
              <h1 className="font-heading text-5xl font-medium leading-[1.04] tracking-tight text-balance md:text-7xl">
                Connect with the most{' '}
                <span className="relative inline-block">
                  incredible
                  <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-primary/35 md:h-3" />
                </span>{' '}
                professionals.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Joblists helps talented people turn proof of work into trusted
                opportunities, and helps hiring teams find high-signal candidates
                without the noise of a traditional job board.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                Find your next role
                <Search className="size-4" />
              </Button>
              <Button size="lg" variant="outline">
                Post a featured job
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {proofAvatars.map((avatar) => (
                <span
                  key={avatar}
                  className="grid size-11 place-items-center rounded-full border-2 border-background bg-card text-xs font-semibold shadow-sm"
                >
                  {avatar}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Join 12,000+ peers sharing work and opportunities.
            </p>
          </div>
        </section>

        <section id="product" className="flex items-center justify-center">
          <Card className="w-full max-w-2xl border-2 bg-background/95 shadow-2xl shadow-black/5">
            <CardHeader className="border-b">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Opportunity graph</CardTitle>
                  <CardDescription>
                    A live view of talent, jobs, and warm paths into hiring teams.
                  </CardDescription>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Live demo
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ['1,842', 'verified profiles'],
                  ['318', 'warm intros'],
                  ['92%', 'response quality'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-muted p-4">
                    <p className="font-heading text-2xl font-semibold">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-lg font-medium">Maya Chen</h2>
                    <p className="text-sm text-muted-foreground">
                      Product engineer - React, design systems, AI tooling
                    </p>
                  </div>
                  <BadgeCheck className="size-5 shrink-0 text-primary" />
                </div>
                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <span className="rounded-lg bg-primary/10 px-3 py-2 text-primary">
                    Open to founding teams
                  </span>
                  <span className="rounded-lg bg-secondary px-3 py-2">
                    6 shipped projects
                  </span>
                  <span className="rounded-lg bg-secondary px-3 py-2">
                    14 mutual peers
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {productSteps.map((step) => (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  )
}
