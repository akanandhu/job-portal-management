import { ArrowRight } from 'lucide-react'

import { BrandLogo } from '@/components/brand/brand-logo'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <BrandLogo />
        <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#featured" className="transition hover:text-foreground">
            Featured jobs
          </a>
          <a href="#categories" className="transition hover:text-foreground">
            Categories
          </a>
          <a href="#product" className="transition hover:text-foreground">
            Product
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button>
            Join waitlist
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </nav>
    </header>
  )
}
