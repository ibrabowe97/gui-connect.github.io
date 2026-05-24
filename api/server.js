const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // In production, you might want to restrict this to your domain

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

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
