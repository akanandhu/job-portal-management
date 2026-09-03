# Decisions

Engineering decisions for the TNP Job Portal assignment.

---

## Product

### Admin publish to user discovery to application

**Decision:** The portal has two role-based experiences.

- **Admin:** create, edit, delete, filter, and manage jobs.
- **User:** discover jobs, view details, and submit applications.

Both experiences share the same frontend, API, authentication, and database.

---

## Architecture

### React to Express to PostgreSQL

**Decision:** Use a conventional three-layer architecture.

| Layer         | Responsibility                                                       |
| ------------- | -------------------------------------------------------------------- |
| React web app | UI, forms, routing, shadcn/Tailwind composition, planned Redux state |
| Express API   | Auth, authorization, validation, and business logic                  |
| PostgreSQL    | Users, jobs, applications, and refresh tokens                        |

**Tradeoff:** This is more structure than a frontend-only implementation, but the responsibilities are explicit and independently testable.

---

### npm workspaces

**Decision:** Keep the project as a workspace monorepo with `apps/web`, `apps/api`, and reserved `packages/*`.

**Why:** The web and API can evolve independently while still sharing one install, one lockfile, and room for future shared contracts.

---

### REST API

**Decision:** Expose authentication, jobs, and applications as REST resources.

**Current state:** `/health` and `/auth/login` are implemented. Jobs, applications, refresh, and logout endpoints are planned/in progress.

**Alternative:** GraphQL was unnecessary for the assignment scope.

**Tradeoff:** Filtering and pagination require query parameters, but endpoints remain simple and predictable.

---

## Authentication

### Access and refresh tokens

**Decision:** Use short-lived JWT access tokens with persisted, revocable refresh tokens.

**Current state:** Access-token generation/verification is implemented. The `RefreshToken` model exists, and refresh/logout lifecycle work is in progress.

**Why:** Sessions can be renewed while access tokens stay short-lived, and refresh sessions can be revoked.

**Tradeoff:** Requires additional token storage, rotation, expiry, and logout logic.

---

### Backend-enforced roles

**Decision:** Admin permissions are enforced by API authorization middleware.

The frontend may hide admin actions, but the backend remains the authorization source of truth.

---

## Database

### PostgreSQL

**Decision:** PostgreSQL is the source of truth.

The domain is naturally relational: `User -> Application -> Job`, with refresh tokens belonging to users.

**Alternative:** MongoDB was considered unnecessary for strongly related entities.

---

### Prisma

**Decision:** Use Prisma's PostgreSQL tooling and generated contract for typed database access and reproducible schema changes.

**Tradeoff:** Adds schema generation/migration steps but avoids scattered raw SQL and keeps database access typed.

---

### Prevent duplicate applications

**Decision:** Enforce a unique database constraint on `(userId, jobId)`.

**Why:** Application-level checks alone can fail under concurrent requests.

---

## Jobs

### Server-side filtering and pagination

**Decision:** Job filtering and pagination happen through API queries against PostgreSQL.

**Current state:** The job model and indexes exist in the Prisma contract. API route implementation is planned/in progress.

**Alternative:** Fetching every job and filtering in React.

**Tradeoff:** More API state to manage, but response size stays bounded as job volume grows.

---

### Admin-owned CRUD

**Decision:** Creating, updating, and deleting jobs requires an authenticated admin.

Validation runs on both the frontend for immediate feedback and backend for data integrity.

---

## Applications

### Authentication required to apply

**Decision:** Jobs can be browsed publicly, but submitting an application requires authentication.

The API derives the applicant from the authenticated session instead of accepting a trusted `userId` from the client.

---

### Backend owns application integrity

**Decision:** Before creating an application, the API verifies user authentication, job existence, and duplicate application state.

The database uniqueness constraint provides the final duplicate protection.

---

## Frontend

### React Router for page routing

**Decision:** Use `react-router` for frontend routes.

**Current state:** The app routes `/`, `/auth`, and a fallback 404 from `App.tsx`.

**Tradeoff:** Keeps routing explicit without introducing a framework-level router.

