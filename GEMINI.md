# GUI CONNECT Website

Instructional context for the **GUI CONNECT** hybrid application. This project is a professional showcase for an IT and digital services agency with a static frontend and a secure backend bridge for contact email.

## Project Overview

- **Purpose:** Showcase IT services, selected projects, resources, and contact entry points for GUI CONNECT.
- **Architecture:** Hybrid static frontend plus Node.js Express backend API.
- **Frontend:** HTML, CSS, and vanilla JavaScript served from the repository root.
- **Backend:** Express API in `/api` that handles Brevo email delivery and protected Swagger documentation.
- **Design:** Claude-inspired editorial system from `DESIGN.md`: cream canvas, coral actions, serif headings, compact cards, responsive navigation, and strict light-mode contrast.
- **Hosting:** Hetzner VPS via Coolify.
  - Frontend: `https://app.gui-connect.com`
  - Backend API: `https://api.gui-connect.com`
- **i18n:** All UI strings live in the `translations` object in `script.js`.

## Project Structure

```text
.
├── api/
│   ├── package.json        # Express dependencies and npm start
│   └── server.js           # Brevo bridge, /health, /send-email, /docs
├── index.html              # Homepage and partner/provider section
├── services.html           # Detailed service offerings
├── resources.html          # Guides and resources
├── projects.html           # Selected project showcase
├── about.html              # Company mission and experience
├── contact.html            # Contact form
├── DESIGN.md               # Current visual design reference
├── style.css               # Shared styles, tokens, responsive behavior
├── script.js               # i18n, UI state, nav, form handling
├── favicon.svg             # Brand initials favicon
├── tests/verify-site.js    # Static site verification script
├── AGENTS.md               # Agent instructions
└── README.md               # Project documentation
```

## Building and Running

### Frontend

Serve the root directory:

```bash
python3 -m http.server 8000
```

### Backend

Run from `/api`:

```bash
cd api
npm install
BREVO_API_KEY=your_key npm start
```

Backend endpoints:

- `GET /health`
- `POST /send-email`
- `GET /docs` with basic auth

Backend environment variables:

- `PORT`: optional, defaults to `3000`.
- `BREVO_API_KEY`: required for email sending.
- `BREVO_SENDER`: optional sender email.
- `BREVO_RECIPIENT`: optional recipient email.
- `DOCS_USER`: optional Swagger docs username.
- `DOCS_PASS`: Swagger docs password for deployment.

## Deployment (Coolify)

### Static Frontend

- Resource type: Static Site
- Base directory: `/`
- Domain: `https://app.gui-connect.com`

### Backend API

- Resource type: Node.js
- Base directory: `/api`
- Start command: `npm start`
- Domain: `https://api.gui-connect.com`
- Required env: `BREVO_API_KEY`
- Recommended env: `BREVO_SENDER`, `BREVO_RECIPIENT`, `DOCS_USER`, `DOCS_PASS`

DNS uses a wildcard record pointing to the Hetzner server.

## Testing & Verification

Run these before committing or deploying:

```bash
node tests/verify-site.js
git diff --check
```

`tests/verify-site.js` checks i18n coverage, nav order, header behavior, responsive menu rules, project links, footer light-mode colors, and CSS theme token usage.

## Development Conventions

### 1. Internationalization

- Do not hardcode new user-facing copy in HTML when it should be translated.
- Use `data-i18n-key` for text content.
- Use `data-i18n-placeholder-key` for form placeholders.
- Add every new key to both `translations.fr` and `translations.en` in `script.js`.

### 2. Page and Navigation Structure

- Current pages are `index.html`, `services.html`, `resources.html`, `projects.html`, `about.html`, and `contact.html`.
- There is no `partners.html`; partners/providers are a section on `index.html`.
- Primary nav order is Home, Services, Resources, Projects, About.
- Contact must remain a translated header CTA and mobile menu CTA, not a primary nav item.
- Each page keeps the shared sticky header and compact footer CTA area.
- `projects.html` owns the selected project grid.

### 3. Styling

- Follow `DESIGN.md` and the tokens in `style.css`.
- Use the warm editorial design language: cream surfaces, coral CTAs, serif display headings, restrained borders, and compact cards.
- Preserve readable light-mode contrast. Do not force dark footer/card panels in light mode unless a section is intentionally dark.
- Keep the responsive breakpoint at `960px` unless the whole responsive system is updated intentionally.

### 4. Contact Form and API

- The frontend sends contact data to `https://api.gui-connect.com/send-email`.
- API keys and credentials stay server-side in `/api`.
- Use `Swal.fire` for loading, success, warning, and error feedback.
- Do not expose Brevo or backend configuration details in user-facing frontend copy.
