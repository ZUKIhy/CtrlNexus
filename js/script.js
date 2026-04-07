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
