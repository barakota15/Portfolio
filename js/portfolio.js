/* ============================================
   EVENTA STUDIO — Portfolio Filtering
   Category filtering with animated layout
   ============================================ */

(function() {
  'use strict';

  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card, i) => {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, i * 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Project card modal preview
  function initProjectPreview() {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    const modalIframe = modal.querySelector('iframe');

    previewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = btn.getAttribute('data-preview');
        if (modalIframe && url) {
          modalIframe.src = url;
        }
        modal.querySelector('.modal-overlay').classList.add('active');
        modal.querySelector('.modal-content').classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    function closeModal() {
      modal.querySelector('.modal-overlay').classList.remove('active');
      modal.querySelector('.modal-content').classList.remove('active');
      document.body.classList.remove('no-scroll');
      if (modalIframe) {
        setTimeout(() => { modalIframe.src = ''; }, 300);
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function init() {
    initPortfolioFilters();
    initProjectPreview();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
