require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const seedAdmin = require('./src/config/seed');

// Route imports
const leadRoutes = require('./src/routes/leadRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const adminLeadRoutes = require('./src/routes/adminLeadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);         // Public: POST /api/leads
app.use('/api/admin', adminRoutes);        // Public: POST /api/admin/login, /api/admin/verify
app.use('/api/leads', adminLeadRoutes);    // Protected: GET, PATCH, DELETE /api/leads

// Start server
async function startServer() {
    try {
        await connectDB();
        await seedAdmin();

        app.listen(PORT, () => {
            console.log(`\n🚀 Bschool Bridge Backend running on http://localhost:${PORT}`);
            console.log(`📋 Leads API: http://localhost:${PORT}/api/leads`);
            console.log(`📊 Stats API: http://localhost:${PORT}/api/leads/stats`);
            console.log(`🔐 Admin Login: POST http://localhost:${PORT}/api/admin/login\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.error('\n💡 Make sure MongoDB is running and .env is configured.');
        process.exit(1);
    }
}

startServer();
