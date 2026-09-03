import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { BrandLogo } from "@/components/brand/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/app/hook";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/store/auth-selectors";

const navLinks = [
  { href: "#featured", label: "Featured jobs" },
  { href: "#categories", label: "Categories" },
  { href: "#product", label: "Product" },
];

export function Header() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const authenticatedRoute = user?.role === "ADMIN" ? "/dashboard" : "/listing";
  const authenticatedLabel = user?.role === "ADMIN" ? "Go to dashboard" : "Go to listing";

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <BrandLogo />
        <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link to={authenticatedRoute} className={buttonVariants()}>
              {authenticatedLabel}
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "ghost",
                  className: "hidden sm:inline-flex",
                })}
              >
                Sign in
              </Link>
              <Link to="/register" className={buttonVariants()}>
                Register
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
