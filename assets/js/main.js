/* ==========================================================================
   Ralf Lauwers — personal site
   Small, dependency-free enhancements. The page is fully usable without JS;
   the only JS-only behaviour is the collapsible mobile nav.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Collapsible primary navigation ---------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('primary-nav');
  var nav = toggle ? toggle.closest('.nav') : null;

  if (toggle && links && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a destination.
    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    // Close on Escape.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    // Reset when growing to the desktop layout (matches the CSS breakpoint).
    var mq = window.matchMedia('(min-width: 1000px)');
    var onMq = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* --- Scrollspy: mark the nav link for the section in view ------------- */
  if ('IntersectionObserver' in window) {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.nav__links a[href^="#"]')
    );
    var byId = {};

    navLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) byId[id] = a;
      a.removeAttribute('aria-current');
    });

    if (navLinks.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          var active = byId[entry.target.id];
          if (active) active.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

      Object.keys(byId).forEach(function (id) {
        observer.observe(document.getElementById(id));
      });
    }
  }
})();
