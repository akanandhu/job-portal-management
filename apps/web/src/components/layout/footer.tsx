import { BrandLogo } from '@/components/brand/brand-logo'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="space-y-3">
          <BrandLogo />
          <p className="max-w-md text-sm text-muted-foreground">
            A professional network and job marketplace for people who want their
            work to speak first.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-medium text-muted-foreground">
          <a href="#featured" className="hover:text-foreground">
            Jobs
          </a>
          <a href="#categories" className="hover:text-foreground">
            Categories
          </a>
          <a href="#product" className="hover:text-foreground">
            Product
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}
