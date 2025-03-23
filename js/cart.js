// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsList = document.querySelector('.cart-items-list');
const subtotalElement = document.querySelector('.subtotal');
const taxElement = document.querySelector('.tax');
const totalElement = document.querySelector('.total-amount');
const cartCount = document.querySelector('.cart-count');
const checkoutForm = document.getElementById('checkout-form');
const paymentSelect = document.getElementById('payment');
const creditCardDetails = document.getElementById('credit-card-details');

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Format Price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Calculate Cart Totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    subtotalElement.textContent = formatPrice(subtotal);
    taxElement.textContent = formatPrice(tax);
    totalElement.textContent = formatPrice(total);

    return { subtotal, tax, total };
}

// Create Cart Item Element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="price">${formatPrice(item.price)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
        </div>
        <button class="remove-item" data-id="${item.id}">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // Add event listeners
    const minusBtn = cartItem.querySelector('.minus');
    const plusBtn = cartItem.querySelector('.plus');
    const removeBtn = cartItem.querySelector('.remove-item');

    minusBtn.addEventListener('click', () => updateQuantity(item.id, -1));
    plusBtn.addEventListener('click', () => updateQuantity(item.id, 1));
    removeBtn.addEventListener('click', () => removeItem(item.id));

    return cartItem;
}

// Update Cart Display
function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cart.forEach(item => {
        cartItemsList.appendChild(createCartItemElement(item));
    });

    calculateTotals();
    updateCartCount();
}

// Update Item Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(itemId);
        } else {
            updateCartDisplay();
        }
    }
}

// Remove Item from Cart
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Handle Payment Method Change
paymentSelect.addEventListener('change', (e) => {
    creditCardDetails.style.display = e.target.value === 'credit' || e.target.value === 'debit' ? 'block' : 'none';
});

// Validate Form
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value;

    if (!name || !email || !phone || !address || !payment) {
        showError('Please fill in all required fields');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError('Please enter a valid phone number');
        return false;
    }

    if ((payment === 'credit' || payment === 'debit') && !validateCardDetails()) {
        return false;
    }

    return true;
}

// Validate Card Details
function validateCardDetails() {
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardNumber || !expiry || !cvv) {
        showError('Please fill in all card details');
        return false;
    }

    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    if (!cardRegex.test(cardNumber)) {
        showError('Please enter a valid card number');
        return false;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) {
        showError('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(cvv)) {
        showError('Please enter a valid CVV');
        return false;
    }

    return true;
}

// Show Error Message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    checkoutForm.insertAdjacentElement('beforebegin', errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show Success Message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    checkoutForm.insertAdjacentElement('beforebegin', successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Handle Form Submission
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    try {
        const submitBtn = checkoutForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        
        // Show success message
        showSuccess('Order placed successfully! Thank you for your purchase.');
        checkoutForm.reset();
        updateCartDisplay();

        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        showError('Failed to place order. Please try again later.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Initialize Cart Display
updateCartDisplay(); 