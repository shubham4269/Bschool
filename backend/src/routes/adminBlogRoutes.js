const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { authMiddleware } = require('../middleware/auth');

// GET /api/admin/blogs - Get all blogs (including unpublished)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content');
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/blogs/:id - Get single blog by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/blogs - Create new blog
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Creating blog with data:', req.body);
    const blog = new Blog(req.body);
    await blog.save();
    
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/blogs/:id - Update blog
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/blogs/:id - Delete blog
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/admin/blogs/:id/publish - Toggle publish status
router.patch('/:id/publish', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    blog.isPublished = !blog.isPublished;
    await blog.save();
    
    res.json({ 
      message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`, 
      blog 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/admin/blogs/:id/feature - Toggle featured status
router.patch('/:id/feature', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // If setting as featured, unfeatured all others
    if (!blog.isFeatured) {
      await Blog.updateMany({}, { isFeatured: false });
    }
    
    blog.isFeatured = !blog.isFeatured;
    await blog.save();
    
    res.json({ 
      message: `Blog ${blog.isFeatured ? 'featured' : 'unfeatured'} successfully`, 
      blog 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
