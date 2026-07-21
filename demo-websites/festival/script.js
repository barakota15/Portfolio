document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5s artificial loading time

    // 2. Sticky Navbar & Active Link Highlighting
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky nav transition
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link dynamic highlighting based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Hamburger Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animations utilizing Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 5. Animated Number Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const speed = 150; // Lower value = faster count
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if(statsSection) counterObserver.observe(statsSection);

    // 6. Dynamic Artist Lineup Rendering & Filtering
    const artists = [
        { name: "Neonix", genre: "EDM", time: "11:00 PM", stage: "Neon Stage", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80" },
        { name: "Cyber Pulse", genre: "DJ", time: "01:00 AM", stage: "Cyber Stage", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80" },
        { name: "The Void", genre: "Rock", time: "09:00 PM", stage: "Nova Stage", img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=600&q=80" },
        { name: "Luna Ray", genre: "Pop", time: "08:30 PM", stage: "Neon Stage", img: "https://images.unsplash.com/photo-1516280440502-62b2bc346850?auto=format&fit=crop&w=600&q=80" },
        { name: "Bass Phantom", genre: "EDM", time: "12:00 AM", stage: "Cyber Stage", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=600&q=80" },
        { name: "Rhythm X", genre: "Hip-Hop", time: "10:00 PM", stage: "Nova Stage", img: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=600&q=80" },
        { name: "Echo Flow", genre: "DJ", time: "07:00 PM", stage: "Neon Stage", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=80" },
        { name: "Starlight", genre: "Pop", time: "06:00 PM", stage: "Nova Stage", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80" }
    ];

    const lineupGrid = document.getElementById('lineup-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const displayArtists = (artistData) => {
        lineupGrid.innerHTML = '';
        artistData.forEach(artist => {
            const card = document.createElement('div');
            card.classList.add('artist-card');
            card.innerHTML = `
                <div class="artist-img">
                    <img src="${artist.img}" alt="${artist.name}" loading="lazy">
                </div>
                <div class="artist-info">
                    <h3 class="artist-name">${artist.name}</h3>
                    <div class="artist-genre">${artist.genre}</div>
                    <div class="artist-details">
                        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${artist.time}</span>
                        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${artist.stage}</span>
                    </div>
                </div>
            `;
            lineupGrid.appendChild(card);
        });
    };

    // Initial render
    displayArtists(artists);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                displayArtists(artists);
            } else {
                const filtered = artists.filter(a => a.genre === filter);
                displayArtists(filtered);
            }
        });
    });

    // 7. Mouse Parallax Effect for Hero Background Shapes
    const heroParallax = document.getElementById('hero-parallax');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        
        if (heroParallax && window.scrollY < window.innerHeight) {
            heroParallax.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });

    // 8. Floating Particles Canvas Animation
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            const colors = ['#A855F7', '#3B82F6', '#EC4899', '#22D3EE', '#39FF14'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numParticles = Math.min(100, window.innerWidth / 15);
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // 9. Countdown Timer
    // Setting target date to 30 days ahead from today for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const countdownContainer = document.getElementById('countdown');
    const expiredMsg = document.getElementById('countdown-expired');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            countdownContainer.classList.add('hidden');
            expiredMsg.classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 10. Masonry Gallery Generation & Lightbox
    const galleryContainer = document.getElementById('gallery-container');
    const galleryImages = [
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533174000222-90ab12f6b5f4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470229722913-7c092bb4ace4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540039155733-d7696d40fc8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ];

    galleryImages.forEach((src, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        
        // Add classes for masonry sizing variation
        if (index === 0 || index === 4) item.classList.add('large');
        if (index === 2) item.classList.add('wide');

        item.innerHTML = `
            <img src="${src}" alt="Festival Memory ${index+1}" class="gallery-img" loading="lazy">
            <div class="gallery-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(src));
        galleryContainer.appendChild(item);
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 11. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 12. Newsletter Form Validation
    const form = document.getElementById('newsletter-form');
    const msg = document.getElementById('form-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        msg.className = 'form-message'; // Reset classes
        
        if (re.test(email)) {
            msg.innerText = "Thank you! You're now on the list.";
            msg.classList.add('msg-success');
            form.reset();
        } else {
            msg.innerText = "Please enter a valid email address.";
            msg.classList.add('msg-error');
        }
        
        setTimeout(() => {
            msg.innerText = "";
            msg.className = 'form-message';
        }, 4000);
    });

    // 13. Back to Top Button Smooth Scroll
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 14. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    window.scrollTo({
                        top: target.offsetTop - 70, // header offset
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
