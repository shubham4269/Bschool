const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blog - Get all published blogs with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    
    const query = { isPublished: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content');
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalBlogs: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/blog/featured - Get featured blog
router.get('/featured', async (req, res) => {
  try {
    const featuredBlog = await Blog.findOne({ 
      isFeatured: true, 
      isPublished: true 
    }).select('-content');
    
    res.json(featuredBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/blog/:slug - Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Get related articles (same category, exclude current)
    const relatedBlogs = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true
    })
    .limit(3)
    .select('-content');
    
    res.json({ blog, relatedBlogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
