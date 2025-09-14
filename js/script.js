// Initialize EmailJS
(function () {
  emailjs.init({
    publicKey: "Hz5oq-2HUC1NxII_B", // Ganti dengan EmailJS Public Key Anda
  });
})();

// Loading animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-wrapper");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

// Initialize AOS animation
AOS.init({
  once: true,
  duration: 800,
});

// Toggle class active for mobile menu
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  if (!navbarNav.contains(e.target) && e.target.id !== "menu") {
    navbarNav.classList.remove("active");
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navbarNav.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });
});

// Back to top functionality
document.querySelector(".back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// EmailJS Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  // Form elements
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const alertSuccess = document.getElementById("alertSuccess");
  const alertError = document.getElementById("alertError");

  // Hide alerts function
  function hideAlerts() {
    if (alertSuccess) alertSuccess.classList.remove("show");
    if (alertError) alertError.classList.remove("show");
  }

  // Show alert function
  function showAlert(type) {
    hideAlerts();
    if (type === "success" && alertSuccess) {
      alertSuccess.classList.add("show");
      // Hide after 5 seconds
      setTimeout(() => {
        alertSuccess.classList.remove("show");
      }, 5000);
    } else if (alertError) {
      alertError.classList.add("show");
      // Hide after 5 seconds
      setTimeout(() => {
        alertError.classList.remove("show");
      }, 5000);
    }
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Form validation
  function validateForm(formData) {
    if (!formData.name.trim()) {
      return { valid: false, message: "Nama tidak boleh kosong" };
    }
    if (!formData.email.trim()) {
      return { valid: false, message: "Email tidak boleh kosong" };
    }
    if (!isValidEmail(formData.email)) {
      return { valid: false, message: "Format email tidak valid" };
    }
    if (!formData.subject.trim()) {
      return { valid: false, message: "Subjek tidak boleh kosong" };
    }
    if (!formData.message.trim()) {
      return { valid: false, message: "Pesan tidak boleh kosong" };
    }
    return { valid: true };
  }

  // Real-time email validation
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      const email = this.value.trim();
      if (email && !isValidEmail(email)) {
        this.style.borderColor = "var(--error)";
      } else {
        this.style.borderColor = "#333";
      }
    });

    emailInput.addEventListener("input", function () {
      if (this.style.borderColor === "var(--error)") {
        this.style.borderColor = "#333";
      }
    });
  }

  // Form submission handler
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Hide any existing alerts
      hideAlerts();

      // Get form data
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      // Validate form data
      const validation = validateForm(formData);
      if (!validation.valid) {
        console.error("Form validation failed:", validation.message);
        showAlert("error");
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add("btn-loading");
        submitBtn.disabled = true;
      }

      // Send email using EmailJS
      emailjs
        .send(
          "service_motgu2w", // Ganti dengan Service ID Anda
          "template_6dn7z17", // Ganti dengan Template ID Anda
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Emperion Community",
          }
        )
        .then(function (response) {
          console.log("Email sent successfully:", response);
          showAlert("success");
          form.reset(); // Clear the form

          // Reset all input styles
          const inputs = form.querySelectorAll("input, textarea");
          inputs.forEach((input) => {
            input.style.borderColor = "#333";
          });
        })
        .catch(function (error) {
          console.error("Error sending email:", error);
          showAlert("error");
        })
        .finally(function () {
          // Remove loading state
          if (submitBtn) {
            submitBtn.classList.remove("btn-loading");
            submitBtn.disabled = false;
          }
        });
    });
  }
});

// Legacy sendMail function (untuk kompatibilitas)
function sendMail() {
  const form = document.getElementById("contactForm");
  if (form) {
    const event = new Event("submit");
    form.dispatchEvent(event);
  }
}

// Parallax effect for hero decorative elements
window.addEventListener("mousemove", function (e) {
  const deco1 = document.querySelector(".parallax-deco-1");
  const deco2 = document.querySelector(".parallax-deco-2");
  if (deco1 && deco2) {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    deco1.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    deco2.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
  }
});
