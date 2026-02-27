const express = require('express');
const router = express.Router();
const PartnerCategory = require('../models/PartnerCategory');
const { authMiddleware } = require('../middleware/auth');

// GET /api/admin/partners - Get all categories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await PartnerCategory.find()
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/admin/partners/:id - Get single category
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await PartnerCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/admin/partners - Create new category
router.post('/', authMiddleware, async (req, res) => {
  try {
    const category = new PartnerCategory(req.body);
    await category.save();
    
    res.status(201).json({ success: true, message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/partners/:id - Update category
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await PartnerCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/partners/:id - Delete category
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await PartnerCategory.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
