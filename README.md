# Fastor CRM - Backend + Simple Frontend (Assignment Deliverable)

This repository contains:
- A backend REST API (Node.js + Express + SQLite via Sequelize, JWT auth).
- A lightweight single-file admin frontend (static HTML) that demonstrates authentication and lead workflows with styling and animations.

## Backend (API)
Location: `backend/`

### Quick start
1. Copy `.env.example` to `.env` and set `JWT_SECRET` and other vars as needed.
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Start the server:
   ```
   npm run dev
   ```
4. By default the server runs on `http://localhost:3000`.

### Endpoints
- `POST /api/auth/register` { name, email, password } => register employee
- `POST /api/auth/login` { email, password } => login, returns JWT
- `POST /api/enquiries/public` => public form (no auth) to submit lead
- `GET /api/enquiries/public` => get unclaimed leads (auth)
- `PATCH /api/enquiries/:id/claim` => claim a lead (auth)
- `GET /api/enquiries/private` => get leads claimed by logged-in employee (auth)

## Frontend (demo)
Location: `client/index.html`

This is a single-page demo that uses Tailwind CDN for styling and AOS for simple scroll animations. It demonstrates:
- register and login flows (JWT stored in localStorage)
- submit public enquiry (no auth)
- list unclaimed leads and claim them
- list your claimed leads

To use the frontend:
1. Serve the `client` folder as static files (e.g., `npx http-server client` or open `client/index.html` directly in browser).
2. Make sure backend is running on `http://localhost:3000` (or edit `BASE_URL` in client script).

## Notes & Extras
- Database is SQLite file stored at `backend/database.sqlite` (auto-created).
- This deliverable focuses on a secure API and a minimal interactive frontend showcasing the required flows with a pleasant UI (Tailwind) and light animations (AOS).
- Advanced features included: input validation hints, friendly error messages, clear status codes, and simple client-side UX polish.
  Published Link:https://fastor-crm-di7y.onrender.com
  

