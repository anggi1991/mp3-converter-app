import os
from PIL import Image

def resize_image(input_path, output_path, size):
    try:
        with Image.open(input_path) as img:
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Resize
            resized_img = img.resize(size, Image.Resampling.LANCZOS)
            
            # Save
            resized_img.save(output_path, "PNG")
            print(f"Successfully created {output_path} ({size[0]}x{size[1]})")
    except Exception as e:
        print(f"Failed to create {output_path}: {e}")

def main():
    # Source icon (assumed to be in root or assets)
    source_icon = "icon.png"
    if not os.path.exists(source_icon):
        source_icon = "assets/icon.png"
    
    if not os.path.exists(source_icon):
        print("Error: Source icon.png not found!")
        return

    assets_dir = "assets"
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)

    # Define targets
    targets = [
        ("assets/icon.png", (1024, 1024)),
        ("assets/adaptive-icon.png", (1024, 1024)),
        ("assets/splash-icon.png", (1242, 2436)), # Splash screen usually needs to be centered, but resizing is a start
        ("assets/favicon.png", (48, 48))
    ]

    print(f"Using source: {source_icon}")
    
    for output_path, size in targets:
        # For splash screen, we might want to center the icon on a white background instead of stretching
        if "splash" in output_path:
            try:
                with Image.open(source_icon) as img:
                    if img.mode != 'RGBA':
                        img = img.convert('RGBA')
                    
                    # Create white background
                    background = Image.new('RGBA', size, (255, 255, 255, 255))
                    
                    # Resize icon to be reasonable size (e.g., 200px width) or keep aspect ratio
                    # Let's say we want icon to be 1/3 of width
                    target_width = size[0] // 3
                    aspect_ratio = img.height / img.width
                    target_height = int(target_width * aspect_ratio)
                    
                    icon_resized = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
                    
                    # Center position
                    x = (size[0] - target_width) // 2
                    y = (size[1] - target_height) // 2
                    
                    background.paste(icon_resized, (x, y), icon_resized)
                    background.save(output_path, "PNG")
                    print(f"Successfully created {output_path} ({size[0]}x{size[1]}) with centered icon")
            except Exception as e:
                print(f"Failed to create splash: {e}")
        else:
            resize_image(source_icon, output_path, size)

if __name__ == "__main__":
    main()
