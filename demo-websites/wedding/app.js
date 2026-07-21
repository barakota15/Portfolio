const weddingDate = new Date("2026-11-14T16:30:00+02:00");

function updateCountdown() {
  const distance = weddingDate.getTime() - Date.now();
  const totalSeconds = Math.max(0, Math.floor(distance / 1000));
  const time = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  Object.entries(time).forEach(([unit, value]) => {
    const el = document.getElementById(unit);
    if (el) el.textContent = String(value).padStart(unit === "days" ? 3 : 2, "0");
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav.classList.toggle("is-open", !open);
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    lightbox.querySelector("button").focus();
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox(); });

const rsvpForm = document.getElementById("rsvp-form");
const rsvpNote = document.getElementById("form-note");
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!rsvpForm.checkValidity()) {
    rsvpForm.reportValidity();
    return;
  }
  const name = new FormData(rsvpForm).get("name").trim().split(" ")[0];
  rsvpNote.textContent = `Thank you, ${name}. Your RSVP has been received with love.`;
  rsvpForm.reset();
});

const wishForm = document.getElementById("wish-form");
const wishes = document.getElementById("wishes");
const wishNote = document.getElementById("wish-note");
wishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!wishForm.checkValidity()) {
    wishForm.reportValidity();
    return;
  }
  const data = new FormData(wishForm);
  const card = document.createElement("article");
  card.className = "wish-card";
  const quote = document.createElement("p");
  quote.textContent = `“${data.get("wish-message").trim()}”`;
  const byline = document.createElement("span");
  byline.textContent = `— ${data.get("wish-name").trim()}`;
  card.append(quote, byline);
  wishes.prepend(card);
  wishForm.reset();
  wishNote.textContent = "Your wish has been added. Thank you for the love.";
});

const audio = document.getElementById("wedding-audio");
const toggleMusic = document.getElementById("music-toggle");
const volume = document.getElementById("volume");
audio.volume = Number(volume.value);
toggleMusic.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      toggleMusic.setAttribute("aria-label", "Pause background music");
      toggleMusic.querySelector(".music-label").textContent = "Pause song";
      toggleMusic.querySelector(".music-icon").textContent = "Ⅱ";
    } else {
      audio.pause();
      toggleMusic.setAttribute("aria-label", "Play background music");
      toggleMusic.querySelector(".music-label").textContent = "Our song";
      toggleMusic.querySelector(".music-icon").textContent = "♫";
    }
  } catch {
    toggleMusic.setAttribute("aria-label", "Music is unavailable");
  }
});
volume.addEventListener("input", () => { audio.volume = Number(volume.value); });
