/* 
  Johnson Family Reunion - JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Loader Animation
    // ==========================================
    const loader = document.getElementById('loader');
    if (loader) {
        // Simulate minimum loading time for smooth transition
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800); 
    }

    // ==========================================
    // 2. Mobile Navigation Toggle
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('toggle'));
            
            // Accessibility
            const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', !expanded);
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('toggle'));
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 3. Sticky Navbar & Active Section Highlighting
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for fixed header
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after revealing to animate only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => revealObserver.observe(el));

    // Trigger hero animations slightly after load
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(el => el.classList.add('is-visible'));
    }, 100);

    // ==========================================
    // 5. Countdown Timer
    // ==========================================
    // Set target date to August 15, 2026, 15:00:00
    const countdownDate = new Date("Aug 15, 2026 15:00:00").getTime();
    const timerElement = document.getElementById("timer");
    const messageElement = document.getElementById("countdown-message");
    
    if (timerElement) {
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                timerElement.classList.add("hidden");
                if(messageElement) messageElement.classList.remove("hidden");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    // ==========================================
    // 6. FAQ Accordion
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.style.maxHeight = null;
            });

            // If clicked was not active, open it
            if (!isActive) {
                header.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                const content = header.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 7. Gallery Lightbox
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 8. RSVP Form Validation
    // ==========================================
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const guests = document.getElementById('guests');

            // Basic empty check
            [name, email, guests].forEach(input => {
                if (!input.value.trim()) {
                    input.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            });

            // Email Regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() && !emailRegex.test(email.value)) {
                email.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission process
                const btn = rsvpForm.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = "Sending RSVP...";
                btn.disabled = true;

                // Simulate API call delay
                setTimeout(() => {
                    rsvpForm.classList.add('hidden');
                    document.getElementById('form-success').classList.remove('hidden');
                }, 1500);
            }
        });

        // Remove error state on user input
        rsvpForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    input.parentElement.classList.remove('error');
                }
            });
        });
    }

    // ==========================================
    // 9. Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 10. Button Ripple Effect
    // ==========================================
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // 11. Generate Floating Leaves (Hero Section)
    // ==========================================
    const leavesContainer = document.querySelector('.floating-leaves');
    if (leavesContainer) {
        // Create 15 animated leaves
        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            
            // Randomize position, duration, and delay
            leaf.style.left = `${Math.random() * 100}%`;
            const duration = Math.random() * 6 + 6; // 6s to 12s
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `${Math.random() * 5}s`;
            
            leavesContainer.appendChild(leaf);
        }
    }

    // ==========================================
    // 12. Animated Counters (Intersection Observer)
    // ==========================================
    const counters = document.querySelectorAll('.count');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +entry.target.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // ~60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCounter();
                    obs.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // 13. Dynamic Copyright Year
    // ==========================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.innerText = new Date().getFullYear();
    }
});
