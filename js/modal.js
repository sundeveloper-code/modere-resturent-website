// Modal Functions
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                ${content}
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
    
    return modal;
}

// Menu Item Modal
function showAddItemModal() {
    const content = `
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
    `;
    
    const modal = showModal('Add New Menu Item', content);
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
    
    const content = `
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
    `;
    
    const modal = showModal('Edit Menu Item', content);
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

// User Modal
function showAddUserModal() {
    const content = `
        <form id="addUserForm" class="admin-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role" name="role" required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Add User</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Add New User', content);
    const form = modal.querySelector('#addUserForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const user = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };
        
        adminData.users.push(user);
        saveData();
        loadUsers();
        modal.remove();
        showSuccess('User added successfully');
    });
}

function showEditUserModal(id) {
    const user = adminData.users.find(user => user.id === id);
    if (!user) return;
    
    const content = `
        <form id="editUserForm" class="admin-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" value="${user.name}" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="${user.email}" required>
            </div>
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role" name="role" required>
                    <option value="">Select Role</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                    <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>Staff</option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Update User</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Edit User', content);
    const form = modal.querySelector('#editUserForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const index = adminData.users.findIndex(user => user.id === id);
        if (index !== -1) {
            adminData.users[index] = {
                ...adminData.users[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            
            saveData();
            loadUsers();
            modal.remove();
            showSuccess('User updated successfully');
        }
    });
}

// Gallery Modal
function showAddImageModal() {
    const content = `
        <form id="addImageForm" class="admin-form">
            <div class="form-group">
                <label for="title">Image Title</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="ambience">Ambience</option>
                    <option value="events">Events</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <div class="form-group">
                <label for="url">Image URL</label>
                <input type="url" id="url" name="url" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" rows="4"></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Add Image</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Add New Image', content);
    const form = modal.querySelector('#addImageForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const image = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };
        
        adminData.gallery.push(image);
        saveData();
        loadGallery();
        modal.remove();
        showSuccess('Image added successfully');
    });
}

function showEditImageModal(id) {
    const image = adminData.gallery.find(image => image.id === id);
    if (!image) return;
    
    const content = `
        <form id="editImageForm" class="admin-form">
            <div class="form-group">
                <label for="title">Image Title</label>
                <input type="text" id="title" name="title" value="${image.title}" required>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="food" ${image.category === 'food' ? 'selected' : ''}>Food</option>
                    <option value="ambience" ${image.category === 'ambience' ? 'selected' : ''}>Ambience</option>
                    <option value="events" ${image.category === 'events' ? 'selected' : ''}>Events</option>
                    <option value="staff" ${image.category === 'staff' ? 'selected' : ''}>Staff</option>
                </select>
            </div>
            <div class="form-group">
                <label for="url">Image URL</label>
                <input type="url" id="url" name="url" value="${image.url}" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" rows="4">${image.description || ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Update Image</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Edit Image', content);
    const form = modal.querySelector('#editImageForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const index = adminData.gallery.findIndex(image => image.id === id);
        if (index !== -1) {
            adminData.gallery[index] = {
                ...adminData.gallery[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            
            saveData();
            loadGallery();
            modal.remove();
            showSuccess('Image updated successfully');
        }
    });
}

// Blog Modal
function showAddPostModal() {
    const content = `
        <form id="addPostForm" class="admin-form">
            <div class="form-group">
                <label for="title">Post Title</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author" name="author" required>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="news">News</option>
                    <option value="recipes">Recipes</option>
                    <option value="events">Events</option>
                    <option value="tips">Tips & Tricks</option>
                </select>
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea id="content" name="content" rows="10" required></textarea>
            </div>
            <div class="form-group">
                <label for="image">Featured Image URL</label>
                <input type="url" id="image" name="image" required>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Add Post</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Add New Blog Post', content);
    const form = modal.querySelector('#addPostForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const post = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };
        
        adminData.blog.push(post);
        saveData();
        loadBlogPosts();
        modal.remove();
        showSuccess('Blog post added successfully');
    });
}

function showEditPostModal(id) {
    const post = adminData.blog.find(post => post.id === id);
    if (!post) return;
    
    const content = `
        <form id="editPostForm" class="admin-form">
            <div class="form-group">
                <label for="title">Post Title</label>
                <input type="text" id="title" name="title" value="${post.title}" required>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author" name="author" value="${post.author}" required>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="news" ${post.category === 'news' ? 'selected' : ''}>News</option>
                    <option value="recipes" ${post.category === 'recipes' ? 'selected' : ''}>Recipes</option>
                    <option value="events" ${post.category === 'events' ? 'selected' : ''}>Events</option>
                    <option value="tips" ${post.category === 'tips' ? 'selected' : ''}>Tips & Tricks</option>
                </select>
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea id="content" name="content" rows="10" required>${post.content}</textarea>
            </div>
            <div class="form-group">
                <label for="image">Featured Image URL</label>
                <input type="url" id="image" name="image" value="${post.image}" required>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="draft" ${post.status === 'draft' ? 'selected' : ''}>Draft</option>
                    <option value="published" ${post.status === 'published' ? 'selected' : ''}>Published</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="save-btn">Update Post</button>
            </div>
        </form>
    `;
    
    const modal = showModal('Edit Blog Post', content);
    const form = modal.querySelector('#editPostForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const index = adminData.blog.findIndex(post => post.id === id);
        if (index !== -1) {
            adminData.blog[index] = {
                ...adminData.blog[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            
            saveData();
            loadBlogPosts();
            modal.remove();
            showSuccess('Blog post updated successfully');
        }
    });
} 