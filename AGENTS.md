# AI Agent Instructions

This repository is a small static multi-page showcase for GUI CONNECT.

## What this repo contains

- `index.html` — homepage with hero, value props and navigation
- `services.html` — service offering details
- `about.html` — company story, mission and experience
- `partners.html` — partner and integration overview
- `contact.html` — standalone contact page with Brevo-ready form
- `style.css` — shared styling for the entire site
- `script.js` — shared UI behavior for dark mode and contact form handling
- `README.md` — short repo description
- `CNAME` — custom domain configuration for GitHub Pages

## Conventions

- No build system, package manager, or test framework is present.
- Keep the site static: HTML, CSS, and vanilla JavaScript only.
- Maintain a professional French presentation with clear bilingual labels where needed.
- Keep the UI clean, readable, and accessible: black/white base with blue accent buttons.
- Prefer page separation by use case rather than a single long document.

## Useful notes for changes

- Navigation is managed via separate HTML pages linked in the sticky header.
- The contact form uses a Brevo placeholder in `script.js` and falls back to `mailto:` when `brevoApiKey` is empty.
- The main business email is `contactus@gui-connect.com`.
- Use the existing file structure and keep page content focused on each section's purpose.

## How to preview

- Open any HTML file directly in a browser.
- Or serve the folder with a static server if you want proper relative link behavior.

## When not to do this

- Do not add Node, React, or other frameworks unless the user explicitly requests a migration.
- Do not introduce backend services in this repository.
- Do not convert this into a dynamic app unless the user asks for a new architecture.
