// ===== Mobile Menu =====
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// close menu on link click (mobile)
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ===== Theme Toggle =====
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  themeBtn.innerHTML = document.body.classList.contains("light")
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});

// set correct icon at load
themeBtn.innerHTML = document.body.classList.contains("light")
  ? '<i class="fa-solid fa-moon"></i>'
  : '<i class="fa-solid fa-sun"></i>';

// ===== Typing Effect =====
const typingEl = document.getElementById("typing");
const roles = [
  "MCA Student",
  "C# .NET Developer",
  "SQL Server Learner",
  "Power BI Enthusiast",
  "Quick Learner & Team Player"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 70);
}
typeLoop();

// ===== Scroll Reveal (IntersectionObserver) =====
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

reveals.forEach(el => obs.observe(el));

// ===== Active Navbar Links on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navA = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });

  navA.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== Certificate Modal =====
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const modalDownload = document.getElementById("modalDownload");

document.querySelectorAll(".cert-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.getAttribute("data-img");
    const title = card.getAttribute("data-title");
    modalImg.src = img;
    modalTitle.textContent = title;
    modalDownload.href = img;
    modal.classList.add("show");
  });
});

modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// ESC to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("show");
});
