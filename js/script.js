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
  form.addEventListener("submit", event => {
    event.preventDefault();
    alert("Obrigado pelo contato! Sua mensagem foi recebida. Entraremos em contato em breve.");
    form.reset();
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
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
