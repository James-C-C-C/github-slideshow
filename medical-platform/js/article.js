/**
 * MedPub - Article Page Script
 * Handles article display, comments, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const articleId = getArticleIdFromUrl();

    if (!articleId) {
        window.location.href = 'index.html';
        return;
    }

    const article = dataManager.getArticle(articleId);

    if (!article) {
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = `${article.title} - MedPub`;

    // Initialize components
    initArticleHeader(article);
    initArticleBody(article);
    initArticleTags(article);
    initArticleActions(article);
    initAuthorCard(article);
    initRelatedArticles(article);
    initComments(article);
    initModals(article);
    initNavigation();
});

/**
 * Get article ID from URL
 */
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Article Header
 */
function initArticleHeader(article) {
    const header = document.getElementById('articleHeader');
    if (!header) return;

    header.innerHTML = `
        <span class="article-category">${getCategoryLabel(article.category)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        ${article.subtitle ? `<p class="subtitle">${escapeHtml(article.subtitle)}</p>` : ''}
        <div class="article-header-meta">
            <div class="article-header-author">
                <div class="author-avatar">${getInitials(article.author.name)}</div>
                <div class="author-info">
                    <span class="author-name">${escapeHtml(article.author.name)}</span>
                    <span class="author-title-text">${escapeHtml(article.author.title)}</span>
                </div>
            </div>
            <span class="article-date">${formatDate(article.date)}</span>
            <span class="article-reading-time">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                ${article.readingTime} min read
            </span>
        </div>
    `;
}

/**
 * Article Body
 */
function initArticleBody(article) {
    const body = document.getElementById('articleBody');
    if (!body) return;

    // The content is pre-formatted HTML from our data
    body.innerHTML = article.content;
}

/**
 * Article Tags
 */
function initArticleTags(article) {
    const tagsContainer = document.getElementById('articleTags');
    if (!tagsContainer || !article.tags) return;

    tagsContainer.innerHTML = article.tags.map(tag =>
        `<a href="index.html?search=${encodeURIComponent(tag)}" class="tag">#${escapeHtml(tag)}</a>`
    ).join('');
}

/**
 * Article Actions (Like, Bookmark, Share)
 */
function initArticleActions(article) {
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = document.getElementById('likeCount');
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const shareBtn = document.getElementById('shareBtn');

    // Initialize like state
    if (likeBtn && likeCount) {
        likeCount.textContent = article.likes;

        if (dataManager.isLiked(article.id)) {
            likeBtn.classList.add('active');
        }

        likeBtn.addEventListener('click', function() {
            const result = dataManager.toggleLike(article.id);
            if (result) {
                likeCount.textContent = result.count;
                this.classList.toggle('active', result.liked);
            }
        });
    }

    // Initialize bookmark state
    if (bookmarkBtn) {
        if (dataManager.isBookmarked(article.id)) {
            bookmarkBtn.classList.add('active');
            bookmarkBtn.querySelector('span').textContent = 'Saved';
        }

        bookmarkBtn.addEventListener('click', function() {
            const isBookmarked = dataManager.toggleBookmark(article.id);
            this.classList.toggle('active', isBookmarked);
            this.querySelector('span').textContent = isBookmarked ? 'Saved' : 'Save';
        });
    }

    // Share button opens modal
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const shareModal = document.getElementById('shareModal');
            if (shareModal) {
                shareModal.classList.add('active');
            }
        });
    }
}

/**
 * Author Card
 */
function initAuthorCard(article) {
    const authorCard = document.getElementById('authorCard');
    if (!authorCard) return;

    authorCard.innerHTML = `
        <div class="author-avatar">${getInitials(article.author.name)}</div>
        <div class="author-card-content">
            <h4>${escapeHtml(article.author.name)}</h4>
            <p class="author-credentials">${escapeHtml(article.author.title)}${article.author.affiliation ? ` at ${escapeHtml(article.author.affiliation)}` : ''}</p>
            <p>${escapeHtml(article.author.bio)}</p>
        </div>
    `;
}

/**
 * Related Articles
 */
function initRelatedArticles(article) {
    const relatedContainer = document.getElementById('relatedArticles');
    if (!relatedContainer) return;

    const relatedArticles = dataManager.getRelatedArticles(article.id, 3);

    if (relatedArticles.length === 0) {
        relatedContainer.parentElement.style.display = 'none';
        return;
    }

    relatedContainer.innerHTML = relatedArticles.map(related => `
        <div class="related-card">
            <span class="article-category">${getCategoryLabel(related.category)}</span>
            <h4><a href="article.html?id=${related.id}">${escapeHtml(related.title)}</a></h4>
            <div class="article-meta">
                <span>${escapeHtml(related.author.name)}</span>
                <span>${related.readingTime} min read</span>
            </div>
        </div>
    `).join('');
}

