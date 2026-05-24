# AI Agent Instructions

This repository contains the **GUI CONNECT** showcase website and its secure backend bridge.

## Project Architecture

- **Hybrid Model**: 
  - **Frontend**: Static multi-page site (HTML/CSS/Vanilla JS) served from the root.
  - **Backend**: Node.js Express API located in `/api` to proxy email requests to Brevo.
- **Hosting**: Hetzner VPS managed via Coolify.
  - Frontend: `https://app.gui-connect.com`
  - Backend API: `https://api.gui-connect.com`

## Core Components

- `index.html`, `services.html`, etc. — Frontend pages.
- `api/server.js` — Secure Node.js backend for Brevo integration.
- `style.css` — Shared styling (glassmorphism, dark/light modes).
- `script.js` — Frontend logic, i18n, and SweetAlert2 integration for form feedback.
- `favicon.svg` — Brand initials icon.

## Conventions

- **Internationalization**: Use `data-i18n-key` in HTML. Store all strings in `script.js`.
- **Styling**: Use CSS variables for theming. Breakpoint is `960px`.
- **Security**: **NEVER** put API keys in the frontend. Use environment variables in the backend (`BREVO_API_KEY`).
- **UI/UX**: Use SweetAlert2 for user feedback (alerts, success, loading states).

## Development & Testing

- **Local Preview**: Use a static server (e.g., `python3 -m http.server`) for the frontend.
- **Backend**: Run `node server.js` inside `/api` with the required env vars.
- **Verification**: Run `node tests/verify-site.js` to check i18n and structure consistency.

## Deployment Notes

- Deploying to Coolify requires two resources from the same repo:
  1. A **Static Site** for the root `/`.
  2. A **Node.js** resource for the `/api` directory.
- DNS is configured with a wildcard `*` pointing to the Hetzner IP.
