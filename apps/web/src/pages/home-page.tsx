import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AudienceCards } from "@/features/landing/components/audience-cards";
import { FeaturedJobs } from "@/features/landing/components/featured-jobs";
import { Hero } from "@/features/landing/components/hero";
import { JobCategories } from "@/features/landing/components/job-categories";

const HomePage = () => {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <Header />
      <Hero />
      <FeaturedJobs />
      <JobCategories />
      <AudienceCards />
      <Footer />
    </main>
  );
};

export default HomePage;
