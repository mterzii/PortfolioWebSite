/* =========================
   TYPING EFFECT
========================= */
function runTypingEffect() {
    const text = "I am Mert Terzi";
    const typingElement = document.getElementById("typing-text");
    const typingDelay = 100;

    if (!typingElement) return;

    typingElement.textContent = "";

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typingElement.textContent += text.charAt(i);
        }, typingDelay * i);
    }
}

document.addEventListener("DOMContentLoaded", runTypingEffect);


/* =========================
   CURVED 3D CAROUSEL (FAST & STABLE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const ring = document.querySelector(".ls-curved-carousel__ring");
    const slides = document.querySelectorAll(".ls-curved-carousel__slide");

    if (!ring || slides.length === 0) return;

    const total = slides.length;
    let radius = 600;
    let rotateSpeed = 0.4; // default
    let rotation = 0;

    function setupCarousel() {
        const isMobile = window.innerWidth <= 768;

        // 🔥 Mobilde daha geniş çember → çakışma yok
        radius = isMobile ? 650 : 600;

        // 🔥 GERÇEKÇİ hızlar
        rotateSpeed = isMobile ? 0.25 : 0.45;



        slides.forEach((slide, i) => {
            const angle = (360 / total) * i;
            slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            slide.style.transition = "transform 0.6s ease";
            slide.style.willChange = "transform";
        });
    }

    setupCarousel();
    window.addEventListener("resize", setupCarousel);

    // 🔁 Auto rotate (CANLI AMA KASMAZ)
    gsap.ticker.fps(30);
    gsap.ticker.add(() => {
        rotation += rotateSpeed;   // ❗ artık *0.1 YOK
        gsap.set(ring, { rotationY: rotation });
    });
});


/* =========================
   PORTFOLIO MODAL
========================= */
document.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", function () {
        document.getElementById("modalTitle").textContent =
            this.getAttribute("data-title");

        document.getElementById("modalDescription").textContent =
            this.getAttribute("data-description");

        document.getElementById("modalTech").textContent =
            this.getAttribute("data-tech");

        document.getElementById("modalImage").src =
            this.getAttribute("data-image");

        document.getElementById("modalGithub").href =
            this.getAttribute("data-github");

        const modal = new bootstrap.Modal(
            document.getElementById("projectModal")
        );
        modal.show();
    });
});


/* =========================
   EMAILJS + SPAM PROTECTION
========================= */
(function () {
    emailjs.init("cxLgeHHhYW-P6KiWB"); // Public key
})();

document
    .getElementById("contact-form")
    ?.addEventListener("submit", function (event) {
        event.preventDefault();

        // 🪤 Honeypot
        const honeypot = document.querySelector('[name="website"]');
        if (honeypot && honeypot.value !== "") {
            console.warn("Spam detected");
            return;
        }

        // 🤖 reCAPTCHA
        if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse() === "") {
            alert("Please confirm you are not a robot 🤖");
            return;
        }

        // 📧 EmailJS
        emailjs.sendForm("service_u4zvqae", "template_pm5gjfl", this).then(
            () => {
                alert("Message sent successfully! ✅");
                this.reset();
                if (typeof grecaptcha !== "undefined") grecaptcha.reset();
            },
            (error) => {
                console.error("FAILED...", error);
                alert("Message could not be sent ❌");
            }
        );
    });
