const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authMiddleware } = require('../middleware/auth');

// ===== PUBLIC ROUTES =====

// GET /api/services — Get all active services (public)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ sortOrder: 1 });
        res.json({ success: true, services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// GET /api/services/:slug — Get single service by slug (public)
router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug, isActive: true });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found.' });
        }
        res.json({ success: true, service });
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// ===== ADMIN ROUTES (protected) =====

// GET /api/services/admin/all — Get all services including inactive (admin)
router.get('/admin/all', authMiddleware, async (req, res) => {
    try {
        const services = await Service.find().sort({ sortOrder: 1 });
        res.json({ success: true, services });
    } catch (error) {
        console.error('Error fetching all services:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// POST /api/services — Create new service (admin)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        console.log(`✅ Service created: ${service.title}`);
        res.status(201).json({ success: true, service });
    } catch (error) {
        console.error('Error creating service:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A service with this slug already exists.' });
        }
        res.status(500).json({ success: false, message: error.message || 'Server error.' });
    }
});

// PUT /api/services/:id — Update service (admin)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found.' });
        }
        console.log(`✏️ Service updated: ${service.title}`);
        res.json({ success: true, service });
    } catch (error) {
        console.error('Error updating service:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A service with this slug already exists.' });
        }
        res.status(500).json({ success: false, message: error.message || 'Server error.' });
    }
});

// DELETE /api/services/:id — Delete service (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found.' });
        }
        console.log(`🗑️ Service deleted: ${service.title}`);
        res.json({ success: true, message: 'Service deleted successfully.' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
