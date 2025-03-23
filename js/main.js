// Sample book data (in a real application, this would come from an API or database)
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "fiction",
        cover: "https://source.unsplash.com/random/400x600?book",
        description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age."
    },
    {
        id: 2,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "science",
        cover: "https://source.unsplash.com/random/400x600?science",
        description: "From the Big Bang to Black Holes, this book explores the mysteries of the universe."
    },
    {
        id: 3,
        title: "The Art of War",
        author: "Sun Tzu",
        category: "non-fiction",
        cover: "https://source.unsplash.com/random/400x600?war",
        description: "Ancient Chinese text on military strategy and tactics."
    },
    // Add more books as needed
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const booksGrid = document.querySelector('.books-grid');
const categoryLinks = document.querySelectorAll('.category-list a');

// Theme Switching
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-mode';
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.className.includes('dark') ? 'light' : 'dark';
    document.body.className = currentTheme + '-mode';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Book Display Functions
function createBookCard(book) {
    return `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-description">${book.description}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        </div>
    `;
}

function displayBooks(booksToShow) {
    booksGrid.innerHTML = booksToShow.map(book => createBookCard(book)).join('');
}

// Search and Filter Functions
function filterBooks(searchTerm = '', category = 'all') {
    return books.filter(book => {
        const matchesSearch = searchTerm === '' || 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || book.category === category;
        return matchesSearch && matchesCategory;
    });
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    const activeCategory = document.querySelector('.category-list a.active').dataset.category;
    const filteredBooks = filterBooks(searchTerm, activeCategory);
    displayBooks(filteredBooks);
});

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Update active category
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Filter and display books
        const category = link.dataset.category;
        const searchTerm = searchInput.value;
        const filteredBooks = filterBooks(searchTerm, category);
        displayBooks(filteredBooks);
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Interactive Elements
const interactiveElements = document.querySelectorAll('a, button, .interactive');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Featured Dishes Data
const featuredDishes = [
    {
        id: 1,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with seasonal vegetables',
        price: '$29.99',
        image: 'https://source.unsplash.com/random/400x300?grilled-salmon',
        category: 'Main Course'
    },
    {
        id: 2,
        name: 'Beef Tenderloin',
        description: 'Premium cut with red wine reduction sauce',
        price: '$34.99',
        image: 'https://source.unsplash.com/random/400x300?beef-tenderloin',
        category: 'Main Course'
    },
    {
        id: 3,
        name: 'Mushroom Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: '$24.99',
        image: 'https://source.unsplash.com/random/400x300?risotto',
        category: 'Main Course'
    }
];

// Display Featured Dishes
const dishesGrid = document.querySelector('.dishes-grid');
if (dishesGrid) {
    featuredDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card interactive';
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <span class="price">${dish.price}</span>
                <button class="add-to-cart" data-id="${dish.id}">Add to Cart</button>
            </div>
        `;
        dishesGrid.appendChild(dishCard);
    });
}

// Testimonials Data
const testimonials = [
    {
        name: 'John Doe',
        text: 'Amazing food and service! Will definitely come back.',
        rating: 5
    },
    {
        name: 'Jane Smith',
        text: 'The best restaurant in town. The ambiance is perfect.',
        rating: 5
    },
    {
        name: 'Mike Johnson',
        text: 'Great wine selection and knowledgeable staff.',
        rating: 5
    }
];

// Testimonials Slider
const testimonialsSlider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

if (testimonialsSlider) {
    function displayTestimonial(index) {
        const testimonial = testimonials[index];
        testimonialsSlider.innerHTML = `
            <div class="testimonial-card">
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-name">${testimonial.name}</p>
            </div>
        `;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        displayTestimonial(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        displayTestimonial(currentSlide);
    });

    // Display first testimonial
    displayTestimonial(0);
}

// Cart Functionality
let cart = [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(dishId) {
    const dish = featuredDishes.find(d => d.id === dishId);
    if (dish) {
        cart.push(dish);
        updateCartCount();
        showNotification('Added to cart!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add to Cart Event Listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const dishId = parseInt(e.target.dataset.id);
        addToCart(dishId);
    }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
}); 