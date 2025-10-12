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

    // 🔹 Ekran genişliğine göre ayar yapalım
    let radius, rotateSpeed;
    if (window.innerWidth <= 776) {
        radius = 270;       // 🔸 Telefonlarda daha küçük halka
        rotateSpeed = 0.05; // 🔸 Daha yavaş dönüş
    } else {
        radius = 600;       // 🔹 Normal ekranlarda
        rotateSpeed = 0.08; // 🔹 Orta hız
    }

    const autoRotate = true;

    // Görselleri halka çevresine yerleştir
    slides.forEach((slide, i) => {
        const angle = (360 / total) * i;
        slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // Dönüşleri yumuşat
    slides.forEach((slide) => {
        slide.style.transition = "transform 0.8s ease";
    });

    // Sürekli dönme efekti
    if (autoRotate) {
        let rotation = 0;
        gsap.ticker.add(() => {
            rotation += rotateSpeed;
            gsap.set(ring, { rotationY: rotation });
        });
    }

    // Lightbox ayarları (animasyonlar)
    if (window.lightbox) {
        lightbox.option({
            resizeDuration: 300,
            wrapAround: true,
            fadeDuration: 400,
            imageFadeDuration: 400,
        });
    }
});


// === EMAILJS ===

// EmailJS'i başlat
(function () {
    emailjs.init("cxLgeHHhYW-P6KiWB"); // Senin public key'in
})();

// Formu dinle
document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Sayfa yenilenmesin

        emailjs
            .sendForm("service_u4zvqae", "template_pm5gjfl", this)
            .then(
                function () {
                    alert("Mesaj Gönderildi! 😊");
                    document.getElementById("contact-form").reset(); // Formu temizle
                },
                function (error) {
                    console.error("FAILED...", error);
                    alert("Mesaj gönderilemedi ❌");
                }
            );
    });
