# Cloudinary Image Upload Setup

## Overview
The admin panel now supports uploading background images for cards and hero sections instead of using CSS gradients.

## Setup Instructions

### 1. Create a Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing in, go to your Dashboard
3. You'll find your credentials:
   - Cloud Name
   - API Key
   - API Secret

### 2. Configure Environment Variables
Update `backend/.env` with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies
The required packages are already installed:
- `cloudinary` - Cloudinary SDK
- `multer` - File upload middleware

### 4. Features

#### Card Background Images
- Replace gradient backgrounds on service/specialization cards
- Upload images through the admin panel
- Images are displayed with proper sizing and positioning
- Falls back to default gradient if no image is uploaded
- **Icon emoji is hidden when background image is uploaded**
- Icon emoji is shown when using gradient (no image)

#### Hero Background Images
- Replace gradient backgrounds on course detail pages
- Upload images for hero sections
- **Icon emoji is hidden when background image is uploaded**
- Icon emoji is shown when using gradient (no image)
- Falls back to default gradient if no image is uploaded

### 5. Usage in Admin Panel

1. Log in to the admin dashboard
2. Edit or create a service/specialization
3. Scroll to the "Card Background Image" and "Hero Background Image" sections
4. Click "Choose File" and select an image (max 5MB)
5. Image will be uploaded to Cloudinary automatically
6. Preview appears below the upload button
7. Click "Remove" to delete the image and revert to gradient
8. Save the service/specialization

### 6. API Endpoints

#### Upload Image
```
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body: { image: <file> }

Response: {
  success: true,
  url: "https://res.cloudinary.com/...",
  publicId: "bschool-images/..."
}
```

#### Delete Image
```
DELETE /api/upload/image/:publicId
Authorization: Bearer <token>

Response: {
  success: true,
  message: "Image deleted successfully"
}
```

### 7. Database Schema Changes

#### Service & Specialization Models
- Removed: `gradient` field
- Removed: `heroGradient` field
- Added: `cardBackgroundImage` (String, default: '')
- Added: `heroBackgroundImage` (String, default: '')

### 8. Frontend Changes

#### Home.js
- Card backgrounds now use `cardBackgroundImage` URL
- Falls back to gradient if no image is set

#### CoursePage.js
- Hero sections now use `heroBackgroundImage` URL
- Sidebar headers use hero background image
- Falls back to gradient if no image is set

#### AdminContentManager.js
- Added image upload functionality
- Added image preview with remove button
- Upload progress indicators
- Replaced gradient input fields with file upload inputs

### 9. Image Recommendations

For best results:
- Card images: 400x300px or similar aspect ratio
- Hero images: 1920x600px or similar wide aspect ratio
- Format: JPG or PNG
- Size: Under 2MB for optimal loading

### 10. Troubleshooting

If images don't upload:
1. Check Cloudinary credentials in `.env`
2. Verify the backend server is running
3. Check browser console for errors
4. Ensure file size is under 5MB
5. Verify file is an image format (jpg, png, gif, etc.)

## Migration Notes

Existing services and specializations will continue to work with empty image fields, falling back to the default gradient. You can gradually add images through the admin panel.
