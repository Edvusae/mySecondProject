// ========================================
// ADMIN DASHBOARD JAVASCRIPT
// ========================================

// API Configuration
const API_BASE_URL = 'https://your-url.onrender.com/api'; // Change for production
let allPosts = [];
let currentEditId = null;
let deletePostId = null;

// ========================================
// AUTHENTICATION CHECK
// ========================================

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    if (!isLoggedIn || !loginTime) {
        window.location.href = 'login.html';
        return false;
    }
    
    // Check if session expired (24 hours)
    const now = Date.now();
    const elapsed = now - parseInt(loginTime);
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (elapsed > oneDay) {
        logout();
        return false;
    }
    
    return true;
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    window.location.href = 'login.html';
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    loadPosts();
    setupFormSubmit();
});

// ========================================
// LOAD POSTS
// ========================================

async function loadPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        const result = await response.json();
        
        if (result.success) {
            allPosts = result.data;
            displayPosts(allPosts);
            updateStats(allPosts);
        } else {
            showError('Failed to load posts');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('Failed to connect to server');
    }
}

// ========================================
// DISPLAY POSTS
// ========================================

function displayPosts(posts) {
    const container = document.getElementById('postsTable');
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No blog posts found. Create your first post!</p>
            </div>
        `;
        return;
    }
    
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Read Time</th>
                    <th>Featured</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${posts.map(post => `
                    <tr>
                        <td class="post-title-cell">${post.title}</td>
                        <td>
                            <span class="post-category category-${post.category}">
                                ${post.category}
                            </span>
                        </td>
                        <td>${formatDate(post.date)}</td>
                        <td>${post.readTime}</td>
                        <td>
                            ${post.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : '-'}
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button onclick="editPost('${post._id}')" class="btn-edit">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button onclick="showDeleteModal('${post._id}')" class="btn-delete">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;
}

// ========================================
// UPDATE STATS
// ========================================

function updateStats(posts) {
    const totalPosts = posts.length;
    const featuredPosts = posts.filter(p => p.featured).length;
    const recentPosts = posts.filter(p => {
        const postDate = new Date(p.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return postDate >= thirtyDaysAgo;
    }).length;
    
    document.getElementById('totalPosts').textContent = totalPosts;
    document.getElementById('featuredPosts').textContent = featuredPosts;
    document.getElementById('draftPosts').textContent = recentPosts;
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function searchPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        displayPosts(allPosts);
        return;
    }
    
    const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
    );
    
    displayPosts(filtered);
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function showCreateModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Create New Post';
    document.getElementById('submitBtnText').textContent = 'Create Post';
    document.getElementById('postForm').reset();
    document.getElementById('postId').value = '';
    document.getElementById('postModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('postModal').style.display = 'none';
}

function showDeleteModal(postId) {
    deletePostId = postId;
    document.getElementById('deleteModal').style.display = 'block';
}

function closeDeleteModal() {
    deletePostId = null;
    document.getElementById('deleteModal').style.display = 'none';
}

// ========================================
// EDIT POST
// ========================================

async function editPost(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        const result = await response.json();
        
        if (result.success) {
            const post = result.data;
            currentEditId = postId;
            
            document.getElementById('modalTitle').textContent = 'Edit Post';
            document.getElementById('submitBtnText').textContent = 'Update Post';
            document.getElementById('postId').value = post._id;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postCategory').value = post.category;
            document.getElementById('postReadTime').value = post.readTime;
            document.getElementById('postExcerpt').value = post.excerpt;
            document.getElementById('postTags').value = post.tags.join(', ');
            document.getElementById('postImage').value = post.image;
            document.getElementById('postFeatured').checked = post.featured;
            
            document.getElementById('postModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading post:', error);
        showError('Failed to load post details');
    }
}

// ========================================
// FORM SUBMIT
// ========================================

function setupFormSubmit() {
    document.getElementById('postForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const postData = {
            title: document.getElementById('postTitle').value,
            category: document.getElementById('postCategory').value,
            readTime: document.getElementById('postReadTime').value,
            excerpt: document.getElementById('postExcerpt').value,
            tags: document.getElementById('postTags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag),
            image: document.getElementById('postImage').value,
            featured: document.getElementById('postFeatured').checked,
            author: 'Edwin Tsembegano',
            date: new Date().toISOString()
        };
        
        // Create slug from title
        postData.slug = postData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        try {
            let response;
            const submitBtn = document.querySelector('#postForm button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            
            if (currentEditId) {
                // Update existing post
                response = await fetch(`${API_BASE_URL}/posts/${currentEditId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
            } else {
                // Create new post
                response = await fetch(`${API_BASE_URL}/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
            }
            
            const result = await response.json();
            
            if (result.success) {
                closeModal();
                loadPosts();
                showSuccess(currentEditId ? 'Post updated successfully!' : 'Post created successfully!');
            } else {
                showError(result.error || 'Failed to save post');
            }
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-save"></i> <span id="submitBtnText">${currentEditId ? 'Update' : 'Create'} Post</span>`;
            
        } catch (error) {
            console.error('Error saving post:', error);
            showError('Failed to save post');
        }
    });
}

// ========================================
// DELETE POST
// ========================================

async function confirmDelete() {
    if (!deletePostId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${deletePostId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            closeDeleteModal();
            loadPosts();
            showSuccess('Post deleted successfully!');
        } else {
            showError(result.error || 'Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        showError('Failed to delete post');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showSuccess(message) {
    // Simple alert - can be replaced with toast notification
    alert('✅ ' + message);
}

function showError(message) {
    alert('❌ ' + message);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const postModal = document.getElementById('postModal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (event.target === postModal) {
        closeModal();
    }
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
}