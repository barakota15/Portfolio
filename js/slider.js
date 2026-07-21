/* ============================================
   EVENTA STUDIO — Slider / Carousel
   Testimonial slider with touch support
   ============================================ */

(function() {
  'use strict';

  function initSliders() {
    document.querySelectorAll('.testimonials-slider').forEach(slider => {
      const track = slider.querySelector('.testimonials-track');
      const slides = slider.querySelectorAll('.testimonial-card');
      const prevBtn = slider.querySelector('.slider-prev');
      const nextBtn = slider.querySelector('.slider-next');
      const dotsContainer = slider.querySelector('.slider-dots');

      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      let startX = 0;
      let isDragging = false;
      let autoPlayTimer;

      // Create dots
      if (dotsContainer) {
        slides.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.classList.add('slider-dot');
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(dot);
        });
      }

      function goTo(index) {
        currentIndex = ((index % slides.length) + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetAutoPlay();
      }

      function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      function next() { goTo(currentIndex + 1); }
      function prev() { goTo(currentIndex - 1); }

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      // Touch support
      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
        }
        isDragging = false;
      });

      // Auto play
      function startAutoPlay() {
        autoPlayTimer = setInterval(next, 5000);
      }

      function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
      }

      startAutoPlay();

      // Pause on hover
      slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
      slider.addEventListener('mouseleave', startAutoPlay);

      // Keyboard
      slider.setAttribute('tabindex', '0');
      slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }
})();
