# TNP Job Portal

A Job Portal Management System for TNP's machine test. The app models users, jobs, applications, and refresh tokens in PostgreSQL, exposes backend behavior through an Express API, and delivers admin/user flows through one React web app.

## Principles

- **Depth over breadth** - token lifecycle, authorization, validation, and duplicate application protection matter more than shipping many shallow screens.
- **Real world first** - handle stale sessions, duplicate apply attempts, empty states, failed login, and denied admin access deliberately.
- **Deliberate calls** - record significant product, architecture, and folder-structure choices in `decisions.md`.
- **Trustworthy by default** - make loading, empty, error, and success states explicit instead of leaving stale or silent UI.

## Decisions

`decisions.md` is the source of truth for why a choice was made. This file is the source of truth for what lives where and how future agents should work in this repo.

## Stack And Layout

- Root workspace: npm workspaces under `apps/*` and `packages/*`.
- Web app: `apps/web` - React 19, Vite, TypeScript, `react-router`, shadcn/ui, Tailwind CSS v4, lucide icons.
- API app: `apps/api` - Express 5, TypeScript ESM, Prisma PostgreSQL tooling, JWT auth, bcrypt, CORS, dotenv.
- Shared packages: `packages/*` is reserved for future shared code.

## Web Structure

- `apps/web/src/App.tsx` - route table only. Keep it focused on `react-router` routes.
- `apps/web/src/pages` - route-level page composition, for example `home-page.tsx` and `auth-page.tsx`.
- `apps/web/src/features/<feature>/components` - feature-specific sections and widgets, for example landing `Hero`, `FeaturedJobs`, `JobCategories`, and `AudienceCards`.
- `apps/web/src/components/ui` - shadcn-generated primitives only. Do not place product-specific components here.
- `apps/web/src/components/layout` - shared app chrome such as `Header` and `Footer`.
- `apps/web/src/components/brand` - reusable brand identity such as `BrandLogo`.
- `apps/web/src/lib` - small shared utilities such as `cn()`.

## API Structure

- `apps/api/src/server.ts` - loads environment and starts the HTTP server.
- `apps/api/src/app.ts` - Express app setup, global middleware, route mounting, and health route.
- `apps/api/src/modules/<domain>` - domain modules. Current auth module uses `auth.routes.ts`, `auth.controller.ts`, `auth.service.ts`, `auth.repository.ts`, `auth.types.ts`, and token helpers.
- `apps/api/src/middleware` - cross-domain Express middleware such as `authenticate` and `requireRole`.
- `apps/api/src/prisma` - generated Prisma contract, DB client, and seeders.
- `apps/api/migrations` - Prisma migration history and snapshots.

## Current Contracts

- Web routes: `/`, `/auth`, and fallback `*` route.
- API routes currently mounted:
  - `GET /health`
  - `POST /auth/login`
- Planned API resource routes:
  - Auth refresh/logout using persisted revocable refresh tokens.
  - Jobs browse/filter/admin CRUD.
  - Applications create/list for the authenticated user.
- Database models: `User`, `Job`, `Application`, `RefreshToken`.
- Application uniqueness is enforced at the database layer with `(userId, jobId)`.

## Styling

- Use shadcn/ui components for reusable primitives before hand-rolling controls.
- Use Tailwind CSS v4 utility classes for page layout and feature composition.
- Keep shadcn theme variables in `apps/web/src/index.css`; brand green belongs in CSS variables such as `--primary` and `--ring`.
- Use `cn()` from `apps/web/src/lib/utils.ts` for conditional class merging.
- Use lucide icons for button and section iconography.
- Do not add Astryx or Astryx-style generated agent guidance.

## Conventions

| Rule | Convention |
| --- | --- |
| Types | Prefer `type`, not `interface`; keep the existing `I` suffix convention for domain/auth types. Ambient declaration files may use `interface` where TypeScript requires merging. |
| Exports | Default exports for pages and single route modules are acceptable. Use named exports for shared components, utilities, and files with multiple exports. |
| Components | Shared product components go under `components/layout`, `components/brand`, or another shared folder. Feature-specific UI goes under `features/<feature>/components`. |
| shadcn | `components/ui` is reserved for generated shadcn primitives and local shadcn-compatible primitives. |
| File size | Around 150 lines is the extraction signal. Split route pages into feature components before they become hard to scan. |
| Effects | `useEffect` is for real side effects such as mount fetches and subscriptions. User actions should call handlers directly. |
| Accessibility | Prefer semantic HTML and native labels. Add ARIA only when semantics cannot express the behavior accurately. |
| State | Redux is the planned shared API/auth state layer; local-only UI state stays in components. |
| Commits | Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`. |

## Environment

- Web runs on the Vite dev server.
- API runs on a separate port from `apps/api/.env`.
- Keep secrets and local `.env` files out of git; commit example env files only.

## Open Calls

- Refresh-token persistence and rotation are part of the intended auth design and are in progress.
- Redux is the intended shared frontend state layer and is in progress.
- Jobs and applications API route modules are planned from the database contract but are not yet fully mounted.
