const mongoose = require('mongoose');

async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
}

module.exports = connectDB;
