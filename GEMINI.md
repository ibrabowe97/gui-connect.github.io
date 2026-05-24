# GUI CONNECT Website

Instructional context for the **GUI CONNECT** hybrid application. This project is a professional showcase for an IT and digital services agency, utilizing a secure architecture to protect business credentials.

## Project Overview

- **Purpose:** Professional showcase for IT services (web, mobile, infrastructure, support).
- **Architecture:** Hybrid (Static Frontend + Node.js Backend API).
- **Key Technologies:**
  - **HTML5/CSS3:** Semantic structure with custom styling (glassmorphism).
  - **Vanilla JavaScript:** Frontend logic, i18n, and SweetAlert2 integration.
  - **Node.js (Express):** Backend API located in `/api` to securely handle transactional emails via Brevo.
- **Hosting:** Hetzner VPS via Coolify.
  - **Frontend:** `https://app.gui-connect.com`
  - **Backend API:** `https://api.gui-connect.com`
- **i18n:** All UI strings are stored in a `translations` object within `script.js`.

## Project Structure

```text
.
├── api/                # Backend API (Secure Brevo Bridge)
│   ├── package.json
│   └── server.js
├── index.html          # Homepage
├── services.html       # Detailed service offerings
├── about.html          # Company mission and experience
├── resources.html      # Guides and resources
├── partners.html       # Technical partners
├── contact.html        # Contact form
├── style.css           # Global styles and themes
├── script.js           # Main logic (i18n, UI state, form handling)
├── favicon.svg         # Brand initials favicon
├── tests/
│   └── verify-site.js  # Static site verification script
├── AGENTS.md           # Internal agent instructions
└── README.md           # Project documentation
```

## Building and Running

### Development
1. **Frontend:** Open any HTML file or run `python3 -m http.server 8000`.
2. **Backend:** 
   ```bash
   cd api
   npm install
   BREVO_API_KEY=your_key node server.js
   ```

### Deployment (Coolify)

#### 1. Static Frontend
- Create a **Static Site** resource in Coolify.
- Base Directory: `/`.
- Domain: `https://app.gui-connect.com`.

#### 2. Backend API
- Create a **Node.js** resource in Coolify.
- Base Directory: `/api`.
- Start Command: `npm start`.
- Domain: `https://api.gui-connect.com`.
- **Environment Variables:**
  - `BREVO_API_KEY`: Your private Brevo key.
  - `BREVO_SENDER`: e.g., `ceo@gui-connect.com`.
  - `BREVO_RECIPIENT`: e.g., `ceo@gui-connect.com`.

### Testing & Verification
The project includes a custom verification script that checks for missing i18n keys, nav consistency, and UI rules:
```bash
node tests/verify-site.js
```

## Development Conventions

### 1. Internationalization (i18n)
- **Do NOT** hardcode text in HTML files. Use `data-i18n-key` for text content or `data-i18n-placeholder-key` for placeholders.
- Add new strings to the `translations` object in `script.js` for both `fr` and `en`.

### 2. Styling (CSS)
- Use CSS variables defined in `:root` and `body.light-mode-active` for consistent theming.
- Follow the "glass-style" design system for headers and cards.
- **Responsive Design:** The site uses a breakpoint at `960px` for mobile/tablet layouts.

### 3. Contact Form
- The frontend sends data to the Node.js backend (`/api/send-email`).
- **Security:** The Brevo API key is NEVER exposed on the frontend. It is managed via server-side environment variables in Coolify.
- **UI/UX**: Use `Swal.fire` (SweetAlert2) for all user feedback (loading, success, error).

### 4. Page Structure
- Every page must include the shared sticky header and the "footer project showcase" (`class="footer-projects"`).
- Keep content focused by use case rather than building a single-page app.
