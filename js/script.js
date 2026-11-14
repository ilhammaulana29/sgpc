/* ===== Navbar scroll effect ===== */
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  toTop.classList.toggle("show", window.scrollY > 500);
});

/* ===== Mobile menu ===== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ===== Scroll reveal animation ===== */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => observer.observe(el));

/* ===== Back to top ===== */
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ===== HERO SLIDESHOW (crossfade) ===== */
const heroSlides = document.querySelectorAll("#heroSlides .slide");
let heroIndex = 0;
setInterval(() => {
  heroSlides[heroIndex].classList.remove("active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add("active");
}, 5000);

/* ===== ABOUT SLIDESHOW ===== */
const aboutSlides = document.querySelectorAll(".about-slide");
const aboutDots = document.querySelectorAll("#aboutDots span");
const aboutNext = document.getElementById("aboutNext");
const aboutPrev = document.getElementById("aboutPrev");
let aboutIndex = 0;
let aboutTimer;

function showAboutSlide(i) {
  aboutSlides.forEach((s) => s.classList.remove("active"));
  aboutDots.forEach((d) => d.classList.remove("active"));
  aboutIndex = (i + aboutSlides.length) % aboutSlides.length;
  aboutSlides[aboutIndex].classList.add("active");
  aboutDots[aboutIndex].classList.add("active");
}

function startAboutAuto() {
  clearInterval(aboutTimer);
  aboutTimer = setInterval(() => showAboutSlide(aboutIndex + 1), 4000);
}

aboutNext.addEventListener("click", () => {
  showAboutSlide(aboutIndex + 1);
  startAboutAuto();
});
aboutPrev.addEventListener("click", () => {
  showAboutSlide(aboutIndex - 1);
  startAboutAuto();
});
aboutDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showAboutSlide(i);
    startAboutAuto();
  });
});

startAboutAuto();

const aboutSliderEl = document.getElementById("aboutSlider");
aboutSliderEl.addEventListener("mouseenter", () => clearInterval(aboutTimer));
aboutSliderEl.addEventListener("mouseleave", startAboutAuto);
