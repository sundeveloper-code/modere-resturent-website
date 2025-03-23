// DOM Elements
const reservationForm = document.getElementById('reservation-form');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsInput = document.getElementById('guests');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Available time slots (in 24-hour format)
const availableTimeSlots = {
    weekday: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    weekend: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
};

// Update time slots based on selected date
dateInput.addEventListener('change', () => {
    const selectedDate = new Date(dateInput.value);
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
    
    // Clear current options
    timeInput.innerHTML = '<option value="">Select Time</option>';
    
    // Add new options based on day type
    const timeSlots = isWeekend ? availableTimeSlots.weekend : availableTimeSlots.weekday;
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = formatTime(time);
        timeInput.appendChild(option);
    });
});

// Format time for display (12-hour format)
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// Handle form submission
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const reservationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests'),
        specialRequests: formData.get('special-requests')
    };

    try {
        // Show loading state
        const submitBtn = reservationForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Reservation successful! We will confirm via email.', 'success');
        
        // Reset form
        reservationForm.reset();
        
        // Reset date input minimum
        dateInput.min = today;
        
    } catch (error) {
        showNotification('Error making reservation. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add animation class
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    if (!name || !email || !phone || !date || !time || !guests) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }

    return true;
}

// Add validation to form submission
reservationForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }
}); 