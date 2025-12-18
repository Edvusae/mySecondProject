// /public/js/blog.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('blogPostsContainer');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    function renderPosts(category = 'all') {
        const filtered = category === 'all' ? blogPosts : blogPosts.filter(p => p.category === category);
        
        container.innerHTML = filtered.map(post => `
            <article class="blog-post-card">
                <div class="blog-post-image">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="blog-post-category">${post.category}</span>
                </div>
                <div class="blog-post-content">
                    <div class="blog-post-meta">
                        <span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h2>${post.title}</h2>
                    <p>${post.excerpt}</p>
                    <a href="blog-post.html?id=${post.id}" class="read-more-btn">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `).join('');
    }
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderPosts(this.dataset.category);
        });
    });
    
    renderPosts();
});