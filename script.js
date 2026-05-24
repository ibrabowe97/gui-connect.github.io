const brevoApiKey = "";
const brevoSender = "contactus@gui-connect.com";

function toggleDarkMode() {
  document.body.classList.toggle("light-mode-active");
  const button = document.querySelector(".dark-mode");
  button.textContent = document.body.classList.contains("light-mode-active")
    ? "Mode Sombre"
    : "Mode Clair";
}

function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim(),
  };

  if (!data.name || !data.email || !data.service) {
    alert(
      "Veuillez remplir les champs obligatoires. / Please fill the required fields.",
    );
    return;
  }

  if (!brevoApiKey) {
    alert(
      "Brevo n’est pas configuré. Le formulaire s’ouvrira en mode email. / Brevo is not configured. Opening your mail client.",
    );
    const subject = encodeURIComponent(`Contact GUI CONNECT - ${data.service}`);
    const body = encodeURIComponent(
      `Nom: ${data.name}\nEmail: ${data.email}\nTéléphone: ${data.phone}\nService: ${data.service}\nMessage:\n${data.message}`,
    );
    globalThis.location.href = `mailto:${brevoSender}?subject=${subject}&body=${body}`;
    return;
  }

  const payload = {
    sender: { email: brevoSender },
    to: [{ email: brevoSender }],
    subject: `Nouveau contact GUI CONNECT — ${data.service}`,
    htmlContent: `<h2>Nouveau message</h2><p><strong>Nom:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Téléphone:</strong> ${data.phone}</p><p><strong>Service:</strong> ${data.service}</p><p><strong>Message:</strong><br>${data.message.replaceAll("\n", "<br>")}</p>`,
  };

  fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur d’envoi Brevo");
      }
      return response.json();
    })
    .then(() => {
      alert("Message envoyé avec succès. / Message sent successfully.");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert(
        "Impossible d’envoyer via Brevo. Vérifiez la configuration. / Brevo send failed.",
      );
    });
}
