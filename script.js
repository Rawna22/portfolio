// ===== NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 50) {
    nav.style.borderBottomColor = 'var(--border)';
  }
  lastScroll = y;
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-card, .skill-group, .contact-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== FORM =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', function(e) {
    // If using Formspree, let it submit normally
    if (form.action && form.action.includes('formspree')) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      // Form will submit, show success on return
      return;
    }

    // Fallback: show success message
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1000);
  });
}

// ===== TYPING EFFECT (Hero subtitle) =====
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  // Subtle entrance
  heroSub.style.opacity = '0';
  heroSub.style.transform = 'translateY(10px)';
  heroSub.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
  setTimeout(() => {
    heroSub.style.opacity = '1';
    heroSub.style.transform = 'translateY(0)';
  }, 300);
}
