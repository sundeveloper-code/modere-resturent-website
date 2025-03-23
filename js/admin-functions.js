// Admin Panel Functions

// Add Sample Data
function addSampleData() {
    if (adminData.menu.length === 0) {
        adminData.menu = [
            {
                id: '1',
                name: 'Bruschetta',
                category: 'appetizers',
                price: 8.99,
                description: 'Toasted bread with fresh tomatoes, garlic, and basil',
                image: 'https://example.com/bruschetta.jpg',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Margherita Pizza',
                category: 'main-course',
                price: 14.99,
                description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                image: 'https://example.com/pizza.jpg',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Tiramisu',
                category: 'desserts',
                price: 7.99,
                description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
                image: 'https://example.com/tiramisu.jpg',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
    }

    if (adminData.users.length === 0) {
        adminData.users = [
            {
                id: '1',
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveData();
}

// Handle Menu Item Operations
function handleMenuItemSubmit(data) {
    const menuItem = {
        id: Date.now().toString(),
        ...data,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    adminData.menu.push(menuItem);
    saveData();
    loadMenuItems();
    showSuccess('Menu item added successfully');
}

function handleMenuItemUpdate(id, data) {
    const index = adminData.menu.findIndex(item => item.id === id);
    if (index !== -1) {
        adminData.menu[index] = {
            ...adminData.menu[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadMenuItems();
        showSuccess('Menu item updated successfully');
    }
}

function handleMenuItemDelete(id) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        adminData.menu = adminData.menu.filter(item => item.id !== id);
        saveData();
        loadMenuItems();
        showSuccess('Menu item deleted successfully');
    }
}

// Handle User Operations
function handleUserSubmit(data) {
    const user = {
        id: Date.now().toString(),
        ...data,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    adminData.users.push(user);
    saveData();
    loadUsers();
    showSuccess('User added successfully');
}

function handleUserUpdate(id, data) {
    const index = adminData.users.findIndex(user => user.id === id);
    if (index !== -1) {
        adminData.users[index] = {
            ...adminData.users[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadUsers();
        showSuccess('User updated successfully');
    }
}

function handleUserDelete(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        adminData.users = adminData.users.filter(user => user.id !== id);
        saveData();
        loadUsers();
        showSuccess('User deleted successfully');
    }
}

// Handle Gallery Operations
function handleGallerySubmit(data) {
    const image = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
    };
    
    adminData.gallery.push(image);
    saveData();
    loadGallery();
    showSuccess('Image added successfully');
}

function handleGalleryUpdate(id, data) {
    const index = adminData.gallery.findIndex(image => image.id === id);
    if (index !== -1) {
        adminData.gallery[index] = {
            ...adminData.gallery[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadGallery();
        showSuccess('Image updated successfully');
    }
}

function handleGalleryDelete(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        adminData.gallery = adminData.gallery.filter(image => image.id !== id);
        saveData();
        loadGallery();
        showSuccess('Image deleted successfully');
    }
}

// Handle Blog Operations
function handleBlogSubmit(data) {
    const post = {
        id: Date.now().toString(),
        ...data,
        status: 'draft',
        createdAt: new Date().toISOString()
    };
    
    adminData.blog.push(post);
    saveData();
    loadBlogPosts();
    showSuccess('Blog post added successfully');
}

function handleBlogUpdate(id, data) {
    const index = adminData.blog.findIndex(post => post.id === id);
    if (index !== -1) {
        adminData.blog[index] = {
            ...adminData.blog[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadBlogPosts();
        showSuccess('Blog post updated successfully');
    }
}

function handleBlogDelete(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        adminData.blog = adminData.blog.filter(post => post.id !== id);
        saveData();
        loadBlogPosts();
        showSuccess('Blog post deleted successfully');
    }
}

// Handle Order Operations
function handleOrderUpdate(id, data) {
    const index = adminData.orders.findIndex(order => order.id === id);
    if (index !== -1) {
        adminData.orders[index] = {
            ...adminData.orders[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadOrders();
        showSuccess('Order updated successfully');
    }
}

// Handle Reservation Operations
function handleReservationUpdate(id, data) {
    const index = adminData.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
        adminData.reservations[index] = {
            ...adminData.reservations[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        saveData();
        loadReservations();
        showSuccess('Reservation updated successfully');
    }
}

// Form Validation
function validateForm(formData) {
    const errors = {};
    
    for (const [key, value] of formData.entries()) {
        if (!value.trim()) {
            errors[key] = 'This field is required';
        }
        
        if (key === 'email' && !isValidEmail(value)) {
            errors[key] = 'Please enter a valid email address';
        }
        
        if (key === 'password' && value.length < 6) {
            errors[key] = 'Password must be at least 6 characters';
        }
        
        if (key === 'price' && (isNaN(value) || value <= 0)) {
            errors[key] = 'Please enter a valid price';
        }
    }
    
    return errors;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form Error Handling
function showFormErrors(form, errors) {
    form.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            const fieldName = input.name;
            if (errors[fieldName]) {
                group.classList.add('error');
                let errorMessage = group.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    group.appendChild(errorMessage);
                }
                errorMessage.textContent = errors[fieldName];
            } else {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        }
    });
}

// Initialize Admin Panel
function initializeAdminPanel() {
    loadData();
    addSampleData();
    updateStats();
    loadDashboard();
    
    // Add event listeners for action buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) {
            const btn = e.target.closest('.action-btn');
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            handleAction(action, id);
        }
        
        // Add event listeners for filter buttons
        if (e.target.classList.contains('filter-btn')) {
            const type = getCurrentSection();
            const status = e.target.textContent.toLowerCase();
            handleFilter(type, status);
        }
    });
}

// Export functions
window.handleMenuItemSubmit = handleMenuItemSubmit;
window.handleMenuItemUpdate = handleMenuItemUpdate;
window.handleMenuItemDelete = handleMenuItemDelete;
window.handleUserSubmit = handleUserSubmit;
window.handleUserUpdate = handleUserUpdate;
window.handleUserDelete = handleUserDelete;
window.handleGallerySubmit = handleGallerySubmit;
window.handleGalleryUpdate = handleGalleryUpdate;
window.handleGalleryDelete = handleGalleryDelete;
window.handleBlogSubmit = handleBlogSubmit;
window.handleBlogUpdate = handleBlogUpdate;
window.handleBlogDelete = handleBlogDelete;
window.handleOrderUpdate = handleOrderUpdate;
window.handleReservationUpdate = handleReservationUpdate;
window.initializeAdminPanel = initializeAdminPanel; 