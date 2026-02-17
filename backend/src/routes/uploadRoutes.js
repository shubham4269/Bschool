const express = require('express');
const router = express.Router();
const { cloudinary, upload } = require('../config/cloudinary');
const { authMiddleware } = require('../middleware/auth');

// Upload image to Cloudinary
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        console.log('Upload request received');
        
        if (!req.file) {
            console.log('No file in request');
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        console.log('File received:', req.file.originalname, 'Size:', req.file.size);

        // Upload to Cloudinary using buffer
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'bschool-images',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('Upload successful:', result.secure_url);
                        resolve(result);
                    }
                }
            );
            uploadStream.end(req.file.buffer);
        });

        res.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to upload image',
            error: error.message 
        });
    }
});

// Delete image from Cloudinary
router.delete('/image/:publicId', authMiddleware, async (req, res) => {
    try {
        const publicId = req.params.publicId.replace(/--/g, '/');
        await cloudinary.uploader.destroy(publicId);
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
});

module.exports = router;
