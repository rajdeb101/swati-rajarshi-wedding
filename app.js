// Bengali Wedding Invitation - JavaScript (Fixed Version)
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const scrollIndicator = document.getElementById('scrollIndicator');
    const rsvpForm = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const messageField = document.getElementById('message');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const attendanceError = document.getElementById('attendance-error');
    
    // Smooth scroll functionality - FIXED
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const storySection = document.getElementById('story');
            if (storySection) {
                storySection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Form validation functions
    function validateName() {
        const name = nameField.value.trim();
        if (name.length < 2) {
            showError(nameField, nameError, 'Please enter your full name (at least 2 characters)');
            return false;
        }
        clearError(nameField, nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailField, emailError, 'Please enter your email address');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailField, emailError, 'Please enter a valid email address');
            return false;
        }
        
        clearError(emailField, emailError);
        return true;
    }
    
    function validateAttendance() {
        const selectedAttendance = document.querySelector('input[name="attendance"]:checked');
        if (!selectedAttendance) {
            showError(null, attendanceError, 'Please select your attendance status');
            return false;
        }
        clearError(null, attendanceError);
        return true;
    }
    
    function showError(field, errorElement, message) {
        if (field) {
            field.classList.add('error');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function clearError(field, errorElement) {
        if (field) {
            field.classList.remove('error');
        }
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    function clearAllErrors() {
        clearError(nameField, nameError);
        clearError(emailField, emailError);
        clearError(null, attendanceError);
    }
    
    // Real-time validation
    if (nameField) {
        nameField.addEventListener('blur', validateName);
        nameField.addEventListener('input', function() {
            if (nameField.classList.contains('error')) {
                validateName();
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', validateEmail);
        emailField.addEventListener('input', function() {
            if (emailField.classList.contains('error')) {
                validateEmail();
            }
        });
    }
    
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (attendanceError && attendanceError.classList.contains('show')) {
                validateAttendance();
            }
        });
    });
    
    // Form submission handling - FIXED
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearAllErrors();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isAttendanceValid = validateAttendance();
            
            if (!isNameValid || !isEmailValid || !isAttendanceValid) {
                // Scroll to first error
                const firstError = document.querySelector('.error, .error-message.show');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission success for demo purposes
            // In production, this would be a real API call
            setTimeout(() => {
                try {
                    // Log the form data
                    const formData = {
                        name: nameField.value.trim(),
                        email: emailField.value.trim(),
                        attendance: document.querySelector('input[name="attendance"]:checked').value,
                        message: messageField.value.trim(),
                        timestamp: new Date().toLocaleString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    };
                    
                    console.log('RSVP Data:', formData);
                    
                    // Show thank you message
                    showThankYouMessage();
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('Sorry, there was an error sending your RSVP. Please try again or contact us directly.');
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 1500); // Simulate network delay
        });
    }
    
    function showThankYouMessage() {
        if (!rsvpForm || !thankYouMessage) return;
        
        // Hide form with fade out effect
        rsvpForm.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        rsvpForm.style.opacity = '0';
        rsvpForm.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            rsvpForm.style.display = 'none';
            
            // Show thank you message with fade in effect
            thankYouMessage.classList.remove('hidden');
            thankYouMessage.style.display = 'block';
            thankYouMessage.style.opacity = '0';
            thankYouMessage.style.transform = 'translateY(20px)';
            thankYouMessage.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
            
            // Force reflow
            thankYouMessage.offsetHeight;
            
            thankYouMessage.style.opacity = '1';
            thankYouMessage.style.transform = 'translateY(0)';
            
            // Scroll to thank you message
            setTimeout(() => {
                thankYouMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
            
        }, 500);
    }
    
    // Fix external links to open in new tabs
    function setupExternalLinks() {
        document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual indicator for external links
            if (!link.querySelector('svg')) {
                const icon = document.createElement('span');
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.8em';
                icon.style.opacity = '0.7';
                link.appendChild(icon);
            }
        });
    }
    
    // Accessibility enhancements
    function setupAccessibility() {
        // Add keyboard navigation for custom radio buttons
        attendanceRadios.forEach((radio, index) => {
            radio.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % attendanceRadios.length;
                    attendanceRadios[nextIndex].focus();
                    attendanceRadios[nextIndex].checked = true;
                    if (attendanceError && attendanceError.classList.contains('show')) {
                        validateAttendance();
                    }
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + attendanceRadios.length) % attendanceRadios.length;
                    attendanceRadios[prevIndex].focus();
                    attendanceRadios[prevIndex].checked = true;
                    if (attendanceError && attendanceError.classList.contains('show')) {
                        validateAttendance();
                    }
                }
            });
        });
    }
    
    // Initialize features
    setupExternalLinks();
    setupAccessibility();
    
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle animations on scroll (enhanced)
    function handleScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.detail-card, .story-content, .rsvp-container'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations if supported
    if ('IntersectionObserver' in window) {
        handleScrollAnimations();
    } else {
        // Fallback for older browsers - show all elements
        document.querySelectorAll('.detail-card, .story-content, .rsvp-container')
            .forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
    }
    
    // Remove any unwanted focus outlines that might appear as blue dots
    document.addEventListener('click', function(e) {
        // Remove focus from clicked elements to prevent blue outline artifacts
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.target.blur();
        }
    });
    
    // Enhanced form interaction
    const formFields = [nameField, emailField, messageField];
    formFields.forEach(field => {
        if (field) {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    });
    
    // Console welcome message
    console.log('🎉 Welcome to Aparna & Arjun\'s Wedding Invitation!');
    console.log('📅 Wedding: December 6th, 2025 at 7:15 PM');
    console.log('🎊 Reception: December 7th, 2025 at 7:30 PM');
    console.log('🏛️ Venue: The Oberoi Grand, Kolkata');
    console.log('💝 Made with love for the happy couple');
    console.log('');
    console.log('To customize this invitation:');
    console.log('1. Replace couple names in HTML');
    console.log('2. Update dates and venue information');
    console.log('3. Change FormSubmit email endpoint');
    console.log('4. Host on GitHub Pages for free!');
    
});