document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedSpan = document.getElementById('modification-date');
    if (lastModifiedSpan) {
        const lastModified = new Date(document.lastModified);
        lastModifiedSpan.textContent = lastModified.toLocaleString();
    }
});

import giftIdeas from './christmas.mjs';

// Random number generation function
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Get random gift idea
function getRandomGiftIdea() {
    const randomIndex = getRandomNumber(giftIdeas.length);
    return giftIdeas[randomIndex];
}

// Generate tags HTML
function generateTagsHTML(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
}

// Generate rating stars HTML
function generateRatingStarsHTML(rating) {
    return Array.from({length: 5}, (_, index) => 
        `<span class="icon-star" aria-hidden="true">
            ${index < rating ? '⭐' : '☆'}
        </span>`
    ).join('');
}

// Generate gift card HTML
function generateGiftCardHTML(giftIdea) {
    return `
        <article class="gift-card">
            <div class="gift-image">
                <img src="${giftIdea.image}" alt="${giftIdea.name}" width="300" height="200">
            </div>
            <div class="gift-content">
                <h3>${giftIdea.name}</h3>
                <p class="gift-description">${giftIdea.description}</p>
                <div class="gift-tags">
                    ${generateTagsHTML(giftIdea.tags)}
                </div>
                <div class="gift-meta">
                    <span class="cost">Great</span>
                    <span class="rating" role="img" aria-label="Rating: ${giftIdea.rating} out of 5 stars">
                        ${generateRatingStarsHTML(giftIdea.rating)}
                    </span>
                </div>
                <div class="gift-items">
                    <h4>Gift Ideas:</h4>
                    <ul>
                        ${giftIdea.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </article>
    `;
}

// Render gift ideas to page
function renderGiftIdeas(ideas) {
    const giftSection = document.querySelector('.gift-grid');
    if (giftSection) {
        giftSection.innerHTML = ideas.map(generateGiftCardHTML).join('');
    }
}

// Search handler for filtering gift ideas
function searchGiftIdeas(searchTerm) {
    const lowercaseTerm = searchTerm.toLowerCase();
    return giftIdeas.filter(idea => 
        idea.name.toLowerCase().includes(lowercaseTerm) ||
        idea.tags.some(tag => tag.toLowerCase().includes(lowercaseTerm)) ||
        idea.description.toLowerCase().includes(lowercaseTerm) ||
        idea.category.toLowerCase().includes(lowercaseTerm)
    );
}

// Initialize page with random gift ideas
function initializePage() {
    const randomIdeas = [
        getRandomGiftIdea(),
        getRandomGiftIdea(),
        getRandomGiftIdea()
    ];
    renderGiftIdeas(randomIdeas);
}

// Setup search event listener
function setupSearchHandler() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        const filteredIdeas = searchTerm ? searchGiftIdeas(searchTerm) : giftIdeas;
        renderGiftIdeas(filteredIdeas);
    });
}

// Page initialization
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupSearchHandler();

    // Last modified date
    const lastModifiedSpan = document.getElementById('modification-date');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});