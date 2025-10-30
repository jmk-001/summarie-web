# Summarie Web

Summarie Web is a Vue 3 + TypeScript frontend for creating documents and generating AI-powered summaries. It integrates REST authentication and a GraphQL API with real‑time updates via subscriptions.

## Features
- Authentication (sign in / sign up) against a REST API
- Create documents and kick off summary jobs
- Live summary updates via GraphQL subscriptions (WebSocket)
- Prompt presets UI components
- Dark theme and responsive UI with Tailwind CSS

## Tech Stack
- Vue 3, TypeScript, Vite
- Vue Router, Pinia
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Apollo Client (`@apollo/client`) + `graphql-ws`
- Axios for REST calls

## Prerequisites
- Node.js 18+ and npm 10+
- A running Summarie API with:
  - REST base at `VITE_API_BASE` (e.g., `http://localhost:3000`)
  - GraphQL endpoint at `${VITE_API_BASE}/graphql`
  - WebSocket subscriptions at the same path with `ws(s)` scheme

## Quick Start
1. Install dependencies:
   - `npm install` (or `npm ci`)
2. Configure environment:
   - Copy `.env.example` to `.env`
   - Set `VITE_API_BASE` (e.g., `http://localhost:3000`)
3. Start the dev server:
   - `npm run dev`
4. Build for production:
   - `npm run build`
5. Preview the production build:
   - `npm run preview`

## Configuration
- `VITE_API_BASE`
  - Base URL for both REST and GraphQL.
  - REST auth endpoints expected at `/auth/sign-in` and `/auth/sign-up`.
  - GraphQL HTTP at `${VITE_API_BASE}/graphql` with WebSocket subscriptions using the same path and `ws(s)` scheme.
- Authentication
  - Stores `accessToken` in `localStorage`.
  - Protected routes redirect to `/login` when not authenticated.

## Project Structure (overview)
- `src/main.ts` — App bootstrap (Pinia, Router, Apollo Client)
- `src/router.ts` — Public and protected routes
- `src/stores/` — Pinia stores (auth, documents, summary jobs/results)
- `src/services/rest/` — Axios instance and interceptors
- `src/services/graphql/` — Apollo Client, queries, mutations, subscriptions
- `src/composables/useSummaryFlow.ts` — Orchestrates document + summary flow
- `src/pages/` — `Login.vue`, `Dashboard.vue`
- `src/components/` — UI components (content IO, presets, menus, etc.)

## Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build
- `npm run preview` — Preview built assets

## Troubleshooting
- 401 Unauthorized on requests
  - Ensure `VITE_API_BASE` points to the correct API and CORS is allowed.
  - Verify valid credentials; token is stored in `localStorage`.
- No live summary updates
  - Confirm WebSocket access to `${VITE_API_BASE}/graphql` and that subscriptions are enabled on the server.

## License
This repository does not currently include a license file. If you intend to open source or distribute, add an appropriate `LICENSE` file.
