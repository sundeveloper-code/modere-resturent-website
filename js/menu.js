// Menu Data
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: 'Bruschetta',
        description: 'Toasted bread with fresh tomatoes, garlic, and basil',
        price: '$8.99',
        image: 'https://source.unsplash.com/random/400x300?bruschetta',
        category: 'appetizers'
    },
    {
        id: 2,
        name: 'Calamari',
        description: 'Crispy fried squid with marinara sauce',
        price: '$12.99',
        image: 'https://source.unsplash.com/random/400x300?calamari',
        category: 'appetizers'
    },
    {
        id: 3,
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
        price: '$10.99',
        image: 'https://source.unsplash.com/random/400x300?caprese',
        category: 'appetizers'
    },
    // Main Course
    {
        id: 4,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with seasonal vegetables',
        price: '$29.99',
        image: 'https://source.unsplash.com/random/400x300?grilled-salmon',
        category: 'main-course'
    },
    {
        id: 5,
        name: 'Beef Tenderloin',
        description: 'Premium cut with red wine reduction sauce',
        price: '$34.99',
        image: 'https://source.unsplash.com/random/400x300?beef-tenderloin',
        category: 'main-course'
    },
    {
        id: 6,
        name: 'Mushroom Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: '$24.99',
        image: 'https://source.unsplash.com/random/400x300?risotto',
        category: 'main-course'
    },
    // Desserts
    {
        id: 7,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: '$8.99',
        image: 'https://source.unsplash.com/random/400x300?tiramisu',
        category: 'desserts'
    },
    {
        id: 8,
        name: 'Crème Brûlée',
        description: 'Vanilla custard with caramelized sugar top',
        price: '$7.99',
        image: 'https://source.unsplash.com/random/400x300?creme-brulee',
        category: 'desserts'
    },
    {
        id: 9,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        price: '$9.99',
        image: 'https://source.unsplash.com/random/400x300?lava-cake',
        category: 'desserts'
    },
    // Beverages
    {
        id: 10,
        name: 'Signature Cocktail',
        description: 'House special mixed drink',
        price: '$12.99',
        image: 'https://source.unsplash.com/random/400x300?cocktail',
        category: 'beverages'
    },
    {
        id: 11,
        name: 'Wine Selection',
        description: 'Curated wine list with sommelier recommendations',
        price: '$9.99/glass',
        image: 'https://source.unsplash.com/random/400x300?wine',
        category: 'beverages'
    },
    {
        id: 12,
        name: 'Craft Beer',
        description: 'Selection of local craft beers',
        price: '$7.99',
        image: 'https://source.unsplash.com/random/400x300?beer',
        category: 'beverages'
    }
];

// DOM Elements
const menuGrid = document.querySelector('.menu-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Display Menu Items
function displayMenuItems(items) {
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item interactive';
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-overlay">
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price}</span>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Filter Menu Items
function filterMenuItems(category) {
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);
    
    displayMenuItems(filteredItems);
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const category = button.dataset.category;
        filterMenuItems(category);
    });
});

// Add to Cart Functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const button = e.target.closest('.add-to-cart');
        const itemId = parseInt(button.dataset.id);
        const item = menuItems.find(item => item.id === itemId);
        
        if (item) {
            // Add to cart (using the cart functionality from main.js)
            addToCart(itemId);
        }
    }
});

// Initialize Menu
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
}); 