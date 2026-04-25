const sections = document.querySelectorAll("section");
const yearElement = document.querySelector("#year");
const form = document.querySelector("#contact-form");
const nav = document.querySelector("nav");

const isInternalPageLink = link => {
  const rawHref = link.getAttribute("href");

  if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
    return false;
  }

  if (link.target && link.target !== "_self") {
    return false;
  }

  try {
    const url = new URL(rawHref, window.location.href);
    return url.origin === window.location.origin && url.pathname.endsWith(".html");
  } catch {
    return false;
  }
};

const prefetchedPages = new Set();

const prefetchPage = link => {
  if (!isInternalPageLink(link)) {
    return;
  }

  const url = new URL(link.getAttribute("href"), window.location.href);
  const href = url.href;
  if (prefetchedPages.has(href)) {
    return;
  }

  prefetchedPages.add(href);
  const prefetch = document.createElement("link");
  prefetch.rel = "prefetch";
  prefetch.href = href;
  prefetch.as = "document";
  document.head.appendChild(prefetch);
};

const internalPageLinks = Array.from(document.querySelectorAll("a[href]")).filter(isInternalPageLink);

internalPageLinks.forEach(link => {
  link.addEventListener("pointerenter", () => prefetchPage(link), { once: true });
  link.addEventListener("focus", () => prefetchPage(link), { once: true });
  link.addEventListener("touchstart", () => prefetchPage(link), { once: true, passive: true });
});

window.addEventListener("load", () => {
  window.setTimeout(() => {
    internalPageLinks.slice(0, 10).forEach(prefetchPage);
  }, 900);
});

const revealOnScroll = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (nav) {
  nav.setAttribute("id", "main-nav");
  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "main-nav");
  toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="sr-only">Menu</span>';
  document.body.appendChild(toggle);

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const homeMenuButton = document.querySelector(".home-menu-button");
  if (homeMenuButton) {
    homeMenuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      homeMenuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        homeMenuButton.setAttribute("aria-expanded", "false");
      });
    });
  }
}

const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
let activeSlide = 0;
let carouselInterval = null;

const showSlide = index => {
  if (!slides.length) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, currentIndex) => {
    const isActive = currentIndex === activeSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, currentIndex) => {
    dot.classList.toggle("active", currentIndex === activeSlide);
    dot.setAttribute("aria-pressed", String(currentIndex === activeSlide));
  });
};

const startCarousel = () => {
  if (slides.length < 2) {
    return;
  }

  carouselInterval = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 4200);
};

if (slides.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      window.clearInterval(carouselInterval);
      showSlide(index);
      startCarousel();
    });
  });

  const prevArrow = document.querySelector(".carousel-arrow-prev");
  const nextArrow = document.querySelector(".carousel-arrow-next");

  if (prevArrow) {
    prevArrow.addEventListener("click", () => {
      window.clearInterval(carouselInterval);
      showSlide(activeSlide - 1);
      startCarousel();
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener("click", () => {
      window.clearInterval(carouselInterval);
      showSlide(activeSlide + 1);
      startCarousel();
    });
  }

  showSlide(0);
  startCarousel();
}

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formStatus = document.querySelector("#form-status");
  const successRedirectField = form.querySelector('input[name="_next"]');

  const setFormStatus = (message, type = "") => {
    if (!formStatus) {
      return;
    }

    formStatus.textContent = message;
    formStatus.className = `form-feedback${type ? ` ${type}` : ""}`;
  };

  if (successRedirectField) {
    try {
      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set("enviado", "1");
      successRedirectField.value = successUrl.toString();
    } catch {
      // Mantém a URL atual em ambientes que não suportarem URL.
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const action = (form.getAttribute("action") || "").trim();

    if (!action || action === "#") {
      setFormStatus("Formulário pronto para receber seu endpoint de envio.", "error");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    setFormStatus("Enviando sua mensagem...");

    try {
      const endpoint = action.includes("formsubmit.co/")
        ? action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/")
        : action;

      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      const responseText = await response.text();
      let result = null;

      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = null;
      }

      if (!response.ok || String(result?.success ?? "").toLowerCase() === "false") {
        throw new Error(result?.message || `Falha no envio: ${response.status}`);
      }

      form.reset();
      setFormStatus("Mensagem enviada com sucesso. Em breve entraremos em contato.", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const requiresActivation = /activat(e|ion)|needs activation/i.test(message);

      setFormStatus(
        requiresActivation
          ? "O formulário do FormSubmit precisa ser ativado no e-mail configurado antes de novos envios."
          : "Não foi possível enviar agora. Tente novamente em instantes ou use o WhatsApp.",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensagem";
      }
    }
  });
}

document.querySelectorAll('form[action*="formsubmit.co"] input[name="_next"]').forEach(field => {
  try {
    const successUrl = new URL(window.location.href);
    successUrl.searchParams.set("enviado", "1");
    field.value = successUrl.toString();
  } catch {
    // Mantém o valor declarado no HTML como fallback.
  }
});

try {
  const params = new URLSearchParams(window.location.search);
  if (params.get("enviado") === "1") {
    const status = document.querySelector("#form-status");
    if (status) {
      status.textContent = "Mensagem enviada com sucesso. Em breve entraremos em contato.";
      status.className = "form-feedback success";
    }

    params.delete("enviado");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);
  }
} catch {
  // Ignora navegadores com limitações na API de URL.
}

