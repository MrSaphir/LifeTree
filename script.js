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

    [document.getElementById("rules-link"), document.getElementById("footer-rules-link")].forEach((el) => {
      if (el) el.setAttribute("href", CONFIG.rulesUrl);
    });

    document.querySelectorAll(".brand span, .footer-brand span").forEach((el) => {
      if (el.textContent.trim() === "L'Arbre de la Vie") {
        el.textContent = CONFIG.serverName;
      }
    });
  }

  // -------------------------------------------------------
  // Header : fond dépoli au scroll
  // -------------------------------------------------------
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 24);
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

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  // -------------------------------------------------------
  // Apparition douce au scroll
  // -------------------------------------------------------
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in-view"));
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
  }

  // -------------------------------------------------------
  // Si l'image lifetree.webp est absente, on efface le cadre
  // proprement plutôt que d'afficher une icône d'image cassée
  // -------------------------------------------------------
  function initHeroImageFallback() {
    const img = document.querySelector(".hero-image");
    const frame = document.querySelector(".hero-image-frame");
    if (!img || !frame) return;

    img.addEventListener("error", () => {
      frame.style.display = "none";
    });
  }

  // -------------------------------------------------------
  // Init
  // -------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    initHeroImageFallback();
  });
})();