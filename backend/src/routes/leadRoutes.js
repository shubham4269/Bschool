const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST /api/leads — Create a new lead (public — contact form)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, course, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone are required fields.',
            });
        }

        const newLead = await Lead.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            course: course || 'Not specified',
            message: message || '',
        });

        console.log(`✅ New lead received: ${newLead.name} (${newLead.email})`);

        res.status(201).json({
            success: true,
            message: 'Lead submitted successfully!',
            lead: newLead.toJSON(),
        });
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

module.exports = router;
