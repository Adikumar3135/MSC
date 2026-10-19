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


/* MSC WEDDING AVAILABILITY: city coverage + WhatsApp enquiry */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("availability-form");
  if (!form) return;

  const stateSelect = document.getElementById("msc-state");
  const citySelect = document.getElementById("msc-city");
  const dateInput = document.getElementById("msc-date");
  const otherWrap = document.getElementById("msc-city-other-wrap");
  const otherInput = document.getElementById("msc-city-other");
  const message = document.getElementById("availability-message");
  const whatsappNumber = "919431462683";

  const citiesByState = {
    "Bihar": [
      "Patna", "Bhagalpur", "Munger", "Jamalpur", "Kahalgaon", "Gaya",
      "Muzaffarpur", "Darbhanga", "Purnia", "Begusarai", "Katihar", "Saharsa",
      "Araria", "Kishanganj", "Madhepura", "Supaul", "Khagaria", "Banka", "Jamui",
      "Lakhisarai", "Sheikhpura", "Bihar Sharif", "Nalanda", "Hajipur", "Vaishali",
      "Chhapra", "Siwan", "Gopalganj", "Motihari", "Bettiah", "Sitamarhi", "Madhubani",
      "Samastipur", "Sonepur", "Ara", "Buxar", "Sasaram", "Aurangabad", "Jehanabad",
      "Nawada", "Dehri", "Other Bihar city / town"
    ],
    "Jharkhand": [
      "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Dumka", "Giridih",
      "Hazaribagh", "Ramgarh", "Medininagar (Palamu)", "Garhwa", "Chatra", "Koderma",
      "Lohardaga", "Gumla", "Simdega", "Khunti", "Seraikela", "Chaibasa", "Sahibganj",
      "Tinpahar", "Rajmahal", "Barharwa", "Pakur", "Godda", "Jamtara", "Other Jharkhand city / town"
    ],
    "West Bengal": [
      "Kolkata", "Asansol", "Durgapur", "Siliguri", "Howrah", "Malda", "Other West Bengal city / town"
    ],
    "Other / outside listed states": ["Enter city or town"]
  };

  function localISODate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  dateInput.min = localISODate();

  function updateCities() {
    const cities = citiesByState[stateSelect.value] || ["Enter city or town"];
    citySelect.replaceChildren();
    cities.forEach(function (city) {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.selectedIndex = 0;
    updateOtherCityVisibility();
    message.textContent = "";
  }

  function updateOtherCityVisibility() {
    const needsOther = /Other .*city \/ town|Enter city or town/.test(citySelect.value) ||
      stateSelect.value === "Other / outside listed states";
    otherWrap.hidden = !needsOther;
    otherInput.required = needsOther;
    if (!needsOther) otherInput.value = "";
  }

  stateSelect.addEventListener("change", updateCities);
  citySelect.addEventListener("change", updateOtherCityVisibility);
  dateInput.addEventListener("change", function () { message.textContent = ""; });
  updateCities();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const selectedDate = dateInput.value;
    if (selectedDate < localISODate()) {
      message.textContent = "Please choose today or a future date.";
      dateInput.focus();
      return;
    }

    const state = stateSelect.value;
    const city = otherWrap.hidden ? citySelect.value : otherInput.value.trim();
    if (!city) {
      message.textContent = "Please enter your city, town or venue.";
      otherInput.focus();
      return;
    }

    const formattedDate = new Date(selectedDate + "T12:00:00").toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric"
    });
    const text = [
      "Hello MSC - Multimedia Solutions Cafe!",
      "I would like to check wedding photography / cinematic film availability.",
      "State: " + state,
      "City / Town / Venue: " + city,
      "Wedding Date: " + formattedDate,
      "Please confirm whether a local team is available and share suitable packages."
    ].join("\n");
    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
    message.textContent = "Opening WhatsApp with your enquiry. Availability is not confirmed until the MSC team replies.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
});

/* Accessible state for selectable network region cards */
(function () {
  const section = document.querySelector("#wedding-network");
  if (!section) return;
  const cards = section.querySelectorAll(".region-card");
  const heading = section.querySelector("#reach-cta-title");
  cards.forEach(function (card) {
    card.setAttribute("aria-pressed", String(card.classList.contains("selected")));
    card.addEventListener("click", function () {
      cards.forEach(function (item) {
        const active = item === card;
        item.classList.toggle("selected", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (heading) heading.textContent = "Planning a wedding in " + card.dataset.region + "? Tell us your town and date.";
    });
  });
})();


// MSC Portfolio Filters
document.querySelectorAll(".msc-work").forEach((section) => {
  const filters = section.querySelectorAll(".msc-filter");
  const cards = section.querySelectorAll(".msc-work-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((button) => {
        button.classList.remove("active");
        button.removeAttribute("aria-pressed");
      });

      filter.classList.add("active");
      filter.setAttribute("aria-pressed", "true");

      const category = filter.dataset.filter;

      cards.forEach((card) => {
        card.hidden =
          category !== "all" &&
          card.dataset.category !== category;
      });
    });

    filter.setAttribute(
      "aria-pressed",
      filter.classList.contains("active") ? "true" : "false"
    );
  });
});

// MSC Image & Video Lightbox
(() => {
  const viewer = document.getElementById("mscViewer");
  const closeButton = document.getElementById("mscViewerClose");
  const backdrop = document.getElementById("mscViewerBackdrop");
  const image = document.getElementById("mscViewerImage");
  const video = document.getElementById("mscViewerVideo");

  if (!viewer || !closeButton || !backdrop || !image || !video) return;

  let previousFocus = null;

  function openViewer(type, src, trigger) {
    if (!src || src.startsWith("YOUR_")) {
      alert("Please add your actual video URL in the portfolio HTML.");
      return;
    }

    previousFocus = trigger;
    image.classList.remove("is-visible");
    video.classList.remove("is-visible");

    video.pause();
    video.removeAttribute("src");
    video.load();
    image.removeAttribute("src");

    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("msc-viewer-open");

    if (type === "video") {
      video.src = src;
      video.classList.add("is-visible");
      video.load();
      video.play().catch(() => {
        // User can start playback using the video controls.
      });
    } else {
      image.src = src;
      image.classList.add("is-visible");
    }

    closeButton.focus();
  }

  function closeViewer() {
    if (!viewer.classList.contains("is-open")) return;

    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("msc-viewer-open");

    video.pause();
    video.removeAttribute("src");
    video.load();

    image.removeAttribute("src");
    image.classList.remove("is-visible");
    video.classList.remove("is-visible");

    if (previousFocus) previousFocus.focus();
  }

  document.querySelectorAll(".msc-work-media").forEach((button) => {
    button.addEventListener("click", () => {
      openViewer(button.dataset.type, button.dataset.src, button);
    });
  });

  closeButton.addEventListener("click", closeViewer);
  backdrop.addEventListener("click", closeViewer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeViewer();
  });
})();
