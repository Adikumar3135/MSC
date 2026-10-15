(function () {
  const loadingScreen = document.getElementById("mscLoadingScreen");

  if (!loadingScreen) return;

  function hideLoadingScreen() {
    loadingScreen.classList.add("is-hidden");

    setTimeout(function () {
      loadingScreen.remove();
    }, 10800);
  }

  // Website aur uske dependent resources load hone par.
  if (document.readyState === "complete") {
    hideLoadingScreen();
  } else {
    window.addEventListener("load", hideLoadingScreen, {
      once: true
    });
  }
})();
/* =========================================================
   MULTIMEDIA SOLUTIONS CAFE — SITE INTERACTIONS
   Save as: js/script.js
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  /* NAVBAR: mobile menu */
  const menuToggle = document.getElementById("mscMenuToggle");
  const navLinks = document.getElementById("mscNavLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMobileMenu();
    });
  }

  /* HERO VIDEO: graceful autoplay fallback */
  const heroVideo = document.getElementById("mscHeroVideo");
  if (heroVideo) {
    heroVideo.muted = true;
    const tryPlay = function () {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          // If autoplay is blocked or the video fails, the poster remains visible.
        });
      }
    };

    if (heroVideo.readyState >= 3) {
      tryPlay();
    } else {
      heroVideo.addEventListener("canplay", tryPlay, { once: true });
    }

    heroVideo.addEventListener("error", function () {
      heroVideo.style.display = "none";
    });
  }

  /* PORTFOLIO FILTERS */
  const portfolioFilters = document.querySelectorAll(".msc-portfolio-filter");
  const portfolioItems = document.querySelectorAll(".msc-portfolio-item");

  portfolioFilters.forEach(function (filterButton) {
    filterButton.setAttribute(
      "aria-pressed",
      String(filterButton.classList.contains("active"))
    );

    filterButton.addEventListener("click", function () {
      const selectedCategory = filterButton.dataset.filter || "all";

      portfolioFilters.forEach(function (button) {
        const isActive = button === filterButton;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      portfolioItems.forEach(function (item) {
        const matches =
          selectedCategory === "all" ||
          item.dataset.category === selectedCategory;
        item.hidden = !matches;
      });
    });
  });

  /* PORTFOLIO LIGHTBOX */
  const lightbox = document.getElementById("mscLightbox");
  const lightboxImage = document.getElementById("mscLightboxImage");
  const lightboxClose = document.getElementById("mscLightboxClose");
  const lightboxBackdrop = document.getElementById("mscLightboxBackdrop");
  let previousFocus = null;

  function openMscLightbox(item) {
    if (!lightbox || !lightboxImage) return;

    const image = item.querySelector("img");
    if (!image) return;

    previousFocus = item;
    lightboxImage.src = item.dataset.full || image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Expanded portfolio photograph";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("msc-lightbox-open");
    document.body.style.overflow = "hidden";

    if (lightboxClose) lightboxClose.focus();
  }

  function closeMscLightbox() {
    if (!lightbox || !lightbox.classList.contains("open")) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.removeAttribute("src");
    document.body.classList.remove("msc-lightbox-open");
    document.body.style.overflow = "";

    if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
  }

  portfolioItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openMscLightbox(item);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeMscLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closeMscLightbox);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMscLightbox();
  });


  const weddingEnquiryForm = document.getElementById("mscWeddingEnquiryForm");

  if (weddingEnquiryForm) {
    weddingEnquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("mscWeName").value.trim();
      const eventType = document.getElementById("mscWeEvent").value;
      const eventDate = document.getElementById("mscWeDate").value;
      const packageName = document.getElementById("mscWePackage").value;
      const budget = document.getElementById("mscWeBudget").value;
      const location = document.getElementById("mscWeLocation").value.trim();

      const message = [
        "Hello MSC - Multimedia Solutions Cafe!",
        "",
        "I would like to enquire about wedding photography services.",
        "",
        "Name: " + name,
        "Event: " + eventType,
        "Event Date: " + (eventDate || "Not decided"),
        "Preferred Package: " + packageName,
        "Budget: " + budget,
        "Location: " + (location || "Not specified"),
        "",
        "Please share availability and the final quotation.",
      ].join("\n");

      const whatsappURL =
        "https://wa.me/919431462683?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  /* FOOTER COPYRIGHT YEAR */
  const copyrightYear = document.getElementById("mscCopyrightYear");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});

/* =========================================
   MSC PRODUCTS: MOVE WITH PAGE SCROLL
   + CATEGORY FILTER
========================================= */
(function () {
  const section = document.querySelector("#products");
  if (!section) return;

  const trackWindow = section.querySelector("#mscProductsScroller");
  const track = section.querySelector(".msc-products-track");
  const cards = section.querySelectorAll(".msc-product-card");
  const filters = section.querySelectorAll(".msc-product-category");

  if (!trackWindow || !track) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let ticking = false;

  function updateProductMovement() {
    ticking = false;

    if (reducedMotion.matches) {
      track.style.transform = "none";
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Animation sirf section ke viewport mein aane par chalegi.
    const progress = Math.max(
      0,
      Math.min(
        1,
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height)
      )
    );

    const maxMovement = Math.max(
      0,
      track.scrollWidth - trackWindow.clientWidth
    );

    // Page ke vertical scroll ke saath cards left move honge.
    const movement = maxMovement * progress;

    track.style.transform = `translate3d(${-movement}px, 0, 0)`;
  }

  function requestProductMovement() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateProductMovement);
  }

  // Mouse wheel, keyboard aur page scrolling ke saath movement.
  window.addEventListener("scroll", requestProductMovement, {
    passive: true
  });

  window.addEventListener("resize", requestProductMovement);

  // Product category filter
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      const selected = button.dataset.category || "all";

      filters.forEach(function (filter) {
        const active = filter === button;
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
      });

      cards.forEach(function (card) {
        card.hidden =
          selected !== "all" &&
          card.dataset.category !== selected;
      });

      requestProductMovement();
    });
  });

  requestProductMovement();
})();


