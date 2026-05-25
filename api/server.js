const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const docsUser = process.env.DOCS_USER || (isProduction ? "" : "admin");
const docsPass = process.env.DOCS_PASS || (isProduction ? "" : "local-dev-docs-only");
const DEFAULT_ALLOWED_ORIGINS = [
  "https://app.gui-connect.com",
  "https://api.gui-connect.com",
];
const LOCAL_ALLOWED_ORIGINS = [
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_STORE = new Map();
const BREVO_TIMEOUT_MS = 8000;
const SERVICE_LABELS = {
  web: "Développement web",
  mobile: "Applications mobiles",
  support: "Support informatique",
  hosting: "Hébergement & mail",
};
const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  service: 32,
  message: 3000,
};

if (isProduction && (!process.env.DOCS_USER || !process.env.DOCS_PASS)) {
  throw new Error("DOCS_USER and DOCS_PASS are required in production.");
}

function parseAllowedOrigins(value) {
  if (!value) {
    return isProduction
      ? DEFAULT_ALLOWED_ORIGINS
      : [...DEFAULT_ALLOWED_ORIGINS, ...LOCAL_ALLOWED_ORIGINS];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204,
};

// Middleware
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (isProduction) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=15552000; includeSubDomains",
    );
  }
  next();
});
app.use(express.json({ limit: "10kb" }));
app.use(cors(corsOptions));

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid request payload" };
  }

  const data = {
    name: normalizeString(body.name),
    email: normalizeString(body.email).toLowerCase(),
    phone: normalizeString(body.phone),
    service: normalizeString(body.service),
    message: normalizeString(body.message),
  };

  if (!data.name || !data.email || !data.service || !data.message) {
    return { error: "Missing required fields" };
  }

  for (const [fieldName, maxLength] of Object.entries(FIELD_LIMITS)) {
    if (data[fieldName].length > maxLength) {
      return { error: `${fieldName} is too long` };
    }
  }

  if (!isValidEmail(data.email)) {
    return { error: "Invalid email address" };
  }

  if (!Object.prototype.hasOwnProperty.call(SERVICE_LABELS, data.service)) {
    return { error: "Invalid service" };
  }

  return {
    value: {
      ...data,
      serviceLabel: SERVICE_LABELS[data.service],
    },
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function htmlWithLineBreaks(value) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function rateLimitContact(req, res, next) {
  const now = Date.now();
  const clientKey = req.ip || req.socket.remoteAddress || "unknown";
  const timestamps = (RATE_LIMIT_STORE.get(clientKey) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    res.setHeader("Retry-After", Math.ceil(RATE_LIMIT_WINDOW_MS / 1000));
    return res.status(429).json({ error: "Too many requests" });
  }

  timestamps.push(now);
  RATE_LIMIT_STORE.set(clientKey, timestamps);

  for (const [key, values] of RATE_LIMIT_STORE.entries()) {
    const recent = values.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (recent.length) {
      RATE_LIMIT_STORE.set(key, recent);
    } else {
      RATE_LIMIT_STORE.delete(key);
    }
  }

  next();
}

// --- Swagger Configuration ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GUI CONNECT API",
      version: "1.0.0",
      description: "Secure backend bridge for the GUI CONNECT website.",
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production" 
          ? "https://api.gui-connect.com" 
          : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./server.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/docs",
  basicAuth({
    users: { [docsUser]: docsPass },
    challenge: true,
    realm: "GUI CONNECT API Documentation",
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API is running and healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/**
 * @openapi
 * /send-email:
 *   post:
 *     summary: Send a contact email via Brevo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - service
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               service:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error or configuration error
 */
app.post("/send-email", rateLimitContact, async (req, res) => {
  const validation = validateContactPayload(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const { name, email, phone, serviceLabel, message } = validation.value;
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoSender = process.env.BREVO_SENDER || "ceo@gui-connect.com";
  const brevoRecipient = process.env.BREVO_RECIPIENT || brevoSender;

  if (!brevoApiKey) {
    console.error("BREVO_API_KEY is not configured on the server.");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const emailSubject = `Contact GUI CONNECT - ${serviceLabel}`;
  const htmlContent = `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone:</strong> ${escapeHtml(phone || "N/A")}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Message:</strong><br>${htmlWithLineBreaks(message)}</p>
  `;
  const textContent = [
    "Nouveau message de contact",
    `Nom: ${name}`,
    `Email: ${email}`,
    `Téléphone: ${phone || "N/A"}`,
    `Service: ${serviceLabel}`,
    "Message:",
    message,
  ].join("\n");

  const payload = {
    sender: { email: brevoSender },
    to: [{ email: brevoRecipient }],
    subject: emailSubject,
    replyTo: { email, name },
    htmlContent,
    textContent,
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error:", {
        status: response.status,
        body: errorText.slice(0, 300),
      });
      throw new Error("Failed to send email via Brevo");
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    clearTimeout(timeout);
  }
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error.message === "Origin not allowed") {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  console.error("Request error:", error.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
