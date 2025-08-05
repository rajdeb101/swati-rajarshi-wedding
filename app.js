// Bengali Wedding Invitation - Animated UI JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    function initializeApp() {
        console.log('শুভ বিবাহ - Swati & Rajarshi Wedding Invitation Loading...');
        
        // Start with loading screen
        showLoadingScreen();
        
        // Initialize animations after loading
        setTimeout(() => {
            hideLoadingScreen();
            initializeAnimations();
            startContinuousAnimations();
        }, 3000);
    }

    // Loading Screen Management
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '1';
            loadingScreen.style.visibility = 'visible';
        }
    }

    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 1000);
        }
    }

    // Initialize all animations
    function initializeAnimations() {
        setupScrollAnimations();
        setupHoverEffects();
        setupParallaxEffects();
        setupTypewriterEffects();
        setupFloatingElements();
        setupInteractiveElements();
    }

    // Scroll-triggered animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for child elements
                    const children = element.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.section-title, .event-card, .couple-story, .blessing-item');
        animatedElements.forEach(el => {
            // Set initial state for elements not already animated
            if (!el.style.opacity) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            fadeInObserver.observe(el);
        });

        // Special observer for blessing section with typewriter effect
        const blessingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const blessingItems = entry.target.querySelectorAll('.blessing-item');
                    blessingItems.forEach((item, index) => {
                        setTimeout(() => {
                            startTypewriterEffect(item.querySelector('.bengali-blessing-text'));
                            setTimeout(() => {
                                startTypewriterEffect(item.querySelector('.blessing-meaning'));
                            }, 1000);
                        }, index * 2000);
                    });
                }
            });
        }, { threshold: 0.3 });

        const blessingSection = document.querySelector('.blessing-section');
        if (blessingSection) {
            blessingObserver.observe(blessingSection);
        }
    }

    // Typewriter effect for text elements
    function startTypewriterEffect(element) {
        if (!element || element.dataset.typewriterDone) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        element.dataset.typewriterDone = 'true';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                // Add a subtle glow effect when typing is complete
                element.style.textShadow = '0 0 10px rgba(184, 134, 11, 0.3)';
            }
        }, 100);
    }

    // Setup typewriter effects for story paragraphs
    function setupTypewriterEffects() {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const paragraphs = entry.target.querySelectorAll('.story-paragraph');
                    paragraphs.forEach((para, index) => {
                        setTimeout(() => {
                            startTypewriterEffect(para);
                        }, index * 3000);
                    });
                }
            });
        }, { threshold: 0.5 });

        const coupleStory = document.querySelector('.couple-story');
        if (coupleStory) {
            storyObserver.observe(coupleStory);
        }
    }

    // Hover effects for interactive elements
    function setupHoverEffects() {
        // Event cards hover effects
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                
                // Animate the icon
                const icon = this.querySelector('.event-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
                
                // Show glow effect
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.opacity = '0.3';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-lg)';
                
                // Reset icon
                const icon = this.querySelector('.event-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Hide glow effect
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.opacity = '0';
                }
            });
        });

        // Add hover effects to symbols
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            symbol.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-20px) rotate(20deg) scale(1.3)';
                this.style.color = 'var(--bengali-gold)';
            });
            
            symbol.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
                this.style.color = '';
            });
        });
    }

    // Parallax effects
    function setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            // Hero parallax
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            }
            
            // Floating petals parallax
            const petals = document.querySelectorAll('.petal');
            petals.forEach((petal, index) => {
                const speed = (index + 1) * 0.1;
                petal.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
            
            // Traditional motifs parallax
            const motifs = document.querySelectorAll('.motif');
            motifs.forEach((motif, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                motif.style.transform = `translateY(${scrolled * 0.2 * direction}px) rotate(${scrolled * 0.05}deg)`;
            });
        });
    }

    // Continuous floating animations
    function startContinuousAnimations() {
        // Enhanced floating petals animation
        createFloatingPetals();
        
        // Animated alpona borders
        animateAlponaBorders();
        
        // Lotus breathing effect
        startLotusBreathing();
        
        // Sacred symbol rotation
        startSymbolRotations();
    }

    // Create additional floating petals dynamically
    function createFloatingPetals() {
        const hero = document.querySelector('.hero');
        const petalsContainer = hero?.querySelector('.floating-petals');
        
        if (!petalsContainer) return;
        
        // Add more petals periodically
        setInterval(() => {
            createNewPetal(petalsContainer);
        }, 3000);
    }

    function createNewPetal(container) {
        const petals = ['🌸', '🌺', '🌼', '🌻', '🌷'];
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (10 + Math.random() * 10) + 's';
        petal.style.animationDelay = '0s';
        petal.style.fontSize = (16 + Math.random() * 8) + 'px';
        petal.style.opacity = 0.6 + Math.random() * 0.4;
        
        container.appendChild(petal);
        
        // Remove petal after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 20000);
    }

    // Animate alpona borders
    function animateAlponaBorders() {
        const borders = document.querySelectorAll('.alpona-border');
        borders.forEach(border => {
            border.addEventListener('animationend', function() {
                // Add shimmer effect after border draws
                this.style.backgroundImage = 'linear-gradient(90deg, var(--bengali-gold), var(--bengali-red), var(--bengali-maroon), var(--bengali-gold))';
                this.style.backgroundSize = '200% 100%';
                this.style.animation = 'shimmerBorder 3s ease-in-out infinite';
            });
        });
    }

    // Lotus breathing animation
    function startLotusBreathing() {
        const lotusIcons = document.querySelectorAll('.lotus-icon, .animated-lotus');
        lotusIcons.forEach(lotus => {
            let scale = 1;
            let growing = true;
            
            setInterval(() => {
                if (growing) {
                    scale += 0.01;
                    if (scale >= 1.1) growing = false;
                } else {
                    scale -= 0.01;
                    if (scale <= 0.9) growing = true;
                }
                lotus.style.transform = `scale(${scale})`;
            }, 50);
        });
    }

    // Symbol rotations
    function startSymbolRotations() {
        const sacredSymbol = document.querySelector('.sacred-symbol');
        if (sacredSymbol) {
            let rotation = 0;
            setInterval(() => {
                rotation += 0.5;
                sacredSymbol.style.transform = `rotate(${rotation}deg)`;
            }, 50);
        }
    }

    // Interactive elements
    function setupInteractiveElements() {
        // Add click effects to Bengali text
        const bengaliTexts = document.querySelectorAll('.bengali-blessing, .bengali-text, .bengali-ceremony');
        bengaliTexts.forEach(text => {
            text.addEventListener('click', function() {
                // Create ripple effect
                createRippleEffect(this, event);
                
                // Temporary glow effect
                const originalTextShadow = this.style.textShadow;
                this.style.textShadow = '0 0 20px var(--bengali-gold), 0 0 30px var(--bengali-gold)';
                setTimeout(() => {
                    this.style.textShadow = originalTextShadow;
                }, 1000);
            });
        });

        // Add smooth scrolling to any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Create ripple effect on click
    function createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 215, 0, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.8s ease-out';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    // Floating elements setup
    function setupFloatingElements() {
        // Make lotus icons interactive
        const lotusIcons = document.querySelectorAll('.lotus-icon, .lotus-small');
        lotusIcons.forEach(lotus => {
            lotus.addEventListener('click', function() {
                // Spin effect on click
                this.style.transform = 'rotate(720deg) scale(1.5)';
                this.style.transition = 'transform 1s ease-out';
                
                setTimeout(() => {
                    this.style.transform = 'rotate(0deg) scale(1)';
                }, 1000);
            });
        });

        // Add floating animation to contact icons
        const contactIcons = document.querySelectorAll('.contact-icon');
        contactIcons.forEach((icon, index) => {
            icon.style.animation = `floatIcon 3s ease-in-out infinite ${index * 0.5}s`;
        });
    }

    // Add custom CSS for dynamic animations
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            
            @keyframes shimmerBorder {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes floatIcon {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize dynamic styles
    addDynamicStyles();

    // Enhanced scroll effects for section transitions
    function setupAdvancedScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Update section visibility and effects
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < windowHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const visibility = Math.min(1, Math.max(0, 1 - Math.abs(rect.top) / windowHeight));
                    
                    // Apply subtle transform based on scroll position
                    section.style.transform = `translateY(${Math.abs(rect.top) * 0.1}px)`;
                    section.style.opacity = Math.max(0.3, visibility);
                }
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // Initialize advanced scroll effects
    setupAdvancedScrollEffects();

    // Performance optimization: Intersection Observer for expensive animations
    const expensiveAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-expensive');
            } else {
                entry.target.classList.remove('animate-expensive');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that have expensive animations
    const expensiveElements = document.querySelectorAll('.floating-petals, .card-glow');
    expensiveElements.forEach(el => expensiveAnimationObserver.observe(el));

    // Log successful initialization
    console.log('🎉 Bengali Wedding Invitation Animation System Initialized!');
    console.log('🪷 Swati & Rajarshi - November 24 & 27, 2024');
    console.log('✨ All animations loaded successfully!');

    // Add a special Easter egg for developers
    console.log(`
    🌸 Welcome to Swati & Rajarshi's Wedding! 🌸
    
    This invitation features:
    ✨ Animated alpona borders
    🪷 Floating lotus petals
    📜 Typewriter text effects
    🎭 Interactive Bengali elements
    🌊 Smooth parallax scrolling
    💫 Sacred symbol animations
    
    শুভ বিবাহ! (Shubho Bibaho - Auspicious Wedding!)
    `);
});

// Add custom animations with CSS-in-JS for better performance
document.addEventListener('DOMContentLoaded', function() {
    // Create a style element for runtime animations
    const animationStyles = document.createElement('style');
    animationStyles.id = 'runtime-animations';
    document.head.appendChild(animationStyles);
    
    // Add responsive animation styles
    const mediaQueries = `
        @media (max-width: 768px) {
            .petal { font-size: 14px !important; }
            .floating-petals .petal { animation-duration: 8s !important; }
        }
        
        @media (prefers-reduced-motion: reduce) {
            .petal, .floating-petals { display: none !important; }
            * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
    `;
    
    animationStyles.textContent = mediaQueries;
});