// Theme Toggle
const THEME_KEY = "ctrlnexus-theme";
const DEFAULT_THEME = "dark";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const SUN_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
const MOON_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

const isValidTheme = theme => theme === "dark" || theme === "light";

const readThemeCookie = () => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${THEME_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
};

const writeThemeCookie = theme => {
  document.cookie = `${THEME_KEY}=${encodeURIComponent(theme)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
};

const readThemeFromUrl = () => {
  try {
    const theme = new URLSearchParams(window.location.search).get("theme");
    return isValidTheme(theme) ? theme : "";
  } catch {
    return "";
  }
};

const readStoredTheme = () => {
  const urlTheme = readThemeFromUrl();
  if (urlTheme) {
    return urlTheme;
  }

  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (isValidTheme(storedTheme)) {
      return storedTheme;
    }
  } catch {
    // Continue to the next persistence option.
  }

  try {
    const sessionTheme = sessionStorage.getItem(THEME_KEY);
    if (isValidTheme(sessionTheme)) {
      return sessionTheme;
    }
  } catch {
    // Continue to the cookie fallback.
  }

  const cookieTheme = readThemeCookie();
  return isValidTheme(cookieTheme) ? cookieTheme : DEFAULT_THEME;
};

const getTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  return isValidTheme(currentTheme) ? currentTheme : readStoredTheme();
};

const applyTheme = (theme, btn) => {
  const nextTheme = isValidTheme(theme) ? theme : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", nextTheme);
  document.documentElement.classList.toggle("theme-dark", nextTheme === "dark");
  document.documentElement.classList.toggle("theme-light", nextTheme === "light");
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch {
    // The visual theme still applies even if storage is unavailable.
  }
  try {
    sessionStorage.setItem(THEME_KEY, nextTheme);
  } catch {
    // The cookie and URL fallbacks still keep navigation consistent.
  }
  writeThemeCookie(nextTheme);
  syncInternalThemeLinks(nextTheme);
  if (btn) {
    btn.innerHTML = nextTheme === "dark" ? SUN_ICON : MOON_ICON;
    btn.setAttribute("aria-label", nextTheme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
    btn.setAttribute("title", nextTheme === "dark" ? "Tema claro" : "Tema escuro");
  }
};

function syncInternalThemeLinks(theme) {
  if (!isValidTheme(theme)) {
    return;
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("http")) {
      return;
    }

    try {
      const url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.endsWith(".html")) {
        return;
      }

      url.searchParams.set("theme", theme);
      link.setAttribute("href", `${url.pathname.split("/").pop()}${url.search}${url.hash}`);
    } catch {
      // Keep the original link if URL parsing is unavailable.
    }
  });
}

const themeToggleBtn = document.createElement("button");
themeToggleBtn.type = "button";
themeToggleBtn.className = "theme-toggle";
document.body.appendChild(themeToggleBtn);

applyTheme(getTheme(), themeToggleBtn);

themeToggleBtn.addEventListener("click", () => {
  const next = getTheme() === "dark" ? "light" : "dark";
  applyTheme(next, themeToggleBtn);
});

window.addEventListener("storage", function(e) {
  if (e.key === THEME_KEY && isValidTheme(e.newValue)) {
    applyTheme(e.newValue, themeToggleBtn);
  }
});

window.addEventListener("pageshow", () => {
  applyTheme(readStoredTheme(), themeToggleBtn);
});
