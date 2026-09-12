/* ===========================================================
   L'Arbre de la Vie — script.js
   Vanilla JS uniquement, aucune dépendance.
   =========================================================== */

// ---------------------------------------------------------
// CONFIGURATION — à modifier facilement
// ---------------------------------------------------------
const CONFIG = {
  serverName: "L'Arbre de la Vie",
  discordUrl: "https://discord.gg/53nNUCFMxq",
  rulesUrl: "#" // Remplacer par le lien vers le règlement complet (ex: un salon Discord ou une page dédiée)
};

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------
  // Application de la configuration aux liens du DOM
  // -------------------------------------------------------
  function applyConfig() {
    document.querySelectorAll('a[href="https://discord.gg/53nNUCFMxq"]').forEach((el) => {
      el.setAttribute("href", CONFIG.discordUrl);
    });

    const rulesLinks = [
      document.getElementById("rules-link"),
      document.getElementById("footer-rules-link")
    ];
    rulesLinks.forEach((el) => {
      if (el) el.setAttribute("href", CONFIG.rulesUrl);
    });

    document.querySelectorAll(".brand span, .footer-brand span").forEach((el) => {
      if (el.textContent.trim() === "L'Arbre de la Vie") {
        el.textContent = CONFIG.serverName;
      }
    });
  }

  // -------------------------------------------------------
  // Header : effet au scroll
  // -------------------------------------------------------
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // -------------------------------------------------------
  // Menu mobile
  // -------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // -------------------------------------------------------
  // Apparition des éléments au scroll (IntersectionObserver)
  // -------------------------------------------------------
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    const specialEls = document.querySelectorAll(".tree-diagram, .orbit-wrap");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in-view"));
      specialEls.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
    specialEls.forEach((el) => observer.observe(el));
  }

  // -------------------------------------------------------
  // Parallaxe très légère sur l'arbre du hero
  // -------------------------------------------------------
  function initParallax() {
    if (prefersReducedMotion) return;

    const tree = document.querySelector(".hero-tree");
    if (!tree) return;

    let ticking = false;

    function update() {
      const y = window.scrollY;
      const offset = Math.min(y * 0.08, 60);
      tree.style.transform = `translate(-50%, ${offset}px)`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // -------------------------------------------------------
  // Lucioles discrètes dans le hero
  // -------------------------------------------------------
  function initFireflies() {
    const container = document.getElementById("fireflies");
    if (!container || prefersReducedMotion) return;

    const count = window.innerWidth < 700 ? 8 : 16;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      const left = Math.random() * 100;
      const bottom = Math.random() * 55;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 8;

      dot.style.left = left + "%";
      dot.style.bottom = bottom + "%";
      dot.style.animationDuration = duration + "s";
      dot.style.animationDelay = delay + "s";

      container.appendChild(dot);
    }
  }

  // -------------------------------------------------------
  // Init
  // -------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    initParallax();
    initFireflies();
  });
})();
