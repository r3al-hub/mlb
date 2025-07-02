document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animations for content sections
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.content-section');
        const options = {
            threshold: 0.1, // Trigger when 10% of the section is visible
            rootMargin: '0px 0px -100px 0px' // Adjust root margin to trigger earlier/later
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    // Smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return; // Do nothing if href is just '#'
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header/nav if any
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };

    // Scroll to top button functionality
    const setupScrollToTop = () => {
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn); // Append to body

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300); // Show after 300px scroll
        });
    };

    // Scroll indicator functionality (hero section to about section)
    const setupScrollIndicator = () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    window.scrollTo({
                        top: aboutSection.offsetTop - 80, // Offset for positioning
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    // Contact form handling with fetch API and client-side validation
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        const formStatus = document.getElementById('form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Client-side validation
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Prepare form data
            const formData = new FormData(this);
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                    this.reset(); // Clear form fields on success
                } else {
                    // Attempt to parse JSON error message from Formspree
                    const errorData = await response.json();
                    const errorMessage = errorData.error || 'Unknown error occurred.';
                    throw new Error(errorMessage);
                }
            } catch (error) {
                console.error('Form submission error:', error); // Changed from generic "Error"
                showFormStatus(`Oops! There was a problem sending your message: ${error.message}. Please try again later.`, 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });

        // Function to display form status messages
        function showFormStatus(message, type) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
            formStatus.style.display = 'block'; // Make sure it's block to animate opacity
            formStatus.style.opacity = '1'; // Ensure it's fully visible

            // Fade out the message after 5 seconds
            setTimeout(() => {
                formStatus.style.opacity = '0';
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status'; // Reset class for next message
                }, 300); // Wait for opacity transition to finish
            }, 5000);
        }

        // Basic email validation regex
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    };

    // Skill bar animation using IntersectionObserver
    const animateSkillBars = () => {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            // Store the target width from inline style
            const targetWidth = level.style.width; 
            level.style.width = '0'; // Set initial width to 0 for animation
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        level.style.width = targetWidth; // Animate to stored width
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
            
            observer.observe(level);
        });
    };

    // Portfolio item click effect (placeholder for future implementation)
    const setupPortfolioItems = () => {
        document.querySelectorAll('.portfolio-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would open a modal or navigate to a project page
                alert('In a complete implementation, this would show more project details or open a case study.');
            });
        });
    };

    // Certificate link handling (placeholder for future implementation)
    const setupCertificateLinks = () => {
        document.querySelectorAll('.cert-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would link to the actual certificate verification page.
                alert('In a complete implementation, this would link to your actual certificate verification page.');
            });
        });
    };

    // Download resume button (placeholder for future implementation)
    const setupDownloadResume = () => {
        const downloadBtn = document.querySelector('.download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would trigger a PDF download.
                alert('In a complete implementation, this would download your resume PDF.');
            });
        }
    };

    // Initialize all functionality
    const init = () => {
        animateOnScroll();
        setupSmoothScrolling();
        setupScrollToTop();
        setupScrollIndicator();
        setupContactForm();
        animateSkillBars();
        setupPortfolioItems();
        setupCertificateLinks();
        setupDownloadResume();
        
        // Add loaded class to body to prevent FOUC (Flash Of Unstyled Content)
        // Ensure you have CSS rules to handle body:not(.loaded) and body.loaded
        document.body.classList.add('loaded');
    };

    // Run initialization
    init();
});

// Small utility to handle Font Awesome loading (optional, usually FA handles this itself)
window.addEventListener('load', function() {
    if (window.FontAwesome) {
        window.FontAwesome.config.autoReplaceSvg = 'nest';
    }
});