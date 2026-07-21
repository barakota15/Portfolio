const SiteConfig = {
  // Global Branding
  studioName: "Eventa Studio",

  // Google Apps Script URL for Form Submissions
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbxXnQkxXz1cc8GDMQveMWCA3pOnrp2hh2ToDn3KcOKCfEaqSBisWeLdOAjfAAP7EF21vg/exec",

  // Footer / About
  footerDescription: "Creating premium custom event websites that make your special moments unforgettable. From weddings to corporate events, I craft digital experiences that wow.",

  // Contact Information
  contactEmail: "omar.m.barakat@icloud.com",
  contactPhone: "+20 100 563 9062",

  // About Page
  aboutHeroHeadline: "The Designer Behind Your Dream Event Website",
  aboutHeroSubtitle: "I am passionate about creating memorable digital experiences for your most important moments.",
  aboutStory: `I'm a passionate web designer with over 5 years of experience specializing in custom event websites. After designing my own wedding website and seeing how much easier it made everything for our guests, I realized there was a huge need for premium, personalized digital experiences for special occasions.<br><br>Since launching Eventa Studio, I've had the pleasure of crafting over 150 unique websites for weddings, corporate galas, milestone birthdays, and more. My goal is to capture the essence of your event and translate it into a stunning digital invitation that builds excitement and makes managing your guest list a breeze.`,

  // Testimonials / Reviews
  testimonials: [
    {
      stars: 5,
      quote: "التعامل كان احترافي جدًا، والموقع طلع شيك وسهل الاستخدام. كل المعازيم كانوا بيسألونا مين اللي عمله، ونظام الحجز وفر علينا وقت ومجهود كبير.",
      name: "Sarah & Omar",
      event: "Wedding, June 2024",
      initials: "SO"
    },
    {
      stars: 5,
      quote: "We needed a professional event website on a tight deadline, and Eventa Studio delivered beyond expectations. Everything was organized and easy to manage.",
      name: "Mohamed Hassan",
      event: "Corporate Conference",
      initials: "MH"
    },
    {
      stars: 5,
      quote: "The design matched our vision perfectly. Guests loved the countdown, photo gallery, and how easy it was to find all the event details.",
      name: "Nour Ahmed",
      event: "Engagement Party",
      initials: "NA"
    },
    {
      stars: 5,
      quote: "Fast communication, beautiful design, and every small change we requested was handled quickly. We couldn't be happier with the final result.",
      name: "Karim Sherif",
      event: "Birthday Celebration",
      initials: "KS"
    },
    {
      stars: 5,
      quote: "A premium experience from beginning to end. The website gave our event a modern and professional touch, and our guests were genuinely impressed.",
      name: "Sara Khaled",
      event: "Graduation Party",
      initials: "SK"
    }
  ]
};

// Function to apply config to DOM elements
function applyConfig() {
  // 1. Text content injection
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (SiteConfig[key]) {
      // Use innerHTML if the content might contain HTML (like aboutStory)
      el.innerHTML = SiteConfig[key];
    }
  });

  // 2. Specific Links
  document.querySelectorAll('[data-config-href]').forEach(el => {
    const key = el.getAttribute('data-config-href');
    if (SiteConfig[key]) {
      if (key === 'contactEmail') {
        el.href = 'mailto:' + SiteConfig[key];
      } else if (key === 'contactPhone') {
        // Strip non-numeric for tel link
        el.href = 'tel:' + SiteConfig[key].replace(/[^0-9+]/g, '');
      } else {
        el.href = SiteConfig[key];
      }
    }
  });

  // 3. Dynamic Testimonials Slider (if present)
  const testimonialsSlider = document.getElementById('dynamic-testimonials-slider');
  if (testimonialsSlider && SiteConfig.testimonials.length > 0) {
    let trackHtml = `<div class="testimonials-track">`;
    SiteConfig.testimonials.forEach(t => {
      let starsHtml = '';
      for (let i = 0; i < t.stars; i++) { starsHtml += '<i class="fas fa-star text-gold"></i>'; }
      trackHtml += `
        <div class="testimonial-card">
          <div class="testimonial-stars">${starsHtml}</div>
          <p class="testimonial-quote">"${t.quote}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${t.initials}</div>
            <div class="testimonial-info">
              <h4>${t.name}</h4>
              <p>${t.event}</p>
            </div>
          </div>
        </div>
      `;
    });
    trackHtml += `</div>
      <div class="slider-controls">
        <button class="slider-btn slider-prev" aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
        <div class="slider-dots"></div>
        <button class="slider-btn slider-next" aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
      </div>`;
    testimonialsSlider.innerHTML = trackHtml;
    // We assume slider.js will initialize based on the DOM structure.
    // If slider.js already ran, we might need to re-init it, 
    // but putting config.js before slider.js usually solves this.
  }

  // 4. Dynamic Testimonials Grid (if present)
  const testimonialsGrid = document.getElementById('dynamic-testimonials-grid');
  if (testimonialsGrid && SiteConfig.testimonials.length > 0) {
    let gridHtml = '';
    SiteConfig.testimonials.forEach(t => {
      let starsHtml = '';
      for (let i = 0; i < t.stars; i++) { starsHtml += '<i class="fas fa-star text-gold"></i>'; }
      gridHtml += `
        <div class="testimonial-grid-card reveal">
          <div class="testimonial-stars" style="margin-bottom:1rem;">${starsHtml}</div>
          <p class="testimonial-quote" style="margin-bottom:1.5rem; color:var(--text-light);">"${t.quote}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" style="width:40px;height:40px;font-size:0.9rem;">${t.initials}</div>
            <div class="testimonial-info">
              <h4 style="font-size:1rem;margin-bottom:2px;">${t.name}</h4>
              <p style="font-size:0.8rem;color:var(--text-light);">${t.event}</p>
            </div>
          </div>
        </div>
      `;
    });
    testimonialsGrid.innerHTML = gridHtml;
  }
}

// Run applyConfig as soon as DOM is loaded
document.addEventListener('DOMContentLoaded', applyConfig);
