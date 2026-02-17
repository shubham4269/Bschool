const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { authMiddleware } = require('../middleware/auth');

// GET hero slider images (public)
router.get('/hero-images', async (req, res) => {
    try {
        const settings = await Settings.findOne({ key: 'heroSliderImages' });
        res.json({ 
            success: true, 
            images: settings?.value || [] 
        });
    } catch (error) {
        console.error('Error fetching hero images:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// UPDATE hero slider images (admin)
router.put('/hero-images', authMiddleware, async (req, res) => {
    try {
        const { images } = req.body;
        
        const settings = await Settings.findOneAndUpdate(
            { key: 'heroSliderImages' },
            { value: images },
            { upsert: true, new: true }
        );
        
        console.log('✅ Hero slider images updated');
        res.json({ success: true, settings });
    } catch (error) {
        console.error('Error updating hero images:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
