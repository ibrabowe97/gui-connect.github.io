# GUI CONNECT Website

Static multi-page showcase website for GUI CONNECT, an IT and digital services agency. The site is designed for GitHub Pages and uses plain HTML, CSS, and vanilla JavaScript only.

## Features

- Responsive multi-page website: home, services, resources, partners, about, and contact.
- Sticky glass-style header with desktop navigation and a hamburger menu on tablet/mobile.
- Mobile-friendly icon controls for language and theme switching.
- French and English UI copy managed from `script.js`.
- Dark/light theme preference saved in `localStorage`.
- Contact form with validation, email fallback, and a Brevo-ready integration placeholder.
- Shared footer project showcase across pages.
- Static verification script for navigation, i18n keys, responsive rules, and contact copy.

## Pages

- `index.html` - homepage with hero, positioning, calls to action, and service highlights.
- `services.html` - detailed service offering.
- `resources.html` - practical resources and guides.
- `partners.html` - technical partners and integrations.
- `about.html` - company story, mission, approach, and experience.
- `contact.html` - contact form for project requests.

## Project Structure

```text
.
├── index.html
├── services.html
├── resources.html
├── partners.html
├── about.html
├── contact.html
├── style.css
├── script.js
├── tests/
│   └── verify-site.js
├── CNAME
└── README.md
```

## Preview Locally

Open any HTML file directly in a browser, or run a simple static server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Verification

Run the static site checks:

```bash
node tests/verify-site.js
```

Optional syntax check for the shared JavaScript:

```bash
node --check script.js
```

## Contact Form Notes

The form currently keeps the user-facing copy generic: users see `Envoyer` / `Send`, not internal provider names.

`script.js` contains a Brevo-ready placeholder:

```js
const brevoApiKey = "";
const brevoSender = "contactus@gui-connect.com";
```

For production, do not expose a Brevo API key in frontend JavaScript. Use a server-side endpoint or serverless function to receive the form submission, validate it, then call Brevo securely. When `brevoApiKey` is empty, the form falls back to `mailto:contactus@gui-connect.com`.

## Deployment

The repository is configured for GitHub Pages. The `CNAME` file points the custom domain to:

```text
gui-connect.com
```

Push changes to the default branch to publish through GitHub Pages.

## Development Rules

- Keep the site static: no Node build step, React, backend, or framework.
- Keep page content focused by use case instead of merging everything into one page.
- Keep client-facing copy professional, clear, and bilingual where needed.
- Keep provider names such as Brevo out of user-facing contact form copy.
