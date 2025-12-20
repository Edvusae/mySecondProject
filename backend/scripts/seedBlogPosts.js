// scripts/seedBlogPosts.js - Migrate existing blog data to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// Blog Post Schema (same as server.js)
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['tutorial', 'guide', 'marketing', 'tips']
  },
  date: { type: Date, default: Date.now },
  readTime: { type: String, required: true },
  author: { type: String, default: 'Edwin Tsembegano' },
  image: { type: String, required: true },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  content: { type: String, required: false },
  slug: { type: String, unique: true, required: true }
}, {
  timestamps: true
});

blogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Your existing blog posts data
const blogPosts = [
  {
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

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing blog posts');
    
    // Insert new posts
    const posts = await BlogPost.insertMany(blogPosts);
    console.log(`✅ Successfully seeded ${posts.length} blog posts!`);
    
    // Display summary
    console.log('\n📊 Summary:');
    console.log(`   Total Posts: ${posts.length}`);
    console.log(`   Featured: ${posts.filter(p => p.featured).length}`);
    console.log(`   Tutorials: ${posts.filter(p => p.category === 'tutorial').length}`);
    console.log(`   Guides: ${posts.filter(p => p.category === 'guide').length}`);
    console.log(`   Marketing: ${posts.filter(p => p.category === 'marketing').length}`);
    console.log(`   Tips: ${posts.filter(p => p.category === 'tips').length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();