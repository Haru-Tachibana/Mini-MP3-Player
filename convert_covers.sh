#!/bin/bash

# Script to convert original album covers to pixelated versions
# Converts images from assets/original-cover to assets/pixel-cover
# Creates 15x15 pixel art scaled to 60x60 display size

# Set directories
ORIGINAL_DIR="assets/original-cover"
PIXEL_DIR="assets/pixel-cover"
TEMP_DIR="temp_conversion"

# Create pixel-cover directory if it doesn't exist
mkdir -p "$PIXEL_DIR"
mkdir -p "$TEMP_DIR"

echo "🎨 Starting album cover pixelification process..."
echo "📂 Source: $ORIGINAL_DIR"
echo "📂 Output: $PIXEL_DIR"
echo "🎯 Target: 15x15 pixels scaled to 60x60px"
echo ""

# Counter for processed files
count=0

# Process each image in the original-cover directory
for file in "$ORIGINAL_DIR"/*; do
    # Check if file exists and is a regular file
    if [[ -f "$file" ]]; then
        # Get filename without path and extension
        filename=$(basename "$file")
        name_only="${filename%.*}"
        
        # Create output filename (always PNG for pixel art)
        output_file="$PIXEL_DIR/${name_only}_pixel.png"
        temp_file="$TEMP_DIR/${name_only}_15px.png"
        
        echo "🔄 Processing: $filename"
        
        # Step 1: Convert to exactly 15x15 pixels (true pixelation)
        magick "$file" -resize 15x15! -filter point "$temp_file"
        
        # Step 2: Scale up to 60x60 while maintaining 15x15 pixel structure
        magick "$temp_file" -resize 60x60 -filter point "$output_file"
        
        # Check if conversion was successful
        if [[ -f "$output_file" ]]; then
            # Get file size for confirmation
            size=$(identify "$output_file" 2>/dev/null | cut -d' ' -f3)
            echo "✅ Created: ${name_only}_pixel.png ($size)"
            ((count++))
        else
            echo "❌ Failed: $filename"
        fi
        
        echo ""
    fi
done

# Cleanup temporary files
rm -rf "$TEMP_DIR"

echo "🎉 Conversion complete!"
echo "📊 Processed $count album covers"
echo "📁 Pixelated covers saved in: $PIXEL_DIR"
echo ""
echo "💡 Usage tips:"
echo "   - Use *_pixel.png files in your songs.json"
echo "   - Each cover is 15x15 true pixels displayed at 60x60px"
echo "   - Files are optimized for pixel art aesthetic"
