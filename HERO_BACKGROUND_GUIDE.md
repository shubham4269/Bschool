# Hero Background Image Implementation

## Overview
The hero section at the top of course pages now displays the uploaded background image with a dark overlay for better text readability.

## How It Works

### PageHero Component
The `PageHero` component now accepts a `backgroundImage` prop:

```javascript
<PageHero
    title="MBA Admission"
    subtitle="Get admitted to top MBA colleges..."
    breadcrumb={[...]}
    backgroundImage={heroBackgroundImage}  // New prop
/>
```

### Visual Effect
When a background image is provided:
- Image is displayed as the hero background
- Dark overlay (70-80% opacity) is applied for text readability
- Background uses `cover` sizing for full coverage
- Background is fixed for parallax effect on scroll
- Falls back to gradient if no image is provided

### Styling Applied
```css
background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(image-url)
background-size: cover
background-position: center
background-attachment: fixed
```

## Where It's Used

### Dynamic Course Pages
- Services (e.g., /service/mba-admission)
- Specializations (e.g., /specialization/mba-finance)
- Uses `heroBackgroundImage` from database

### Static Pages
- About, Contact, Privacy Policy, Terms, Disclaimer
- Currently use default gradient
- Can be enhanced to use custom images if needed

## Image Recommendations

For best hero section results:
- **Dimensions**: 1920x600px or wider
- **Aspect Ratio**: 16:9 or wider
- **Format**: JPG (for photos) or PNG (for graphics)
- **File Size**: Under 500KB for fast loading
- **Content**: 
  - Avoid busy/cluttered images
  - Ensure good contrast areas for text
  - Professional, education-related imagery works best
  - Consider the dark overlay when choosing images

## Example Use Cases

### Good Image Choices:
- University campus buildings
- Graduation ceremonies
- Modern office spaces
- Business meetings
- Library or study environments
- Abstract professional backgrounds

### Avoid:
- Images with important text (will be obscured by overlay)
- Very dark images (text won't be readable)
- Busy patterns (distracting from content)
- Low resolution images (will look pixelated)

## Fallback Behavior

If no `heroBackgroundImage` is provided:
- Default gradient background is used
- Maintains consistent look across all pages
- No visual breaking or errors

## Technical Details

### Component Props
```javascript
PageHero({
    title,           // Required: Main heading
    subtitle,        // Optional: Subheading
    breadcrumb,      // Optional: Navigation breadcrumb
    backgroundImage  // Optional: URL to background image
})
```

### Overlay Colors
- Primary overlay: `rgba(15, 23, 42, 0.7)` - 70% dark blue
- Secondary overlay: `rgba(15, 23, 42, 0.8)` - 80% dark blue
- Creates gradient overlay for depth

### Responsive Behavior
- Background image scales appropriately on all devices
- Text remains readable on mobile
- Fixed attachment disabled on mobile for performance

## Admin Panel Usage

1. Navigate to Services or Specializations in admin panel
2. Edit or create an item
3. Upload "Hero Background Image"
4. Image will automatically display in the hero section
5. Preview the page to see the result

## Benefits

✅ More visually appealing hero sections
✅ Professional, modern look
✅ Better brand representation
✅ Improved user engagement
✅ Maintains text readability with overlay
✅ Smooth fallback to gradient
✅ Parallax effect on desktop
