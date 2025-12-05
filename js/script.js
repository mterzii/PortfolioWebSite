// === TYPING EFFECT ===
function runTypingEffect() {
    const text = 'I am Mert Terzi';
    const typingElement = document.getElementById('typing-text');
    const typingDelay = 100;

    typeText(text, typingElement, typingDelay);
}

function typeText(text, typingElement, delay) {
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typingElement.textContent += text.charAt(i);
        }, delay * i);
    }
}

document.addEventListener('DOMContentLoaded', runTypingEffect);


// === CURVED CAROUSEL ===
document.addEventListener("DOMContentLoaded", () => {
    const ring = document.querySelector(".ls-curved-carousel__ring");
    const slides = document.querySelectorAll(".ls-curved-carousel__slide");

    if (!ring || slides.length === 0) return;

    const total = slides.length;
    let radius, rotateSpeed;

    if (window.innerWidth <= 776) {
        radius = 270;
        rotateSpeed = 0.05;
    } else {
        radius = 600;
        rotateSpeed = 0.08;
    }

    const autoRotate = true;

    slides.forEach((slide, i) => {
        const angle = (360 / total) * i;
        slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        slide.style.transition = "transform 0.8s ease";
    });

    if (autoRotate) {
        let rotation = 0;
        gsap.ticker.add(() => {
            rotation += rotateSpeed;
            gsap.set(ring, { rotationY: rotation });
        });
    }

    if (window.lightbox) {
        lightbox.option({
            resizeDuration: 300,
            wrapAround: true,
            fadeDuration: 400,
            imageFadeDuration: 400,
        });
    }
});


// === EMAILJS + SPAM KORUMA ===
(function () {
    emailjs.init("cxLgeHHhYW-P6KiWB"); // Public key
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // 🔹 1. Honeypot kontrolü
    const honeypot = document.querySelector('[name="website"]');
    if (honeypot && honeypot.value !== "") {
        console.warn("Spam detected (honeypot filled)");
        return;
    }

    // 🔹 2. reCAPTCHA kontrolü
    if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse() === "") {
        alert("Please confirm you are not a robot 🤖");
        return;
    }

    // 🔹 3. EmailJS gönderimi
    emailjs.sendForm("service_u4zvqae", "template_pm5gjfl", this).then(
        function () {
            alert("Message sent successfully! ✅");
            document.getElementById("contact-form").reset();
            if (typeof grecaptcha !== "undefined") grecaptcha.reset();
        },
        function (error) {
            console.error("FAILED...", error);
            alert("Message could not be sent ❌");
        }
    );
});


/*Modal İçin */

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', function () {

    document.getElementById('modalTitle').textContent =
      this.getAttribute('data-title');

    document.getElementById('modalDescription').textContent =
      this.getAttribute('data-description');

    document.getElementById('modalTech').textContent =
      this.getAttribute('data-tech');

    document.getElementById('modalImage').src =
      this.getAttribute('data-image');

    document.getElementById('modalGithub').href =
      this.getAttribute('data-github');

    let modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
  });
});
