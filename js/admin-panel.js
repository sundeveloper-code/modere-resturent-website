// Admin Panel Data Management
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
            <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
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