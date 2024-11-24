// Import the recipes array from recipes.mjs
import recipes from './recipes.mjs';

// Function to generate a random number between 0 and num-1
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random recipe from the recipes array
function getRandomRecipe(recipeList) {
    const randomIndex = getRandomNumber(recipeList.length);
    return recipeList[randomIndex];
}

// Function to generate the tags HTML
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Function to generate the rating stars HTML
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

// Function to generate the recipe HTML
function recipeTemplate(recipe) {
    return `
        <article class="recipe-card">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="recipe-content">
                <h3>${recipe.name}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="cooking-time">${recipe.cookTime}</span>
                    <ul class="recipe__tags">${tagsTemplate(recipe.tags)}</ul>
                    ${ratingTemplate(recipe.rating)}
                </div>
            </div>
        </article>`;
}

// Function to render recipes to the page
function renderRecipes(recipeList) {
    const recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}

// Function to initialize the page with a random recipe
function init() {
    const randomRecipe = getRandomRecipe(recipes);
    renderRecipes([randomRecipe]);
}

// Search handler for filtering recipes
function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            const lowerQuery = query.toLowerCase();
            return (
                recipe.name.toLowerCase().includes(lowerQuery) ||
                recipe.description.toLowerCase().includes(lowerQuery) ||
                recipe.tags.find(tag => tag.toLowerCase().includes(lowerQuery)) ||
                recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(lowerQuery))
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

// Search event listener
function searchHandler(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search').value.trim();
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}

// Attach event listener to the search form
document.querySelector('.search-form').addEventListener('submit', searchHandler);

// Initialize the page with a random recipe
init();
