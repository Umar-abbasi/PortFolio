# Umar Iftikhar Abbasi — Portfolio

A full-stack personal portfolio built on the **PERN stack** (PostgreSQL, Express, React, Node.js) — showcasing work as an Odoo ERP developer, full-stack web developer, and AI engineer.

Live areas: Home, About, Services, Projects (database-backed, with individual case-study pages), Contact (with email notifications), and a JWT-protected Admin dashboard for managing projects and reading contact messages.

---

## Tech Stack

**Client**
- React 18 + Vite
- React Router v6
- Plain CSS (custom design system, no framework)
- Three.js (ambient animated background)

**Server**
- Node.js + Express
- PostgreSQL (via `pg`)
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Input validation (`express-validator`)
- Security middleware: `helmet`, `cors`, `express-rate-limit`
- Transactional email via [Resend](https://resend.com)

---

## Project Structure

```
portfolio-pern/
├── client/                  # React + Vite frontend
│   ├── public/               # Static assets (CV, profile photo)
│   └── src/
│       ├── components/       # Nav, Footer, ProjectCard, ErrorBoundary, etc.
│       ├── pages/             # Home, About, Services, Projects, ProjectDetail,
│       │                       Contact, AdminLogin, AdminDashboard, NotFound
│       ├── lib/                # API client, auth context, shared hooks
│       └── styles/            # Global design-system CSS
│
└── server/                  # Express + PostgreSQL backend
    ├── migrations/           # schema.sql
    └── src/
        ├── routes/            # auth, projects, contact
        ├── middleware/        # JWT auth guard, request validation
        ├── db.js               # PostgreSQL connection pool
        ├── mailer.js           # Resend email notifications
        └── index.js            # Express app entry point
```

---

## Features

- **Public site** — Home, About, Services, Projects, Contact, all ported from an original static design and made fully responsive.
- **Projects are database-backed** — stored in PostgreSQL, fetched via a REST API, each with its own detail page (`/projects/:slug`).
- **Admin dashboard** (`/admin`) — JWT-protected; add, edit, and delete projects, and read incoming contact messages, without touching the database directly.
- **Contact form** — validated server-side, stored in the database, and triggers an email notification (via Resend) to the site owner with reply-to set to the sender.
- **Security hardening** — Helmet security headers, CORS locked to the client origin, rate limiting on login and contact endpoints, parameterized SQL queries throughout, bcrypt-hashed admin password, secrets isolated to `.env` (never committed).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A running [PostgreSQL](https://www.postgresql.org/) instance
- A free [Resend](https://resend.com) account (for contact form email notifications)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio-pern
```

### 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your own values:

```env
PORT=5000
NODE_ENV=development

PGHOST=localhost
PGPORT=5432
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=portfolio

JWT_SECRET=a_long_random_string
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD_HASH=

CLIENT_ORIGIN=http://localhost:5173

RESEND_API_KEY=re_your_resend_key
```

Generate your admin password hash:

```bash
node src/hash-password.js "YourChosenPassword"
```

Paste the output into `ADMIN_PASSWORD_HASH` in `.env`.

Create the database and run the migration:

```bash
# create an empty "portfolio" database in Postgres first, then:
npm run migrate
```

Start the API server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the client

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The site will be available at `http://localhost:5173`. Vite proxies all `/api/*` requests to the server automatically — no extra configuration needed.

### 4. Log into the admin dashboard

Visit `http://localhost:5173/admin/login` and sign in with the `ADMIN_EMAIL` and password you set above. From there you can add, edit, and delete projects, and view contact form submissions.

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | — | Health check |
| `POST` | `/api/auth/login` | — | Admin login, returns a JWT |
| `GET` | `/api/projects` | — | List all projects |
| `GET` | `/api/projects/:slug` | — | Get a single project |
| `POST` | `/api/projects` | Admin | Create a project |
| `PUT` | `/api/projects/:id` | Admin | Update a project |
| `DELETE` | `/api/projects/:id` | Admin | Delete a project |
| `POST` | `/api/contact` | — | Submit the contact form |
| `GET` | `/api/contact` | Admin | List contact messages |
| `PATCH` | `/api/contact/:id/read` | Admin | Mark a message as read |

Admin routes require an `Authorization: Bearer <token>` header, using the JWT returned from `/api/auth/login`.

---

## Environment Variables

Secrets are never committed — `.env` is gitignored in both `client/` and `server/`. Only `server/.env.example` (with placeholder values) is tracked, as a template for anyone setting up the project.

---

## License

Personal portfolio project — all rights reserved. Feel free to use this as a structural reference for your own PERN stack projects.

---

Built by **Umar Iftikhar Abbasi** — [GitHub](https://github.com/Umar-abbasi) · [LinkedIn](https://www.linkedin.com/in/umar-abbasi-f21605025)
