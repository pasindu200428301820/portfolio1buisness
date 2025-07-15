// PASINDU CREATIONS - Premium JavaScript Functionality
// Beautiful animations and smooth interactions

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initPortfolioFilter();
    initContactForm();
    initSmoothScrolling();
    initMobileMenu();
    initScrollToTop();
    initScrollProgress();
    initHeroAnimations();
    initCounterAnimations();
    initCardHoverEffects();
    initLoadingAnimation();
    initRippleEffect();
    
    // Console welcome message
    console.log(`
%c
╔═══════════════════════════════════════╗
║         PASINDU CREATIONS             ║
║    Premium Graphic Design Services    ║
║                                       ║
║  🎨 Creative Design Solutions         ║
║  ⚡ Fast & Professional Service       ║
║  💼 Portfolio Website Ready           ║
║                                       ║
║  Contact: info@pasindecreations.com   ║
╚═══════════════════════════════════════╝
    `, 'color: #3b82f6; font-family: monospace; font-size: 12px;');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    [...navLinks, ...buttons].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('portfolio-item') || 
                    entry.target.classList.contains('pricing-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .pricing-card, .contact-item, .about-content, .section-header, .stat-item'
    );
    animatedElements.forEach(el => observer.observe(el));
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items with smooth animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            if (!validateForm(contactForm)) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            
            // Remove error styles after user starts typing
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }, { once: true });
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = '#ef4444';
        emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        showNotification('Please enter a valid email address.', 'error');
    }
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Hero animations
function initHeroAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                if (text.charAt(index) === '<') {
                    // Handle HTML tags
                    const tagEnd = text.indexOf('>', index);
                    heroTitle.innerHTML += text.substring(index, tagEnd + 1);
                    index = tagEnd + 1;
                } else {
                    heroTitle.innerHTML += text.charAt(index);
                    index++;
                }
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.floating-element');
        
        heroElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '+';
        
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        }
    }, 16);
}

// Initialize counter animation when stats section is in view
function initCounterAnimations() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent.replace('+', ''));
                        animateCounter(stat, target);
                    });
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(statsSection);
    }
}

// Card hover effects
function initCardHoverEffects() {
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="font-size: 1.5rem; margin-bottom: 10px;">PASINDU CREATIONS</h3>
            <p style="font-size: 1rem; opacity: 0.8;">Loading amazing designs...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const spinKeyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
                if (document.head.contains(style)) {
                    document.head.removeChild(style);
                }
            }, 500);
        }, 800);
    });
}

// Button ripple effect
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
}

// Form input focus effects
function initFormEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateY(-2px)';
            input.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'translateY(0)';
            if (!input.matches(':focus')) {
                input.style.boxShadow = '';
            }
        });
        
        // Floating label effect for better UX
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
}

// Initialize form effects
document.addEventListener('DOMContentLoaded', function() {
    initFormEffects();
});

// Smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section reveal animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSectionReveal, 1000);
});

// Dynamic background animation based on mouse movement
function initInteractiveBackground() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Update CSS custom properties for background animation
        document.documentElement.style.setProperty('--mouse-x', mouseX);
        document.documentElement.style.setProperty('--mouse-y', mouseY);
    });
}

// Initialize interactive background
document.addEventListener('DOMContentLoaded', function() {
    initInteractiveBackground();
});

// Lazy loading for images (if you add real images later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Text reveal animation with stagger
function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-title, .section-header h2');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            span.style.display = 'inline-block';
            element.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Initialize text reveal
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTextReveal, 1200);
});

// Performance optimization - Debounced resize handler
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

// Optimized resize handler
const handleResize = debounce(() => {
    // Recalculate animations and positions on resize
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.style.transform = 'translateY(0)';
    });
    
    // Recalculate scroll progress
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}, 250);

window.addEventListener('resize', handleResize);

// Enhanced error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Intersection Observer for better performance
const observerOptions = {
    rootMargin: '50px',
    threshold: 0.1
};

// Create a single observer for multiple elements
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('in-view');
            
            // Handle specific element types
            if (entry.target.classList.contains('stat-item')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    const target = parseInt(statNumber.textContent.replace('+', ''));
                    animateCounter(statNumber, target);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe elements for performance optimization
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .portfolio-item, .pricing-card, .contact-item, .stat-item'
    );
    
    elementsToObserve.forEach(el => {
        performanceObserver.observe(el);
    });
});

// Cleanup function for better performance
function cleanup() {
    // Remove event listeners and observers when needed
    window.removeEventListener('resize', handleResize);
    
    // Clean up any intervals or timeouts
    const intervals = window.intervals || [];
    intervals.forEach(interval => clearInterval(interval));
    
    const timeouts = window.timeouts || [];
    timeouts.forEach(timeout => clearTimeout(timeout));
    
    // Disconnect observers
    if (performanceObserver) {
        performanceObserver.disconnect();
    }
}

// Initialize cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Enhanced smooth scrolling with easing
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(30, 41, 59, 0.3);
        transition: all 0.3s ease;
        opacity: 0.8;
    `;
    
    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.opacity = '1';
        darkModeToggle.style.transform = 'scale(1.1)';
    });
    
    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.opacity = '0.8';
        darkModeToggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage (not using it but showing the concept)
        console.log('Dark mode:', isDark ? 'enabled' : 'disabled');
    });
}

// Initialize dark mode (optional)
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below to enable dark mode toggle
    // initDarkMode();
});

// Website performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                    'TCP Connect': perfData.connectEnd - perfData.connectStart,
                    'Request': perfData.responseStart - perfData.requestStart,
                    'Response': perfData.responseEnd - perfData.responseStart,
                    'DOM Processing': perfData.domContentLoadedEventStart - perfData.responseEnd,
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                    'Total Time': perfData.loadEventEnd - perfData.navigationStart
                });
            }, 0);
        });
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceMonitoring();
});

// Enhanced user experience features
function initEnhancedUX() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add focus indicators for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            if (document.body.classList.contains('using-keyboard')) {
                element.style.outline = '2px solid #3b82f6';
                element.style.outlineOffset = '2px';
            }
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize enhanced UX features
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedUX();
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize resource preloading
preloadResources();

// End of script.js - PASINDU CREATIONS Premium JavaScript