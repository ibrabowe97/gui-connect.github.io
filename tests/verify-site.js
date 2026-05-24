const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const pages = [
  "index.html",
  "services.html",
  "about.html",
  "resources.html",
  "partners.html",
  "contact.html",
];

const requiredKeysByPage = {
  "index.html": [
    "homeEyebrow",
    "homeHeroTitle",
    "homeHeroText",
    "homePrimaryCta",
    "homeSecondaryCta",
    "homeStatExperienceTitle",
    "homeStatExperienceText",
    "homeStatCountries",
    "homeStatCountriesText",
    "homeStatClients",
    "homeStatClientsText",
    "homeSpotlightEyebrow",
    "homeSpotlightTitle",
    "homeWebTitle",
    "homeWebText",
    "homeBackendTitle",
    "homeBackendText",
    "homeSupportTitle",
    "homeSupportText",
  ],
  "services.html": [
    "servicesEyebrow",
    "servicesHeroTitle",
    "servicesLead",
    "servicesWebTitle",
    "servicesWebText",
    "servicesBackendTitle",
    "servicesBackendText",
    "servicesHostingTitle",
    "servicesHostingText",
    "servicesSupportTitle",
    "servicesSupportText",
    "servicesConsultingTitle",
    "servicesConsultingText",
    "servicesQualityTitle",
    "servicesQualityText",
  ],
  "about.html": [
    "aboutEyebrow",
    "aboutHeroTitle",
    "aboutLead",
    "aboutMissionTitle",
    "aboutMissionText",
    "aboutExpertiseTitle",
    "aboutExpertiseText",
    "aboutApproachTitle",
    "aboutApproachText",
    "aboutExperienceEyebrow",
    "aboutExperienceTitle",
    "aboutMetricRoleLabel",
    "aboutMetricManagement",
    "aboutMetricCountries",
    "aboutMetricTechnologies",
  ],
  "resources.html": [
    "resourcesEyebrow",
    "resourcesHeroTitle",
    "resourcesLead",
    "resourcesGuideTitle",
    "resourcesGuideText",
    "resourcesArchitectureTitle",
    "resourcesArchitectureText",
    "resourcesSupportTitle",
    "resourcesSupportText",
  ],
  "partners.html": [
    "partnersEyebrow",
    "partnersHeroTitle",
    "partnersLead",
    "partnersRailwayText",
    "partnersHetznerText",
    "partnersAwsText",
    "partnersBrevoText",
  ],
  "contact.html": [
    "contactEyebrow",
    "contactHeroTitle",
    "contactLead",
    "contactNameLabel",
    "contactNamePlaceholder",
    "contactPhoneLabel",
    "contactServiceLabel",
    "contactServicePlaceholder",
    "contactServiceWeb",
    "contactServiceMobile",
    "contactServiceSupport",
    "contactServiceHosting",
    "contactMessagePlaceholder",
    "contactSubmit",
    "contactNote",
  ],
};

const sharedKeys = [
  "navHome",
  "navServices",
  "navAbout",
  "navResources",
  "navPartners",
  "navContact",
  "themeLight",
  "themeDark",
  "footerProjectsEyebrow",
  "footerProjectsTitle",
  "footerProjectsLead",
  "footerProjectGoalLabel",
  "footerProjectInfraLabel",
  "footerProjectStackLabel",
  "footerProjectAeesgsName",
  "footerProjectAeesgsGoal",
  "footerProjectAeesgsInfra",
  "footerProjectAeesgsStack",
  "footerProjectBudgetName",
  "footerProjectBudgetGoal",
  "footerProjectBudgetInfra",
  "footerProjectBudgetStack",
  "footerProjectCashminuteName",
  "footerProjectCashminuteGoal",
  "footerProjectCashminuteInfra",
  "footerProjectCashminuteStack",
  "footerProjectMoreName",
  "footerProjectMoreGoal",
  "footerProjectMoreInfra",
  "footerProjectMoreStack",
  "footerTagline",
];

