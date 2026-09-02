type ApplicationItemI = {
  id: string;
  candidate: string;
  role: string;
  company: string;
  appliedAt: string;
  experience: string;
};

const applications: ApplicationItemI[] = [
  {
    id: "1",
    candidate: "Ananthakrishnan",
    role: "Software Engineer",
    company: "Baxter",
    appliedAt: "Today",
    experience: "2 years",
  },
  {
    id: "2",
    candidate: "Meera Nair",
    role: "Product Designer",
    company: "Landeed",
    appliedAt: "1d ago",
    experience: "3 years",
  },
  {
    id: "3",
    candidate: "Rahul Menon",
    role: "Application Developer",
    company: "Barclays",
    appliedAt: "2d ago",
    experience: "1 year",
  },
];

export function ApplicationList() {
  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl font-semibold">Applied candidates</h1>
        <p className="text-sm text-muted-foreground">
          Review candidates who submitted applications.
        </p>
      </div>

      <div className="divide-y">
        {applications.map((application) => (
          <article
            key={application.id}
            className="flex gap-4 py-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground ring-1 ring-border">
              {application.candidate.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold">
                {application.candidate}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {application.role} at {application.company} •{" "}
                {application.experience}
              </p>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {application.appliedAt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
