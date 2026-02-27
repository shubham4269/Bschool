require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const seedAdmin = require('./src/config/seed');
const seedServicesAndSpecializations = require('./src/config/seedData');

// Load Cloudinary config after dotenv
require('./src/config/cloudinary');

// Route imports
const leadRoutes = require('./src/routes/leadRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const adminLeadRoutes = require('./src/routes/adminLeadRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const specializationRoutes = require('./src/routes/specializationRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const adminBlogRoutes = require('./src/routes/adminBlogRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const adminPartnerRoutes = require('./src/routes/adminPartnerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);                    // Public: POST /api/leads
app.use('/api/admin', adminRoutes);                   // Public: POST /api/admin/login, /api/admin/verify
app.use('/api/leads', adminLeadRoutes);               // Protected: GET, PATCH, DELETE /api/leads
app.use('/api/services', serviceRoutes);              // Public + Protected CRUD
app.use('/api/specializations', specializationRoutes); // Public + Protected CRUD
app.use('/api/upload', uploadRoutes);                 // Protected: Image uploads
app.use('/api/settings', settingsRoutes);             // Public GET + Protected PUT
app.use('/api/blog', blogRoutes);                     // Public: GET /api/blog
app.use('/api/admin/blogs', adminBlogRoutes);         // Protected: Blog CRUD
app.use('/api/partners', partnerRoutes);              // Public: GET /api/partners
app.use('/api/admin/partners', adminPartnerRoutes);   // Protected: Partner CRUD

// Start server
async function startServer() {
    try {
        await connectDB();
        await seedAdmin();
        await seedServicesAndSpecializations();

        app.listen(PORT, () => {
            console.log(`\n🚀 Bschool Bridge Backend running on http://localhost:${PORT}`);
            console.log(`📋 Leads API: http://localhost:${PORT}/api/leads`);
            console.log(`📊 Stats API: http://localhost:${PORT}/api/leads/stats`);
            console.log(`🔐 Admin Login: POST http://localhost:${PORT}/api/admin/login`);
            console.log(`🎓 Services API: http://localhost:${PORT}/api/services`);
            console.log(`📚 Specializations API: http://localhost:${PORT}/api/specializations\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.error('\n💡 Make sure MongoDB is running and .env is configured.');
        process.exit(1);
    }
}

startServer();
