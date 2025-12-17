
document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. STICKY NAVIGATION
       ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. MOBILE MENU TOGGLE
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        // Simple animation logic for hamburger lines could go here if using CSS classes
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });

    /* =========================================
       3. SMOOTH SCROLL (Additional Polish)
       ========================================= */
    // Note: CSS html { scroll-behavior: smooth; } handles most of this,
    // but JS is useful if we need to account for fixed header offset accurately.
    // For this simple landing page, CSS is usually sufficient, but let's
    // ensure active state updating on scroll.

    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 100px offset for header
            if (scrollY >= (sectionTop - 150)) {
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

    /* =========================================
       4. FORM VALIDATION
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        feedback.textContent = '';
        feedback.className = 'form-feedback';

        // 1. Name Validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim().length < 2) {
            setError(nameInput);
            isValid = false;
        } else {
            setSuccess(nameInput);
        }

        // 2. Email Validation
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            setError(emailInput);
            isValid = false;
        } else {
            setSuccess(emailInput);
        }

        // 3. Message Validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            setError(messageInput);
            isValid = false;
        } else {
            setSuccess(messageInput);
        }

        if (isValid) {
            // Simulate API call
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                feedback.textContent = 'Message sent successfully! We will get back to you soon.';
                feedback.classList.add('success');
                contactForm.reset();
                
                // Clear success styling
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.parentElement.classList.remove('error');
                });

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            feedback.textContent = 'Please fix the errors above.';
            feedback.classList.add('error');
        }
    });

    function setError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }
});
