document.documentElement.classList.add("js");

/* ---------- Foto: tampilkan placeholder jika assets/profile.jpg belum ada ---------- */
const photo = document.getElementById("photo");
const photoImg = photo.querySelector("img");

function photoReady() { photo.classList.add("loaded"); photo.classList.remove("no-photo"); }
function photoMissing() { photo.classList.add("no-photo"); }

photoImg.addEventListener("load", photoReady);
photoImg.addEventListener("error", photoMissing);
if (photoImg.complete) {
  if (photoImg.naturalWidth > 0) photoReady();
  else photoMissing();
}

/* ---------- Menu mobile ---------- */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Mini navigasi muncul setelah panel pembuka ---------- */
const minibar = document.getElementById("minibar");
const hero = document.querySelector(".hero");

function updateMinibar() {
  const heroBottom = hero.getBoundingClientRect().bottom;
  minibar.classList.toggle("show", heroBottom < 40);
}
window.addEventListener("scroll", updateMinibar, { passive: true });
updateMinibar();

/* ---------- Scroll reveal ---------- */
const items = document.querySelectorAll(".rv, .mask");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((el) => observer.observe(el));
} else {
  items.forEach((el) => el.classList.add("visible"));
}