const projectUrls = [
  "https://aeesgs.org/",
  "https://budget.gui-connect.com/",
  "https://www.cashminute.com/",
];

const expectedNavOrder = [
  "index.html",
  "services.html",
  "resources.html",
  "partners.html",
  "about.html",
];

function readFile(fileName) {
  return fs.readFileSync(path.join(repoRoot, fileName), "utf8");
}

function fail(message) {
  throw new Error(message);
}

function createScriptContext() {
  const documentListeners = {};
  const windowListeners = {};
  const context = {
    document: {
      body: {
        classList: {
          contains() {
            return false;
          },
        },
      },
      addEventListener(eventName, handler) {
        documentListeners[eventName] = handler;
      },
      documentElement: { lang: "fr" },
      querySelectorAll() {
        return [];
      },
      querySelector() {
        return null;
      },
    },
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    console,
    fetch() {},
    globalThis: {},
    window: {
      scrollY: 0,
      addEventListener(eventName, handler) {
        windowListeners[eventName] = handler;
      },
      requestAnimationFrame(callback) {
        callback();
      },
    },
  };

  vm.createContext(context);
  vm.runInContext(readFile("script.js"), context);
  context.__documentListeners = documentListeners;
  context.__windowListeners = windowListeners;
  return context;
}

const scriptContext = createScriptContext();
const translations = vm.runInContext("translations", scriptContext);
const css = readFile("style.css");

const requiredThemeSnippets = [
  "--page-gradient-dark",
  "--page-gradient-light",
  "--content-surface",
  "--content-border",
  "--content-muted",
  "--content-shadow",
  "background: var(--page-gradient-dark)",
  "background: var(--page-gradient-light)",
  "background: var(--content-surface)",
  "color: var(--content-muted)",
];

for (const snippet of requiredThemeSnippets) {
  if (!css.includes(snippet)) {
    fail(`style.css must include theme token or usage: ${snippet}`);
  }
}

