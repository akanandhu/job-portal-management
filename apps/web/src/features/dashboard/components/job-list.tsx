import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Plus } from "lucide-react";

type JobItemI = {
  id: string;
  title: string;
  company: string;
  location: string;
  workplaceType: string;
  experience: string;
  postedAt: string;
  logo: string;
};

const jobs: JobItemI[] = [
  {
    id: "1",
    title: "Product Designer",
    company: "Landeed",
    location: "Hyderabad, India",
    workplaceType: "In-Office",
    experience: "1+ years",
    postedAt: "2d ago",
    logo: "LA",
  },
  {
    id: "2",
    title: "Software Engineer",
    company: "Baxter",
    location: "Bangalore, India",
    workplaceType: "In-Office",
    experience: "0-3 years",
    postedAt: "5d ago",
    logo: "BX",
  },
  {
    id: "3",
    title: "Senior Software Engineer I - Mobile Developer",
    company: "Talkdesk",
    location: "Bengaluru, India",
    workplaceType: "In-Office",
    experience: "6+ years",
    postedAt: "5d ago",
    logo: "TD",
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "GE Healthcare",
    location: "Bengaluru, India",
    workplaceType: "Hybrid",
    experience: "2+ years",
    postedAt: "6d ago",
    logo: "GE",
  },
  {
    id: "5",
    title: "Application Developer",
    company: "Barclays",
    location: "Pune, India",
    workplaceType: "In-Office",
    experience: "0-2 years",
    postedAt: "6d ago",
    logo: "BA",
  },
  {
    id: "6",
    title: "Front-End Integration Engineer",
    company: "NVIDIA",
    location: "Bengaluru, India",
    workplaceType: "Remote",
    experience: "2+ years",
    postedAt: "7d ago",
    logo: "NV",
  },
];

export function JobList() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-5">
        <div>
          <h1 className="text-xl font-semibold">All jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage active job posts and candidate visibility.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add job
        </Button>
      </div>

      <div className="divide-y">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="flex gap-4 py-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/15">
              {job.logo}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold">
                {job.title}{" "}
                <span className="font-normal text-foreground">
                  at {job.company}
                </span>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.workplaceType} ({job.location}) • {job.experience}
              </p>
            </div>
            <div className="hidden items-start gap-2 text-sm text-muted-foreground sm:flex">
              <BriefcaseBusiness className="mt-0.5 size-4" />
              {job.postedAt}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
