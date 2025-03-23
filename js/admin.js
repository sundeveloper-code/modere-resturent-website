// DOM Elements
const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
const adminSidebar = document.querySelector('.admin-sidebar');
const adminNavLinks = document.querySelectorAll('.admin-nav a');
const searchInput = document.querySelector('.admin-search input');
const notificationBtn = document.querySelector('.admin-notifications');
const profileBtn = document.querySelector('.admin-profile');
const actionButtons = document.querySelectorAll('.action-btn');

// Toggle Sidebar
toggleSidebarBtn.addEventListener('click', () => {
    adminSidebar.classList.toggle('collapsed');
});

// Navigation Active State
adminNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        adminNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update content based on section
        const section = link.getAttribute('href').substring(1);
        updateContent(section);
    });
});

// Search Functionality
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    }, 500);
});

// Notifications Dropdown
notificationBtn.addEventListener('click', () => {
    // Toggle notifications panel
    toggleNotificationsPanel();
});

// Profile Dropdown
profileBtn.addEventListener('click', () => {
    // Toggle profile panel
    toggleProfilePanel();
});

// Action Buttons
actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.currentTarget.querySelector('i').className;
        const row = e.currentTarget.closest('tr');
        const id = row.querySelector('td:first-child').textContent;
        
        handleAction(action, id);
    });
});

// Data Management
const adminData = {
    menu: [],
    orders: [],
    reservations: [],
    users: [],
    gallery: [],
    blog: [],
    settings: {
        restaurantName: 'Modern Restaurant',
        contactEmail: 'info@modernrestaurant.com',
        phoneNumber: '+1 234 567 890',
        socialMedia: {
            facebook: 'https://facebook.com/modernrestaurant',
            instagram: 'https://instagram.com/modernrestaurant',
            twitter: 'https://twitter.com/modernrestaurant'
        }
    }
};

// Load Data from Local Storage
function loadData() {
    const savedData = localStorage.getItem('adminData');
    if (savedData) {
        Object.assign(adminData, JSON.parse(savedData));
    }
}

// Save Data to Local Storage
function saveData() {
    localStorage.setItem('adminData', JSON.stringify(adminData));
}

// Update Stats
function updateStats() {
    const stats = {
        totalOrders: adminData.orders.length,
        totalUsers: adminData.users.length,
        totalRevenue: adminData.orders.reduce((sum, order) => sum + order.total, 0),
        totalReservations: adminData.reservations.length
    };

    // Update stats cards
    document.querySelector('.stat-card:nth-child(1) .stat-info p').textContent = stats.totalOrders;
    document.querySelector('.stat-card:nth-child(2) .stat-info p').textContent = stats.totalUsers;
    document.querySelector('.stat-card:nth-child(3) .stat-info p').textContent = `$${stats.totalRevenue.toFixed(2)}`;
    document.querySelector('.stat-card:nth-child(4) .stat-info p').textContent = stats.totalReservations;
}

