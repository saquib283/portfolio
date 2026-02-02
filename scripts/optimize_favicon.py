from PIL import Image, ImageOps, ImageDraw
import os

def create_circular_favicon(input_path, output_path, size=(512, 512)):
    try:
        # Open the image
        img = Image.open(input_path).convert("RGBA")
        
        # Calculate dimensions for center crop
        width, height = img.size
        new_size = min(width, height)
        
        left = (width - new_size)/2
        top = (height - new_size)/2
        right = (width + new_size)/2
        bottom = (height + new_size)/2
        
        # Crop to square
        img = img.crop((left, top, right, bottom))
        
        # Resize/Lanczos for quality
        img = img.resize(size, Image.Resampling.LANCZOS)
        
        # Create circular mask
        mask = Image.new('L', size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + size, fill=255)
        
        # Apply mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        # Save
        output.save(output_path, "PNG")
        print(f"Successfully created circular favicon at {output_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    create_circular_favicon("Image.jpeg", "src/app/icon.png")
