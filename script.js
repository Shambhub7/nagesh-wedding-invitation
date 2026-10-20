// ========================================
// WEDDING WEBSITE SETTINGS
// Change these values for your wedding.
// ========================================

const WEDDING_DATE = "2027-02-14T09:00:00+05:30";

// Replace with your WhatsApp number.
// India example: 919876543210
// Do not include +, spaces, or hyphens.
const WHATSAPP_NUMBER = "919999999999";

const VENUE_ADDRESS =
  "The Grand Garden Convention Hall, 12 Celebration Avenue, Bengaluru, Karnataka 560001, India";


// ========================================
// BACKGROUND MUSIC PLAYER
// ========================================

const audio = document.getElementById("weddingAudio");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();

      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pause music";
    } catch (error) {
      musicLabel.textContent = "Add music file";

      alert(
        "Please add your music file at assets/wedding-music.mp3"
      );
    }
  } else {
    audio.pause();

    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play music";
  }
});


// ========================================
// LIVE WEDDING COUNTDOWN
// ========================================

function updateCountdown() {
  const targetDate = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  const distance = targetDate - now;

  let values;

  if (distance > 0) {
    values = {
      days: Math.floor(distance / 86400000),

      hours: Math.floor(
        (distance % 86400000) / 3600000
      ),

      minutes: Math.floor(
        (distance % 3600000) / 60000
      ),

      seconds: Math.floor(
        (distance % 60000) / 1000
      )
    };
  } else {
    values = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  Object.entries(values).forEach(([key, value]) => {
    const element = document.getElementById(key);

    if (element) {
      const digits = key === "days" ? 3 : 2;

      element.textContent = String(value).padStart(
        digits,
        "0"
      );
    }
  });
}

updateCountdown();

setInterval(updateCountdown, 1000);


// ========================================
// COPY WEDDING VENUE ADDRESS
// ========================================

const copyButton = document.getElementById("copyAddress");
const copyStatus = document.getElementById("copyStatus");

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(VENUE_ADDRESS);

    copyStatus.textContent = "Address copied successfully!";
  } catch (error) {
    // Fallback for browsers that block clipboard access.
    copyStatus.textContent = VENUE_ADDRESS;
  }

  setTimeout(() => {
    copyStatus.textContent = "";
  }, 4500);
});


// ========================================
// WHATSAPP RSVP
// ========================================

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document
    .getElementById("guestName")
    .value.trim();

  const attendance = document
    .getElementById("attendance")
    .value;

  const guestCount = document
    .getElementById("guestCount")
    .value;

  const message = document
    .getElementById("guestMessage")
    .value.trim();

  if (!name || !attendance) {
    alert("Please enter your name and attendance response.");
    return;
  }

  const whatsappMessage = [
    "Wedding RSVP - Aarav & Ananya",
    "",
    `Name: ${name}`,
    `Response: ${attendance}`,
    `Number of guests: ${guestCount}`,
    `Message: ${message || "No additional message"}`,
    "",
    "Wedding date: 1 November 2026"
  ].join("\n");

  if (WHATSAPP_NUMBER === "919999999999") {
    alert(
      "This is the demo WhatsApp number. " +
      "Please update WHATSAPP_NUMBER in script.js " +
      "before publishing your wedding website."
    );

    return;
  }

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(whatsappMessage);

  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );
});


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealTargets = document.querySelectorAll(
  ".person-card, " +
  ".event-card, " +
  ".venue-copy, " +
  ".map-wrap, " +
  ".gallery img, " +
  ".rsvp-card"
);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  revealTargets.forEach((element) => {
    element.classList.add("fade-in");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealTargets.forEach((element) => {
    observer.observe(element);
  });
}
