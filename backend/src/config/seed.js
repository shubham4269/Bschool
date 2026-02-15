const Admin = require('../models/Admin');

async function seedAdmin() {
    try {
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        const existingAdmin = await Admin.findOne({ username });
        if (!existingAdmin) {
            await Admin.create({ username, password });
            console.log(`👤 Default admin created — username: ${username}`);
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
}

module.exports = seedAdmin;
