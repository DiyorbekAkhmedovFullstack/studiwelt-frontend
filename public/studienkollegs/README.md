# Studienkolleg Images

This directory contains images for the Studienkolleg carousel on the landing page.

## Image Requirements

- **Dimensions**: 800x600px (or similar 4:3 aspect ratio recommended)
- **Format**: PNG, JPG, or WebP
- **File size**: Keep under 500KB for optimal performance
- **Subject**: City landmarks, university buildings, or city skylines

## Current Status

✅ `munich.png` - Studienkolleg München (576KB)
✅ `berlin.png` - Studienkolleg der TU Berlin (488KB)
✅ `hamburg.png` - Studienkolleg Hamburg (532KB)
✅ `karlsruhe.png` - Studienkolleg am KIT (584KB)
✅ `leipzig.png` - Studienkolleg Leipzig (568KB)
✅ `heidelberg.png` - Studienkolleg Heidelberg (564KB)
✅ `halle.png` - Studienkolleg Halle(Saale) (492KB)
✅ `darmstadt.png` - Studienkolleg Darmstadt (152KB)
✅ `frankfurt.png` - Studienkolleg Frankfurt (540KB)
✅ `hannover.png` - Studienkolleg Hannover (492KB)

**All images are present!** 🎉

## Image Names Required

All images must be named exactly as shown below (case-sensitive):

1. `munich.png` - Studienkolleg München (Bayern)
2. `berlin.png` - Studienkolleg der TU Berlin
3. `hamburg.png` - Studienkolleg Hamburg
4. `karlsruhe.png` - Studienkolleg am KIT (Baden-Württemberg)
5. `leipzig.png` - Studienkolleg Leipzig (Sachsen)
6. `heidelberg.png` - Studienkolleg Heidelberg (Baden-Württemberg)
7. `halle.png` - Studienkolleg Halle(Saale) (Sachsen-Anhalt)
8. `darmstadt.png` - Studienkolleg Darmstadt (Hessen)
9. `frankfurt.png` - Studienkolleg Frankfurt am Main (Hessen)
10. `hannover.png` - Studienkolleg Hannover (Niedersachsen)

## How to Add Images

### Option 1: Download from Free Stock Photo Sites

Visit royalty-free image sites like:
- [Unsplash](https://unsplash.com) (search for city names: "Munich", "Berlin", etc.)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

Search for: `[city name] skyline`, `[city name] architecture`, or `[city name] landmark`

### Option 2: Use Your Own Photos

If you have photos of these German cities, you can use them directly.

### Step-by-Step:

1. **Download** an image for the city
2. **Resize** it to approximately 800x600px (use tools like Photoshop, GIMP, or online tools)
3. **Optimize** for web (compress to ~200-500KB using tools like TinyPNG or Squoosh)
4. **Rename** to match exact name from list above (e.g., `hamburg.png`)
5. **Move** the file to this directory: `/public/studienkollegs/`
6. **Refresh** your browser - the image will load automatically!

## Image Optimization Tips

If `munich.png` is too large (3.9MB), you can optimize it:

```bash
# Using ImageMagick (if installed):
convert munich.png -resize 800x600^ -gravity center -extent 800x600 -quality 85 munich-optimized.png

# Or use online tools:
# - https://tinypng.com
# - https://squoosh.app
```

## Automatic Fallback

The application has built-in fallback handling:
- If an image fails to load, it automatically displays `placeholder.svg`
- This ensures the carousel never shows broken images
- You can gradually add images one by one

## Testing

After adding images:
1. Start the dev server: `npm run dev`
2. Navigate to the landing page
3. Scroll to the "Explore Studienkollegs" section
4. Check that your images load correctly
5. Verify hover effects work properly

## Notes

- Images are loaded from the `/public` folder, so they're accessible at `/studienkollegs/[name].png`
- No import statements needed - just drop files in this directory
- The app checks for `.png` files by default, but you can update the code to support `.jpg` if needed