/**
 * Comments Section
 */
function initComments(article) {
    renderComments(article);
    initCommentForm(article);
}

function renderComments(article) {
    const commentsList = document.getElementById('commentsList');
    const commentCount = document.getElementById('commentCount');

    if (!commentsList) return;

    // Update comment count
    if (commentCount) {
        commentCount.textContent = `(${article.comments.length})`;
    }

    if (article.comments.length === 0) {
        commentsList.innerHTML = `
            <div class="no-comments">
                <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
        `;
        return;
    }

    commentsList.innerHTML = article.comments.map(comment => `
        <div class="comment" data-comment-id="${comment.id}">
            <div class="comment-header">
                <div class="comment-author-avatar">${getInitials(comment.name)}</div>
                <div class="comment-author-info">
                    <span class="comment-author-name">${escapeHtml(comment.name)}</span>
                    ${comment.title ? `<span class="comment-author-title">${escapeHtml(comment.title)}</span>` : ''}
                </div>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <div class="comment-body">
                <p>${escapeHtml(comment.text)}</p>
            </div>
            <div class="comment-actions">
                <button class="comment-action like-comment" data-comment-id="${comment.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span>${comment.likes}</span>
                </button>
                <button class="comment-action reply-comment" data-comment-id="${comment.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    Reply
                </button>
            </div>
        </div>
    `).join('');
}

function initCommentForm(article) {
    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('commenterName');
        const titleInput = document.getElementById('commenterTitle');
        const textInput = document.getElementById('commentText');

        const name = nameInput.value.trim();
        const title = titleInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert('Please fill in your name and comment.');
            return;
        }

        const newComment = dataManager.addComment(article.id, {
            name: name,
            title: title || null,
            text: text
        });

        if (newComment) {
            // Refresh article data and re-render comments
            const updatedArticle = dataManager.getArticle(article.id);
            renderComments(updatedArticle);

            // Clear form
            form.reset();

            // Show success message
            showNotification('Your comment has been posted!');
        }
    });
}

/**
 * Modals
 */
function initModals(article) {
    // Subscribe Modal
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeModal = document.getElementById('subscribeModal');
    const modalClose = document.getElementById('modalClose');

    if (subscribeBtn && subscribeModal) {
        subscribeBtn.addEventListener('click', () => subscribeModal.classList.add('active'));
    }

    if (modalClose && subscribeModal) {
        modalClose.addEventListener('click', () => subscribeModal.classList.remove('active'));
    }

    if (subscribeModal) {
        subscribeModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    }

    // Share Modal
    const shareModal = document.getElementById('shareModal');
    const shareModalClose = document.getElementById('shareModalClose');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const articleUrlInput = document.getElementById('articleUrl');

    if (shareModalClose && shareModal) {
        shareModalClose.addEventListener('click', () => shareModal.classList.remove('active'));
    }

    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });

        // Set article URL
        if (articleUrlInput) {
            articleUrlInput.value = window.location.href;
        }
    }

    // Copy link button
    if (copyLinkBtn && articleUrlInput) {
        copyLinkBtn.addEventListener('click', function() {
            articleUrlInput.select();
            document.execCommand('copy');
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = 'Copy Link';
            }, 2000);
        });
    }

    // Social share buttons
    initShareButtons(article);

    // Subscribe form
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            if (subscribeModal) subscribeModal.classList.remove('active');
            this.reset();
        });
    }
}

/**
 * Share Buttons
 */
function initShareButtons(article) {
    const shareTwitter = document.getElementById('shareTwitter');
    const shareLinkedIn = document.getElementById('shareLinkedIn');
    const shareEmail = document.getElementById('shareEmail');

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);

    if (shareTwitter) {
        shareTwitter.addEventListener('click', function() {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        });
    }

    if (shareLinkedIn) {
        shareLinkedIn.addEventListener('click', function() {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        });
    }

    if (shareEmail) {
        shareEmail.addEventListener('click', function() {
            window.location.href = `mailto:?subject=${title}&body=Check out this article: ${decodeURIComponent(url)}`;
        });
    }
}

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
 * Notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
