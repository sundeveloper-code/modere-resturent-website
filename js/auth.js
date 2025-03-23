// DOM Elements
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const socialButtons = document.querySelectorAll('.social-btn');

// Tab Switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));

        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
    });
});

// Form Validation
function validateLoginForm() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        showError('Please fill in all fields');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return false;
    }

    return true;
}

function validateRegisterForm() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();
    const terms = document.querySelector('input[name="terms"]').checked;

    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return false;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }

    if (!terms) {
        showError('Please agree to the Terms of Service and Privacy Policy');
        return false;
    }

    return true;
}

// Show Error Message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertAdjacentElement('beforebegin', errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show Success Message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertAdjacentElement('beforebegin', successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Handle Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
        return;
    }

    try {
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Store user session
        const userData = {
            email: document.getElementById('login-email').value,
            name: 'John Doe', // This would come from the API
            isLoggedIn: true
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Show success message
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        showError('Login failed. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Handle Register Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
        return;
    }

    try {
        const submitBtn = registerForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Store user session
        const userData = {
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            isLoggedIn: true
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Show success message
        showSuccess('Account created successfully! Redirecting...');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        showError('Registration failed. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Handle Social Login
socialButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
        
        try {
            button.disabled = true;
            const originalText = button.textContent;
            button.textContent = `Connecting to ${provider}...`;

            // Simulate social login API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store user session
            const userData = {
                name: 'John Doe', // This would come from the social provider
                email: 'john@example.com',
                isLoggedIn: true,
                provider: provider
            };
            localStorage.setItem('user', JSON.stringify(userData));

            // Show success message
            showSuccess(`${provider} login successful! Redirecting...`);
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        } catch (error) {
            showError(`${provider} login failed. Please try again.`);
            button.textContent = originalText;
            button.disabled = false;
        }
    });
});

// Check if user is already logged in
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
        window.location.href = 'index.html';
    }
}

// Initialize
checkAuthStatus(); 