// Load Menu Items
function loadMenuItems() {
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = adminData.menu.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><span class="status ${item.status}">${item.status}</span></td>
            <td>
                <button class="action-btn" data-action="view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                <button class="action-btn" data-action="edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn" data-action="delete" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Load Orders
function loadOrders() {
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = adminData.orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items.length} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn" data-action="view" data-id="${order.id}"><i class="fas fa-eye"></i></button>
                <button class="action-btn" data-action="edit" data-id="${order.id}"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

// Load Reservations
function loadReservations() {
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = adminData.reservations.map(reservation => `
        <tr>
            <td>#${reservation.id}</td>
            <td>${reservation.name}</td>
            <td>${new Date(reservation.date).toLocaleDateString()}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td><span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span></td>
            <td>
                <button class="action-btn" data-action="view" data-id="${reservation.id}"><i class="fas fa-eye"></i></button>
                <button class="action-btn" data-action="edit" data-id="${reservation.id}"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

// Load Users
function loadUsers() {
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = adminData.users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
            <td>
                <button class="action-btn" data-action="view" data-id="${user.id}"><i class="fas fa-eye"></i></button>
                <button class="action-btn" data-action="edit" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn" data-action="delete" data-id="${user.id}"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Load Gallery
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = adminData.gallery.map(image => `
        <div class="gallery-item">
            <img src="${image.url}" alt="${image.title}">
            <div class="gallery-item-overlay">
                <div class="gallery-item-actions">
                    <button class="action-btn" data-action="edit" data-id="${image.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn" data-action="delete" data-id="${image.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Blog Posts
function loadBlogPosts() {
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = adminData.blog.map(post => `
        <tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.category}</td>
            <td><span class="status ${post.status.toLowerCase()}">${post.status}</span></td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn" data-action="view" data-id="${post.id}"><i class="fas fa-eye"></i></button>
                <button class="action-btn" data-action="edit" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn" data-action="delete" data-id="${post.id}"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Load Settings
function loadSettings() {
    const settings = adminData.settings;
    document.querySelector('input[type="text"]').value = settings.restaurantName;
    document.querySelector('input[type="email"]').value = settings.contactEmail;
    document.querySelector('input[type="tel"]').value = settings.phoneNumber;
    document.querySelector('input[value*="facebook"]').value = settings.socialMedia.facebook;
    document.querySelector('input[value*="instagram"]').value = settings.socialMedia.instagram;
    document.querySelector('input[value*="twitter"]').value = settings.socialMedia.twitter;
}

// Save Settings
function saveSettings() {
    const settings = {
        restaurantName: document.querySelector('input[type="text"]').value,
        contactEmail: document.querySelector('input[type="email"]').value,
        phoneNumber: document.querySelector('input[type="tel"]').value,
        socialMedia: {
            facebook: document.querySelector('input[value*="facebook"]').value,
            instagram: document.querySelector('input[value*="instagram"]').value,
            twitter: document.querySelector('input[value*="twitter"]').value
        }
    };
    
    adminData.settings = settings;
    saveData();
    showSuccess('Settings saved successfully');
}

// Add Event Listeners for Settings
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn')) {
        saveSettings();
    }
});

// Show Success Message
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show Error Message
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Functions
function updateContent(section) {
    const content = document.querySelector('.admin-content');
    content.innerHTML = ''; // Clear current content
    
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'menu':
            loadMenuManagement();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'reservations':
            loadReservations();
            break;
        case 'users':
            loadUsers();
            break;
        case 'gallery':
            loadGallery();
            break;
        case 'blog':
            loadBlog();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function performSearch(term) {
    // Simulate API call
    console.log('Searching for:', term);
    // Update UI with search results
}

function toggleNotificationsPanel() {
    // Create and show notifications panel
    const panel = document.createElement('div');
    panel.className = 'notifications-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Notifications</h3>
            <button class="close-panel"><i class="fas fa-times"></i></button>
        </div>
        <div class="panel-content">
            <div class="notification-item">
                <i class="fas fa-shopping-cart"></i>
                <div class="notification-info">
                    <p>New order received</p>
                    <span>2 minutes ago</span>
                </div>
            </div>
            <div class="notification-item">
                <i class="fas fa-calendar-alt"></i>
                <div class="notification-info">
                    <p>New reservation</p>
                    <span>5 minutes ago</span>
                </div>
            </div>
            <div class="notification-item">
                <i class="fas fa-user"></i>
                <div class="notification-info">
                    <p>New user registration</p>
                    <span>10 minutes ago</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !notificationBtn.contains(e.target)) {
            panel.remove();
        }
    });
    
    // Close button functionality
    panel.querySelector('.close-panel').addEventListener('click', () => {
        panel.remove();
    });
}

function toggleProfilePanel() {
    // Create and show profile panel
    const panel = document.createElement('div');
    panel.className = 'profile-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Profile</h3>
            <button class="close-panel"><i class="fas fa-times"></i></button>
        </div>
        <div class="panel-content">
            <div class="profile-info">
                <img src="https://via.placeholder.com/80" alt="Profile">
                <h4>Admin Name</h4>
                <p>admin@example.com</p>
            </div>
            <ul class="profile-menu">
                <li><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                <li><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !profileBtn.contains(e.target)) {
            panel.remove();
        }
    });
    
    // Close button functionality
    panel.querySelector('.close-panel').addEventListener('click', () => {
        panel.remove();
    });
}

function handleAction(action, id) {
    if (action.includes('fa-eye')) {
        viewDetails(id);
    } else if (action.includes('fa-edit')) {
        const type = getCurrentSection();
        switch(type) {
            case 'menu':
                showEditItemModal(id);
                break;
            case 'users':
                showEditUserModal(id);
                break;
            case 'gallery':
                showEditImageModal(id);
                break;
            case 'blog':
                showEditPostModal(id);
                break;
        }
    } else if (action.includes('fa-trash')) {
        const type = getCurrentSection();
        handleDelete(type, id);
    }
}

function viewDetails(id) {
    // Show details modal
    console.log('Viewing details for:', id);
}

function editItem(id) {
    // Show edit modal
    console.log('Editing item:', id);
}

// Load Section Content Functions
function loadDashboard() {
    // Dashboard is already loaded by default
}

function loadMenuManagement() {
    const content = document.querySelector('.admin-content');
    content.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2>Menu Management</h2>
                <button class="add-btn" onclick="showAddItemModal()"><i class="fas fa-plus"></i> Add Item</button>
            </div>
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.menu.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.category}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
                                <td>
                                    <button class="action-btn" data-action="view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                                    <button class="action-btn" data-action="edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn" data-action="delete" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadUsers() {
    const content = document.querySelector('.admin-content');
    content.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2>User Management</h2>
                <button class="add-btn" onclick="showAddUserModal()"><i class="fas fa-plus"></i> Add User</button>
            </div>
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.users.map(user => `
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td>${user.role}</td>
                                <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
                                <td>
                                    <button class="action-btn" data-action="view" data-id="${user.id}"><i class="fas fa-eye"></i></button>
                                    <button class="action-btn" data-action="edit" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn" data-action="delete" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadGallery() {
    const content = document.querySelector('.admin-content');
    content.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2>Gallery Management</h2>
                <button class="add-btn" onclick="showAddImageModal()"><i class="fas fa-plus"></i> Add Image</button>
            </div>
            <div class="gallery-grid">
                ${adminData.gallery.map(image => `
                    <div class="gallery-item">
                        <img src="${image.url}" alt="${image.title}">
                        <div class="gallery-item-overlay">
                            <div class="gallery-item-actions">
                                <button class="action-btn" data-action="edit" data-id="${image.id}"><i class="fas fa-edit"></i></button>
                                <button class="action-btn" data-action="delete" data-id="${image.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadBlog() {
    const content = document.querySelector('.admin-content');
    content.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2>Blog Management</h2>
                <button class="add-btn" onclick="showAddPostModal()"><i class="fas fa-plus"></i> Add Post</button>
            </div>
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.blog.map(post => `
                            <tr>
                                <td>${post.id}</td>
                                <td>${post.title}</td>
                                <td>${post.author}</td>
                                <td>${post.category}</td>
                                <td><span class="status ${post.status.toLowerCase()}">${post.status}</span></td>
                                <td>${new Date(post.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn" data-action="view" data-id="${post.id}"><i class="fas fa-eye"></i></button>
                                    <button class="action-btn" data-action="edit" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn" data-action="delete" data-id="${post.id}"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
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
        
        if (key === 'price' && isNaN(value) || value <= 0) {
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

// Handle Form Submission
function handleFormSubmit(form, type) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            showFormErrors(form, errors);
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const data = Object.fromEntries(formData.entries());
            
            switch(type) {
                case 'menu':
                    handleMenuItemSubmit(data);
                    break;
                case 'user':
                    handleUserSubmit(data);
                    break;
                case 'gallery':
                    handleGallerySubmit(data);
                    break;
                case 'blog':
                    handleBlogSubmit(data);
                    break;
                case 'settings':
                    handleSettingsSubmit(data);
                    break;
            }
            
            showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully`);
            form.closest('.admin-modal').remove();
        } catch (error) {
            showError('An error occurred. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// Data Handlers
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
}

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
}

function handleGallerySubmit(data) {
    const image = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
    };
    
    adminData.gallery.push(image);
    saveData();
    loadGallery();
}

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
}

function handleSettingsSubmit(data) {
    adminData.settings = {
        ...adminData.settings,
        ...data
    };
    saveData();
}

// Delete Handlers
function handleDelete(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        switch(type) {
            case 'menu':
                adminData.menu = adminData.menu.filter(item => item.id !== id);
                break;
            case 'user':
                adminData.users = adminData.users.filter(user => user.id !== id);
                break;
            case 'gallery':
                adminData.gallery = adminData.gallery.filter(image => image.id !== id);
                break;
            case 'blog':
                adminData.blog = adminData.blog.filter(post => post.id !== id);
                break;
        }
        
        saveData();
        showSuccess('Item deleted successfully');
        
        // Reload the current section
        const currentSection = document.querySelector('.admin-nav a.active').getAttribute('href').substring(1);
        updateContent(currentSection);
    }
}

function getCurrentSection() {
    const activeLink = document.querySelector('.admin-nav a.active');
    return activeLink.getAttribute('href').substring(1);
}

// Filter Handlers
function handleFilter(type, status) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === status);
    });
    
    // Filter data based on status
    let filteredData;
    switch(type) {
        case 'orders':
            filteredData = status === 'all' 
                ? adminData.orders 
                : adminData.orders.filter(order => order.status.toLowerCase() === status);
            break;
        case 'reservations':
            filteredData = status === 'all'
                ? adminData.reservations
                : adminData.reservations.filter(res => res.status.toLowerCase() === status);
            break;
    }
    
    // Update table with filtered data
    const tbody = document.querySelector('.admin-table tbody');
    tbody.innerHTML = filteredData.map(item => createTableRow(item, type)).join('');
}

// Create Table Row
function createTableRow(item, type) {
    switch(type) {
        case 'orders':
            return `
                <tr>
                    <td>#${item.id}</td>
                    <td>${item.customer}</td>
                    <td>${item.items.length} items</td>
                    <td>$${item.total.toFixed(2)}</td>
                    <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td>
                        <button class="action-btn" data-action="view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn" data-action="edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `;
        case 'reservations':
            return `
                <tr>
                    <td>#${item.id}</td>
                    <td>${item.name}</td>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td>${item.time}</td>
                    <td>${item.guests}</td>
                    <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
                    <td>
                        <button class="action-btn" data-action="view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn" data-action="edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `;
        default:
            return '';
    }
}

function showAddItemModal() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Menu Item</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="addItemForm" class="admin-form">
                    <div class="form-group">
                        <label for="name">Item Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="appetizers">Appetizers</option>
                            <option value="main-course">Main Course</option>
                            <option value="desserts">Desserts</option>
                            <option value="beverages">Beverages</option>
                            <option value="specials">Specials</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" id="price" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL</label>
                        <input type="url" id="image" name="image" required>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status" required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="save-btn">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close button functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Handle form submission
    const form = modal.querySelector('#addItemForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const menuItem = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };
        
        adminData.menu.push(menuItem);
        saveData();
        loadMenuItems();
        modal.remove();
        showSuccess('Menu item added successfully');
    });
}

function showEditItemModal(id) {
    const item = adminData.menu.find(item => item.id === id);
    if (!item) return;
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Menu Item</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="editItemForm" class="admin-form">
                    <div class="form-group">
                        <label for="name">Item Name</label>
                        <input type="text" id="name" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="appetizers" ${item.category === 'appetizers' ? 'selected' : ''}>Appetizers</option>
                            <option value="main-course" ${item.category === 'main-course' ? 'selected' : ''}>Main Course</option>
                            <option value="desserts" ${item.category === 'desserts' ? 'selected' : ''}>Desserts</option>
                            <option value="beverages" ${item.category === 'beverages' ? 'selected' : ''}>Beverages</option>
                            <option value="specials" ${item.category === 'specials' ? 'selected' : ''}>Specials</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" id="price" name="price" step="0.01" value="${item.price}" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="4" required>${item.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL</label>
                        <input type="url" id="image" name="image" value="${item.image}" required>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status" required>
                            <option value="active" ${item.status === 'active' ? 'selected' : ''}>Active</option>
                            <option value="inactive" ${item.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="save-btn">Update Item</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close button functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Handle form submission
    const form = modal.querySelector('#editItemForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const index = adminData.menu.findIndex(item => item.id === id);
        if (index !== -1) {
            adminData.menu[index] = {
                ...adminData.menu[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            
            saveData();
            loadMenuItems();
            modal.remove();
            showSuccess('Menu item updated successfully');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
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
});