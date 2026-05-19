/* =====================================================
   KARTHIKA GANESAN — PORTFOLIO
   script.js — All vanilla JS interactions
   ===================================================== */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1400);
});

/* ===== NAVBAR: scroll state & active link ===== */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavbar() {
  // Scrolled class for styling
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle  = document.getElementById('navToggle');
const navLinkEl  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinkEl.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu on link click (mobile)
navLinkEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinkEl.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'))
        : [];
      const sibIdx = siblings.indexOf(entry.target);
      const delay  = Math.min(sibIdx * 80, 300);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM (frontend only) ===== */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = '// Please fill in all fields.';
    formNote.style.color = '#e06c75';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.textContent = '// Please enter a valid email address.';
    formNote.style.color = '#e06c75';
    return;
  }

  // Simulate send (no backend — swap with your preferred service)
  formNote.textContent = '// Sending...';
  formNote.style.color = '';

  setTimeout(() => {
    formNote.textContent = '// Message sent. Thank you!';
    formNote.style.color = '#3dd68c';
    form.reset();
    setTimeout(() => { formNote.textContent = ''; }, 4000);
  }, 900);
});

/* ===== SMOOTH SCROLL for internal links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
    const offset = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});
