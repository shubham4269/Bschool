const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Validate Cloudinary credentials
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('⚠️  WARNING: Cloudinary credentials not found in .env file');
    console.error('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

// Log configuration status (without exposing secrets)
console.log('📸 Cloudinary configuration:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? `✓ (${process.env.CLOUDINARY_CLOUD_NAME.trim()})` : '✗ Missing',
    api_key: process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing',
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
});

module.exports = { cloudinary, upload };
