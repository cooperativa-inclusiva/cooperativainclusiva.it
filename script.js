/* inclusiva — interazioni leggere */
(function () {
  'use strict';

  // Anno corrente in footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.setAttribute('data-open', String(!open));
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    // Chiudi al click su un link interno
    menu.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
      }
    });
    // Esc per chiudere
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // Reveal on scroll (rispetta reduced-motion)
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.section-tag, .section-title, .section-body, .kpi-list, .card, .principle, .step, .manifesto-title, .manifesto-text, .contact-card, .footer-cols'
    );
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  }

  // Header shadow al scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
