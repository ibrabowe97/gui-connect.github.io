# GUI CONNECT Website

Instructional context for the **GUI CONNECT** static website. This project is a multi-page showcase for an IT and digital services agency, built with vanilla web technologies.

## Project Overview

- **Purpose:** Professional showcase for IT services (web, mobile, infrastructure, support).
- **Architecture:** Hybrid (Static Frontend + Node.js Backend Bridge).
- **Key Technologies:**
  - **HTML5/CSS3:** Semantic structure and custom styling (glassmorphism).
  - **Vanilla JavaScript:** Frontend logic and i18n.
  - **Node.js (Express):** Backend API in `/api` to securely handle email.
- **i18n:** All UI strings are stored in a `translations` object within `script.js`.
- **Deployment:** Hetzner VPS via Coolify (Static Site + Node.js Service).

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
├── tests/
│   └── verify-site.js  # Static site verification script
├── CNAME               # Custom domain config
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
- Set the domain (e.g., `gui-connect.com`).

#### 2. Backend API
- Create a **Node.js** resource in Coolify.
- Set the **Base Directory** to `/api`.
- Set the **Start Command** to `npm start`.
- Set the domain (e.g., `api.demo.gui-connect.com`).
- **Environment Variables:**
  - `BREVO_API_KEY`: Your private Brevo key.
  - `BREVO_SENDER`: The verified sender email.

### Testing & Verification
The project includes a custom verification script that checks for missing i18n keys, nav consistency, and UI rules:
```bash
# Run the verification script
node tests/verify-site.js

# Optional: Check JS syntax
node --check script.js
```

## Development Conventions

### 1. Internationalization (i18n)
- **Do NOT** hardcode text in HTML files. Use `data-i18n-key` for text content or `data-i18n-placeholder-key` for placeholders.
- Add new strings to the `translations` object in `script.js` for both `fr` and `en`.
- Ensure the `verify-site.js` script passes after adding new keys.

### 2. Styling (CSS)
- Use CSS variables defined in `:root` and `body.light-mode-active` for consistent theming.
- Follow the "glass-style" design system for headers and cards.
- **Responsive Design:** The site uses a breakpoint at `960px` for mobile/tablet layouts (hamburger menu, compact controls).

### 3. Contact Form
- The frontend sends data to the Node.js backend (`/api/send-email`).
- **Security:** The Brevo API key is NEVER exposed on the frontend. It is managed via server-side environment variables.
- **Privacy:** Client-facing copy must remain professional. Avoid exposing internal provider names (like Brevo) in the UI.

### 4. Page Structure
- Every page must include the shared sticky header and the "footer project showcase" (`class="footer-projects"`).
- Keep content focused by use case rather than building a single-page app.
