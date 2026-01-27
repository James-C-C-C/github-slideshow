/**
 * MedPub - Main Application Script
 * Handles homepage functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initFeaturedArticle();
    initArticlesGrid();
    initCategoryCards();
    initFilters();
    initModals();
    initNewsletterForm();
});

/**
 * Navigation
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('mobile-open');
            if (navActions) navActions.classList.toggle('mobile-open');
        });
    }
}

/**
 * Featured Article
 */
function initFeaturedArticle() {
    const featuredContainer = document.getElementById('featuredArticle');
    if (!featuredContainer) return;

    const featured = dataManager.getFeaturedArticle();
    if (!featured) return;

    featuredContainer.innerHTML = `
        <div class="featured-image">
            <div class="featured-image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
            </div>
        </div>
        <div class="featured-content">
            <span class="featured-category">${getCategoryLabel(featured.category)}</span>
            <h3 class="featured-title">
                <a href="article.html?id=${featured.id}">${featured.title}</a>
            </h3>
            <p class="featured-excerpt">${featured.excerpt}</p>
            <div class="featured-meta">
                <div class="featured-author">
                    <div class="author-avatar">${getInitials(featured.author.name)}</div>
                    <span>${featured.author.name}</span>
                </div>
                <span>${formatDate(featured.date)}</span>
                <span>${featured.readingTime} min read</span>
            </div>
        </div>
    `;
}

/**
 * Articles Grid
 */
let currentPage = 1;
const articlesPerPage = 6;
let currentCategory = 'all';
let currentSort = 'newest';

function initArticlesGrid() {
    renderArticles();
    initLoadMore();
}

function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;

    let articles = dataManager.getArticlesByCategory(currentCategory);
    articles = dataManager.sortArticles(articles, currentSort);

    // Exclude featured article from the main grid
    const featured = dataManager.getFeaturedArticle();
    if (featured) {
        articles = articles.filter(a => a.id !== featured.id);
    }

    const startIndex = 0;
    const endIndex = currentPage * articlesPerPage;
    const visibleArticles = articles.slice(startIndex, endIndex);

    grid.innerHTML = visibleArticles.map(article => createArticleCard(article)).join('');

    // Update load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = endIndex >= articles.length ? 'none' : 'inline-flex';
    }
}

function createArticleCard(article) {
    return `
        <article class="article-card">
            <div class="article-image">
                <div class="article-image-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                </div>
            </div>
            <div class="article-content">
                <span class="article-category">${getCategoryLabel(article.category)}</span>
                <h3 class="article-title">
                    <a href="article.html?id=${article.id}">${article.title}</a>
                </h3>
                <p class="article-excerpt">${truncateText(article.excerpt, 150)}</p>
                <div class="article-meta">
                    <div class="article-author">
                        <div class="author-avatar">${getInitials(article.author.name)}</div>
                        <span>${article.author.name}</span>
                    </div>
                    <div class="article-stats">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            ${article.likes}
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            ${article.comments.length}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderArticles();
        });
    }
}

/**
 * Category Cards
 */
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            currentCategory = category;
            currentPage = 1;

            // Update filter dropdown
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter) {
                categoryFilter.value = category;
            }

            // Scroll to articles section
            const articlesSection = document.querySelector('.articles-section');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth' });
            }

            renderArticles();
        });
    });
}

/**
 * Filters
 */
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentCategory = this.value;
            currentPage = 1;
            renderArticles();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentSort = this.value;
            currentPage = 1;
            renderArticles();
        });
    }
}

/**
 * Modals
 */
function initModals() {
    // Subscribe modal
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeModal = document.getElementById('subscribeModal');
    const modalClose = document.getElementById('modalClose');

    if (subscribeBtn && subscribeModal) {
        subscribeBtn.addEventListener('click', () => {
            subscribeModal.classList.add('active');
        });
    }

    if (modalClose && subscribeModal) {
        modalClose.addEventListener('click', () => {
            subscribeModal.classList.remove('active');
        });
    }

    // Close modal on backdrop click
    if (subscribeModal) {
        subscribeModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }

    // Subscribe form
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! You will receive updates on the latest medical articles.');
            subscribeModal.classList.remove('active');
            this.reset();
        });
    }

    // Explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const articlesSection = document.querySelector('.articles-section');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our weekly digest.`);
            this.reset();
        });
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
