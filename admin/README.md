# admin

React + TypeScript admin panel scaffold, built with Vite.

## Stack
- Vite + React 19 + TypeScript
- react-router-dom (routing, protected routes)
- axios (API client with auth interceptor)
- Context-based auth (localStorage token, swap for httpOnly cookies when you wire up the real backend)

## Structure
```
src/
  api/          axios instance + endpoint calls
  components/   shared/reusable UI components
  context/      AuthContext (login state)
  hooks/        custom hooks
  pages/        route-level pages (Login, Dashboard, ...)
  routes/       ProtectedRoute and route guards
  types/        shared TS types/interfaces
  utils/        helper functions
```

## Setup
```bash
cd admin
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

## Notes
- Login currently expects a backend endpoint POST /auth/login returning { token }.
- ProtectedRoute redirects to /login if no token is present.
- Swap the axios withCredentials / localStorage approach for httpOnly cookies if your backend supports it -- more secure for admin panels.
- Add more pages under src/pages and register routes in src/App.tsx.
- npm audit showed 2 high severity issues in dev-only deps (esbuild/vite chain) -- safe to ignore for local dev; run npm audit fix before deploying if you want them cleared.
