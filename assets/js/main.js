/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings && typeof Typed !== 'undefined') {
      const strings = typed_strings.split(',').map(s => s.trim());
      if (!window.typedInstance) {
        window.typedInstance = new Typed('.typed', {
          strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        // Prefill bars to their target so the section looks loaded initially
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          const target = Number(el.getAttribute('aria-valuenow') || 0);
          el.style.transitionDuration = '0ms';
          el.style.width = `${target}%`;
        });
      }
    });
  });

  /**
   * Hover-activated skill rows: start progress from 0% and pop label
   */
  document.addEventListener('DOMContentLoaded', () => {
    const skillRows = document.querySelectorAll('.skills-animation .skill-item');

    function animateProgress(bar, targetPercent, durationMs = 1200) {
      if (!bar) return;
      const dur = Math.max(durationMs, 300);
      // Temporarily disable transition, reset to 0, then re-enable and set target on next frame
      bar.style.transition = 'none';
      bar.style.width = '0%';
      // Force reflow so width=0% is applied
      void bar.offsetWidth;
      // Re-enable transition specifically for width
      bar.style.transition = `width ${dur}ms ease-in-out`;
      // Set target on the next animation frame to ensure proper transition
      requestAnimationFrame(() => {
        bar.style.width = `${targetPercent}%`;
      });
    }

    skillRows.forEach((row) => {
      const bar = row.querySelector('.progress .progress-bar');
      const label = row.querySelector('h4, span');
      const target = bar ? Number(bar.getAttribute('aria-valuenow') || 0) : 0;

      row.addEventListener('mouseenter', () => {
        // Restart from 0 and animate to target on every hover
        animateProgress(bar, target, 1000);
      });

      row.addEventListener('mousemove', () => {
        // Reinforce hover state; no extra behavior needed
      });

      row.addEventListener('mouseleave', () => {
        // Keep filled after animation completes; no reset here
      });
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // Ensure we don't keep old instances that can conflict
      if (swiperElement.swiper && typeof swiperElement.swiper.destroy === 'function') {
        swiperElement.swiper.destroy(true, true);
        swiperElement.swiper = null;
      }

      // Scope navigation/pagination selectors to this element if present
      if (config.navigation) {
        const nextEl = swiperElement.querySelector('.swiper-button-next');
        const prevEl = swiperElement.querySelector('.swiper-button-prev');
        if (nextEl && prevEl) {
          config.navigation = { nextEl, prevEl };
        }
      }
      if (config.pagination) {
        const paginationEl = swiperElement.querySelector('.swiper-pagination');
        if (paginationEl) {
          config.pagination = { ...config.pagination, el: paginationEl };
        }
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  //   new Swiper('.testimonials-slider', {
  //   loop: true,
  //   speed: 600,
  //   autoplay: {
  //     delay: 5000
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true
  //   }
  // });


  // * Navmenu Scrollspy
  // */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    const offset = 180; // increased breathing room
    const position = window.scrollY + offset;
    let activeLink = null;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;

      if (navmenulink.hash === '#about') {
        const aboutSection = document.querySelector('#about');
        const statsSection = document.querySelector('#stats');
        if (aboutSection) {
          const start = aboutSection.offsetTop - 420;
          const aboutEnd = aboutSection.offsetTop + aboutSection.offsetHeight + 420;
          const statsEnd = statsSection ? statsSection.offsetTop + statsSection.offsetHeight + 420 : 0;
          const end = Math.max(aboutEnd, statsEnd);
          if (position >= start && position <= end) {
            activeLink = navmenulink;
          }
        }
        return;
      }

      const section = document.querySelector(navmenulink.hash);
      if (section && position >= (section.offsetTop - 360) && position <= (section.offsetTop + section.offsetHeight + 360)) {
        activeLink = navmenulink;
      }
    });

    document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Interactive tilt for stats cards
   */
  document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stats .stats-item');
    const MAX_TILT = 9;
    const activeCounters = new Map();
    const shadowTimers = new Map();

    function animateCounter(span) {
      const end = Number(span.dataset.purecounterEnd || span.textContent || 0);
      const durationSec = Number(span.dataset.purecounterDuration || 1);
      const duration = Math.max(durationSec * 1000, 200);
      const startTime = performance.now();

      if (activeCounters.has(span)) {
        cancelAnimationFrame(activeCounters.get(span));
      }

      span.textContent = '0';

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * end);
        span.textContent = value.toLocaleString();
        if (progress < 1) {
          const rafId = requestAnimationFrame(step);
          activeCounters.set(span, rafId);
        } else {
          span.textContent = end.toLocaleString();
          activeCounters.delete(span);
        }
      };

      const rafId = requestAnimationFrame(step);
      activeCounters.set(span, rafId);
    }

    statCards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;
        const tiltX = percentX * MAX_TILT;
        const tiltY = -percentY * MAX_TILT;

        card.style.setProperty('--tiltX', `${tiltX}deg`);
        card.style.setProperty('--tiltY', `${tiltY}deg`);
        card.style.setProperty('--lift', '-10px');
        card.style.setProperty('--scale', '1.1');
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tiltX', '0deg');
        card.style.setProperty('--tiltY', '0deg');
        card.style.setProperty('--lift', '0px');
        card.style.setProperty('--scale', '1');

        if (shadowTimers.has(card)) {
          clearTimeout(shadowTimers.get(card));
          shadowTimers.delete(card);
        }
        card.classList.remove('shadow-on');
        card.classList.add('rim-fade-out');
      });

      card.addEventListener('mouseenter', () => {
        card.style.setProperty('--lift', '-8px');
        card.style.setProperty('--scale', '1.08');
        card.classList.add('shadow-on');
        card.classList.remove('rim-fade-out');

        const counter = card.querySelector('.purecounter');
        if (counter) {
          animateCounter(counter);
        }
      });
    });
  });

  /**
   * Hero buttons rim fade wiring
   */
  document.addEventListener('DOMContentLoaded', () => {
    const heroButtons = document.querySelectorAll('.hero .hero-actions .btn');
    heroButtons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.remove('rim-fade-out');
      });
      btn.addEventListener('mouseleave', () => {
        btn.classList.add('rim-fade-out');
      });
    });
  });

  /**
   * Rim fade wiring for other key buttons (services view-all, about CTA, contact submit)
   */
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(
      '.services .service-header .service-summary .service-btn, .about .cta-section .btn, .contact .contact-form .btn'
    );
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.remove('rim-fade-out');
      });
      btn.addEventListener('mouseleave', () => {
        btn.classList.add('rim-fade-out');
      });
    });
  });

  /**
   * Per-item hover motion & scale for About section stats-grid
   */
  document.addEventListener('DOMContentLoaded', () => {
    const aboutStats = document.querySelectorAll('.about .stats-grid .stat-item');
    const MAX_MOVE = 8; // px

    aboutStats.forEach((item) => {
      item.addEventListener('mousemove', (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentX = (x / rect.width) - 0.5; // -0.5..0.5
        const moveX = percentX * MAX_MOVE; // px shift
        item.style.setProperty('--moveX', `${moveX}px`);
        item.style.setProperty('--lift', '-6px');
        item.style.setProperty('--scale', '1.05');
      });

      item.addEventListener('mouseenter', () => {
        item.style.setProperty('--lift', '-6px');
        item.style.setProperty('--scale', '1.05');
      });

      item.addEventListener('mouseleave', () => {
        item.style.setProperty('--moveX', '0px');
        item.style.setProperty('--lift', '0px');
        item.style.setProperty('--scale', '1');
      });
    });
  });

  /**
   * Hero profile stack: snake-follow hover effect
   */
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.hero .hero-visual .profile-container');
    if (!container) return;
    const img = container.querySelector('.profile-image');
    const bg1 = container.querySelector('.profile-background.bg-1');
    const bg2 = container.querySelector('.profile-background.bg-2');
    const bg3 = container.querySelector('.profile-background.bg-3');
    const bg4 = container.querySelector('.profile-background.bg-4');
    const bg5 = container.querySelector('.profile-background.bg-5');

    const addClasses = () => {
      if (img) img.classList.add('mouse-move');
      [bg1, bg2, bg3, bg4, bg5].forEach(el => el && el.classList.add('snake-follow'));
    };
    const removeClasses = () => {
      if (img) img.classList.remove('mouse-move');
      [bg1, bg2, bg3, bg4, bg5].forEach(el => el && el.classList.remove('snake-follow'));
    };

    container.addEventListener('mouseenter', addClasses);
    container.addEventListener('mouseleave', removeClasses);
  });

  /**
   * Toggle resume item details
   */
  window.toggleResumeItem = function (header) {
    const item = header.parentElement;
    const details = item.querySelectorAll('.resume-details');
    const icon = header.querySelector('.toggle-icon');

    item.classList.toggle('expanded');
    icon.classList.toggle('bi-chevron-down');
    icon.classList.toggle('bi-chevron-up');
  };

})();
