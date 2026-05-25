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

Optional backend environment variables:

- `PORT`: API port, default `3000`.
- `BREVO_API_KEY`: required for sending email.
- `BREVO_SENDER`: sender address, defaults to `ceo@gui-connect.com`.
- `BREVO_RECIPIENT`: recipient address, defaults to `BREVO_SENDER`.
- `DOCS_USER`: Swagger docs username, defaults to `admin`.
- `DOCS_PASS`: Swagger docs password for non-local deployments.

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
   - Required env: `BREVO_API_KEY`
   - Recommended env: `BREVO_SENDER`, `BREVO_RECIPIENT`, `DOCS_USER`, `DOCS_PASS`

DNS uses a wildcard record pointing to the Hetzner server.

## Development Standards

- Keep secrets server-side. Never place Brevo keys, SMTP credentials, or docs passwords in frontend files.
- Use the i18n system for UI copy. Add every new text key to both `translations.fr` and `translations.en` in `script.js`.
- Follow `DESIGN.md` and the CSS variables in `style.css`. The current visual language is warm editorial: cream surfaces, coral actions, compact cards, and readable light-mode contrast.
- Keep the breakpoint at `960px` unless the responsive system is updated deliberately.
- Preserve the primary nav order: Home, Services, Resources, Projects, About. Contact stays as a header/mobile CTA, not a primary nav item.
- Use SweetAlert2 (`Swal.fire`) for contact form feedback and user-visible status messages.
- Run `node tests/verify-site.js` after changes to HTML, CSS, copy, navigation, i18n, or contact form behavior.
