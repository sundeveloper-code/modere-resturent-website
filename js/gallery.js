// Gallery Data
const galleryItems = [
    {
        id: 1,
        title: 'Signature Dish',
        category: 'food',
        image: 'https://source.unsplash.com/random/800x600?restaurant-food',
        description: 'Our award-winning signature dish'
    },
    {
        id: 2,
        title: 'Restaurant Interior',
        category: 'ambiance',
        image: 'https://source.unsplash.com/random/800x600?restaurant-interior',
        description: 'Modern and elegant dining area'
    },
    {
        id: 3,
        title: 'Wine Selection',
        category: 'ambiance',
        image: 'https://source.unsplash.com/random/800x600?wine-cellar',
        description: 'Extensive wine collection'
    },
    {
        id: 4,
        title: 'Chef Special',
        category: 'food',
        image: 'https://source.unsplash.com/random/800x600?chef-cooking',
        description: 'Chef\'s daily special preparation'
    },
    {
        id: 5,
        title: 'Private Event',
        category: 'events',
        image: 'https://source.unsplash.com/random/800x600?restaurant-event',
        description: 'Private dining room for special occasions'
    },
    {
        id: 6,
        title: 'Dessert Selection',
        category: 'food',
        image: 'https://source.unsplash.com/random/800x600?dessert',
        description: 'Handcrafted desserts'
    },
    {
        id: 7,
        title: 'Bar Area',
        category: 'ambiance',
        image: 'https://source.unsplash.com/random/800x600?restaurant-bar',
        description: 'Stylish bar with craft cocktails'
    },
    {
        id: 8,
        title: 'Outdoor Seating',
        category: 'ambiance',
        image: 'https://source.unsplash.com/random/800x600?restaurant-outdoor',
        description: 'Al fresco dining experience'
    },
    {
        id: 9,
        title: 'Cooking Class',
        category: 'events',
        image: 'https://source.unsplash.com/random/800x600?cooking-class',
        description: 'Interactive cooking classes'
    }
];

// DOM Elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const closeLightbox = lightbox.querySelector('.close-lightbox');
const prevButton = lightbox.querySelector('.lightbox-prev');
const nextButton = lightbox.querySelector('.lightbox-next');

let currentImageIndex = 0;
let filteredItems = [...galleryItems];

// Display Gallery Items
function displayGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item interactive';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // Add click event for lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(item, items.indexOf(item));
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Filter Gallery Items
function filterGalleryItems(category) {
    filteredItems = category === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === category);
    
    displayGalleryItems(filteredItems);
}

// Lightbox Functions
function openLightbox(item, index) {
    currentImageIndex = index;
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = item.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightboxHandler() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + filteredItems.length) % filteredItems.length;
    const item = filteredItems[currentImageIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = item.description;
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const category = button.dataset.category;
        filterGalleryItems(category);
    });
});

closeLightbox.addEventListener('click', closeLightboxHandler);
prevButton.addEventListener('click', () => navigateLightbox(-1));
nextButton.addEventListener('click', () => navigateLightbox(1));

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightboxHandler();
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxHandler();
    }
});

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
    displayGalleryItems(galleryItems);
}); 