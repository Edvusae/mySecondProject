// ========================================
// BLOG PAGE RENDERING LOGIC
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // BLOG POST RENDERING
    // ========================================
    
    const blogPostsContainer = document.getElementById('blogPostsContainer');
    const noPostsMessage = document.getElementById('noPosts');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const API_BASE_URL = 'https://your-url.onrender.com/api';
    let blogPosts = [];
    
    /**
     * Render blog posts to the DOM
     * @param {Array} posts - Array of blog post objects
     */
    function renderBlogPosts(posts) {
        // Show/hide no posts message
        if (posts.length === 0) {
            blogPostsContainer.style.display = 'none';
            noPostsMessage.style.display = 'block';
            return;
        }
        
        blogPostsContainer.style.display = 'grid';
        noPostsMessage.style.display = 'none';
        
        // Generate HTML for each post
        const postsHTML = posts.map(post => {
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            return `
                <article class="blog-post-card" data-category="${post.category}">
                    <div class="blog-post-image">
                        <img src="${post.image}" alt="${post.title}" loading="lazy">
                        <span class="blog-post-category">${post.category}</span>
                    </div>
                    <div class="blog-post-content">
                        <div class="blog-post-meta">
                            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                            <span><i class="far fa-clock"></i> ${post.readTime}</span>
                        </div>
                        <h2>${post.title}</h2>
                        <p>${post.excerpt}</p>
                        <a href="#post-${post.id}" onclick="viewPost(${post.id})" class="read-more-btn">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join('');
        
        blogPostsContainer.innerHTML = postsHTML;
        
        // Animate in
        setTimeout(() => {
            document.querySelectorAll('.blog-post-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                }, index * 100);
            });
        }, 10);
    }
    
    /**
     * Filter posts by category
     * @param {string} category - Category to filter by
     */
    function filterByCategory(category) {
        const filteredPosts = category === 'all' 
            ? blogPosts 
            : blogPosts.filter(post => post.category === category);
        
        renderBlogPosts(filteredPosts);
    }
    
    // ========================================
    // CATEGORY FILTER BUTTONS
    // ========================================
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // ========================================
    // NEWSLETTER FORM HANDLER
    // ========================================
    
    const newsletterForm = document.querySelector('.newsletter-subscribe-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // For now, just show success message
            // In production, you'd send this to your email service
            alert(`Thanks for subscribing! We'll send web dev tips to ${email}`);
            
            // Reset form
            emailInput.value = '';
            
            // Optional: Send to your backend or email service
            // sendToEmailService(email);
        });
    }
    
    // ========================================
    // VIEW INDIVIDUAL POST
    // ========================================
    
    window.viewPost = function(postId) {
        const post = blogPosts.find(p => p.id === postId);
        
        if (!post) {
            console.error('Post not found');
            return;
        }
        
        // For now, scroll to top and show alert
        // In production, you'd create a blog-post.html page or modal
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Simple implementation: Show post in a modal or alert
        alert(`Post: ${post.title}
        
Category: ${post.category}
Date: ${post.date}
Read Time: ${post.readTime}

${post.excerpt}

---

To fully implement this, create a blog-post.html page that displays full post content.`);
        
        // TODO: Implement full post view
        // window.location.href = `blog-post.html?id=${postId}`;
    };
    
    // ========================================
    // SEARCH FUNCTIONALITY (Optional)
    // ========================================
    
    const searchInput = document.getElementById('blogSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                renderBlogPosts(blogPosts);
                return;
            }
            
            const searchResults = blogPosts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
            
            renderBlogPosts(searchResults);
        });
    }
    
    // ========================================
    // INITIAL RENDER
    // ========================================
    
    // Sort posts by date (newest first) and render
    const sortedPosts = [...blogPosts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    renderBlogPosts(sortedPosts);
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    setTimeout(() => {
        document.querySelectorAll('.blog-post-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format date to readable string
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Calculate reading time
 * @param {string} content - Post content
 * @returns {string} Reading time
 */
function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}