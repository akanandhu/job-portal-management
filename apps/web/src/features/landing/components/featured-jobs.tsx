import { ArrowRight, BriefcaseBusiness, Building2, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const featuredJobs = [
  {
    role: 'Senior Product Designer',
    company: 'Linear',
    location: 'Remote',
    salary: '$140k - $190k',
    tags: ['Design systems', 'B2B SaaS'],
  },
  {
    role: 'Founding Frontend Engineer',
    company: 'Orbital',
    location: 'San Francisco',
    salary: '$160k - $220k',
    tags: ['React', 'Seed stage'],
  },
  {
    role: 'Growth Product Manager',
    company: 'Mercury',
    location: 'New York',
    salary: '$130k - $175k',
    tags: ['Fintech', 'Analytics'],
  },
]

export function FeaturedJobs() {
  return (
    <section id="featured" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Featured jobs</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Roles worth your attention
          </h2>
        </div>
        <Button variant="outline">
          View all jobs
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {featuredJobs.map((job) => (
          <Card
            key={job.role}
            className="transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          >
            <CardHeader>
              <div className="mb-3 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="size-5" />
              </div>
              <CardTitle className="text-xl">{job.role}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building2 className="size-4" />
                {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {job.location}
                </span>
                <span>{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                See role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
