# TNP Job Portal Management System

A full-stack Job Portal Management System built for TNP's machine test. The application features complete role-based authorization (Admin and Candidate/User), token lifecycle management (JWT access tokens with revocable HTTP-only refresh tokens), database-enforced integrity (PostgreSQL with Prisma), dynamic job filtering, candidate profile completion guards, and real-time frontend state sync via Redux Toolkit and RTK Query.

---

## Deliverables Summary

| Deliverable                | Location / Command                                                                                                |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Source Code Repository** | Root workspace monorepo (`apps/web`, `apps/api`, `packages/*`)                                                    |
| **Setup Instructions**     | Detailed below in [Quick Start Guide](#quick-start-guide-simplest-setup)                                          |
| **Environment Samples**    | [`.env.example`](file://./.env.example) (root Docker) & [`apps/api/.env.example`](file://./apps/api/.env.example) |
| **Database Migrations**    | [`apps/api/migrations/`](file://./apps/api/migrations)                                                            |
| **Seed / Master Data**     | [`apps/api/src/prisma/seeds/`](file://./apps/api/src/prisma/seeds) (`npm run seed:api`)                           |

---

## Quick Start Guide (Simplest Setup)

Follow these 5 simple steps to get the entire project up and running locally.

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Docker & Docker Compose** (or a local PostgreSQL server >= 15)

---

### Step 1: Install Dependencies

From the project root directory, install all dependencies for the monorepo:

```bash
npm install
```

---

### Step 2: Configure Environment Variables

Copy the example environment files for Docker Compose and the backend API:

```bash
# 1. Root environment (for Docker Compose PostgreSQL)
cp .env.example .env

# 2. API environment (for Express backend)
cp apps/api/.env.example apps/api/.env
```

_Note: The default `.env` files are pre-configured to work out of the box with the local Docker PostgreSQL database._

---

### Step 3: Start Database

Start PostgreSQL 16 using Docker Compose:

```bash
docker compose up -d
```

_(If you are using your own existing PostgreSQL instance, update `DATABASE_URL` in `apps/api/.env` to point to your database connection string)._

---

### Step 4: Run Migrations & Seed Data

Seed default admin/user accounts and sample job postings into PostgreSQL:

```bash
npm run seed:api
```

---

### Step 5: Start Development Servers

Run the backend API and frontend web app concurrently in separate terminal windows:

**Terminal 1 (Backend API):**

```bash
npm run dev:api
```

_(Runs Express API server at `http://localhost:3000`)_

**Terminal 2 (Frontend Web App):**

```bash
npm run dev:web
```

_(Runs Vite dev server at `http://localhost:5173`)_

---

## Default Accounts

The database seed populates two pre-configured accounts for testing both roles:

| Role          | Email               | Password    | Capabilities                                                                  |
| :------------ | :------------------ | :---------- | :---------------------------------------------------------------------------- |
| **Admin**     | `admin@company.com` | `Admin@123` | Create/Edit/Delete jobs, manage candidate applications, view all job statuses |
| **Candidate** | `user@company.com`  | `User@123`  | Complete candidate profile, browse published jobs, apply to open roles        |

---

## Key Features & Architecture

### 1. Security & Token Lifecycle

- **Access & Refresh Tokens**: Short-lived JWT access tokens accompanied by persisted, revocable HTTP-only refresh tokens stored in PostgreSQL.
- **Role Enforcement**: Endpoint authorization middleware verifies `ADMIN` vs `USER` permissions on every API request.

### 2. Candidate & Job Management

- **Profile Completion Guard**: Candidates must complete mandatory profile fields (experience, education, expected salary, notice period, skills) before applying.
- **Duplicate Application Protection**: Database unique constraint on `(userId, jobId)` prevents duplicate application submissions at the database layer.
- **Real-Time DB Sync**: Opening a job detail automatically queries `GET /jobs/:id` and syncs application status live from PostgreSQL.
- **Infinite Scrolling**: Smooth infinite scrolling for browsing published job listings.

### 3. Admin Workflow

- **Job CRUD & Status Management**: Admins can publish, draft, or close job postings and set featured roles.
- **Application Management**: Admins view candidate snapshots and update application pipeline statuses (`APPLIED`, `REVIEWING`, `ACCEPTED`, `REJECTED`).

---

## Project Structure

```
├── apps/
│   ├── api/                    # Express 5 API application
│   │   ├── migrations/         # Prisma migration snapshots & history
│   │   ├── src/
│   │   │   ├── middleware/     # Auth & Role authorization middleware
│   │   │   ├── modules/        # Domain modules (auth, jobs, applications, profile)
│   │   │   └── prisma/         # Prisma DB client, schema & seeders
│   │   └── .env.example        # Backend environment template
│   └── web/                    # React 19 + Vite web application
│       └── src/
│           ├── app/            # Redux store configuration
│           ├── components/     # Shared layout, brand, & shadcn UI primitives
│           ├── features/       # Feature modules (auth, jobs, applications, profile)
│           ├── pages/          # React Router pages
│           └── services/       # Base RTK Query API client
├── decisions.md                # Source of truth for product & engineering decisions
├── AGENTS.md                   # Repository guidelines and conventions
├── docker-compose.yml          # PostgreSQL 16 container definition
└── package.json                # Root npm workspace configuration
```

---

## Available Commands

| Command             | Description                                                       |
| :------------------ | :---------------------------------------------------------------- |
| `npm run dev:api`   | Starts the Express backend API server in watch mode               |
| `npm run dev:web`   | Starts the React/Vite web application dev server                  |
| `npm run seed:api`  | Seeds default users and initial job listings into PostgreSQL      |
| `npm run build:web` | Compiles TypeScript and builds production assets for the frontend |
| `npm run lint`      | Runs ESLint across all monorepo packages                          |
| `npm run format`    | Formats code using Prettier                                       |

---

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Redux Toolkit (RTK Query), Tailwind CSS v4, shadcn/ui, Lucide Icons, React Router v7.
- **Backend**: Node.js, Express 5, TypeScript ESM, Prisma PostgreSQL ORM, JWT, Bcrypt, Zod.
- **Database**: PostgreSQL 16.
