import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { name: "Engineering", open: "428 roles", focus: "Frontend, backend, infra" },
  { name: "Design", open: "164 roles", focus: "Product, brand, systems" },
  { name: "Product", open: "219 roles", focus: "PM, growth, strategy" },
  { name: "Marketing", open: "132 roles", focus: "Content, lifecycle, demand" },
  { name: "Operations", open: "98 roles", focus: "People, finance, talent" },
  { name: "Data", open: "145 roles", focus: "Analytics, ML, research" },
];

export function JobCategories() {
  return (
    <section id="categories" className="border-y bg-muted/45">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 max-w-2xl space-y-2">
          <p className="text-sm font-medium text-primary">Category-wise listings</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Browse by how teams hire
          </h2>
          <p className="text-muted-foreground">
            Every category groups roles by craft, intent, and network signals so candidates can move
            fast without sorting through generic listings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.name} className="bg-background">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.focus}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{category.open}</span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
