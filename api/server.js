const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

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

// --- Secure Docs Route ---
const docsUser = process.env.DOCS_USER || "admin";
const docsPass = process.env.DOCS_PASS || "gui-connect-2026";

app.use(
  "/docs",
  basicAuth({
    users: { [docsUser]: docsPass },
    challenge: true,
    realm: "GUI CONNECT API Documentation",
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
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
app.post("/send-email", async (req, res) => {
  const { name, email, phone, service, message } = req.body;
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoSender = process.env.BREVO_SENDER || "ceo@gui-connect.com";
  const brevoRecipient = process.env.BREVO_RECIPIENT || brevoSender;

  if (!brevoApiKey) {
    console.error("BREVO_API_KEY is not configured on the server.");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailSubject = `Contact GUI CONNECT - ${service}`;
  const htmlContent = `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone || "N/A"}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
  `;

  const payload = {
    sender: { email: brevoSender },
    to: [{ email: brevoRecipient }],
    subject: emailSubject,
    replyTo: { email: email, name: name },
    htmlContent,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      throw new Error("Failed to send email via Brevo");
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
