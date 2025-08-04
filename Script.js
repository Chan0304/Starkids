// Cosmic Energy Website - Main JavaScript

// Global variables
let audioPlayer = null;
let isPlaying = false;
let currentQuoteIndex = 0;
let typingInterval = null;

// Cosmic quotes array (without author names as requested)
const cosmicQuotes = [
    "You are not a drop in the ocean. You are the entire ocean in a drop.",
    "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    "In the midst of movement and chaos, keep stillness inside of you.",
    "The mind is everything. What you think you become.",
    "Peace comes from within. Do not seek it without.",
    "The only way to do great work is to love what you do.",
    "Everything is energy and that's all there is to it. Match the frequency of the reality you want.",
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    "The wound is the place where the Light enters you.",
    "What you are is what you have been, and what you will be is what you do now.",
    "The greatest meditation is a mind that lets go.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "The mind is like water. When it's turbulent, it's difficult to see. When it's peaceful, everything becomes clear.",
    "You are the universe experiencing itself."
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Hide loading screen
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Initialize components based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomepage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
        case 'explore.html':
            initializeExplorePage();
            break;
        case 'wisdom.html':
            initializeWisdomPage();
            break;
        case 'meditation.html':
            initializeMeditationPage();
            break;
        case 'community.html':
            initializeCommunityPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
    }

    // Common initializations
    initializeScrollEffects();
    initializeAudioControls();
    initializeMobileMenu();
    initializeFormValidation();
}

// Homepage specific functions
function initializeHomepage() {
    initializeTypingAnimation();
    initializeParallaxEffects();
    initializeStarTrails();
}

function initializeTypingAnimation() {
    const typingContainer = document.querySelector('.typing-container');
    if (!typingContainer) return;

    const typingText = typingContainer.querySelector('.typing-text');
    if (!typingText) return;

    function typeQuote() {
        const quote = cosmicQuotes[currentQuoteIndex];
        let charIndex = 0;
        
        typingText.textContent = '';
        typingText.style.width = '0';
        
        const typeChar = () => {
            if (charIndex < quote.length) {
                typingText.textContent += quote.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                // Wait before next quote
                setTimeout(() => {
                    currentQuoteIndex = (currentQuoteIndex + 1) % cosmicQuotes.length;
                    typeQuote();
                }, 3000);
            }
        };
        
        typeChar();
    }

    typeQuote();
}

function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeStarTrails() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Audio controls
function initializeAudioControls() {
    const audioBtn = document.querySelector('.audio-btn');
    if (!audioBtn) return;

    // Create audio element
    audioPlayer = new Audio();
    audioPlayer.loop = true;
    audioPlayer.volume = 0.3;
    
    // You can add your cosmic ambient music file here
    // audioPlayer.src = 'assets/audio/cosmic-ambient.mp3';

    audioBtn.addEventListener('click', toggleAudio);
}

function toggleAudio() {
    const audioBtn = document.querySelector('.audio-btn');
    if (!audioBtn || !audioPlayer) return;

    if (isPlaying) {
        audioPlayer.pause();
        audioBtn.innerHTML = '🔇';
        isPlaying = false;
    } else {
        audioPlayer.play().catch(e => {
            console.log('Audio play failed:', e);
            // Show message to user that audio is not available
            showNotification('Audio file not available. Please add your cosmic ambient music to assets/audio/ folder.');
        });
        audioBtn.innerHTML = '🔊';
        isPlaying = true;
    }
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu
function initializeMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileBtn || !navLinks) return;

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });
}

// Form validation and handling
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'city':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter your city';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ec4899';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ec4899';
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.style.borderColor = 'rgba(139, 92, 246, 0.3)';
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please correct the errors in the form.', 'error');
        return;
    }
    
    // Handle different forms
    const formId = form.id || form.className;
    
    switch(formId) {
        case 'community-form':
            handleCommunityForm(data);
            break;
        case 'contact-form':
            handleContactForm(data);
            break;
        default:
            console.log('Form data:', data);
            showNotification('Form submitted successfully!', 'success');
    }
    
    form.reset();
}

function handleCommunityForm(data) {
    // In a real application, you would send this data to your server
    console.log('Community registration:', data);
    
    // Simulate email sending
    const emailBody = `
        New Community Registration:
        
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        City: ${data.city}
        
        Registration Date: ${new Date().toLocaleDateString()}
    `;
    
    console.log('Email content:', emailBody);
    
    showNotification('Thank you for joining our community! We will contact you soon.', 'success');
}

function handleContactForm(data) {
    // In a real application, you would send this data to your server
    console.log('Contact form:', data);
    
    const emailBody = `
        New Contact Message:
        
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
        
        Date: ${new Date().toLocaleDateString()}
    `;
    
    console.log('Email content:', emailBody);
    
    showNotification('Thank you for reaching out. We will contact you soon.', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #3b82f6, #2563eb)';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Page-specific initializations
function initializeAboutPage() {
    // Add any about page specific functionality
}

function initializeExplorePage() {
    initializeExpandableCards();
}

function initializeExpandableCards() {
    const cards = document.querySelectorAll('.expandable-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
}

function initializeWisdomPage() {
    initializeWisdomCards();
}

function initializeWisdomCards() {
    const cards = document.querySelectorAll('.wisdom-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Add any wisdom card specific functionality
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

function initializeMeditationPage() {
    initializeBreathTimer();
}

function initializeBreathTimer() {
    const breathTimer = document.querySelector('.breath-timer');
    if (!breathTimer) return;
    
    let isRunning = false;
    let timer = null;
    let timeLeft = 0;
    
    const startBtn = breathTimer.querySelector('.start-btn');
    const resetBtn = breathTimer.querySelector('.reset-btn');
    const display = breathTimer.querySelector('.timer-display');
    
    if (startBtn && resetBtn && display) {
        startBtn.addEventListener('click', () => {
            if (!isRunning) {
                startTimer();
            } else {
                pauseTimer();
            }
        });
        
        resetBtn.addEventListener('click', resetTimer);
    }
    
    function startTimer() {
        if (timeLeft === 0) {
            timeLeft = 300; // 5 minutes default
        }
        
        isRunning = true;
        startBtn.textContent = 'Pause';
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                startBtn.textContent = 'Start';
                showNotification('Meditation session completed!', 'success');
            }
        }, 1000);
    }
    
    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = 'Resume';
    }
    
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 0;
        startBtn.textContent = 'Start';
        updateDisplay();
    }
    
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function initializeCommunityPage() {
    // Community page specific functionality
}

function initializeContactPage() {
    // Contact page specific functionality
}

// Utility functions
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
window.addEventListener('resize', debounce(() => {
    // Reinitialize any components that need resize handling
}, 250));

// Handle page visibility changes (pause audio when tab is not active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioPlayer && isPlaying) {
        audioPlayer.pause();
        const audioBtn = document.querySelector('.audio-btn');
        if (audioBtn) {
            audioBtn.innerHTML = '🔇';
        }
        isPlaying = false;
    }
}); 