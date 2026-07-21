/* ============================================
   EVENTA STUDIO — Form Validation & Handling
   ============================================ */

(function() {
  'use strict';

  function initForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Newsletter form
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', handleNewsletterSubmit);
    });

    // Floating labels
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        input.parentElement.classList.remove('error');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
      // Initial state
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });

    // RSVP forms (for demo sites)
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
      rsvpForm.addEventListener('submit', handleRsvpSubmit);
    }
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    let valid = true;

    if (name && !name.value.trim()) {
      name.parentElement.classList.add('error');
      valid = false;
    }
    if (email && !validateEmail(email.value)) {
      email.parentElement.classList.add('error');
      valid = false;
    }
    if (message && !message.value.trim()) {
      message.parentElement.classList.add('error');
      valid = false;
    }

    if (valid) {
      // Simulate submission
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div class="success-state">
            <div class="success-icon"><i class="fas fa-check"></i></div>
            <h3 class="success-title">Message Sent!</h3>
            <p class="success-text">Thank you for reaching out. I'll get back to you within 24 hours.</p>
          </div>
        `;
      }, 1500);
    }
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]');

    if (email && validateEmail(email.value)) {
      const btn = form.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--color-success)';
      email.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
      }, 3000);
    } else {
      email.style.borderColor = 'var(--color-error)';
      setTimeout(() => {
        email.style.borderColor = '';
      }, 2000);
    }
  }

  function handleRsvpSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');

    let valid = true;

    if (name && !name.value.trim()) {
      name.parentElement.classList.add('error');
      valid = false;
    }
    if (email && !validateEmail(email.value)) {
      email.parentElement.classList.add('error');
      valid = false;
    }

    if (valid) {
      form.innerHTML = `
        <div class="success-state">
          <div class="success-icon"><i class="fas fa-heart"></i></div>
          <h3 class="success-title">RSVP Confirmed!</h3>
          <p class="success-text">Thank you! We can't wait to celebrate with you.</p>
        </div>
      `;
    }
  }

  // FAQ Accordion
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(faq => {
          faq.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function init() {
    initForms();
    initFAQ();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
