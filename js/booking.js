/* ============================================
   EVENTA STUDIO — Booking Form Wizard
   Multi-step form with validation
   ============================================ */

(function() {
  'use strict';

  function initBookingWizard() {
    const wizard = document.querySelector('.booking-wizard');
    if (!wizard) return;

    const panels = wizard.querySelectorAll('.wizard-panel');
    const indicators = wizard.querySelectorAll('.wizard-step-indicator');
    const progressBar = wizard.querySelector('.wizard-progress-bar');
    const nextBtns = wizard.querySelectorAll('.wizard-next');
    const prevBtns = wizard.querySelectorAll('.wizard-prev');
    const submitBtn = wizard.querySelector('.wizard-submit');

    let currentStep = 0;

    function showStep(step) {
      panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === step);
      });
      indicators.forEach((ind, i) => {
        ind.classList.remove('active', 'completed');
        if (i < step) ind.classList.add('completed');
        if (i === step) ind.classList.add('active');
      });
      if (progressBar) {
        const progress = (step / (panels.length - 1)) * 100;
        progressBar.style.width = progress + '%';
      }
      currentStep = step;
    }

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < panels.length - 1) {
            showStep(currentStep + 1);
            // window.scrollTo({ top: wizard.offsetTop - 100, behavior: 'smooth' });
          }
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 0) {
          showStep(currentStep - 1);
        }
      });
    });

    // Event type selection
    wizard.querySelectorAll('.event-type-card').forEach(card => {
      card.addEventListener('click', () => {
        wizard.querySelectorAll('.event-type-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Style selection
    wizard.querySelectorAll('.style-card').forEach(card => {
      card.addEventListener('click', () => {
        wizard.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Palette selection
    wizard.querySelectorAll('.palette-option').forEach(option => {
      option.addEventListener('click', () => {
        wizard.querySelectorAll('.palette-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
      });
    });


    // Validation
    function validateStep(step) {
      let valid = true;
      const panel = panels[step];

      // Step 0: Event type
      if (step === 0) {
        const selected = panel.querySelector('.event-type-card.selected');
        if (!selected) {
          alert('Please select an event type.');
          valid = false;
        }
      }

      // Step 1: Style & Palette
      if (step === 1) {
        const style = panel.querySelector('.style-card.selected');
        const palette = panel.querySelector('.palette-option.selected');
        if (!style) {
          alert('Please select a design style.');
          valid = false;
        } else if (!palette) {
          alert('Please select a color palette.');
          valid = false;
        }
      }

      // Step 2: Project details
      if (step === 2) {
        const deadline = panel.querySelector('input[type="date"]');
        const description = panel.querySelector('textarea');
        if (deadline && !deadline.value) {
          deadline.parentElement.classList.add('error');
          valid = false;
        }
        if (description && !description.value.trim()) {
          description.parentElement.classList.add('error');
          valid = false;
        }
      }

      return valid;
    }

    // Submit
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const panel = panels[currentStep];
        const name = panel.querySelector('input[name="name"]');
        const email = panel.querySelector('input[name="email"]');

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
          // Gather all data
          const eventType = wizard.querySelector('.event-type-card.selected span')?.innerText || '';
          
          let styleLabel = wizard.querySelector('.style-card.selected .style-card-label');
          if (!styleLabel) {
             styleLabel = wizard.querySelector('.style-card.selected span');
          }
          const style = styleLabel ? styleLabel.innerText : '';
          
          const palette = wizard.querySelector('.palette-option.selected p')?.innerText || '';
          const deadline = wizard.querySelector('input[type="date"]')?.value || '';
          const preferredPackage = wizard.querySelector('select')?.value || '';
          const description = wizard.querySelectorAll('textarea')[0]?.value || '';
          const contactName = name.value;
          const contactEmail = email.value;
          const phone = panel.querySelector('input[name="phone"]')?.value || '';
          const notes = wizard.querySelectorAll('textarea')[1]?.value || '';

          const submitBtnOriginalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
          submitBtn.disabled = true;

          // قراءة الرابط من الإعدادات
          const SCRIPT_URL = typeof SiteConfig !== 'undefined' ? SiteConfig.googleAppsScriptUrl : 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

          const formData = new FormData();
          formData.append('eventType', eventType);
          formData.append('style', style);
          formData.append('palette', palette);
          formData.append('deadline', deadline);
          formData.append('package', preferredPackage);
          formData.append('description', description);
          formData.append('name', contactName);
          formData.append('email', contactEmail);
          formData.append('phone', phone);
          formData.append('notes', notes);

          // إذا لم يتم وضع الرابط، نعرض رسالة النجاح مباشرة (للتجربة)
          if (!SCRIPT_URL || SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
            console.warn("Please update the googleAppsScriptUrl in js/config.js with your actual Google Apps Script URL");
            showSuccess();
            return;
          }

          fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Use no-cors to avoid CORS issues with simple Apps Script deployments
          })
          .then(() => {
            showSuccess();
          })
          .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error submitting your request. Please try again.');
            submitBtn.innerHTML = submitBtnOriginalText;
            submitBtn.disabled = false;
          });
          
          function showSuccess() {
            wizard.innerHTML = `
              <div class="success-state" style="text-align: center; padding: 3rem;">
                <div class="success-icon" style="font-size: 3rem; color: var(--color-success); margin-bottom: 1rem;"><i class="fas fa-check-circle"></i></div>
                <h3 class="success-title text-2xl mb-4">Inquiry Submitted!</h3>
                <p class="success-text text-muted mb-8">Thank you! I'll review your project details and get back to you within 24 hours.</p>
                <a href="index.html" class="btn btn-primary btn-lg" style="margin-top: 2rem; display: inline-block;">Back to Home</a>
              </div>
            `;
          }
        }
      });
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showStep(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingWizard);
  } else {
    initBookingWizard();
  }
})();
