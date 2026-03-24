// ============================================
// NAVIGATION
// ============================================

// Get elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// TESTIMONIALS SLIDER
// ============================================

const testimonialsContainer = document.getElementById('testimonialsContainer');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Create dots
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('#sliderDots .dot');

function updateTestimonials() {
    testimonialCards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    testimonialCards[currentTestimonial].classList.add('active');
    
    dots.forEach((dot, index) => {
        if (index === currentTestimonial) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    testimonialCards[currentTestimonial].classList.add('prev');
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonials();
}

function prevTestimonial() {
    testimonialCards[currentTestimonial].classList.add('prev');
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
}

function goToTestimonial(index) {
    if (index !== currentTestimonial) {
        testimonialCards[currentTestimonial].classList.add('prev');
        currentTestimonial = index;
        updateTestimonials();
    }
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-play testimonials
let autoPlayInterval = setInterval(nextTestimonial, 6000);

testimonialsContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

testimonialsContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextTestimonial, 6000);
});

// ============================================
// ATTESTATI CAROUSEL
// ============================================

const attestatiTrack = document.getElementById('attestatiTrack');
const attestatiSlides = document.querySelectorAll('.attestato-slide');
const attestatiPrevBtn = document.getElementById('attestatiPrev');
const attestatiNextBtn = document.getElementById('attestatiNext');
const attestatiDotsContainer = document.getElementById('attestatiDots');

let currentAttestato = 0;
const totalAttestati = attestatiSlides.length;

// Set first slide active
if (attestatiSlides.length > 0) {
    attestatiSlides[0].classList.add('active');
}

// Create dots for attestati
for (let i = 0; i < totalAttestati; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToAttestato(i));
    attestatiDotsContainer.appendChild(dot);
}

const attestatiDots = document.querySelectorAll('#attestatiDots .dot');

function updateAttestati() {
    attestatiSlides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    attestatiSlides[currentAttestato].classList.add('active');
    
    attestatiDots.forEach((dot, index) => {
        if (index === currentAttestato) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextAttestato() {
    attestatiSlides[currentAttestato].classList.add('prev');
    currentAttestato = (currentAttestato + 1) % totalAttestati;
    updateAttestati();
}

function prevAttestato() {
    attestatiSlides[currentAttestato].classList.add('prev');
    currentAttestato = (currentAttestato - 1 + totalAttestati) % totalAttestati;
    updateAttestati();
}

function goToAttestato(index) {
    if (index !== currentAttestato) {
        attestatiSlides[currentAttestato].classList.add('prev');
        currentAttestato = index;
        updateAttestati();
    }
}

attestatiNextBtn.addEventListener('click', nextAttestato);
attestatiPrevBtn.addEventListener('click', prevAttestato);

// Auto-play attestati
let attestatiAutoPlay = setInterval(nextAttestato, 5000);

attestatiTrack.addEventListener('mouseenter', () => {
    clearInterval(attestatiAutoPlay);
});

attestatiTrack.addEventListener('mouseleave', () => {
    attestatiAutoPlay = setInterval(nextAttestato, 5000);
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.journey-card, .chi-sono-image, .chi-sono-text'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// Service cards with staggered entrance (0.15s delay per card in each row of 3)
const serviceCards = document.querySelectorAll('.servizio-card');
serviceCards.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    const delay = (index % 3) * 0.15;
    element.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    observer.observe(element);
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CURSOR EFFECT (Optional Enhancement)
// ============================================

if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #c4a55a;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .servizio-card, .journey-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#6d3838';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#c4a55a';
        });
    });
}

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    highlightNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console message
console.log('%c✨ Archetipica', 'font-size: 24px; color: #c4a55a; font-family: serif;');
console.log('%cCon amore e sacralità 🌙', 'font-size: 14px; color: #6d3838; font-style: italic;');
