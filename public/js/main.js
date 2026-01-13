/**
 * Main JavaScript for Edwin Tsembegano Portfolio
 * Handles navigation, mobile menu, and general interactions
 */

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuToggle && navLinks) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        console.log('Mobile menu initialized');
    }
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Adjust based on your fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// STICKY HEADER ON SCROLL
// ========================================

function initStickyHeader() {
    const header = document.querySelector('.main-header, header');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Optional: Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 300) {
                header.classList.add('hide-header');
            } else {
                header.classList.remove('hide-header');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ========================================
// ACTIVE NAV LINK BASED ON CURRENT PAGE
// ========================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// NEWSLETTER FORM HANDLING
// ========================================

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // You can integrate with your email service here
                console.log('Newsletter subscription for:', email);
                
                // Show success message
                alert('Thank you for subscribing! We\'ll keep you updated with the latest web development insights.');
                
                // Reset form
                emailInput.value = '';
            }
        });
    }
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .service-card-compact, .blog-preview-card');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// LOADING ANIMATION
// ========================================

function hideLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// ========================================
// HANDLE EXTERNAL LINKS
// ========================================

function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Add security attributes
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ========================================
// INITIALIZE ALL FUNCTIONS
// ========================================

function init() {
    console.log('Initializing Edwin Tsembegano Portfolio...');
    
    // Initialize all functions
    initMobileMenu();
    initSmoothScrolling();
    initStickyHeader();
    setActiveNavLink();
    initNewsletterForm();
    initScrollAnimations();
    initExternalLinks();
    
    // Hide loader after everything is initialized
    hideLoader();
    
    console.log('Portfolio initialized successfully!');
}

// ========================================
// RUN ON DOM CONTENT LOADED
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// WINDOW LOAD EVENT
// ========================================

window.addEventListener('load', function() {
    console.log('All resources loaded');
    hideLoader();
});

// ========================================
// HANDLE PAGE VISIBILITY
// ========================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// ========================================
// RESPONSIVE UTILITIES
// ========================================

// Detect if user is on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Debounce function for resize events
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

// Handle window resize
const handleResize = debounce(function() {
    console.log('Window resized:', window.innerWidth);
    
    // Close mobile menu if window is resized to desktop
    if (!isMobile()) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        }
    }
}, 250);

window.addEventListener('resize', handleResize);