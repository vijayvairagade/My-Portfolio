// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(15, 20, 25, 0.95)";
  } else {
    navbar.style.background = "rgba(15, 20, 25, 0.9)";
  }
});

// Custom cursor effect
const cursor = document.getElementById("customCursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mouseover", (e) => {
  if (e.target.closest("a, button, input, textarea, .certificate-card")) {
    cursor.classList.add("glow");
  } else {
    cursor.classList.remove("glow");
  }
});

// Particle effect
function createParticles() {
  const particlesContainer = document.getElementById("particles-js");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.background = "rgba(0, 255, 136, 0.5)";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      3 + Math.random() * 4
    }s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Certificate Modal
const modal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalImage.src = card.dataset.image;
    modalCaption.textContent = card.dataset.caption;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards and tiles
document
  .querySelectorAll(
    ".skill-tile, .project-card, .message-card, .contact-tile, .education-card, .certificate-card, .research-card"
  )
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// Initialize particles
createParticles();

// Hide scroll indicator on scroll
window.addEventListener("scroll", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (window.scrollY > 100) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});

// Typing effect for hero title
const heroTitle = document.querySelector(".hero-title");
const titleText = "Vijay Vairagade";
heroTitle.textContent = "";

let i = 0;
const typeWriter = () => {
  if (i < titleText.length) {
    heroTitle.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
};

// Telegram Bot Integration
const messageForm = document.getElementById("messageForm");
const BOT_TOKEN = "BOT_TOKEN"; // Replace with your Telegram Bot Token
const CHAT_ID = "CHAT_ID"; // Replace with your Telegram Chat ID

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const telegramMessage = `New Message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    if (response.ok) {
      alert("Message sent successfully!");
      messageForm.reset();
    } else {
      alert("Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});
