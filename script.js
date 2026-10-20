/* =========================================
   WEDDING COUNTDOWN
========================================= */

// Change this to your actual wedding date/time
const weddingDate = new Date("December 20, 2026 10:30:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    // Wedding day has arrived
    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// Run immediately
updateCountdown();


// Update every second
setInterval(updateCountdown, 1000);


/* =========================================
   BACKGROUND MUSIC
========================================= */

const musicButton = document.getElementById("musicButton");


// Change this filename if your music file
// has a different name
const weddingMusic = new Audio("music/wedding.mp3");

weddingMusic.loop = true;

let musicPlaying = false;


musicButton.addEventListener("click", function () {

    if (!musicPlaying) {

        weddingMusic.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "❚❚";

            })
            .catch(() => {

                console.log(
                    "Music could not be started."
                );

            });

    } else {

        weddingMusic.pause();

        musicPlaying = false;

        musicButton.textContent = "♪";
    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".event-card, .person, .venue-card, .gallery img"
);


const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    revealObserver.observe(element);

});


/* =========================================
   SMOOTH PAGE LOAD
========================================= */

window.addEventListener("load", function () {

    document.body.classList.add("loaded");

});


/* =========================================
   PREVENT BROKEN MUSIC BUTTON
========================================= */

weddingMusic.addEventListener(
    "error",
    function () {

        console.log(
            "Wedding music file not found."
        );

    }
);
