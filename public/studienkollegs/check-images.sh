#!/bin/bash

# Studienkolleg Image Checker
# This script checks which images are present and which are missing

echo "🖼️  Studienkolleg Image Status Check"
echo "===================================="
echo ""

REQUIRED_IMAGES=(
  "munich"
  "berlin"
  "hamburg"
  "karlsruhe"
  "leipzig"
  "heidelberg"
  "halle"
  "darmstadt"
  "frankfurt"
  "hannover"
)

PRESENT=0
MISSING=0

for image in "${REQUIRED_IMAGES[@]}"; do
  if [ -f "${image}.png" ] || [ -f "${image}.jpg" ] || [ -f "${image}.webp" ]; then
    echo "✅ ${image}.png - Found"
    PRESENT=$((PRESENT + 1))

    # Check file size
    if [ -f "${image}.png" ]; then
      SIZE=$(du -h "${image}.png" | cut -f1)
      echo "   Size: ${SIZE}"
    fi
  else
    echo "⚠️  ${image}.png - Missing (will use placeholder)"
    MISSING=$((MISSING + 1))
  fi
done

echo ""
echo "===================================="
echo "Summary: ${PRESENT}/10 images present, ${MISSING}/10 missing"
echo ""

if [ $MISSING -gt 0 ]; then
  echo "📝 To add missing images:"
  echo "1. Download images from Unsplash, Pexels, or Pixabay"
  echo "2. Rename them to match the required names above"
  echo "3. Place them in this directory"
  echo "4. Run this script again to verify"
fi
