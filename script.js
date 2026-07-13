document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initContactForm();
  initActiveNavLinks();
  initSmoothScroll();
  initProjectFilters();
  initExpandableBullets();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  };

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      closeMenu();
    }
  });
}

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-72px 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      form.reportValidity();
      return;
    }

    const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');
    window.location.href = `mailto:bandlamudirohit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        card.hidden = filter !== 'all' && !categories.includes(filter);
      });
    });
  });
}

function initExpandableBullets() {
  document.querySelectorAll('[data-expandable]').forEach(block => {
    const list = block.querySelector('.card-bullets');
    const btn = block.querySelector('.expand-btn');
    if (!list || !btn) return;

    btn.addEventListener('click', () => {
      const expanded = list.classList.toggle('expanded');
      btn.textContent = expanded ? 'Show less' : 'Show more';
      btn.setAttribute('aria-expanded', String(expanded));
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
