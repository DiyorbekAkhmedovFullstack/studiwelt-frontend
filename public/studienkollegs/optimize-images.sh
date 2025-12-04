#!/bin/bash

# Image Optimization Script for Studienkolleg Images
# Converts PNG images to optimized WebP format

echo "🚀 Starting image optimization..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp not found. Installing via Homebrew..."
    brew install webp
fi

# Navigate to studienkollegs directory
cd "$(dirname "$0")"

# Convert each PNG to WebP with 85% quality
for file in *.png; do
    if [ -f "$file" ]; then
        filename="${file%.png}"

        # Skip if already processed
        if [ -f "${filename}.webp" ]; then
            echo "⏭️  Skipping $file (WebP already exists)"
            continue
        fi

        echo "🖼️  Converting $file to WebP..."

        # Convert to WebP with 85% quality (good balance)
        cwebp -q 85 "$file" -o "${filename}.webp"

        # Get file sizes for comparison
        original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        webp_size=$(stat -f%z "${filename}.webp" 2>/dev/null || stat -c%s "${filename}.webp" 2>/dev/null)

        # Calculate reduction percentage
        reduction=$(echo "scale=1; (1 - $webp_size / $original_size) * 100" | bc)

        echo "✅ ${filename}.webp created (${reduction}% smaller)"
    fi
done

echo ""
echo "📊 Optimization Summary:"
echo "----------------------------------------"
du -h *.png 2>/dev/null | awk '{sum+=$1} END {print "Total PNG size: " sum " KB"}'
du -h *.webp 2>/dev/null | awk '{sum+=$1} END {print "Total WebP size: " sum " KB"}'
echo "----------------------------------------"
echo "✨ Optimization complete!"
