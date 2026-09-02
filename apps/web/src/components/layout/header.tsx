import { ArrowRight } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#featured", label: "Featured jobs" },
  { href: "#categories", label: "Categories" },
  { href: "#product", label: "Product" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <BrandLogo />
        <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>
            Register
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
