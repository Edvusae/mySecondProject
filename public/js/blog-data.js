// ========================================
// BLOG POSTS DATA
// Add new posts to this array
// ========================================

const blogPosts = [
    {
        id: 1,
        title: "10 React Best Practices Every Developer Should Know",
        excerpt: "Essential React patterns and practices that will level up your development skills. From component composition to performance optimization, master these techniques to write cleaner, more maintainable React code.",
        category: "tutorial",
        date: "2025-01-15",
        readTime: "5 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/2c3e50/e67e22?text=React+Best+Practices",
        tags: ["React", "JavaScript", "Best Practices"],
        featured: true
    },
    {
        id: 2,
        title: "TypeScript for React Developers: Complete Guide",
        excerpt: "Master TypeScript with React in this comprehensive guide. Learn type-safe component patterns, hooks typing, and advanced TypeScript features for modern web development.",
        category: "guide",
        date: "2025-01-10",
        readTime: "8 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/e67e22/ffffff?text=TypeScript+Guide",
        tags: ["TypeScript", "React", "Tutorial"],
        featured: true
    },
    {
        id: 3,
        title: "How to Optimize Your Website for Conversions",
        excerpt: "Proven strategies to turn your website visitors into paying customers. Learn about CTA placement, user psychology, and design principles that drive conversions.",
        category: "marketing",
        date: "2025-01-05",
        readTime: "6 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/3498db/ffffff?text=Conversion+Optimization",
        tags: ["Digital Marketing", "CRO", "Web Design"],
        featured: false
    },
    {
        id: 4,
        title: "Next.js 14: Server Components and App Router Explained",
        excerpt: "Deep dive into Next.js 14's revolutionary Server Components and the new App Router. Understand the paradigm shift and how to build faster, more efficient applications.",
        category: "tutorial",
        date: "2024-12-28",
        readTime: "10 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/000000/ffffff?text=Next.js+14",
        tags: ["Next.js", "React", "Server Components"],
        featured: false
    },
    {
        id: 5,
        title: "5 CSS Tricks to Make Your Website Stand Out",
        excerpt: "Modern CSS techniques that will make your websites look professional and engaging. From custom properties to advanced animations, elevate your design game.",
        category: "tips",
        date: "2024-12-20",
        readTime: "4 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/9b59b6/ffffff?text=CSS+Tricks",
        tags: ["CSS", "Web Design", "Frontend"],
        featured: false
    },
    {
        id: 6,
        title: "Building Scalable React Applications: Architecture Guide",
        excerpt: "Learn how to structure large-scale React applications for maintainability and scalability. Explore folder structures, state management patterns, and best practices.",
        category: "guide",
        date: "2024-12-15",
        readTime: "12 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/2ecc71/ffffff?text=React+Architecture",
        tags: ["React", "Architecture", "Best Practices"],
        featured: false
    },
    {
        id: 7,
        title: "The Complete Guide to Google Ads for Small Businesses",
        excerpt: "Everything you need to know about running profitable Google Ads campaigns. From keyword research to optimization strategies, drive qualified traffic to your business.",
        category: "marketing",
        date: "2024-12-10",
        readTime: "7 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/e74c3c/ffffff?text=Google+Ads+Guide",
        tags: ["Google Ads", "PPC", "Marketing"],
        featured: false
    },
    {
        id: 8,
        title: "React Hooks: useState, useEffect, and Custom Hooks",
        excerpt: "Master React Hooks with practical examples and real-world use cases. Learn when and how to use built-in hooks and create your own custom hooks.",
        category: "tutorial",
        date: "2024-12-05",
        readTime: "9 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/f39c12/ffffff?text=React+Hooks",
        tags: ["React", "Hooks", "JavaScript"],
        featured: false
    },
    {
        id: 9,
        title: "Firebase Authentication: Complete Implementation Guide",
        excerpt: "Step-by-step guide to implementing Firebase Authentication in your React app. Cover email/password, Google Sign-In, and protected routes.",
        category: "tutorial",
        date: "2024-11-30",
        readTime: "11 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/ff9800/ffffff?text=Firebase+Auth",
        tags: ["Firebase", "Authentication", "React"],
        featured: false
    },
    {
        id: 10,
        title: "10 JavaScript Array Methods You Should Master",
        excerpt: "Essential JavaScript array methods that every developer should know. From map and filter to reduce and flatMap, write cleaner, more functional code.",
        category: "tips",
        date: "2024-11-25",
        readTime: "5 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/34495e/e67e22?text=JavaScript+Arrays",
        tags: ["JavaScript", "Arrays", "Fundamentals"],
        featured: false
    },
    {
        id: 11,
        title: "SEO Best Practices for React Applications",
        excerpt: "Optimize your React apps for search engines. Learn about server-side rendering, meta tags, sitemaps, and technical SEO for single-page applications.",
        category: "marketing",
        date: "2024-11-20",
        readTime: "8 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/27ae60/ffffff?text=React+SEO",
        tags: ["SEO", "React", "Marketing"],
        featured: false
    },
    {
        id: 12,
        title: "Responsive Design with Tailwind CSS: A Practical Guide",
        excerpt: "Build beautiful, responsive interfaces with Tailwind CSS. Learn the utility-first approach, responsive modifiers, and best practices for modern web design.",
        category: "guide",
        date: "2024-11-15",
        readTime: "7 min",
        author: "Edwin Tsembegano",
        image: "https://placehold.co/600x400/38bdf8/ffffff?text=Tailwind+CSS",
        tags: ["Tailwind", "CSS", "Responsive Design"],
        featured: false
    }
];

// Helper function to get posts by category
function getPostsByCategory(category) {
    if (category === 'all') {
        return blogPosts;
    }
    return blogPosts.filter(post => post.category === category);
}

// Helper function to get featured posts
function getFeaturedPosts(limit = 3) {
    return blogPosts.filter(post => post.featured).slice(0, limit);
}

// Helper function to get latest posts
function getLatestPosts(limit = 3) {
    return blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

// Helper function to get post by ID
function getPostById(id) {
    return blogPosts.find(post => post.id === parseInt(id));
}

// Helper function to search posts
function searchPosts(query) {
    const lowerQuery = query.toLowerCase();
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogPosts,
        getPostsByCategory,
        getFeaturedPosts,
        getLatestPosts,
        getPostById,
        searchPosts
    };
}