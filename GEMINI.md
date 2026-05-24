# GUI CONNECT Website

Instructional context for the **GUI CONNECT** static website. This project is a multi-page showcase for an IT and digital services agency, built with vanilla web technologies.

## Project Overview

- **Purpose:** Professional showcase for IT services (web, mobile, infrastructure, support).
- **Architecture:** Static multi-page site (HTML/CSS/JS).
- **Key Technologies:**
  - **HTML5:** Semantic structure with custom data attributes for i18n (`data-i18n-key`, `data-i18n-placeholder-key`).
  - **CSS3:** Custom properties (variables), Flexbox, Grid, and a "glassmorphism" aesthetic. Supports dark/light modes.
  - **Vanilla JavaScript:** Handles internationalization (FR/EN), theme switching, header behavior (auto-hide), and form logic.
- **i18n:** All UI strings are stored in a `translations` object within `script.js`.
- **Deployment:** GitHub Pages (custom domain: `gui-connect.com`).

## Project Structure

```text
.
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
Since this is a static project, no build step is required. You can preview it by opening any HTML file in a browser.

For a local server environment (recommended for correct URL behavior):
```bash
# Using Python
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

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
- The form has a fallback: if `brevoApiKey` is empty in `script.js`, it uses `mailto:`.
- **Privacy:** Client-facing copy must remain professional. Avoid exposing internal provider names (like Brevo) in the UI.
- **Security:** Never commit API keys to this repository.

### 4. Page Structure
- Every page must include the shared sticky header and the "footer project showcase" (`class="footer-projects"`).
- Keep content focused by use case rather than building a single-page app.
