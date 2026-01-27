/**
 * MedPub - Article Creation Script
 * Handles article editor, preview, and publishing
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initEditor();
    initToolbar();
    initSidebar();
    initImageUpload();
    initFileUpload();
    initReferences();
    initPreview();
    initPublish();
    initAutoSave();
});

// References storage
let references = [];

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
 * Rich Text Editor
 */
function initEditor() {
    const editor = document.getElementById('contentEditor');
    if (!editor) return;

    // Track word count and reading time
    editor.addEventListener('input', updateWordCount);

    // Handle paste to strip formatting
    editor.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    });

    // Initial word count
    updateWordCount();
}

function updateWordCount() {
    const editor = document.getElementById('contentEditor');
    const wordCountEl = document.getElementById('wordCount');
    const readingTimeEl = document.getElementById('readingTime');

    if (!editor) return;

    const text = editor.innerText || editor.textContent;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    if (wordCountEl) {
        wordCountEl.textContent = wordCount;
    }

    if (readingTimeEl) {
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));
        readingTimeEl.textContent = readingTime;
    }
}

/**
 * Formatting Toolbar
 */
function initToolbar() {
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');

    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const command = this.dataset.command;
            executeCommand(command);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    executeCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    executeCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    executeCommand('underline');
                    break;
            }
        }
    });
}

function executeCommand(command) {
    const editor = document.getElementById('contentEditor');
    editor.focus();

    switch (command) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'italic':
            document.execCommand('italic', false, null);
            break;
        case 'underline':
            document.execCommand('underline', false, null);
            break;
        case 'h2':
            document.execCommand('formatBlock', false, '<h2>');
            break;
        case 'h3':
            document.execCommand('formatBlock', false, '<h3>');
            break;
        case 'ul':
            document.execCommand('insertUnorderedList', false, null);
            break;
        case 'ol':
            document.execCommand('insertOrderedList', false, null);
            break;
        case 'quote':
            document.execCommand('formatBlock', false, '<blockquote>');
            break;
        case 'link':
            openLinkModal();
            break;
        case 'image':
            insertImagePlaceholder();
            break;
        case 'reference':
            openReferenceModal();
            break;
    }

    updateWordCount();
}

/**
 * Link Modal
 */
function openLinkModal() {
    const modal = document.getElementById('linkModal');
    if (modal) {
        modal.classList.add('active');

        // Get selected text
        const selection = window.getSelection();
        const linkTextInput = document.getElementById('linkText');
        if (selection.toString() && linkTextInput) {
            linkTextInput.value = selection.toString();
        }
    }
}

function initLinkModal() {
    const linkModal = document.getElementById('linkModal');
    const linkModalClose = document.getElementById('linkModalClose');
    const linkForm = document.getElementById('linkForm');

    if (linkModalClose && linkModal) {
        linkModalClose.addEventListener('click', () => {
            linkModal.classList.remove('active');
        });
    }

    if (linkModal) {
        linkModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    }

    if (linkForm) {
        linkForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const linkText = document.getElementById('linkText').value.trim();
            const linkUrl = document.getElementById('linkUrl').value.trim();

            if (linkUrl) {
                const editor = document.getElementById('contentEditor');
                editor.focus();

                const text = linkText || linkUrl;
                const html = `<a href="${escapeHtml(linkUrl)}" target="_blank">${escapeHtml(text)}</a>`;
                document.execCommand('insertHTML', false, html);
            }

            linkModal.classList.remove('active');
            this.reset();
        });
    }
}

function insertImagePlaceholder() {
    const editor = document.getElementById('contentEditor');
    editor.focus();

    const placeholder = `
        <figure class="figure">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23f1f5f9' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a0aec0' font-family='system-ui' font-size='24'%3EImage Placeholder%3C/text%3E%3C/svg%3E" alt="Image placeholder">
            <figcaption>Add image caption here</figcaption>
        </figure>
    `;
    document.execCommand('insertHTML', false, placeholder);
}

/**
 * Sidebar
 */
function initSidebar() {
    // Load saved draft if exists
    loadDraft();
    initLinkModal();
}

/**
 * Image Upload
 */
function initImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const coverImage = document.getElementById('coverImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const removeImage = document.getElementById('removeImage');

    if (imageUpload && coverImage) {
        imageUpload.addEventListener('click', () => coverImage.click());

        coverImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    uploadPlaceholder.style.display = 'none';
                    uploadPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removeImage) {
        removeImage.addEventListener('click', function(e) {
            e.stopPropagation();
            coverImage.value = '';
            previewImage.src = '';
            uploadPlaceholder.style.display = 'block';
            uploadPreview.style.display = 'none';
        });
    }
}

/**
 * File Upload (PDF/Documents)
 */
function initFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const pdfUpload = document.getElementById('pdfUpload');
    const pdfPlaceholder = document.getElementById('pdfPlaceholder');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const removeFile = document.getElementById('removeFile');

    if (fileUpload && pdfUpload) {
        fileUpload.addEventListener('click', () => pdfUpload.click());

        pdfUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = file.name;
                pdfPlaceholder.style.display = 'none';
                fileInfo.style.display = 'flex';
            }
        });
    }

    if (removeFile) {
        removeFile.addEventListener('click', function(e) {
            e.stopPropagation();
            pdfUpload.value = '';
            fileName.textContent = '';
            pdfPlaceholder.style.display = 'block';
            fileInfo.style.display = 'none';
        });
    }
}

