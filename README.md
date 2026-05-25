# GUI CONNECT Website & API

Professional showcase website for **GUI CONNECT**, an IT and digital services agency. The repository uses a hybrid architecture: a static multi-page frontend at the repo root and a secure Express API in `/api` for the contact form.

## Current Features

- **Static multi-page frontend**: Home, services, resources, projects, about, and contact.
- **Claude-inspired editorial design**: Warm cream canvas, coral CTAs, serif display headings, compact sticky navigation, responsive mobile menu, and light/dark theme support.
- **Project showcase**: `projects.html` presents selected work and technical delivery context.
- **Secure contact form**: The frontend posts to the backend API, which proxies transactional email through Brevo without exposing API keys.
- **Internationalization**: French and English copy live in `script.js` and are wired from HTML through `data-i18n-key` and `data-i18n-placeholder-key`.
- **API documentation**: Swagger UI is served from `/docs` on the API and protected with basic auth.
- **Hybrid hosting**: Deployed on a Hetzner VPS through Coolify.

## Project Structure

```text
.
├── api/
│   ├── package.json        # Express API dependencies and start script
│   └── server.js           # Brevo email bridge, health check, Swagger docs
├── index.html              # Homepage and partner/provider section
├── services.html           # Service offerings
├── resources.html          # Guides and technical resources
├── projects.html           # Selected project showcase
├── about.html              # Company mission and experience
├── contact.html            # Contact form
├── DESIGN.md               # Current visual design reference
├── style.css               # Shared responsive styles and design tokens
├── script.js               # i18n, theme/language state, nav, contact form
├── tests/verify-site.js    # Static site consistency checks
├── AGENTS.md               # Agent instructions
└── GEMINI.md               # Gemini-oriented project instructions
```

## Local Development

### Frontend

Serve the repository root with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

### Backend API

Run the Express API from `/api`:

```bash
cd api
npm install
BREVO_API_KEY=your_key npm start
```

Useful local endpoints:

- `GET /health` returns `OK`.
- `POST /send-email` sends contact form submissions through Brevo.
- `GET /docs` opens protected Swagger UI.

Backend environment variables:

- `PORT`: API port, default `3000`.
- `BREVO_API_KEY`: required for sending email.
- `BREVO_SENDER`: sender address, defaults to `ceo@gui-connect.com`.
- `BREVO_RECIPIENT`: recipient address, defaults to `BREVO_SENDER`.
- `DOCS_USER`: Swagger docs username. Required when `NODE_ENV=production`.
- `DOCS_PASS`: Swagger docs password. Required when `NODE_ENV=production`.
- `ALLOWED_ORIGINS`: comma-separated browser origins allowed by CORS. Defaults to `https://app.gui-connect.com` and `https://api.gui-connect.com` in production and includes local development origins outside production.

## Verification

Run the repository verification before committing or deploying:

```bash
node tests/verify-site.js
git diff --check
```

The verification script checks i18n coverage, navigation order, responsive menu requirements, theme tokens, footer light-mode rules, project links, and header behavior.

## Deployment

Production is hosted on **Hetzner** and managed with **Coolify**.

- **Frontend**: [https://app.gui-connect.com](https://app.gui-connect.com)
- **Backend API**: [https://api.gui-connect.com](https://api.gui-connect.com)

Coolify uses two resources from this repository:

1. **Static Site**
   - Base directory: `/`
   - Domain: `https://app.gui-connect.com`
2. **Node.js API**
   - Base directory: `/api`
   - Start command: `npm start`
   - Domain: `https://api.gui-connect.com`
   - Required env: `NODE_ENV=production`, `BREVO_API_KEY`, `DOCS_USER`, `DOCS_PASS`
   - Recommended env: `BREVO_SENDER`, `BREVO_RECIPIENT`, `ALLOWED_ORIGINS`

DNS uses a wildcard record pointing to the Hetzner server. The reverse proxy must only route the intended hostnames (`app.gui-connect.com` and `api.gui-connect.com`) and should reject unknown `Host` headers.

## Security Notes

- `/send-email` is rate-limited in memory and validates field types, lengths, email format, and service values before sending to Brevo.
- User-controlled contact fields are HTML-escaped before email rendering and a plain-text alternative is sent.
- The API limits JSON bodies to `10kb`, restricts CORS, sets basic browser security headers, and times out outbound Brevo requests.
- `/docs` has no production default password. Production startup fails unless `DOCS_USER` and `DOCS_PASS` are explicitly set.
- Static pages define a baseline CSP/referrer policy and avoid inline event handlers.
- Configure the frontend reverse proxy/static host to send `frame-ancestors 'none'` and HSTS headers; those cannot be enforced from HTML meta tags.
- SweetAlert2 is pinned to an exact version with SHA-384 SRI on every HTML page.

## Development Standards

- Keep secrets server-side. Never place Brevo keys, SMTP credentials, or docs passwords in frontend files.
- Use the i18n system for UI copy. Add every new text key to both `translations.fr` and `translations.en` in `script.js`.
- Follow `DESIGN.md` and the CSS variables in `style.css`. The current visual language is warm editorial: cream surfaces, coral actions, compact cards, and readable light-mode contrast.
- Keep the breakpoint at `960px` unless the responsive system is updated deliberately.
- Preserve the primary nav order: Home, Services, Resources, Projects, About. Contact stays as a header/mobile CTA, not a primary nav item.
- Do not add inline event handlers. Bind interactions from `script.js` so the page CSP can stay useful.
- Use SweetAlert2 (`Swal.fire`) for contact form feedback and user-visible status messages. Keep its CDN URL exact and update the SRI hash whenever the version changes.
- Run `node tests/verify-site.js` after changes to HTML, CSS, copy, navigation, i18n, or contact form behavior.
