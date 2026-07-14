
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector("span:last-child").textContent = open ? "−" : "+";
  });
});
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll("[data-project]").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.project !== filter;
    });
  });
});
const form = document.querySelector("#estimate-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const status = document.querySelector("#form-status");
    const required = ["name","phone","email","projectType","details"];
    if (required.some(k => !String(data.get(k) || "").trim())) {
      status.textContent = "Please complete all required fields.";
      return;
    }
    const subject = encodeURIComponent("Legacy TileWorks estimate request - " + data.get("projectType"));
    const body = encodeURIComponent(
`Name: ${data.get("name")}
Phone: ${data.get("phone")}
Email: ${data.get("email")}
Location: ${data.get("location")}
Project type: ${data.get("projectType")}
Timeline: ${data.get("timeline")}
Budget: ${data.get("budget")}

Project details:
${data.get("details")}`
    );
    status.textContent = "Opening your email application. Replace estimates@example.com before launch.";
    window.location.href = `mailto:estimates@example.com?subject=${subject}&body=${body}`;
  });
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


const lightbox = document.querySelector("#lightbox");
if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".gallery-open").forEach(button => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.dataset.title || "Project image";
      lightboxCaption.textContent = button.dataset.title || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });
  lightbox.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}
