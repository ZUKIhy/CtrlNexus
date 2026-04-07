const sections = document.querySelectorAll("section");
const form = document.querySelector("form");
const yearElement = document.querySelector("#year");

const revealOnScroll = () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const successRedirectField = form.querySelector('input[name="_next"]');

  if (successRedirectField) {
    try {
      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set("enviado", "1");
      successRedirectField.value = successUrl.toString();
    } catch {
      // mantém o valor padrão se a URL não puder ser montada
    }
  }

  form.addEventListener("submit", event => {
    const action = (form.getAttribute("action") || "").trim();
    const hasRealAction = Boolean(action) && action !== "#";

    if (!hasRealAction) {
      event.preventDefault();
      alert("Obrigado pelo contato! Sua mensagem foi recebida. Entraremos em contato em breve.");
      form.reset();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

try {
  const params = new URLSearchParams(window.location.search);
  if (params.get("enviado") === "1") {
    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    params.delete("enviado");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);
  }
} catch {
  // ignora limitações de URL no navegador
}

const nav = document.querySelector('nav');
if (nav) {
  nav.setAttribute('id', 'main-nav');
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('type', 'button');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'main-nav');
  toggle.innerHTML = '<span class="bar bar1"></span><span class="bar bar2"></span><span class="bar bar3"></span><span class="sr-only">Menu</span>';
  nav.parentNode.insertBefore(toggle, nav);

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
