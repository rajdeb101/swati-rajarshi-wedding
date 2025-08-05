// Bengali Wedding Invitation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form and modal elements
    const rsvpForm = document.getElementById('rsvpForm');
    const successModal = document.getElementById('successModal');
    
    // Initialize the application
    init();
    
    function init() {
        // Add form submission handler
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', handleFormSubmission);
        }
        
        // Add smooth scrolling for any anchor links
        addSmoothScrolling();
        
        // Add form field animations
        addFormAnimations();
        
        // Add decorative element interactions
        addDecorativeInteractions();
    }
    
    // Handle RSVP form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Collect form data
        const formData = collectFormData();
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission (since this is a static site)
        setTimeout(() => {
            // Hide loading state
            hideLoadingState();
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            rsvpForm.reset();
            
            // Log form data (in a real application, this would be sent to a server)
            console.log('RSVP Submission:', formData);
        }, 1500);
    }
    
    // Validate the RSVP form
    function validateForm() {
        const requiredFields = [
            { id: 'guestName', name: 'Name' },
            { id: 'email', name: 'Email' },
            { name: 'attendance', type: 'radio' }
        ];
        
        let isValid = true;
        const errors = [];
        
        // Check required text fields
        requiredFields.forEach(field => {
            if (field.type === 'radio') {
                const radioButtons = document.querySelectorAll(`input[name="${field.name}"]`);
                const isChecked = Array.from(radioButtons).some(radio => radio.checked);
                if (!isChecked) {
                    errors.push('Please select your attendance confirmation');
                    isValid = false;
                }
            } else {
                const element = document.getElementById(field.id);
                if (!element || !element.value.trim()) {
                    errors.push(`${field.name} is required`);
                    isValid = false;
                    if (element) {
                        element.style.borderColor = 'var(--color-error)';
                    }
                } else {
                    if (element) {
                        element.style.borderColor = '';
                    }
                }
            }
        });
        
        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                errors.push('Please enter a valid email address');
                emailField.style.borderColor = 'var(--color-error)';
                isValid = false;
            }
        }
        
        // Show errors if any
        if (errors.length > 0) {
            showErrorMessage(errors.join('\n'));
        }
        
        return isValid;
    }
    
    // Collect form data
    function collectFormData() {
        const formData = {};
        
        // Get basic form fields
        formData.guestName = document.getElementById('guestName').value.trim();
        formData.email = document.getElementById('email').value.trim();
        formData.phone = document.getElementById('phone').value.trim();
        formData.guestCount = document.getElementById('guestCount').value;
        formData.dietary = document.getElementById('dietary').value;
        formData.message = document.getElementById('message').value.trim();
        
        // Get attendance confirmation
        const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
        formData.attendance = attendanceRadio ? attendanceRadio.value : '';
        
        // Get selected events
        const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
        formData.events = Array.from(eventCheckboxes).map(cb => cb.value);
        
        // Add timestamp
        formData.submittedAt = new Date().toISOString();
        
        return formData;
    }
    
    // Show loading state
    function showLoadingState() {
        const submitButton = document.querySelector('.rsvp-submit');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = 'Submitting...';
            submitButton.style.opacity = '0.7';
        }
    }
    
    // Hide loading state
    function hideLoadingState() {
        const submitButton = document.querySelector('.rsvp-submit');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit RSVP';
            submitButton.style.opacity = '1';
        }
    }
    
    // Show success modal
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus on the close button for accessibility
            const closeButton = successModal.querySelector('button');
            if (closeButton) {
                setTimeout(() => closeButton.focus(), 100);
            }
        }
    }
    
    // Close modal function (called from HTML)
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) {
                window.closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !successModal.classList.contains('hidden')) {
            window.closeModal();
        }
    });
    
    // Show error message
    function showErrorMessage(message) {
        // Create or update error message element
        let errorElement = document.querySelector('.form-error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error-message';
            errorElement.style.cssText = `
                background: rgba(var(--color-error-rgb), 0.1);
                color: var(--color-error);
                padding: var(--space-12);
                border-radius: var(--radius-base);
                margin-bottom: var(--space-16);
                border: 1px solid var(--color-error);
                white-space: pre-line;
                font-weight: var(--font-weight-medium);
            `;
            
            // Insert at the beginning of the form
            rsvpForm.insertBefore(errorElement, rsvpForm.firstChild);
        }
        
        errorElement.textContent = message;
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorElement && errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }
    
    // Add smooth scrolling for anchor links
    function addSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add form field animations and interactions
    function addFormAnimations() {
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(control => {
            // Add focus/blur animations
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value.trim()) {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
            
            // Check if field is pre-filled
            if (control.value.trim()) {
                control.parentElement.classList.add('filled');
            }
        });
        
        // Add real-time validation feedback
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value.trim() && !emailRegex.test(this.value.trim())) {
                    this.style.borderColor = 'var(--color-warning)';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
    
    // Add decorative element interactions
    function addDecorativeInteractions() {
        // Add hover effects to ceremony cards
        const ceremonyCards = document.querySelectorAll('.ceremony');
        ceremonyCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Add subtle parallax effect to decorative elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const decorativeElements = document.querySelectorAll('.decorative-motif, .heart-divider');
            
            decorativeElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // Add click animation to submit button
        const submitButton = document.querySelector('.rsvp-submit');
        if (submitButton) {
            submitButton.addEventListener('click', function(event) {
                // Create ripple effect
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group.focused .form-label {
            color: var(--color-wedding-gold);
            transform: translateY(-2px);
            transition: all var(--duration-fast) var(--ease-standard);
        }
        
        .form-group.filled .form-label {
            font-weight: var(--font-weight-semibold);
        }
    `;
    document.head.appendChild(style);
    
    // Add entrance animations
    function addEntranceAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        const sections = document.querySelectorAll('.family-section, .couple-section, .details-section, .rsvp-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(section);
        });
    }
    
    // Initialize entrance animations after a short delay
    setTimeout(addEntranceAnimations, 500);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        closeModal: window.closeModal
    };
}