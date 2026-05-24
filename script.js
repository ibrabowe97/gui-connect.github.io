const brevoApiKey = "";
const brevoSender = "contactus@gui-connect.com";

const translations = {
  fr: {
    titleHome: "GUI CONNECT | Accueil",
    titleServices: "GUI CONNECT | Services",
    titleAbout: "GUI CONNECT | À propos",
    titleResources: "GUI CONNECT | Ressources",
    titlePartners: "GUI CONNECT | Partenaires",
    titleContact: "GUI CONNECT | Contact",
    navHome: "Accueil",
    navServices: "Services",
    navAbout: "À propos",
    navResources: "Ressources",
    navPartners: "Partenaires",
    navContact: "Contact",
    themeLight: "Mode Clair",
    themeDark: "Mode Sombre",
    footerProjectsEyebrow: "Réalisations",
    footerProjectsTitle: "Projets accomplis",
    footerProjectsLead:
      "Une sélection de plateformes livrées ou accompagnées, avec leur objectif, infrastructure et socle technique.",
    footerProjectGoalLabel: "Objectif",
    footerProjectInfraLabel: "Infrastructure",
    footerProjectStackLabel: "Stack technique",
    footerProjectAeesgsName: "AEESGS",
    footerProjectAeesgsGoal:
      "Plateforme communautaire pour recenser les élèves, étudiants et stagiaires guinéens au Sénégal, faciliter la communication et coordonner les activités.",
    footerProjectAeesgsInfra: "Hébergement mutualisé Namecheap.",
    footerProjectAeesgsStack: "PHP vanilla, Bootstrap, MySQL.",
    footerProjectBudgetName: "GUI Budget",
    footerProjectBudgetGoal:
      "Application de suivi budgétaire pour organiser les revenus, dépenses et décisions financières au quotidien.",
    footerProjectBudgetInfra:
      "Application déployée sur Railway avec base PostgreSQL hébergée sur Neon.",
    footerProjectBudgetStack: "Laravel, Inertia, PostgreSQL.",
    footerProjectCashminuteName: "CashMinute",
    footerProjectCashminuteGoal:
      "Plateforme fintech de transfert d'argent international, avec parcours web et mobile, canaux de réception et opérations métier à grande échelle.",
    footerProjectCashminuteInfra:
      "Infrastructure AWS pour une activité financière à fort volume.",
    footerProjectCashminuteStack:
      "Écosystème fintech web/mobile, workflows transactionnels et outils opérationnels. Contribution depuis 2022, avec progression jusqu'au rôle d'IT Manager.",
    footerProjectMoreName: "Autres missions",
    footerProjectMoreGoal:
      "Sites, applications, support informatique, messagerie, domaines, hébergement et accompagnement technique pour des clients en Afrique et au Royaume-Uni.",
    footerProjectMoreInfra:
      "Railway, Hetzner, AWS, Namecheap et environnements cloud ou hébergements adaptés au besoin.",
    footerProjectMoreStack:
      "Laravel, Spring Boot, React, Angular, Docker, PostgreSQL, Redis, Kafka, Linux, Windows et outils collaboratifs.",
    footerTagline: "GUI CONNECT — informatique, web et mobile",
    homeEyebrow: "Agence informatique et digitale",
    homeHeroTitle:
      "Nous construisons des expériences numériques solides et professionnelles.",
    homeHeroText:
      "GUI CONNECT accompagne les entreprises dans la création, le développement et la maintenance de sites web, plateformes, applications mobiles et infrastructures informatiques.",
    homePrimaryCta: "Parlons de votre projet",
    homeSecondaryCta: "Voir nos services",
    homeStatExperienceTitle: "IT management · Dev · Architecture",
    homeStatExperienceText:
      "Plusieurs années d'expérience comme IT manager, développeur et architecte logiciel, avec une vision complète du produit, de l'infrastructure et de la livraison.",
    homeStatCountries: "Royaume-Uni · Égypte · Pakistan",
    homeStatCountriesText:
      "équipes multiculturelles au Royaume-Uni, en Égypte et au Pakistan.",
    homeStatClients: "Clients",
    homeStatClientsText: "Guinée, Sénégal, Royaume-Uni, Nigeria et plus.",
    homeSpotlightEyebrow: "Ce que nous faisons",
    homeSpotlightTitle: "Solutions digitales sur mesure",
    homeWebTitle: "Web & applications",
    homeWebText:
      "Sites vitrines, plateformes logicielles en ligne, applications React et Angular, UX soignée.",
    homeBackendTitle: "Serveur robuste",
    homeBackendText:
      "Laravel, Spring Boot, Docker, PostgreSQL, Redis et Kafka pour un serveur fiable.",
    homeSupportTitle: "Support & infrastructure",
    homeSupportText:
      "Maintenance poste, installation Office, messagerie, domaines et hébergement dans le nuage.",
    servicesEyebrow: "Nos services",
    servicesHeroTitle:
      "Une offre complète autour du digital et de l'infrastructure informatique.",
    servicesLead:
      "Développement web et mobile, architecture serveur, déploiement dans le nuage, support et maintenance informatique — tout ce dont votre projet a besoin.",
    servicesWebTitle: "Développement web & applications",
    servicesWebText:
      "Création de sites vitrines, plateformes logicielles en ligne et applications web sur mesure avec React, Angular, Laravel et Spring Boot.",
    servicesBackendTitle: "Serveurs & interfaces de programmation",
    servicesBackendText:
      "Conception d'interfaces de programmation robustes et évolutives, microservices, Docker, PostgreSQL, Redis et Kafka pour des architectures serveurs performantes.",
    servicesHostingTitle: "Infrastructure & hébergement",
    servicesHostingText:
      "Déploiement sécurisé sur Railway, Hetzner et Amazon Web Services, gestion des environnements, sauvegarde et monitoring.",
    servicesSupportTitle: "Support informatique et maintenance",
    servicesSupportText:
      "Gestion des ordinateurs, installation Office, support Windows, Linux, macOS, et services de messagerie professionnelle.",
    servicesConsultingTitle: "Conseil & conception",
    servicesConsultingText:
      "Accompagnement stratégique pour définir l'architecture, améliorer les parcours utilisateurs et réduire les risques techniques.",
    servicesQualityTitle: "Qualité et sécurité",
    servicesQualityText:
      "Mise en place de bonnes pratiques, sauvegardes, mises à jour et supervision pour garantir stabilité et sécurité.",
    aboutEyebrow: "À propos de nous",
    aboutHeroTitle:
      "Une agence informatique agile, expérimentée et orientée résultat.",
    aboutLead:
      "Plusieurs années d'expérience en management IT, développement et architecture logicielle pour des clients en Guinée, Sénégal, Royaume-Uni et Nigeria.",
    aboutMissionTitle: "Notre mission",
    aboutMissionText:
      "Offrir des solutions digitales claires, fiables et adaptées aux besoins des entreprises africaines et internationales.",
    aboutExpertiseTitle: "Notre expertise",
    aboutExpertiseText:
      "Du développement web aux applications mobiles, du nuage à l'administration système, nous couvrons l'ensemble de la chaîne digitale.",
    aboutApproachTitle: "Notre approche",
    aboutApproachText:
      "Conception centrée client, excellence technique, support réactif et relation de confiance avec chaque projet.",
    aboutExperienceEyebrow: "Expérience",
    aboutExperienceTitle: "Une équipe structurée, prête à vous accompagner",
    aboutMetricRoleLabel: "Multi-rôle",
    aboutMetricManagement:
      "Expérience combinée d'IT manager, développeur et architecte logiciel",
    aboutMetricCountries: "Pays avec des clients actifs",
    aboutMetricTechnologies: "Technologies et services maîtrisés",
    resourcesEyebrow: "Ressources",
    resourcesHeroTitle: "Documents et guides pour vos projets numériques.",
    resourcesLead:
      "Explorez des idées, des bonnes pratiques et des ressources pratiques pour la conception, le déploiement et la maintenance de plateformes digitales.",
    resourcesGuideTitle: "Guide de développement",
    resourcesGuideText:
      "Conseils sur la création de sites web et d'applications mobiles performants et accessibles.",
    resourcesArchitectureTitle: "Architecture serveur",
    resourcesArchitectureText:
      "Recommandations pour des architectures serveurs fiables avec des outils modernes et une infrastructure automatisée.",
    resourcesSupportTitle: "Support informatique",
    resourcesSupportText:
      "Pratiques de maintenance, supervision et gestion d'environnements Windows, Linux et macOS.",
    partnersEyebrow: "Partenaires",
    partnersHeroTitle: "Nos collaborations et intégrations.",
    partnersLead:
      "Nous travaillons avec des fournisseurs techniques et des partenaires locaux pour assurer la meilleure qualité de service.",
    partnersRailwayText:
      "Hébergement rapide pour prototypage et déploiement d'applications.",
    partnersHetznerText:
      "Infrastructure dans le nuage et serveurs performants à coût maîtrisé.",
    partnersAwsText:
      "Services managés, scalabilité et résilience pour les projets critiques.",
    partnersBrevoText:
      "Communication multicanale pour emails, WhatsApp, SMS et notifications.",
    contactEyebrow: "Contact",
    contactHeroTitle:
      "Contactez-nous pour votre projet informatique ou digital.",
    contactLead:
      "Utilisez le formulaire ci-dessous pour une demande de devis ou une discussion rapide sur votre besoin.",
    contactNameLabel: "Nom",
    contactNamePlaceholder: "Votre nom",
    contactEmailLabel: "Email",
    contactPhoneLabel: "Téléphone",
    contactServiceLabel: "Service demandé",
    contactServicePlaceholder: "Choisissez un service",
    contactServiceWeb: "Développement web",
    contactServiceMobile: "Applications mobiles",
    contactServiceSupport: "Support informatique",
    contactServiceHosting: "Hébergement & mail",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Décrivez votre besoin",
    contactSubmit: "Envoyer via Brevo",
    contactNote:
      "Aucune donnée n'est stockée ici. Brevo est utilisé pour l'envoi ou un fallback email est appliqué.",
    contactRequiredAlert: "Veuillez remplir les champs obligatoires.",
    contactBrevoMissingAlert:
      "Brevo n’est pas configuré. Le formulaire s’ouvrira en mode email.",
    contactEmailSubject: "Contact GUI CONNECT",
    contactPhoneEmailLabel: "Téléphone",
    contactServiceEmailLabel: "Service",
    contactMessageEmailLabel: "Message",
    contactSuccessAlert: "Message envoyé avec succès.",
    contactBrevoFailAlert:
      "Impossible d’envoyer via Brevo. Vérifiez la configuration.",
  },
  en: {
    titleHome: "GUI CONNECT | Home",
    titleServices: "GUI CONNECT | Services",
    titleAbout: "GUI CONNECT | About",
    titleResources: "GUI CONNECT | Resources",
    titlePartners: "GUI CONNECT | Partners",
    titleContact: "GUI CONNECT | Contact",
    navHome: "Home",
    navServices: "Services",
    navAbout: "About",
    navResources: "Resources",
    navPartners: "Partners",
    navContact: "Contact",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    footerProjectsEyebrow: "Selected Work",
    footerProjectsTitle: "Projects delivered",
    footerProjectsLead:
      "A selection of platforms delivered or supported, with their goal, infrastructure, and technical foundation.",
    footerProjectGoalLabel: "Goal",
    footerProjectInfraLabel: "Infrastructure",
    footerProjectStackLabel: "Tech stack",
    footerProjectAeesgsName: "AEESGS",
    footerProjectAeesgsGoal:
      "Community platform for registering Guinean pupils, students, and trainees in Senegal, improving communication and coordinating activities.",
    footerProjectAeesgsInfra: "Namecheap shared hosting.",
    footerProjectAeesgsStack: "Vanilla PHP, Bootstrap, MySQL.",
    footerProjectBudgetName: "GUI Budget",
    footerProjectBudgetGoal:
      "Budget tracking application for organizing income, expenses, and day-to-day financial decisions.",
    footerProjectBudgetInfra:
      "Application deployed on Railway with PostgreSQL hosted on Neon.",
    footerProjectBudgetStack: "Laravel, Inertia, PostgreSQL.",
    footerProjectCashminuteName: "CashMinute",
    footerProjectCashminuteGoal:
      "Business-grade fintech platform for international money transfers, with web and mobile journeys, payout channels, and operational workflows at scale.",
    footerProjectCashminuteInfra:
      "AWS infrastructure for a high-volume financial services business.",
    footerProjectCashminuteStack:
      "Web/mobile fintech ecosystem, transaction workflows, and operational tooling. Joined the team in 2022 and progressed to IT Manager.",
    footerProjectMoreName: "Additional work",
    footerProjectMoreGoal:
      "Websites, applications, IT support, email, domains, hosting, and technical delivery for clients across Africa and the United Kingdom.",
    footerProjectMoreInfra:
      "Railway, Hetzner, AWS, Namecheap, and cloud or hosting environments matched to each project.",
    footerProjectMoreStack:
      "Laravel, Spring Boot, React, Angular, Docker, PostgreSQL, Redis, Kafka, Linux, Windows, and collaboration tooling.",
    footerTagline: "GUI CONNECT — IT, web and mobile",
    homeEyebrow: "IT and digital agency",
    homeHeroTitle: "We build strong, professional digital experiences.",
    homeHeroText:
      "GUI CONNECT helps businesses create, develop, and maintain websites, platforms, mobile applications, and IT infrastructure.",
    homePrimaryCta: "Tell us about your project",
    homeSecondaryCta: "View our services",
    homeStatExperienceTitle: "IT management · Dev · Architecture",
    homeStatExperienceText:
      "Several years of experience as an IT manager, developer, and software architect, with full product, infrastructure, and delivery perspective.",
    homeStatCountries: "United Kingdom · Egypt · Pakistan",
    homeStatCountriesText:
      "multicultural teams across the United Kingdom, Egypt, and Pakistan.",
    homeStatClients: "Clients",
    homeStatClientsText:
      "Guinea, Senegal, United Kingdom, Nigeria, and more.",
    homeSpotlightEyebrow: "What we do",
    homeSpotlightTitle: "Tailored digital solutions",
    homeWebTitle: "Web & applications",
    homeWebText:
      "Showcase websites, online software platforms, React and Angular applications, and polished UX.",
    homeBackendTitle: "Robust server architecture",
    homeBackendText:
      "Laravel, Spring Boot, Docker, PostgreSQL, Redis, and Kafka for reliable server systems.",
    homeSupportTitle: "Support & infrastructure",
    homeSupportText:
      "Workstation maintenance, Office setup, email, domains, and cloud hosting.",
    servicesEyebrow: "Our services",
    servicesHeroTitle:
      "A complete offer for digital products and IT infrastructure.",
    servicesLead:
      "Web and mobile development, server architecture, cloud deployment, IT support, and maintenance — everything your project needs.",
    servicesWebTitle: "Web development & applications",
    servicesWebText:
      "Creation of showcase websites, online software platforms, and custom web applications with React, Angular, Laravel, and Spring Boot.",
    servicesBackendTitle: "Servers & APIs",
    servicesBackendText:
      "Design of robust, scalable APIs, microservices, Docker, PostgreSQL, Redis, and Kafka for high-performing server architectures.",
    servicesHostingTitle: "Infrastructure & hosting",
    servicesHostingText:
      "Secure deployment on Railway, Hetzner, and Amazon Web Services, with environment management, backups, and monitoring.",
    servicesSupportTitle: "IT support and maintenance",
    servicesSupportText:
      "Computer management, Office installation, Windows, Linux, and macOS support, plus professional email services.",
    servicesConsultingTitle: "Consulting & design",
    servicesConsultingText:
      "Strategic support to define architecture, improve user journeys, and reduce technical risk.",
    servicesQualityTitle: "Quality and security",
    servicesQualityText:
      "Best practices, backups, updates, and monitoring to keep systems stable and secure.",
    aboutEyebrow: "About us",
    aboutHeroTitle:
      "An agile, experienced IT agency focused on results.",
    aboutLead:
      "Several years of experience in IT management, development, and software architecture for clients in Guinea, Senegal, the United Kingdom, and Nigeria.",
    aboutMissionTitle: "Our mission",
    aboutMissionText:
      "Provide clear, reliable digital solutions tailored to African and international businesses.",
    aboutExpertiseTitle: "Our expertise",
    aboutExpertiseText:
      "From web development to mobile applications, cloud platforms, and system administration, we cover the full digital delivery chain.",
    aboutApproachTitle: "Our approach",
    aboutApproachText:
      "Client-centered design, technical excellence, responsive support, and trusted relationships for every project.",
    aboutExperienceEyebrow: "Experience",
    aboutExperienceTitle: "A structured team ready to support you",
    aboutMetricRoleLabel: "Multi-role",
    aboutMetricManagement:
      "Combined experience as an IT manager, developer, and software architect",
    aboutMetricCountries: "Countries with active clients",
    aboutMetricTechnologies: "Technologies and services mastered",
    resourcesEyebrow: "Resources",
    resourcesHeroTitle: "Documents and guides for your digital projects.",
    resourcesLead:
      "Explore ideas, best practices, and practical resources for designing, deploying, and maintaining digital platforms.",
    resourcesGuideTitle: "Development guide",
    resourcesGuideText:
      "Guidance on creating high-performing, accessible websites and mobile applications.",
    resourcesArchitectureTitle: "Server architecture",
    resourcesArchitectureText:
      "Recommendations for reliable server architectures with modern tools and automated infrastructure.",
    resourcesSupportTitle: "IT support",
    resourcesSupportText:
      "Maintenance, monitoring, and environment management practices for Windows, Linux, and macOS.",
    partnersEyebrow: "Partners",
    partnersHeroTitle: "Our collaborations and integrations.",
    partnersLead:
      "We work with technical providers and local partners to ensure the best quality of service.",
    partnersRailwayText:
      "Fast hosting for prototyping and application deployment.",
    partnersHetznerText:
      "Cloud infrastructure and high-performance servers at controlled cost.",
    partnersAwsText:
      "Managed services, scalability, and resilience for critical projects.",
    partnersBrevoText:
      "Multichannel communication for email, WhatsApp, SMS, and notifications.",
    contactEyebrow: "Contact",
    contactHeroTitle: "Contact us for your IT or digital project.",
    contactLead:
      "Use the form below to request a quote or start a quick discussion about your needs.",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Your name",
    contactEmailLabel: "Email",
    contactPhoneLabel: "Phone",
    contactServiceLabel: "Requested service",
    contactServicePlaceholder: "Choose a service",
    contactServiceWeb: "Web development",
    contactServiceMobile: "Mobile applications",
    contactServiceSupport: "IT support",
    contactServiceHosting: "Hosting & email",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Describe your needs",
    contactSubmit: "Send via Brevo",
    contactNote:
      "No data is stored here. Brevo is used for sending, or an email fallback is applied.",
    contactRequiredAlert: "Please fill the required fields.",
    contactBrevoMissingAlert:
      "Brevo is not configured. The form will open in email mode.",
    contactEmailSubject: "GUI CONNECT contact",
    contactPhoneEmailLabel: "Phone",
    contactServiceEmailLabel: "Service",
    contactMessageEmailLabel: "Message",
    contactSuccessAlert: "Message sent successfully.",
    contactBrevoFailAlert:
      "Unable to send via Brevo. Please check the configuration.",
  },
};

