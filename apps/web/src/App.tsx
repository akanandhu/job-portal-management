import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const metrics = [
  { label: 'Open roles', value: '28', detail: '6 awaiting review' },
  { label: 'Active candidates', value: '1,284', detail: '142 new this week' },
  { label: 'Interviews today', value: '18', detail: '4 final rounds' },
]

const roles = [
  { title: 'Senior Frontend Engineer', team: 'Product', status: 'Interviewing' },
  { title: 'Talent Operations Lead', team: 'People', status: 'Screening' },
  { title: 'Backend Platform Engineer', team: 'Infrastructure', status: 'Offer' },
]

function App() {
  return (
    <main className="min-h-svh bg-background px-6 py-8 text-foreground md:px-10">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              Job portal
            </h1>
            <p className="text-muted-foreground">
              Track roles, candidates, and interviews from one hiring view.
            </p>
          </div>
          <Button>Post a job</Button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{metric.detail}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle>Priority roles</CardTitle>
                <CardDescription>
                  Roles with the highest hiring activity.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Review pipeline
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {roles.map((role) => (
                <li
                  key={role.title}
                  className="flex items-center justify-between gap-4 px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{role.title}</p>
                    <p className="text-sm text-muted-foreground">{role.team}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {role.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default App
