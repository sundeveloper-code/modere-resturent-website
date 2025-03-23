// Image setup script for the restaurant website
const fs = require('fs');
const path = require('path');
const https = require('https');
const { createWriteStream } = require('fs');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your Unsplash API key
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Image categories and their search terms
const imageCategories = {
    menu: [
        { search: 'gourmet food', count: 10 },
        { search: 'restaurant dish', count: 10 },
        { search: 'fine dining', count: 5 }
    ],
    gallery: [
        { search: 'restaurant interior', count: 5 },
        { search: 'restaurant ambiance', count: 5 },
        { search: 'restaurant decor', count: 5 }
    ],
    blog: [
        { search: 'cooking process', count: 5 },
        { search: 'chef cooking', count: 5 }
    ],
    about: [
        { search: 'restaurant team', count: 3 },
        { search: 'chef portrait', count: 2 }
    ],
    admin: [
        { search: 'admin dashboard', count: 1 }
    ]
};

// Create directories if they don't exist
function createDirectories() {
    Object.keys(imageCategories).forEach(category => {
        const dir = path.join(__dirname, '..', 'images', category);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

// Download image from URL
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                response.resume();
                reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
            }
        });
    });
}

// Fetch images from Unsplash
async function fetchImages(category, searchTerm, count) {
    const url = `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(searchTerm)}&count=${count}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });
        
        const images = await response.json();
        
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const filepath = path.join(__dirname, '..', 'images', category, `${searchTerm.replace(/\s+/g, '-')}-${i + 1}.jpg`);
            
            await downloadImage(image.urls.regular, filepath);
            console.log(`Downloaded: ${filepath}`);
        }
    } catch (error) {
        console.error(`Error fetching images for ${searchTerm}:`, error);
    }
}

// Main function to setup all images
async function setupImages() {
    createDirectories();
    
    for (const [category, searches] of Object.entries(imageCategories)) {
        for (const search of searches) {
            console.log(`Fetching ${search.count} images for ${category}/${search.search}`);
            await fetchImages(category, search.search, search.count);
        }
    }
}

// Run the setup
setupImages().catch(console.error); 