function normalizeLanguage(lang) {
  return lang === "en" ? "en" : "fr";
}

function getCurrentLanguage() {
  return normalizeLanguage(document.documentElement.lang);
}

function getTranslation(key, lang = getCurrentLanguage()) {
  const selected = normalizeLanguage(lang);
  return translations[selected]?.[key] || translations.fr[key] || "";
}

function applyTranslations(lang) {
  const selected = normalizeLanguage(lang);
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const key = element.dataset.i18nKey;
    const text = getTranslation(key, selected);
    if (text) {
      element.textContent = text;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder-key]").forEach((element) => {
    const key = element.dataset.i18nPlaceholderKey;
    const text = getTranslation(key, selected);
    if (text) {
      element.setAttribute("placeholder", text);
    }
  });
  updateThemeToggleLabel(selected);
}

function switchLanguage(lang) {
  const selected = normalizeLanguage(lang);
  localStorage.setItem("guiConnectLanguage", selected);
  updateLanguageButtons(selected);
  applyTranslations(selected);
}

function toggleLanguage() {
  switchLanguage(getCurrentLanguage() === "fr" ? "en" : "fr");
}

function updateLanguageButtons(lang) {
  const selected = normalizeLanguage(lang);
  document.querySelectorAll(".lang-btn").forEach((button) => {
    const isActive = button.dataset.lang === selected;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const toggle = document.querySelector(".lang-toggle");
  if (!toggle) {
    return;
  }

  const nextLanguage = selected === "fr" ? "English" : "français";
  const label = toggle.querySelector(".lang-toggle-label");
  if (label) {
    label.textContent = selected.toUpperCase();
  }
  toggle.setAttribute("aria-label", `Changer de langue vers ${nextLanguage}`);
  toggle.setAttribute("title", `Changer de langue vers ${nextLanguage}`);
}

function updateThemeToggleLabel(lang = getCurrentLanguage()) {
  const button = document.querySelector(".theme-toggle");
  if (!button) {
    return;
  }
  const isLight = document.body.classList.contains("light-mode-active");
  const text = getTranslation(isLight ? "themeDark" : "themeLight", lang);
  const label =
    typeof button.querySelector === "function"
      ? button.querySelector(".theme-toggle-label")
      : null;
  if (label) {
    label.textContent = text;
  } else {
    button.textContent = text;
  }
  if (typeof button.setAttribute === "function") {
    button.setAttribute("aria-label", text);
    button.setAttribute("title", text);
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("light-mode-active");
  updateThemeToggleLabel();
  localStorage.setItem(
    "guiConnectTheme",
    document.body.classList.contains("light-mode-active") ? "light" : "dark",
  );
}

function initHeaderAutoHide() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  let lastScrollY = Math.max(window.scrollY || 0, 0);
  const showHeader = () => header.classList.remove("site-header-hidden");

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = Math.max(window.scrollY || 0, 0);

      if (
        currentScrollY <= 8 ||
        currentScrollY < lastScrollY ||
        header.classList.contains("menu-open")
      ) {
        showHeader();
      } else if (currentScrollY > lastScrollY) {
        header.classList.add("site-header-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );

  if (typeof header.addEventListener === "function") {
    header.addEventListener("focusin", showHeader);
    header.addEventListener("mouseenter", showHeader);
  }
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!header || !navToggle || !nav) {
    return;
  }

  const setMenuOpen = (isOpen) => {
    header.classList.toggle("menu-open", isOpen);
    if (isOpen) {
      header.classList.remove("site-header-hidden");
    }
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
  };

  navToggle.addEventListener("click", () => {
    setMenuOpen(!header.classList.contains("menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.querySelectorAll(".mobile-menu-cta").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  if (typeof window.matchMedia === "function") {
    const desktopQuery = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", closeOnDesktop);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(closeOnDesktop);
    }
  }
}

function initPreferences() {
  const savedTheme = localStorage.getItem("guiConnectTheme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode-active");
  }
  const savedLang = normalizeLanguage(
    localStorage.getItem("guiConnectLanguage") || "fr",
  );
  updateLanguageButtons(savedLang);
  applyTranslations(savedLang);
  initHeaderAutoHide();
  initMobileMenu();
}

document.addEventListener("DOMContentLoaded", initPreferences);

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
    alert(getTranslation("contactRequiredAlert"));
    return;
  }

  const emailSubject = `${getTranslation("contactEmailSubject")} - ${data.service}`;
  const emailLabels = {
    name: getTranslation("contactNameLabel"),
    email: "Email",
    phone: getTranslation("contactPhoneEmailLabel"),
    service: getTranslation("contactServiceEmailLabel"),
    message: getTranslation("contactMessageEmailLabel"),
  };

  if (!brevoApiKey) {
    alert(getTranslation("contactBrevoMissingAlert"));
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(
      `${emailLabels.name}: ${data.name}\n${emailLabels.email}: ${data.email}\n${emailLabels.phone}: ${data.phone}\n${emailLabels.service}: ${data.service}\n${emailLabels.message}:\n${data.message}`,
    );
    globalThis.location.href = `mailto:${brevoSender}?subject=${subject}&body=${body}`;
    return;
  }

  const htmlContent = [
    `<h2>${getTranslation("contactEmailSubject")}</h2>`,
    `<p><strong>${emailLabels.name}:</strong> ${data.name}</p>`,
    `<p><strong>${emailLabels.email}:</strong> ${data.email}</p>`,
    `<p><strong>${emailLabels.phone}:</strong> ${data.phone}</p>`,
    `<p><strong>${emailLabels.service}:</strong> ${data.service}</p>`,
    `<p><strong>${emailLabels.message}:</strong><br>${data.message.replaceAll("\n", "<br>")}</p>`,
  ].join("");

  const payload = {
    sender: { email: brevoSender },
    to: [{ email: brevoSender }],
    subject: emailSubject,
    htmlContent,
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
      alert(getTranslation("contactSuccessAlert"));
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert(getTranslation("contactBrevoFailAlert"));
    });
}
