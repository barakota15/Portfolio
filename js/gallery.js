/* ============================================
   EVENTA STUDIO — Gallery & Lightbox
   ============================================ */

(function() {
  'use strict';

  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
      <img src="" alt="Gallery image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = [];

    galleryItems.forEach((item, i) => {
      const img = item.querySelector('img');
      if (img) {
        images.push(img.src);
      } else {
        // Use background color as fallback
        images.push('');
      }

      item.addEventListener('click', () => {
        currentIndex = i;
        openLightbox();
      });
    });

    function openLightbox() {
      if (images[currentIndex]) {
        lightboxImg.src = images[currentIndex];
        lightboxImg.style.display = 'block';
      } else {
        lightboxImg.style.display = 'none';
      }
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    }

    function updateLightboxImage() {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        if (images[currentIndex]) {
          lightboxImg.src = images[currentIndex];
          lightboxImg.style.display = 'block';
        }
        lightboxImg.style.opacity = '1';
      }, 200);
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Touch support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? showNext() : showPrev();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
