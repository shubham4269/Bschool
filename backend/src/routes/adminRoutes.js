const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { authMiddleware, generateToken } = require('../middleware/auth');

// POST /api/admin/login — Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required.',
            });
        }

        const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        const token = generateToken(admin._id, admin.username);

        console.log(`🔐 Admin logged in: ${admin.username}`);

        res.json({
            success: true,
            message: 'Login successful!',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// POST /api/admin/verify — Verify token is still valid
router.post('/verify', authMiddleware, (req, res) => {
    res.json({ success: true, admin: req.admin });
});

module.exports = router;
