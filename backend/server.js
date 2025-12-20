// server.js - Backend API for Blog Posts
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['tutorial', 'guide', 'marketing', 'tips']
  },
  date: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Edwin Tsembegano'
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: false // Full content if needed
  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create slug from title before saving
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

// ============================================
// API ROUTES
// ============================================

// Health Check
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Edwin\'s Blog API is running!',
    endpoints: {
      getAllPosts: 'GET /api/posts',
      getPostById: 'GET /api/posts/:id',
      getPostBySlug: 'GET /api/posts/slug/:slug',
      getPostsByCategory: 'GET /api/posts/category/:category',
      createPost: 'POST /api/posts',
      updatePost: 'PUT /api/posts/:id',
      deletePost: 'DELETE /api/posts/:id'
    }
  });
});

// GET all blog posts (with filtering)
app.get('/api/posts', async (req, res) => {
  try {
    const { category, featured, limit, sort } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Build the query
    let posts = BlogPost.find(query);
    
    // Sort (default: newest first)
    const sortOrder = sort === 'oldest' ? 1 : -1;
    posts = posts.sort({ date: sortOrder });
    
    // Limit results
    if (limit) {
      posts = posts.limit(parseInt(limit));
    }
    
    const results = await posts;
    
    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET post by slug
app.get('/api/posts/slug/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET posts by category
app.get('/api/posts/category/:category', async (req, res) => {
  try {
    const posts = await BlogPost.find({ 
      category: req.params.category 
    }).sort({ date: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST create new blog post
app.post('/api/posts', async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// PUT update blog post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true
      }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE blog post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search posts
app.get('/api/posts/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query required'
      });
    }
    
    const posts = await BlogPost.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }).sort({ date: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/`);
});