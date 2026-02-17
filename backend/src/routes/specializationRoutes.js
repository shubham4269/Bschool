const express = require('express');
const router = express.Router();
const Specialization = require('../models/Specialization');
const { authMiddleware } = require('../middleware/auth');

// ===== PUBLIC ROUTES =====

// GET /api/specializations — Get all active specializations (public)
router.get('/', async (req, res) => {
    try {
        const specializations = await Specialization.find({ isActive: true }).sort({ sortOrder: 1 });
        res.json({ success: true, specializations });
    } catch (error) {
        console.error('Error fetching specializations:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// GET /api/specializations/:slug — Get single specialization by slug (public)
router.get('/:slug', async (req, res) => {
    try {
        const specialization = await Specialization.findOne({ slug: req.params.slug, isActive: true });
        if (!specialization) {
            return res.status(404).json({ success: false, message: 'Specialization not found.' });
        }
        res.json({ success: true, specialization });
    } catch (error) {
        console.error('Error fetching specialization:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// ===== ADMIN ROUTES (protected) =====

// GET /api/specializations/admin/all — Get all specializations including inactive (admin)
router.get('/admin/all', authMiddleware, async (req, res) => {
    try {
        const specializations = await Specialization.find().sort({ sortOrder: 1 });
        res.json({ success: true, specializations });
    } catch (error) {
        console.error('Error fetching all specializations:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// POST /api/specializations — Create new specialization (admin)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const specialization = new Specialization(req.body);
        await specialization.save();
        console.log(`✅ Specialization created: ${specialization.title}`);
        res.status(201).json({ success: true, specialization });
    } catch (error) {
        console.error('Error creating specialization:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A specialization with this slug already exists.' });
        }
        res.status(500).json({ success: false, message: error.message || 'Server error.' });
    }
});

// PUT /api/specializations/:id — Update specialization (admin)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const specialization = await Specialization.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!specialization) {
            return res.status(404).json({ success: false, message: 'Specialization not found.' });
        }
        console.log(`✏️ Specialization updated: ${specialization.title}`);
        res.json({ success: true, specialization });
    } catch (error) {
        console.error('Error updating specialization:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A specialization with this slug already exists.' });
        }
        res.status(500).json({ success: false, message: error.message || 'Server error.' });
    }
});

// DELETE /api/specializations/:id — Delete specialization (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const specialization = await Specialization.findByIdAndDelete(req.params.id);
        if (!specialization) {
            return res.status(404).json({ success: false, message: 'Specialization not found.' });
        }
        console.log(`🗑️ Specialization deleted: ${specialization.title}`);
        res.json({ success: true, message: 'Specialization deleted successfully.' });
    } catch (error) {
        console.error('Error deleting specialization:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
