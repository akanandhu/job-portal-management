import { BriefcaseBusiness, Sparkles, UsersRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const audienceCards = [
  {
    icon: UsersRound,
    title: "For professionals",
    copy: "Build a profile that proves what you can do before anyone asks for a resume.",
  },
  {
    icon: BriefcaseBusiness,
    title: "For founders",
    copy: "Post roles where ambitious builders already maintain proof and reputation.",
  },
  {
    icon: Sparkles,
    title: "For teams",
    copy: "Discover talent through shared context, mutual peers, and demonstrated work.",
  },
];

export function AudienceCards() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3 md:px-10">
      {audienceCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardHeader>
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{item.copy}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
