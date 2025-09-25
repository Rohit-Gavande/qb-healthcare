
# QB Healthcare — 3-tier Demo (Docker + Docker Compose + Jenkins CI/CD)

This repository contains a minimal, working 3-tier healthcare demo:

- Frontend: static HTML/JS served by nginx (patient/doctor portal UI)
- Backend: Node.js + Express API for appointments, patients, and records
- Database: PostgreSQL with an init SQL script (sample data)



Run locally:
1. Install Docker & Docker Compose.
2. From repo root run: `docker compose up --build`
3. Frontend: http://localhost:3000  (nginx)
   Backend API: http://localhost:5000/api/...

Notes:
- This is a demo. DO NOT use in production without proper security (TLS, auth, secrets management).