---

### shadcn/ui and Tailwind CSS

**Decision:** Use shadcn/ui primitives with Tailwind CSS v4 for the UI system.

**Why:** shadcn gives accessible, copy-owned primitives while Tailwind keeps composition fast and local to the component.

**Tradeoff:** Generated primitives are source code in the app, so changes must be maintained like any other local component.

---

### Folder boundaries

**Decision:** Keep shared UI, layout, brand, pages, and feature-specific components separate.

- `components/ui` is for shadcn primitives only.
- `components/layout` is for shared app chrome such as header/footer.
- `components/brand` is for reusable brand identity.
- `features/<feature>/components` is for feature-specific sections.
- `pages` is for route-level composition.

**Why:** A header/footer is general layout, not a landing feature, while landing sections should stay close to the landing feature.

---

### Reuse before rebuild

**Decision:** Before writing a new component, check whether an existing shadcn primitive or shared component can serve it with props/classes.

**Tradeoff:** Shared components can accumulate options, but that is cheaper than near-duplicate UI drifting apart.

---

### Explicit async states

**Decision:** API-driven screens explicitly handle `loading -> success -> empty -> error`.

This prevents silent failures and stale UI during API operations.

---

### No effect-per-state-change

**Decision:** `useEffect` is for actual side effects only: mount fetches, subscriptions, and cross-tab storage listeners. User actions call plain handlers directly.

**Tradeoff:** The handler may contain more explicit work, but the flow stays traceable.

---

### Accessibility

**Decision:** Semantic HTML and native labelling come first. ARIA is added only where semantics cannot express the state accurately.

**Why:** A wrong or stale ARIA label is worse than a smaller, correct ARIA surface.

---

## State Management

### Redux for shared API state

**Decision:** Redux is the planned shared state layer for authentication, jobs, applications, and API lifecycle states.

**Current state:** Redux is intended/in progress and should remain part of the architecture until explicitly replaced.

**Alternative:** Context or component-local state.

**Tradeoff:** More structure and boilerplate, but CRUD state and asynchronous transitions remain explicit.

---

### Keep UI state local

**Decision:** Component-specific state such as modal visibility, inputs, and dropdowns stays local rather than being pushed into Redux.

---

### Cross-tab auth state sync

**Decision:** Auth state syncs across open tabs via the `storage` event on an auth/session marker, dispatching a Redux reset action in every tab where it fires.

**Current state:** This is part of the planned Redux/auth implementation.

**Alternative:** BroadcastChannel API is cleaner but less necessary for this assignment.

**Tradeoff:** `storage` does not fire in the tab that made the change, so that tab also dispatches the reset locally.

---

## Engineering

### `type`, not `interface`

**Decision:** Domain and app type definitions use `type`, never `interface`, with the existing `I` suffix convention (`JobI`, `UserI`, `ApplicationI`).

**Exception:** Ambient declaration files may use `interface` where TypeScript declaration merging requires it, such as Express request augmentation.

**Tradeoff:** Loses declaration merging for ordinary app types, which this project does not need.

---

### Export style

**Decision:** Pages and single route modules may use default exports. Shared components, utilities, and multi-export files use named exports.

**Why:** This matches the current codebase: route/page files are imported as page modules, while reusable components are easier to refactor with named exports.

---

### File size cap

**Decision:** Around 150 lines is the extraction signal.

**Why:** It catches a component or module doing too many jobs before it becomes hard to review.

---

### Conventional commits

**Decision:** Commit history follows Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.

**Why:** The commit history is part of the machine-test deliverable and should show the order of decisions clearly.

---

### Migrations and seeders

**Decision:** Database changes are reproducible through migrations, and seeders stay isolated from runtime business logic.

---

### Environment configuration

**Decision:** Database URLs, token secrets, ports, and environment-specific settings come from environment variables and are excluded from source control.

Commit example env files only.

---

## Principle

Keep the implementation typed, relational, predictable, and intentionally simple. The assignment needs clear boundaries, correct authorization, data integrity, and an app that remains easy to read after the machine test is over.