if (!/body\.light-mode-active\s*{[\s\S]*--content-surface:/.test(css)) {
  fail("Light mode must redefine content surface tokens");
}

if (!/\.feature-card,[\s\S]*\.contact-panel\s*{[\s\S]*box-shadow: var\(--content-shadow\)/.test(css)) {
  fail("Content cards must use the shared elevated content shadow");
}

if (!/body\.light-mode-active\s+\.lang-btn\s*{[\s\S]*color:\s*var\(--text-dark\)/.test(css)) {
  fail("Light mode must set readable text color for inactive language buttons");
}

const responsiveRules = [
  {
    label: "prevent horizontal page overflow",
    pattern: /body\s*{[\s\S]*overflow-x:\s*hidden;/,
  },
  {
    label: "show a hamburger toggle on tablet and phone widths",
    pattern:
      /@media\s*\(max-width:\s*960px\)\s*{[\s\S]*\.nav-toggle\s*{[\s\S]*display:\s*inline-flex;/,
  },
  {
    label: "hide the primary nav behind the mobile menu until opened",
    pattern:
      /@media\s*\(max-width:\s*960px\)\s*{[\s\S]*\.site-nav\s*{[\s\S]*display:\s*none;[\s\S]*\.site-header\.menu-open\s+\.site-nav\s*{[\s\S]*display:\s*grid;/,
  },
  {
    label: "use compact icon controls for theme and language on tablet and phone widths",
    pattern:
      /@media\s*\(max-width:\s*960px\)\s*{[\s\S]*\.lang-switch\s*{[\s\S]*display:\s*none;[\s\S]*\.lang-toggle[\s\S]*display:\s*inline-flex;[\s\S]*\.theme-toggle-label[\s\S]*position:\s*absolute;/,
  },
  {
    label: "hide the theme icon on desktop and reveal it only in compact header mode",
    pattern:
      /\.theme-toggle\s+\.theme-icon\s*{[\s\S]*display:\s*none;[\s\S]*@media\s*\(max-width:\s*960px\)\s*{[\s\S]*\.theme-toggle\s+\.theme-icon\s*{[\s\S]*display:\s*inline-block;/,
  },
];

for (const { label, pattern } of responsiveRules) {
  if (!pattern.test(css)) {
    fail(`style.css must ${label}`);
  }
}

for (const lang of ["fr", "en"]) {
  if (!translations[lang]) {
    fail(`Missing ${lang} translations object`);
  }
}

for (const key of sharedKeys) {
  for (const lang of ["fr", "en"]) {
    if (!translations[lang][key]) {
      fail(`Missing ${lang}.${key}`);
    }
  }
}

if (translations.fr.contactSubmit !== "Envoyer") {
  fail("French contact submit button must use client-facing copy: Envoyer");
}

if (translations.en.contactSubmit !== "Send") {
  fail("English contact submit button must use client-facing copy: Send");
}

for (const lang of ["fr", "en"]) {
  for (const key of [
    "contactSubmit",
    "contactNote",
    "contactBrevoMissingAlert",
    "contactBrevoFailAlert",
  ]) {
    if (/brevo/i.test(translations[lang][key])) {
      fail(`${lang}.${key} must not expose Brevo in client-facing copy`);
    }
  }
}

for (const page of pages) {
  const html = readFile(page);
  if (/3\+|Trois ans|Three years/.test(html)) {
    fail(`${page} must not contain the old 3-year experience claim`);
  }

  if (!/<a\s+href="index\.html"\s+class="brand">GUI CONNECT<\/a>/.test(html)) {
    fail(`${page} must link the brand name to the homepage`);
  }

  const langButtons = html.match(/class="lang-btn/g) || [];
  if (langButtons.length !== 2) {
    fail(`${page} must contain exactly two language buttons`);
  }

  const langSwitch = html.match(
    /<div class="lang-switch">[\s\S]*?<\/div>/,
  )?.[0];
  if (!langSwitch || /<p|<span/.test(langSwitch)) {
    fail(`${page} language switch must only contain FR/EN buttons`);
  }

  if (
    !/<button[^>]+class="[^"]*nav-toggle[^"]*"[^>]+aria-controls="primary-nav"[^>]+aria-expanded="false"/.test(
      html,
    )
  ) {
    fail(`${page} must include an accessible hamburger menu button`);
  }

  const nav = html.match(
    /<nav[^>]+class="[^"]*site-nav[^"]*"[^>]+id="primary-nav"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];
  if (!nav) {
    fail(`${page} must contain an identified primary site nav`);
  }

  const navOrder = [...nav.matchAll(/href="([^"]+)"/g)].map(
    (match) => match[1],
  );
  if (navOrder.join("|") !== expectedNavOrder.join("|")) {
    fail(`${page} primary nav order must be ${expectedNavOrder.join(", ")}`);
  }

  if (nav.includes("contact.html")) {
    fail(`${page} must promote Contact as a header CTA, not a nav item`);
  }

  if (
    !/<a[^>]+href="contact\.html"[^>]+class="[^"]*header-cta/.test(html) ||
    !/class="header-cta[^"]*"[^>]+data-i18n-key="navContact"/.test(html)
  ) {
    fail(`${page} must contain a translated Contact header CTA`);
  }

  if (
    !/<a[^>]+href="contact\.html"[^>]+class="[^"]*mobile-menu-cta/.test(html) ||
    !/class="mobile-menu-cta[^"]*"[^>]+data-i18n-key="navContact"/.test(html)
  ) {
    fail(`${page} must include Contact inside the mobile menu panel`);
  }

  if (
    !/<button[^>]+class="[^"]*lang-toggle[^"]*"[^>]+onclick="toggleLanguage\(\)"/.test(
      html,
    )
  ) {
    fail(`${page} must include a compact language icon toggle`);
  }

  if (!html.includes('class="theme-toggle-label"')) {
    fail(`${page} theme toggle must keep a label for desktop and accessibility`);
  }

  if (!html.includes('class="footer-projects"')) {
    fail(`${page} must include the footer project showcase`);
  }

  for (const projectUrl of projectUrls) {
    if (!html.includes(`href="${projectUrl}"`)) {
      fail(`${page} must link to ${projectUrl} in the footer project showcase`);
    }
  }

  for (const key of sharedKeys.filter((key) => key.startsWith("footerProject"))) {
    if (!html.includes(`data-i18n-key="${key}"`)) {
      fail(`${page} missing footer project key "${key}"`);
    }
  }

  for (const key of requiredKeysByPage[page]) {
    if (
      !html.includes(`data-i18n-key="${key}"`) &&
      !html.includes(`data-i18n-placeholder-key="${key}"`)
    ) {
      fail(`${page} missing i18n marker for "${key}"`);
    }

    for (const lang of ["fr", "en"]) {
      if (!translations[lang][key]) {
        fail(`Missing ${lang}.${key}`);
      }
    }
  }
}

if (/3\+|Trois ans|Three years/.test(readFile("script.js"))) {
  fail("script.js must not contain the old 3-year experience claim");
}

if (
  !translations.fr.homeStatExperienceText.includes("IT manager") ||
  !translations.fr.homeStatExperienceText.includes("architecte")
) {
  fail("French homepage experience copy must mention IT manager and architecte");
}

if (
  !translations.en.homeStatExperienceText.includes("IT manager") ||
  !translations.en.homeStatExperienceText.includes("architect")
) {
  fail("English homepage experience copy must mention IT manager and architect");
}

const headerElement = {
  classList: {
    values: new Set(),
    add(className) {
      this.values.add(className);
    },
    remove(className) {
      this.values.delete(className);
    },
    contains(className) {
      return this.values.has(className);
    },
  },
};

const textElement = {
  dataset: { i18nKey: "homeHeroTitle" },
  textContent: "",
};
const placeholderElement = {
  dataset: { i18nPlaceholderKey: "contactNamePlaceholder" },
  placeholder: "",
  setAttribute(attribute, value) {
    this[attribute] = value;
  },
};
const themeButton = {
  textContent: "",
};

scriptContext.document.querySelectorAll = (selector) => {
  if (selector === "[data-i18n-key]") {
    return [textElement];
  }
  if (selector === "[data-i18n-placeholder-key]") {
    return [placeholderElement];
  }
  return [];
};
scriptContext.document.querySelector = (selector) => {
  if (selector === ".theme-toggle") {
    return themeButton;
  }
  if (selector === ".site-header") {
    return headerElement;
  }
  return null;
};

scriptContext.__documentListeners.DOMContentLoaded();
if (!scriptContext.__windowListeners.scroll) {
  fail("initPreferences must register a scroll listener for the header");
}

scriptContext.window.scrollY = 80;
scriptContext.__windowListeners.scroll();
if (!headerElement.classList.contains("site-header-hidden")) {
  fail("Header must hide immediately when scrolling down");
}

scriptContext.window.scrollY = 40;
scriptContext.__windowListeners.scroll();
if (headerElement.classList.contains("site-header-hidden")) {
  fail("Header must reappear immediately when scrolling up");
}

scriptContext.applyTranslations("en");

if (scriptContext.document.documentElement.lang !== "en") {
  fail("applyTranslations must update the document language");
}

if (textElement.textContent !== translations.en.homeHeroTitle) {
  fail("applyTranslations must update visible page text");
}

if (placeholderElement.placeholder !== translations.en.contactNamePlaceholder) {
  fail("applyTranslations must update form placeholders");
}

if (themeButton.textContent !== translations.en.themeLight) {
  fail("applyTranslations must update the theme toggle label");
}

console.log("Static site i18n and header checks passed.");
