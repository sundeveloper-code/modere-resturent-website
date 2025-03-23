// DOM Elements
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Form Validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Name validation
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearError('name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    // Subject validation
    if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    } else {
        clearError('subject');
    }

    // Message validation
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError('message');
    }

    return isValid;
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    field.classList.add('error');
}

// Clear error message
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('error');
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    contactForm.insertAdjacentElement('beforebegin', successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showSuccess('Thank you for your message! We will get back to you soon.');
        contactForm.reset();

        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        showError('message', 'Failed to send message. Please try again later.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Clear error messages on input
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    if (input) {
        input.addEventListener('input', () => {
            clearError(input.id);
        });
    }
});

// Initialize map
function initMap() {
    // Add any map initialization code here if needed
    // For example, customizing the Google Maps appearance
}

// Call map initialization when the page loads
window.addEventListener('load', initMap); 