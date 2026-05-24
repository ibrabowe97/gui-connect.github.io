# GUI CONNECT Website & API

Professional showcase website for **GUI CONNECT**, an IT and digital services agency. This project uses a hybrid architecture with a static frontend and a secure Node.js backend.

## Features

- **Responsive Multi-page Site**: Home, services, resources, partners, about, and contact.
- **Modern UI**: Sticky glass-style header, dark/light mode, and SweetAlert2 for polished feedback.
- **Secure Contact Form**: Uses a Node.js backend proxy to communicate with Brevo without exposing API keys.
- **Internationalization**: Full French and English support managed via `script.js`.
- **Hybrid Hosting**: Deployed on Hetzner VPS via Coolify.

## Project Structure

```text
.
├── api/                # Node.js Express backend (Brevo Bridge)
├── index.html          # Main pages (about, contact, services, etc.)
├── style.css           # Global glassmorphism styles
├── script.js           # Frontend logic & i18n
├── favicon.svg         # Site favicon
└── tests/              # Static site verification tools
```

## Preview & Local Development

### Frontend
Serve the root directory with any static server:
```bash
python3 -m http.server 8000
```

### Backend
Navigate to the `/api` directory, install dependencies, and run with your Brevo key:
```bash
cd api
npm install
BREVO_API_KEY=your_key node server.js
```

## Verification
Run the built-in verification script to ensure i18n keys and navigation are consistent:
```bash
node tests/verify-site.js
```

## Deployment

The project is hosted on **Hetzner** and managed with **Coolify**.

- **App URL**: [https://app.gui-connect.com](https://app.gui-connect.com)
- **API URL**: [https://api.gui-connect.com](https://api.gui-connect.com)

Deployment involves creating two resources in Coolify from this repository:
1. **Static Site**: Base directory `/`.
2. **Node.js**: Base directory `/api`, with `BREVO_API_KEY`, `BREVO_SENDER`, and `BREVO_RECIPIENT` environment variables.

## Development Rules

- **No Hardcoded Text**: Use the i18n system in `script.js` and `data-i18n-key` in HTML.
- **Security First**: All sensitive logic must stay in the `/api` backend.
- **Style Consistency**: Adhere to the defined CSS variables and glassmorphism design language.
