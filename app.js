// Bengali Wedding Invitation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const rsvpForm = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = rsvpForm.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');

    // Form validation and submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoadingState();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission delay
            setTimeout(() => {
                handleFormSubmission();
            }, 1500);
        } else {
            hideLoadingState();
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Remove existing error messages
        removeErrorMessages();

        // Check required fields
        const guestName = document.getElementById('guestName');
        const email = document.getElementById('email');
        const weddingAttendance = document.querySelector('input[name="weddingAttendance"]:checked');
        const receptionAttendance = document.querySelector('input[name="receptionAttendance"]:checked');

        // Validate guest name
        if (!guestName.value.trim()) {
            showFieldError(guestName, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showFieldError(email, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate wedding attendance
        if (!weddingAttendance) {
            const weddingGroup = document.querySelector('input[name="weddingAttendance"]').closest('.form-group');
            showFieldError(weddingGroup, 'Please select your attendance for the wedding ceremony');
            isValid = false;
        }

        // Validate reception attendance
        if (!receptionAttendance) {
            const receptionGroup = document.querySelector('input[name="receptionAttendance"]').closest('.form-group');
            showFieldError(receptionGroup, 'Please select your attendance for the reception');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(element, message) {
        if (!element) return;
        
        const formGroup = element.classList.contains('form-group') ? element : element.closest('.form-group');
        if (!formGroup) return;

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-4)';
        
        // Add error styling to field
        if (element.classList && element.classList.contains('form-control')) {
            element.style.borderColor = 'var(--color-error)';
        }
        
        // Insert error message
        formGroup.appendChild(errorDiv);
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Reset field styling
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
    }

    function showLoadingState() {
        submitButton.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitButton.style.opacity = '0.8';
    }

    function hideLoadingState() {
        submitButton.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitButton.style.opacity = '';
    }

    function handleFormSubmission() {
        // Collect form data
        const formData = collectFormData();
        
        // Hide loading state
        hideLoadingState();
        
        // Show success message
        showSuccessMessage();
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('RSVP Form Submitted:', formData);
        
        // Scroll to success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Reset form after showing success
        setTimeout(() => {
            rsvpForm.reset();
        }, 3000);
    }

    function collectFormData() {
        const formData = {
            guestName: document.getElementById('guestName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            guestCount: document.getElementById('guestCount').value,
            weddingAttendance: document.querySelector('input[name="weddingAttendance"]:checked')?.value,
            receptionAttendance: document.querySelector('input[name="receptionAttendance"]:checked')?.value,
            dietary: document.getElementById('dietary').value.trim(),
            message: document.getElementById('message').value.trim(),
            submittedAt: new Date().toISOString()
        };
        
        return formData;
    }

    function showSuccessMessage() {
        // Hide the form
        rsvpForm.style.display = 'none';
        
        // Show success message
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';
        
        // Add animation
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        
        // Trigger animation
        setTimeout(() => {
            successMessage.style.transition = 'all 0.5s ease-out';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);
    }

    // Smooth scrolling for any anchor links
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

    // Enhanced form interactions
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.add('focused');
            }
        });
        
        control.addEventListener('blur', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.remove('focused');
            }
        });
    });

    // Radio button interactions
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove error styling when user makes a selection
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });

    // Real-time email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value.trim() && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Character counter for text areas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500; // Set a reasonable max length
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            
            // Create or update character counter
            let counter = this.parentElement.querySelector('.char-counter');
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter';
                counter.style.fontSize = 'var(--font-size-xs)';
                counter.style.color = 'var(--color-text-secondary)';
                counter.style.textAlign = 'right';
                counter.style.marginTop = 'var(--space-4)';
                this.parentElement.appendChild(counter);
            }
            
            counter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength) {
                counter.style.color = 'var(--color-error)';
                this.style.borderColor = 'var(--color-error)';
            } else {
                counter.style.color = 'var(--color-text-secondary)';
                this.style.borderColor = '';
            }
        });
    });

    // Add subtle animations to cards on scroll
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

    // Observe event cards and other elements for scroll animations
    const animatedElements = document.querySelectorAll('.event-card, .couple-content, .rsvp-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = '';
            }
        });
    });

    // Enhanced loading animation for the hero section
    const heroElements = document.querySelectorAll('.bengali-blessing, .blessing-translation, .bride-name, .ampersand, .groom-name, .wedding-tagline, .lotus-icon');
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        }
    });

    // Add a subtle parallax effect to the hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    console.log('Bengali Wedding Invitation loaded successfully! 🎉');
    console.log('Swati & Rajarshi - November 24 & 27, 2024');
});// Bengali Wedding Invitation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const rsvpForm = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = rsvpForm.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');

    // Form validation and submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoadingState();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission delay
            setTimeout(() => {
                handleFormSubmission();
            }, 1500);
        } else {
            hideLoadingState();
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Remove existing error messages
        removeErrorMessages();

        // Check required fields
        const guestName = document.getElementById('guestName');
        const email = document.getElementById('email');
        const weddingAttendance = document.querySelector('input[name="weddingAttendance"]:checked');
        const receptionAttendance = document.querySelector('input[name="receptionAttendance"]:checked');

        // Validate guest name
        if (!guestName.value.trim()) {
            showFieldError(guestName, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showFieldError(email, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate wedding attendance
        if (!weddingAttendance) {
            const weddingGroup = document.querySelector('input[name="weddingAttendance"]').closest('.form-group');
            showFieldError(weddingGroup, 'Please select your attendance for the wedding ceremony');
            isValid = false;
        }

        // Validate reception attendance
        if (!receptionAttendance) {
            const receptionGroup = document.querySelector('input[name="receptionAttendance"]').closest('.form-group');
            showFieldError(receptionGroup, 'Please select your attendance for the reception');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(element, message) {
        if (!element) return;
        
        const formGroup = element.classList.contains('form-group') ? element : element.closest('.form-group');
        if (!formGroup) return;

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-4)';
        
        // Add error styling to field
        if (element.classList && element.classList.contains('form-control')) {
            element.style.borderColor = 'var(--color-error)';
        }
        
        // Insert error message
        formGroup.appendChild(errorDiv);
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Reset field styling
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
    }

    function showLoadingState() {
        submitButton.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitButton.style.opacity = '0.8';
    }

    function hideLoadingState() {
        submitButton.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitButton.style.opacity = '';
    }

    function handleFormSubmission() {
        // Collect form data
        const formData = collectFormData();
        
        // Hide loading state
        hideLoadingState();
        
        // Show success message
        showSuccessMessage();
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('RSVP Form Submitted:', formData);
        
        // Scroll to success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Reset form after showing success
        setTimeout(() => {
            rsvpForm.reset();
        }, 3000);
    }

    function collectFormData() {
        const formData = {
            guestName: document.getElementById('guestName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            guestCount: document.getElementById('guestCount').value,
            weddingAttendance: document.querySelector('input[name="weddingAttendance"]:checked')?.value,
            receptionAttendance: document.querySelector('input[name="receptionAttendance"]:checked')?.value,
            dietary: document.getElementById('dietary').value.trim(),
            message: document.getElementById('message').value.trim(),
            submittedAt: new Date().toISOString()
        };
        
        return formData;
    }

    function showSuccessMessage() {
        // Hide the form
        rsvpForm.style.display = 'none';
        
        // Show success message
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';
        
        // Add animation
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        
        // Trigger animation
        setTimeout(() => {
            successMessage.style.transition = 'all 0.5s ease-out';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);
    }

    // Smooth scrolling for any anchor links
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

    // Enhanced form interactions
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.add('focused');
            }
        });
        
        control.addEventListener('blur', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.remove('focused');
            }
        });
    });

    // Radio button interactions
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove error styling when user makes a selection
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });

    // Real-time email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value.trim() && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Character counter for text areas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500; // Set a reasonable max length
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            
            // Create or update character counter
            let counter = this.parentElement.querySelector('.char-counter');
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter';
                counter.style.fontSize = 'var(--font-size-xs)';
                counter.style.color = 'var(--color-text-secondary)';
                counter.style.textAlign = 'right';
                counter.style.marginTop = 'var(--space-4)';
                this.parentElement.appendChild(counter);
            }
            
            counter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength) {
                counter.style.color = 'var(--color-error)';
                this.style.borderColor = 'var(--color-error)';
            } else {
                counter.style.color = 'var(--color-text-secondary)';
                this.style.borderColor = '';
            }
        });
    });

    // Add subtle animations to cards on scroll
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

    // Observe event cards and other elements for scroll animations
    const animatedElements = document.querySelectorAll('.event-card, .couple-content, .rsvp-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = '';
            }
        });
    });

    // Enhanced loading animation for the hero section
    const heroElements = document.querySelectorAll('.bengali-blessing, .blessing-translation, .bride-name, .ampersand, .groom-name, .wedding-tagline, .lotus-icon');
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        }
    });

    // Add a subtle parallax effect to the hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    console.log('Bengali Wedding Invitation loaded successfully! 🎉');
    console.log('Swati & Rajarshi - November 24 & 27, 2024');
});
