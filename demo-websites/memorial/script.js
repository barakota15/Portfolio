document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger initial scroll reveals once loaded
            reveal();
        }, 800);
    }, 1000);

    // 2. Navigation & Mobile Menu
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // 4. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    
    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);

    // 5. Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.style.maxHeight = null;
            });
            
            // If wasn't active, open it
            if (!isActive) {
                header.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 7. Lightbox Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    
    galleryItems.forEach(item => {
        const triggerLightbox = () => {
            const placeholderText = item.querySelector('.image-placeholder').textContent;
            lightboxImg.textContent = placeholderText;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        item.addEventListener('click', triggerLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') triggerLightbox();
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // 8. Dynamic Guestbook with Local Storage
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');
    const formSuccess = document.getElementById('form-success');
    
    const STORAGE_KEY = 'memorial_guestbook_entries';
    
    // Initial dummy data if storage is empty
    const defaultEntries = [
        {
            name: "The Wilson Family",
            relationship: "Neighbors",
            message: "Eleanor was a beacon of light in our neighborhood. We will miss her gentle smile and beautiful garden.",
            date: "July 20, 2026"
        },
        {
            name: "Sarah Jenkins",
            relationship: "Former Student",
            message: "Mrs. Smith was my 3rd-grade teacher and changed my life. She taught me to love reading. My deepest condolences to the family.",
            date: "July 19, 2026"
        }
    ];

    function getEntries() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEntries));
            return defaultEntries;
        }
    }

    function saveEntry(entry) {
        const entries = getEntries();
        entries.unshift(entry); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    function renderEntries() {
        const entries = getEntries();
        guestbookEntries.innerHTML = '';
        
        entries.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'entry-card';
            
            card.innerHTML = `
                <div class="entry-header">
                    <div>
                        <div class="entry-name">${escapeHTML(entry.name)}</div>
                        ${entry.relationship ? `<div class="entry-relation">${escapeHTML(entry.relationship)}</div>` : ''}
                    </div>
                    <div class="entry-date">${escapeHTML(entry.date)}</div>
                </div>
                <div class="entry-message">"${escapeHTML(entry.message).replace(/\n/g, '<br>')}"</div>
            `;
            
            guestbookEntries.appendChild(card);
        });
    }

    // Basic HTML escaping to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const relationInput = document.getElementById('relationship');
        const messageInput = document.getElementById('message');
        
        if (!nameInput.value.trim() || !messageInput.value.trim()) return;

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);

        const newEntry = {
            name: nameInput.value.trim(),
            relationship: relationInput.value.trim(),
            message: messageInput.value.trim(),
            date: currentDate
        };

        saveEntry(newEntry);
        renderEntries();
        
        guestbookForm.reset();
        
        formSuccess.classList.add('show');
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    });

    // Render entries on load
    renderEntries();

    // 9. Update Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 10. Generate Floating Leaves Dynamically
    const heroSection = document.querySelector('.hero');
    const leavesContainer = document.querySelector('.floating-leaves');
    
    if (leavesContainer) {
        const numLeaves = 12;
        for (let i = 0; i < numLeaves; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            // Randomize position, size, animation duration and delay
            const left = Math.random() * 100;
            const size = 15 + Math.random() * 15;
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 20;
            
            leaf.style.left = `${left}%`;
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `${delay}s`;
            
            leavesContainer.appendChild(leaf);
        }
    }
});
