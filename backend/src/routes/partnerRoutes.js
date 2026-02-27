const express = require('express');
const router = express.Router();
const PartnerCategory = require('../models/PartnerCategory');

// GET /api/partners - Get all partner categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await PartnerCategory.find()
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/partners/homepage - Get categories for homepage
router.get('/homepage', async (req, res) => {
  try {
    const categories = await PartnerCategory.find({ showOnHomepage: true })
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
