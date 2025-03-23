// Blog Data
const blogPosts = [
    {
        id: 1,
        title: "The Art of Perfect Sushi Making",
        excerpt: "Learn the secrets behind creating perfect sushi rolls at home with our comprehensive guide.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        image: "images/blog/sushi-making.jpg",
        category: "recipes",
        date: "2024-03-15",
        author: "Chef John",
        featured: true
    },
    {
        id: 2,
        title: "Essential Kitchen Tools Every Home Chef Needs",
        excerpt: "Discover the must-have tools that will elevate your cooking game to the next level.",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
        image: "images/blog/kitchen-tools.jpg",
        category: "tips",
        date: "2024-03-10",
        author: "Chef Sarah"
    },
    {
        id: 3,
        title: "New Seasonal Menu Launch",
        excerpt: "We're excited to announce our new seasonal menu featuring fresh, local ingredients.",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
        image: "images/blog/seasonal-menu.jpg",
        category: "news",
        date: "2024-03-05",
        author: "Chef Michael"
    },
    {
        id: 4,
        title: "Wine Pairing Guide for Beginners",
        excerpt: "Master the basics of wine pairing with our comprehensive guide for beginners.",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
        image: "images/blog/wine-pairing.jpg",
        category: "tips",
        date: "2024-02-28",
        author: "Sommelier Emma"
    },
    {
        id: 5,
        title: "Upcoming Cooking Workshop",
        excerpt: "Join us for an exclusive cooking workshop with our head chef next month.",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
        image: "images/blog/cooking-workshop.jpg",
        category: "events",
        date: "2024-02-20",
        author: "Chef David"
    }
];

// DOM Elements
const featuredPostContainer = document.querySelector('.featured-post');
const blogGrid = document.querySelector('.blog-grid');
const categoryLinks = document.querySelectorAll('.category-list a');
const recentPostsList = document.querySelector('.recent-posts');
const blogNewsletterForm = document.querySelector('.blog-newsletter-form');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const pageNumbers = document.querySelector('.page-numbers');

// State
let currentCategory = 'all';
let currentPage = 1;
const postsPerPage = 6;

// Display Featured Post
function displayFeaturedPost() {
    const featuredPost = blogPosts.find(post => post.featured);
    if (featuredPost) {
        featuredPostContainer.innerHTML = `
            <div class="featured-post-content">
                <img src="${featuredPost.image}" alt="${featuredPost.title}">
                <div class="featured-post-info">
                    <span class="post-category">${featuredPost.category}</span>
                    <h2>${featuredPost.title}</h2>
                    <p>${featuredPost.excerpt}</p>
                    <div class="post-meta">
                        <span><i class="far fa-calendar"></i> ${formatDate(featuredPost.date)}</span>
                        <span><i class="far fa-user"></i> ${featuredPost.author}</span>
                    </div>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
        `;
    }
}

// Display Blog Posts
function displayBlogPosts(posts, page = 1) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    blogGrid.innerHTML = paginatedPosts.map(post => `
        <article class="blog-post">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                </div>
                <a href="#" class="read-more">Read More</a>
            </div>
        </article>
    `).join('');

    updatePagination(posts.length);
}

// Filter Posts by Category
function filterPosts(category) {
    currentCategory = category;
    currentPage = 1;
    
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);

    displayBlogPosts(filteredPosts);
    updateCategoryLinks(category);
}

// Update Category Links
function updateCategoryLinks(activeCategory) {
    categoryLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.category === activeCategory);
    });
}

// Display Recent Posts
function displayRecentPosts() {
    const recentPosts = [...blogPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    recentPostsList.innerHTML = recentPosts.map(post => `
        <li>
            <a href="#">
                <img src="${post.image}" alt="${post.title}">
                <div class="recent-post-info">
                    <h4>${post.title}</h4>
                    <span>${formatDate(post.date)}</span>
                </div>
            </a>
        </li>
    `).join('');
}

// Update Pagination
function updatePagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += i === currentPage
                ? `<span class="current">${i}</span>`
                : `<a href="#" data-page="${i}">${i}</a>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span>...</span>';
        }
    }

    pageNumbers.innerHTML = paginationHTML;
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Event Listeners
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        filterPosts(e.target.dataset.category);
    });
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const filteredPosts = currentCategory === 'all'
            ? blogPosts
            : blogPosts.filter(post => post.category === currentCategory);
        displayBlogPosts(filteredPosts, currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    const filteredPosts = currentCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === currentCategory);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        displayBlogPosts(filteredPosts, currentPage);
    }
});

pageNumbers.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        currentPage = parseInt(e.target.dataset.page);
        const filteredPosts = currentCategory === 'all'
            ? blogPosts
            : blogPosts.filter(post => post.category === currentCategory);
        displayBlogPosts(filteredPosts, currentPage);
    }
});

blogNewsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our blog!', 'success');
        e.target.reset();
    }, 1000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedPost();
    displayBlogPosts(blogPosts);
    displayRecentPosts();
}); 