/**
 * References
 */
function initReferences() {
    const addReferenceBtn = document.getElementById('addReferenceBtn');
    const referenceModal = document.getElementById('referenceModal');
    const refModalClose = document.getElementById('refModalClose');
    const referenceForm = document.getElementById('referenceForm');

    if (addReferenceBtn) {
        addReferenceBtn.addEventListener('click', () => openReferenceModal());
    }

    if (refModalClose && referenceModal) {
        refModalClose.addEventListener('click', () => {
            referenceModal.classList.remove('active');
        });
    }

    if (referenceModal) {
        referenceModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    }

    if (referenceForm) {
        referenceForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const reference = {
                type: document.getElementById('refType').value,
                authors: document.getElementById('refAuthors').value.trim(),
                title: document.getElementById('refTitle').value.trim(),
                source: document.getElementById('refSource').value.trim(),
                year: document.getElementById('refYear').value.trim(),
                volume: document.getElementById('refVolume').value.trim(),
                doi: document.getElementById('refDOI').value.trim()
            };

            if (reference.title) {
                references.push(reference);
                renderReferences();
                referenceModal.classList.remove('active');
                this.reset();
            }
        });
    }
}

function openReferenceModal() {
    const modal = document.getElementById('referenceModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function renderReferences() {
    const referencesList = document.getElementById('referencesList');
    if (!referencesList) return;

    if (references.length === 0) {
        referencesList.innerHTML = '';
        return;
    }

    referencesList.innerHTML = references.map((ref, index) => {
        let citation = '';
        if (ref.authors) citation += `${escapeHtml(ref.authors)}. `;
        citation += `${escapeHtml(ref.title)}. `;
        if (ref.source) citation += `<em>${escapeHtml(ref.source)}</em>. `;
        if (ref.year) citation += `${escapeHtml(ref.year)}`;
        if (ref.volume) citation += `; ${escapeHtml(ref.volume)}`;
        if (ref.doi) citation += `. DOI: ${escapeHtml(ref.doi)}`;

        return `
            <div class="reference-item" data-index="${index}">
                <span class="reference-number">[${index + 1}]</span>
                <span class="reference-text">${citation}</span>
                <button class="reference-remove" onclick="removeReference(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

function removeReference(index) {
    references.splice(index, 1);
    renderReferences();
}

// Make removeReference globally available
window.removeReference = removeReference;

/**
 * Preview
 */
function initPreview() {
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const previewClose = document.getElementById('previewClose');
    const closePreviewBtn = document.getElementById('closePreviewBtn');

    if (previewBtn) {
        previewBtn.addEventListener('click', showPreview);
    }

    if (previewClose && previewModal) {
        previewClose.addEventListener('click', () => previewModal.classList.remove('active'));
    }

    if (closePreviewBtn && previewModal) {
        closePreviewBtn.addEventListener('click', () => previewModal.classList.remove('active'));
    }

    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    }
}

function showPreview() {
    const previewModal = document.getElementById('previewModal');
    const previewBody = document.getElementById('previewBody');

    if (!previewModal || !previewBody) return;

    const articleData = gatherArticleData();

    previewBody.innerHTML = `
        <div class="preview-article">
            <span class="article-category">${getCategoryLabel(articleData.category) || 'Category'}</span>
            <h1 style="font-family: 'Merriweather', Georgia, serif; font-size: 2rem; margin: 1rem 0;">${escapeHtml(articleData.title) || 'Untitled Article'}</h1>
            ${articleData.subtitle ? `<p style="font-size: 1.25rem; color: #4a5568; margin-bottom: 1.5rem;">${escapeHtml(articleData.subtitle)}</p>` : ''}
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div style="width: 40px; height: 40px; background: #e6f0fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0066cc; font-weight: 600;">
                    ${articleData.authorName ? getInitials(articleData.authorName) : 'AU'}
                </div>
                <div>
                    <div style="font-weight: 600;">${escapeHtml(articleData.authorName) || 'Author Name'}</div>
                    <div style="font-size: 0.875rem; color: #718096;">${escapeHtml(articleData.authorTitle) || ''}</div>
                </div>
            </div>
            <div class="article-body" style="font-family: 'Merriweather', Georgia, serif; line-height: 1.8;">
                ${articleData.content || '<p>Start writing your article content...</p>'}
            </div>
            ${references.length > 0 ? `
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <h3 style="font-size: 1rem; margin-bottom: 1rem;">References</h3>
                    ${references.map((ref, i) => `<p style="font-size: 0.875rem; color: #4a5568; margin-bottom: 0.5rem;">[${i + 1}] ${escapeHtml(ref.authors)} ${escapeHtml(ref.title)}. ${escapeHtml(ref.source)} ${escapeHtml(ref.year)}</p>`).join('')}
                </div>
            ` : ''}
        </div>
    `;

    previewModal.classList.add('active');
}

/**
 * Publish
 */
function initPublish() {
    const publishBtn = document.getElementById('publishBtn');
    const publishFromPreviewBtn = document.getElementById('publishFromPreviewBtn');

    if (publishBtn) {
        publishBtn.addEventListener('click', publishArticle);
    }

    if (publishFromPreviewBtn) {
        publishFromPreviewBtn.addEventListener('click', publishArticle);
    }
}

function gatherArticleData() {
    return {
        title: document.getElementById('articleTitle')?.value?.trim() || '',
        subtitle: document.getElementById('articleSubtitle')?.value?.trim() || '',
        category: document.getElementById('articleCategory')?.value || '',
        type: document.getElementById('articleType')?.value || 'article',
        tags: (document.getElementById('articleTags')?.value || '').split(',').map(t => t.trim()).filter(t => t),
        authorName: document.getElementById('authorName')?.value?.trim() || '',
        authorTitle: document.getElementById('authorTitle')?.value?.trim() || '',
        authorAffiliation: document.getElementById('authorAffiliation')?.value?.trim() || '',
        authorBio: document.getElementById('authorBio')?.value?.trim() || '',
        content: document.getElementById('contentEditor')?.innerHTML || ''
    };
}

function publishArticle() {
    const articleData = gatherArticleData();

    // Validation
    if (!articleData.title) {
        alert('Please enter an article title.');
        document.getElementById('articleTitle')?.focus();
        return;
    }

    if (!articleData.category) {
        alert('Please select a category.');
        document.getElementById('articleCategory')?.focus();
        return;
    }

    if (!articleData.authorName) {
        alert('Please enter your name.');
        document.getElementById('authorName')?.focus();
        return;
    }

    const content = document.getElementById('contentEditor')?.innerText?.trim() || '';
    if (content.length < 100) {
        alert('Please write at least 100 characters of content.');
        document.getElementById('contentEditor')?.focus();
        return;
    }

    // Calculate reading time
    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    // Create article object
    const newArticle = {
        title: articleData.title,
        subtitle: articleData.subtitle,
        category: articleData.category,
        type: articleData.type,
        author: {
            name: articleData.authorName,
            title: articleData.authorTitle,
            affiliation: articleData.authorAffiliation,
            bio: articleData.authorBio
        },
        readingTime: readingTime,
        tags: articleData.tags,
        excerpt: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
        content: articleData.content
    };

    // Save article
    const savedArticle = dataManager.addArticle(newArticle);

    // Clear draft
    localStorage.removeItem('medpub_draft');

    // Show success modal
    const successModal = document.getElementById('successModal');
    const viewArticleBtn = document.getElementById('viewArticleBtn');

    if (successModal) {
        // Close preview modal if open
        const previewModal = document.getElementById('previewModal');
        if (previewModal) previewModal.classList.remove('active');

        successModal.classList.add('active');

        if (viewArticleBtn) {
            viewArticleBtn.href = `article.html?id=${savedArticle.id}`;
        }
    }
}

/**
 * Auto-save
 */
function initAutoSave() {
    const saveInterval = 30000; // 30 seconds
    let autoSaveTimer;

    const fieldsToWatch = [
        'articleTitle', 'articleSubtitle', 'articleCategory', 'articleType',
        'articleTags', 'authorName', 'authorTitle', 'authorAffiliation',
        'authorBio', 'contentEditor'
    ];

    fieldsToWatch.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', debounce(saveDraft, 2000));
        }
    });

    // Periodic auto-save
    autoSaveTimer = setInterval(saveDraft, saveInterval);

    // Save before leaving
    window.addEventListener('beforeunload', saveDraft);
}

function saveDraft() {
    const draft = {
        ...gatherArticleData(),
        savedAt: new Date().toISOString()
    };

    localStorage.setItem('medpub_draft', JSON.stringify(draft));

    // Update status
    const autoSaveStatus = document.getElementById('autoSaveStatus');
    if (autoSaveStatus) {
        autoSaveStatus.textContent = 'Draft saved';
        setTimeout(() => {
            autoSaveStatus.textContent = 'All changes saved';
        }, 2000);
    }
}

function loadDraft() {
    const draft = localStorage.getItem('medpub_draft');
    if (!draft) return;

    const data = JSON.parse(draft);

    // Restore fields
    if (data.title) setValue('articleTitle', data.title);
    if (data.subtitle) setValue('articleSubtitle', data.subtitle);
    if (data.category) setValue('articleCategory', data.category);
    if (data.type) setValue('articleType', data.type);
    if (data.tags) setValue('articleTags', data.tags.join(', '));
    if (data.authorName) setValue('authorName', data.authorName);
    if (data.authorTitle) setValue('authorTitle', data.authorTitle);
    if (data.authorAffiliation) setValue('authorAffiliation', data.authorAffiliation);
    if (data.authorBio) setValue('authorBio', data.authorBio);
    if (data.content) {
        const editor = document.getElementById('contentEditor');
        if (editor) editor.innerHTML = data.content;
    }

    updateWordCount();
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
