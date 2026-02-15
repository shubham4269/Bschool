const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { authMiddleware } = require('../middleware/auth');

// All routes here require authentication
router.use(authMiddleware);

// GET /api/leads — Fetch all leads
router.get('/', async (req, res) => {
    try {
        const { status, search } = req.query;

        const query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            const q = search.trim();
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { phone: { $regex: q, $options: 'i' } },
                { course: { $regex: q, $options: 'i' } },
            ];
        }

        const leads = await Lead.find(query).sort({ createdAt: -1 });
        const total = await Lead.countDocuments();

        res.json({
            success: true,
            count: leads.length,
            total,
            leads: leads.map((l) => l.toJSON()),
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// GET /api/leads/stats — Dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const total = await Lead.countDocuments();
        const newCount = await Lead.countDocuments({ status: 'new' });
        const contacted = await Lead.countDocuments({ status: 'contacted' });
        const converted = await Lead.countDocuments({ status: 'converted' });
        const closed = await Lead.countDocuments({ status: 'closed' });

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const today = await Lead.countDocuments({ createdAt: { $gte: todayStart } });

        const byCourseAgg = await Lead.aggregate([
            { $group: { _id: '$course', count: { $sum: 1 } } },
        ]);
        const byCourse = {};
        byCourseAgg.forEach((item) => {
            byCourse[item._id || 'Not specified'] = item.count;
        });

        res.json({
            success: true,
            stats: { total, new: newCount, contacted, converted, closed, today },
            byCourse,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// PATCH /api/leads/:id — Update lead status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const lead = await Lead.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found.' });
        }

        res.json({
            success: true,
            message: 'Lead updated successfully.',
            lead: lead.toJSON(),
        });
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// DELETE /api/leads/:id — Delete a lead
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found.' });
        }

        res.json({ success: true, message: 'Lead deleted successfully.' });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
