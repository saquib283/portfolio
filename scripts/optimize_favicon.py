import os
from PIL import Image, ImageDraw

def optimize_favicon():
    # Define paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_path = os.path.join(base_dir, 'public', 'profile.jpeg')
    output_path = os.path.join(base_dir, 'src', 'app', 'icon.png')

    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGBA
            img = img.convert("RGBA")
            
            # Center crop to square
            width, height = img.size
            min_dim = min(width, height)
            left = (width - min_dim) / 2
            top = (height - min_dim) / 2
            right = (width + min_dim) / 2
            bottom = (height + min_dim) / 2
            
            img = img.crop((left, top, right, bottom))
            
            # Resize to standard high-res favicon size
            size = (512, 512)
            img = img.resize(size, Image.Resampling.LANCZOS)
            
            # Create a circular mask
            mask = Image.new('L', size, 0)
            draw = ImageDraw.Draw(mask) 
            draw.ellipse((0, 0) + size, fill=255)
            
            # Apply mask to image
            output = Image.new('RGBA', size, (0, 0, 0, 0))
            output.paste(img, (0, 0), mask=mask)
            
            # Save as PNG
            output.save(output_path, "PNG", optimize=True)
            print(f"Successfully optimized favicon saved to {output_path}")
            
    except ImportError:
        print("Error: PIL (Pillow) library not found. Please run 'pip install Pillow'")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    optimize_favicon()
