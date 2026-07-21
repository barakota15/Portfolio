/* ============================================
   EVENTA STUDIO — Countdown Timer
   Configurable countdown with flip animation
   ============================================ */

(function() {
  'use strict';

  function initCountdowns() {
    document.querySelectorAll('[data-countdown]').forEach(container => {
      const targetDate = new Date(container.getAttribute('data-countdown')).getTime();
      const daysEl = container.querySelector('[data-days]');
      const hoursEl = container.querySelector('[data-hours]');
      const minutesEl = container.querySelector('[data-minutes]');
      const secondsEl = container.querySelector('[data-seconds]');

      function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
          if (daysEl) daysEl.textContent = '0';
          if (hoursEl) hoursEl.textContent = '0';
          if (minutesEl) minutesEl.textContent = '0';
          if (secondsEl) secondsEl.textContent = '0';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) updateValue(daysEl, days);
        if (hoursEl) updateValue(hoursEl, String(hours).padStart(2, '0'));
        if (minutesEl) updateValue(minutesEl, String(minutes).padStart(2, '0'));
        if (secondsEl) updateValue(secondsEl, String(seconds).padStart(2, '0'));
      }

      function updateValue(el, value) {
        const strVal = String(value);
        if (el.textContent !== strVal) {
          el.style.transform = 'scale(1.1)';
          el.textContent = strVal;
          setTimeout(() => {
            el.style.transform = 'scale(1)';
          }, 150);
        }
      }

      update();
      setInterval(update, 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdowns);
  } else {
    initCountdowns();
  }
})();
