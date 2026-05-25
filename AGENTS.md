# AI Agent Instructions

This repository contains the **GUI CONNECT** showcase website and its secure backend bridge. Keep changes small, verified, and consistent with the current design system in `DESIGN.md`.

## Project Architecture

- **Hybrid model**:
  - **Frontend**: Static multi-page site served from the repo root with HTML, CSS, and vanilla JavaScript.
  - **Backend**: Node.js Express API in `/api` that proxies contact email requests to Brevo.
- **Hosting**: Hetzner VPS managed via Coolify.
  - Frontend: `https://app.gui-connect.com`
  - Backend API: `https://api.gui-connect.com`
- **Runtime API endpoints**:
  - `GET /health` returns `OK`.
  - `POST /send-email` sends contact form messages through Brevo.
  - `GET /docs` serves protected Swagger UI.

## Core Components

- `index.html` - Homepage and partner/provider section.
- `services.html`, `resources.html`, `projects.html`, `about.html`, `contact.html` - Static frontend pages.
- `projects.html` - Selected work showcase; do not refer to a separate `partners.html` page.
- `api/server.js` - Express backend, Brevo integration, health check, and Swagger docs.
- `style.css` - Shared responsive styles, theme variables, and Claude-inspired editorial overrides.
- `script.js` - Frontend logic, translations, theme/language state, mobile nav, and SweetAlert2 form feedback.
- `DESIGN.md` - Current visual design reference and token source.
- `tests/verify-site.js` - Static verification for i18n, navigation, responsive structure, and CSS rules.

## Conventions

- **Internationalization**: Use `data-i18n-key` for visible text and `data-i18n-placeholder-key` for placeholders. Store all user-facing strings in `script.js` for both `fr` and `en`.
- **Navigation**: Preserve the primary nav order: `index.html`, `services.html`, `resources.html`, `projects.html`, `about.html`. Contact is a translated header CTA and mobile menu CTA, not a primary nav item.
- **Styling**: Follow `DESIGN.md` and the existing CSS variables. The current design is warm editorial: cream canvas, coral CTAs, serif display headings, compact cards, and careful light-mode contrast.
- **Responsive behavior**: The main breakpoint is `960px`. Keep the hamburger nav, compact language toggle, and compact theme control aligned with the existing CSS and verification script.
- **Footer**: The standard page footer is compact with CTA buttons. In light mode it must stay on light design surfaces; do not force black/dark footer panels unless the surrounding section is intentionally dark.
- **Security**: Never put API keys, SMTP credentials, or docs passwords in frontend files. Use backend environment variables.
- **UI/UX**: Use SweetAlert2 (`Swal.fire`) for user feedback, loading states, success, and error messages.

## Development & Testing

- **Local Preview**: Use a static server (e.g., `python3 -m http.server`) for the frontend.
- **Backend**: Run `npm start` inside `/api` with the required env vars.
- **Verification**: Run `node tests/verify-site.js` after changes to HTML, CSS, translations, nav, footer, or contact behavior.
- **Whitespace**: Run `git diff --check` before committing.

## Deployment Notes

- Deploying to Coolify requires two resources from the same repo:
  1. A **Static Site** for the root `/`.
  2. A **Node.js** resource for the `/api` directory.
- Required API env var: `BREVO_API_KEY`.
- Recommended API env vars: `BREVO_SENDER`, `BREVO_RECIPIENT`, `DOCS_USER`, `DOCS_PASS`.
- DNS is configured with a wildcard `*` pointing to the Hetzner IP.
