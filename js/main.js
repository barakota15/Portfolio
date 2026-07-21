/* ============================================
   EVENTA STUDIO — Main JavaScript
   Core functionality: nav, theme, cursor, loader, scroll
   ============================================ */

(function() {
  'use strict';

  // ---- Loading Screen ----
  const loader = document.querySelector('.loader');
  const loaderBar = document.querySelector('.loader-bar');

  function initLoader() {
    if (!loader || !loaderBar) return;
    document.body.classList.add('no-scroll');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.classList.remove('no-scroll');
          // Trigger hero animations
          document.querySelectorAll('.hero-animate').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
        }, 400);
      }
      loaderBar.style.width = progress + '%';
    }, 100);
  }

  // ---- Sticky Navbar ----
  const navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---- Mobile Navigation ----
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  function initMobileNav() {
    if (!navToggle || !navMobile) return;
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    // Close on link click
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // ---- Active Nav Link ----
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ---- Theme Switcher ----
  const themeToggle = document.querySelector('.theme-toggle');

  function initTheme() {
    const savedTheme = localStorage.getItem('eventa-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('eventa-theme', next);
        updateThemeIcon(next);
      });
    }
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // ---- Custom Cursor ----
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  function initCursor() {
    if (!cursorDot || !cursorRing) return;
    // Check for touch device
    if ('ontouchstart' in window) {
      cursorDot.style.display = 'none';
      cursorRing.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .card, .faq-question, input, textarea, select');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      cursorDot.classList.add('click');
      cursorRing.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
      cursorDot.classList.remove('click');
      cursorRing.classList.remove('click');
    });
  }

  // ---- Scroll Progress Indicator ----
  const scrollProgress = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  // ---- Back to Top Button ----
  const backToTop = document.querySelector('.back-to-top');

  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function initBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Page Transition ----
  function initPageTransitions() {
    const transition = document.querySelector('.page-transition');
    if (!transition) return;
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Only for internal links
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        transition.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = navbar ? navbar.offsetHeight + 20 : 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ---- Button Ripple Effect ----
  function initRipple() {
    document.querySelectorAll('.btn-ripple').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ---- Scroll Event Throttle ----
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavScroll();
        updateScrollProgress();
        handleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ---- Newsletter Submission ----
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('newsletter-success');
      
      const email = emailInput.value;
      if (!email) return;
      
      const originalBtnText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      btn.disabled = true;
      
      const SCRIPT_URL = typeof SiteConfig !== 'undefined' ? SiteConfig.googleAppsScriptUrl : '';
      
      const formData = new FormData();
      formData.append('formType', 'newsletter');
      formData.append('email', email);
      
      if (!SCRIPT_URL) {
        console.warn("No SCRIPT_URL defined in config for newsletter");
        showSuccess();
        return;
      }
      
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
      .then(() => {
        showSuccess();
      })
      .catch(error => {
        console.error('Error!', error.message);
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
      });
      
      function showSuccess() {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }
    });
  }

  // ---- Initialize ----
  function init() {
    initTheme();
    initLoader();
    initMobileNav();
    setActiveNavLink();
    initCursor();
    initBackToTop();
    initSmoothScroll();
    initRipple();
    initNewsletter();
    // Delay page transitions to avoid interfering with initial load
    setTimeout(initPageTransitions, 1000);

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    handleNavScroll();
    updateScrollProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
