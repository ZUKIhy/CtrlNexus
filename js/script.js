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
  const formStatus = document.querySelector("#form-status");

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
      // mantém o valor padrão se a URL não puder ser montada
    }
  }

  form.addEventListener("submit", async event => {
    const action = (form.getAttribute("action") || "").trim();
    const hasRealAction = Boolean(action) && action !== "#";

    if (!hasRealAction) {
      event.preventDefault();
      alert("Obrigado pelo contato! Sua mensagem foi recebida. Entraremos em contato em breve.");
      form.reset();
      return;
    }

    event.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    setFormStatus("Enviando sua mensagem...", "");

    try {
      const ajaxEndpoint = action.includes("formsubmit.co/")
        ? action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/")
        : action;

      const response = await fetch(ajaxEndpoint, {
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
        // ignora respostas não JSON
      }

      if (!response.ok) {
        throw new Error(result?.message || `Falha no envio: ${response.status}`);
      }

      if (String(result?.success ?? "").toLowerCase() === "false") {
        throw new Error(result?.message || "O serviço de envio recusou a mensagem.");
      }

      form.reset();
      setFormStatus("Mensagem enviada com sucesso! Em breve entraremos em contato.", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      const requiresActivation = /activat(e|ion)|needs activation/i.test(errorMessage);

      setFormStatus(
        requiresActivation
          ? "O formulário precisa ser reativado no FormSubmit. Verifique o e-mail gdzconsultoria@outlook.com e clique em \"Activate Form\"."
          : "Não foi possível enviar agora. Tente novamente em instantes ou use o WhatsApp ao lado.",
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
