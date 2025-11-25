document.addEventListener('DOMContentLoaded', () => {

    // Helper function to check if an element is in the viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        // Only trigger if top is within view (or close) and bottom is visible.
        return (
            rect.top <= windowHeight - 50 &&
            rect.bottom >= 0
        );
    };

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked (for mobile)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation Logic
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // 4. Typing Effect Logic
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ["Front-End Developer", "UI/UX Designer", "Freelancer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before starting next word
            } else {
                setTimeout(type, isDeleting ? 75 : 150);
            }
        };
        type();
    }
    
    // 5. Progress Bar Animation (Skills)
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateSkills = () => {
        if (isElementInViewport(skillsSection)) {
            progressBars.forEach(bar => {
                const percentage = bar.getAttribute('data-level');
                bar.style.width = percentage;
            });
            window.removeEventListener('scroll', animateSkills); // Only run once
        }
    };
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on load
    
    // 6. Testimonial Carousel Logic
    const carouselTrack = document.querySelector('.carousel-track');
    const navDots = document.querySelectorAll('.nav-dot');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        const offset = -index * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    };

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });

    // Auto-advance the carousel
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % cards.length;
        updateCarousel(nextIndex);
    }, 7000); // Change testimonial every 7 seconds


    // 7. Project Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const isVisible = (filterValue === 'all' || item.getAttribute('data-category') === filterValue);
                
                if (isVisible) {
                    item.style.display = 'block';
                    // Re-trigger reveal animation for visual pop-in effect
                    item.classList.remove('reveal');
                    item.classList.remove('active');
                    setTimeout(() => {
                        item.classList.add('reveal');
                        item.classList.add('active');
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 8. Contact Form Submission Alert
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Thank you! This is a demo. In a live site, this would send an email.");
            this.reset();
        });
    }
});