# TNP Job Portal

A Job Portal Management System for TNP's machine test. The app models users, jobs, applications, candidate profiles, and refresh tokens in PostgreSQL, exposes backend behavior through an Express API, and delivers admin/user flows through one React web app.

## Principles

- **Depth over breadth** - token lifecycle, authorization, validation, duplicate application protection, and profile completion rules matter more than shipping many shallow screens.
- **Real world first** - handle stale sessions, duplicate apply attempts, empty states, failed login, and denied admin access deliberately.
- **Deliberate calls** - record significant product, architecture, and folder-structure choices in `decisions.md`.
- **Trustworthy by default** - make loading, empty, error, and success states explicit instead of leaving stale or silent UI.

## Decisions

`decisions.md` is the source of truth for why a choice was made. This file is the source of truth for what lives where and how future agents should work in this repo.

## Stack And Layout

- Root workspace: npm workspaces under `apps/*` and `packages/*`.
- Web app: `apps/web` - React 19, Vite, TypeScript, `react-router`, Redux Toolkit (RTK Query), shadcn/ui, Tailwind CSS v4, lucide icons.
- API app: `apps/api` - Express 5, TypeScript ESM, Prisma PostgreSQL tooling, JWT auth, bcrypt, CORS, dotenv, Zod.
- Shared packages: `packages/*` is reserved for shared contracts and common code.

## Web Structure

- `apps/web/src/App.tsx` - route table only. Keep it focused on `react-router` routes.
- `apps/web/src/pages` - route-level page composition, for example `home-page.tsx`, `listings-page.tsx`, `auth-page.tsx`, `login-page.tsx`, `register-page.tsx`, and `candidate-profile-page.tsx`.
- `apps/web/src/features/<feature>/components` - feature-specific sections and widgets.
- `apps/web/src/features/<feature>/store` - RTK Query APIs and Redux slice definitions (`auth-api`, `jobs-api`, `applications-api`, `profile-api`).
- `apps/web/src/components/ui` - shadcn-generated primitives only (`button`, `input`, `badge`, `card`, `dialog`, `table`, etc.). Do not place product-specific components here.
- `apps/web/src/components/layout` - shared app chrome such as `Header` and `Footer`.
- `apps/web/src/components/brand` - reusable brand identity such as `BrandLogo`.
- `apps/web/src/lib` - small shared utilities such as `cn()`.

## API Structure

- `apps/api/src/server.ts` - loads environment and starts the HTTP server.
- `apps/api/src/app.ts` - Express app setup, global middleware, route mounting, health route, and error handling.
- `apps/api/src/modules/<domain>` - domain modules (`auth`, `jobs`, `applications`, `profile`). Each module uses `.routes.ts`, `.controller.ts`, `.service.ts`, `.repository.ts`, `.types.ts`, and `.validation.ts`.
- `apps/api/src/middleware` - cross-domain Express middleware such as `authenticate`, `optionalAuthenticate`, and `requireRole`.
- `apps/api/src/prisma` - generated Prisma contract, DB client, and seeders (`users.seed.ts`, `jobs.seed.ts`).
- `apps/api/migrations` - Prisma migration history and snapshots.

## Mounted API Contracts

- **Health Route**: `GET /health`
- **Auth Module**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User authentication
  - `POST /auth/refresh` - Refresh token rotation
  - `POST /auth/logout` - Session revocation
  - `GET /auth/me` - Authenticated user details
- **Jobs Module**:
  - `GET /jobs` - Browse jobs with status/category filtering & pagination
  - `GET /jobs/categories` - Job category counters
  - `GET /jobs/featured` - Featured jobs listing
  - `GET /jobs/:id` - Job details from PostgreSQL DB
  - `POST /jobs` - Admin create job
  - `PATCH /jobs/:id` - Admin update job
  - `DELETE /jobs/:id` - Admin delete job
  - `POST /jobs/:jobId/apply` - Candidate job application submission
  - `GET /jobs/:jobId/applications` - Admin job application list for specific job
- **Applications Module**:
  - `GET /applications/me` - Candidate applications list
  - `GET /applications/all` - Admin list all applications across system
  - `PATCH /applications/:id/status` - Admin update application status
- **Candidate Profile Module**:
  - `GET /profile/candidate` - Get current candidate profile
  - `POST /profile/candidate` - Create/update candidate profile

## Styling & Theme

- Use shadcn/ui components for reusable primitives before hand-rolling controls.
- Use Tailwind CSS v4 utility classes for page layout and feature composition.
- Keep shadcn theme variables in `apps/web/src/index.css`; brand green belongs in CSS variables such as `--primary` and `--ring`.
- Use `cn()` from `apps/web/src/lib/utils.ts` for conditional class merging.
- Use lucide icons for button and section iconography.

## Conventions

| Rule          | Convention                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Types         | Prefer `type`, not `interface`; keep the existing `I` suffix convention for domain/auth types. Ambient declaration files may use `interface` where TypeScript requires merging. |
| Exports       | Default exports for pages and single route modules are acceptable. Use named exports for shared components, utilities, and files with multiple exports.                         |
| Components    | Shared product components go under `components/layout`, `components/brand`, or another shared folder. Feature-specific UI goes under `features/<feature>/components`.           |
| shadcn        | `components/ui` is reserved for generated shadcn primitives and local shadcn-compatible primitives.                                                                             |
| File size     | Around 150 lines is the extraction signal. Split route pages into feature components before they become hard to scan.                                                           |
| Effects       | `useEffect` is for real side effects such as mount fetches and subscriptions. User actions should call handlers directly.                                                       |
| Accessibility | Prefer semantic HTML and native labels. Add ARIA only when semantics cannot express the behavior accurately.                                                                    |
| State         | Redux Toolkit with RTK Query handles all shared backend state, cache invalidation, and auth state. Local-only UI state stays in components.                                     |
| Commits       | Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.                                                                                                          |

## Environment Configuration

- Web runs on Vite dev server (`http://localhost:5173`).
- API runs on port 3000 configured from `apps/api/.env`.
- Keep secrets and local `.env` files out of git; commit example env files (`.env.example`) only.
