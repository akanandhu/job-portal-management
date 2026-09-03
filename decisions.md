# Decisions

Engineering decisions for the TNP Job Portal assignment.

---

## Product

### Admin publish to user discovery to application

**Decision:** The portal has two role-based experiences.

- **Admin:** create, edit, delete, status toggle, filter, and manage job applications.
- **User (Candidate):** profile completion, discover jobs, search/category filter, view details, and submit applications.

Both experiences share the same frontend, API, authentication, and PostgreSQL database.

**Why:** Clear separation of responsibilities ensures recruiters can manage listings and applications efficiently without polluting job-seeker discovery workflows.

---

## Architecture

### React to Express to PostgreSQL

**Decision:** Use a conventional three-layer architecture.

| Layer             | Responsibility                                                                                    |
| :---------------- | :------------------------------------------------------------------------------------------------ |
| **React web app** | UI, forms, routing, Redux Toolkit state, RTK Query API caching, Tailwind composition              |
| **Express API**   | Auth, authorization, Zod validation, and business logic                                           |
| **PostgreSQL**    | Relational data persistence for Users, Candidate Profiles, Jobs, Applications, and Refresh Tokens |

**Tradeoff:** This requires more initial setup and boilerplate than a monolithic server-rendered framework or frontend-only mock, but responsibilities are explicit, decoupled, and independently testable.

---

### npm workspaces

**Decision:** Keep the project as a workspace monorepo with `apps/web`, `apps/api`, and reserved `packages/*`.

**Why:** Web and API evolve independently while sharing a single repository, single install step (`npm install`), unified lockfile, and room for shared contract packages.

**Tradeoff:** Requires workspace-aware script execution (`--workspace=web`), but avoids code duplication across separate repositories.

---

### REST API

**Decision:** Expose authentication, jobs, applications, and candidate profiles as predictable REST resources.

**Alternative:** GraphQL was considered but deemed unnecessary for this application scope.

**Tradeoff:** Filtering and pagination require query parameters (`status`, `page`, `limit`), but API endpoints remain simple, standard, and easy to inspect.

---

## Authentication & Authorization

### Access and Refresh Tokens

**Decision:** Use short-lived JWT access tokens with persisted, revocable refresh tokens stored in PostgreSQL.

**Why:** Allows active sessions to be renewed seamlessly while keeping access tokens short-lived. Refresh tokens can be revoked immediately upon logout or password invalidation.

**Tradeoff:** Requires database persistence, rotation, expiry tracking, and cookie lifecycle logic on the server.

---

### Backend-Enforced Roles

**Decision:** Admin permissions are strictly enforced by backend API authorization middleware (`requireRole("ADMIN")`).

**Why:** The frontend hides admin controls for non-admin users, but client-side UI hiding is not security. The backend remains the sole authorization source of truth.

**Tradeoff:** Authorization checks must run on every protected route handler.

---

### Cross-Tab Login Session & Token Rotation

**Decision:** Maintain cross-tab authenticated session continuity via HttpOnly refresh token cookies with automatic silent access token renewal (`POST /auth/refresh`).

**Why:** Users who log in or refresh tokens in one browser tab remain seamlessly authenticated across other tabs without requiring manual re-login. Upon logout or token revocation, sessions are invalidated globally.

**Tradeoff:** Requires HTTP-only cookie configuration (`sameSite: "lax"`, `httpOnly: true`) and automatic token re-authentication handling in RTK Query base query middleware.

---

## Database & Data Integrity

### PostgreSQL Source of Truth

**Decision:** PostgreSQL is the single source of truth for all entities.

The domain is naturally relational (`User -> CandidateProfile`, `User -> Application -> Job`, `User -> RefreshToken`).

**Alternative:** MongoDB was considered unnecessary for strongly related entities with strict schema constraints.

---

### Prisma ORM & Migrations

**Decision:** Use Prisma PostgreSQL ORM and schema tools for typed database access and reproducible migration history (`apps/api/migrations`).

**Tradeoff:** Introduces a build and contract generation step (`npx prisma generate`), but avoids raw SQL string vulnerabilities and keeps database access typed across TypeScript modules.

---

### Prevent Duplicate Applications

**Decision:** Enforce a unique database constraint on `(userId, jobId)`.

**Why:** Application-level validation checks can fail under race conditions or concurrent HTTP requests. A database uniqueness constraint guarantees duplicate application prevention at the storage layer.

**Tradeoff:** Application submission handlers must catch constraint violation errors and return clear HTTP 409 responses.

---

## Candidate Profile Guard

### Mandatory Candidate Profile Completion

**Decision:** Candidates must complete a candidate profile (experience, education, expected salary, notice period, skills) before submitting job applications.

**Why:** Ensures application snapshots delivered to recruiters contain valid contact, experience, and salary expectations.

**Tradeoff:** Adds a prerequisite step for new candidates, which is handled via automatic navigation guards (`ProfileRequiredRoute`).

---

## Job Detail & Candidate Actions

### Job Detail DB Sync

**Decision:** Opening a job detail view automatically queries `GET /jobs/:id` and syncs live application status directly from PostgreSQL DB.

**Why:** Ensures job status (PUBLISHED, CLOSED, DRAFT) and candidate application state (`hasApplied`) are 100% accurate against the database source of truth.

---

### Scoped Action Visibility

**Decision:** The "Apply" and "Edit Profile" buttons on job detail pages are strictly visible to authenticated candidate users (`isAuthenticated && isCandidate`).

**Why:** Admins manage postings and candidate applications; they do not submit job applications or edit candidate profiles. Unauthenticated users cannot submit applications without logging in.

**Tradeoff:** Action buttons must be conditionally passed based on user auth state.

---

## State Management

### Redux Toolkit & RTK Query

**Decision:** Redux Toolkit with RTK Query handles all shared state, backend API caching, tag invalidation (`User`, `Job`, `Application`, `CandidateProfile`), and auth slices.

**Alternative:** React Context or component-local state.

**Tradeoff:** Requires slice and API builder boilerplate, but API lifecycle states (`isLoading`, `isError`), query caching, and invalidations remain explicit and predictable.

---

### Keep UI State Local

**Decision:** Component-specific state such as modal visibility, search input text, and active dropdown tabs stay local in React component state (`useState`).

**Why:** Pushing transient UI state into global Redux unnecessarily bloats the store and triggers unnecessary re-renders.

---

## Engineering Conventions

### `type`, Not `interface`

**Decision:** Domain and app type definitions use `type`, never `interface`, with the existing `I` suffix convention (`JobI`, `UserI`, `ApplicationI`).

**Exception:** Ambient declaration files may use `interface` where TypeScript declaration merging requires it.

**Tradeoff:** Disables ambient declaration merging for ordinary app types, which is intentional for predictability.

---

### File Size Extraction Signal

**Decision:** Around 150 lines is the code extraction signal to decompose large modules into focused sub-components.

**Why:** Catches components doing too many jobs before they become hard to review or maintain.

---

### Conventional Commits

**Decision:** Commit history follows Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).

---

## Principle

Keep the implementation typed, relational, predictable, and intentionally simple. The assignment needs clear boundaries, correct authorization, data integrity, and an app that remains easy to read and operate.
