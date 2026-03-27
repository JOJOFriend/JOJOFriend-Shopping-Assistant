from PIL import Image, ImageEnhance, ImageFilter
import math
import os


def resize_image(input_image_path, output_dir):
    img = Image.open(input_image_path)
    sizes = [16, 32, 48, 128, 512]

    os.makedirs(output_dir, exist_ok=True)

    for size in sizes:
        img_resized = img.resize((size, size), Image.Resampling.LANCZOS)
        output_image_path = os.path.join(output_dir, f"icon{size}.png")
        img_resized.save(output_image_path)
        print(f"Image saved as {output_image_path}")


def convert_to_grayscale(input_image_path, output_image_path):
    img = Image.open(input_image_path)
    img_gray = img.convert("L")

    enhancer = ImageEnhance.Contrast(img_gray)
    img_gray = enhancer.enhance(1.5)

    img_gray = img_gray.filter(ImageFilter.SHARPEN)
    img_gray.save(output_image_path)


def generate_images(input_image_path, output_dir, base_size=512, scales=[1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0]):
    img = Image.open(input_image_path)
    base_filename = os.path.splitext(os.path.basename(input_image_path))[0]

    os.makedirs(output_dir, exist_ok=True)
    for i, scale in enumerate(scales):
        new_size = int(base_size * scale)
        img_resized = img.resize((new_size, new_size), Image.Resampling.LANCZOS)

        img_resized_with_alpha = Image.new("RGBA", (base_size, base_size), (0, 0, 0, 0))
        img_resized_with_alpha.paste(img_resized, ((base_size - new_size) // 2, (base_size - new_size) // 2))

        folder_name = str(i + 1)
        folder_path = os.path.join(output_dir, folder_name)
        os.makedirs(folder_path, exist_ok=True)

        output_image_path = os.path.join(folder_path, base_filename+".png")
        img_resized_with_alpha.save(output_image_path)
        print(f"Image saved as {output_image_path}")

def breathing_scales(frames=10, amplitude=0.15):
    scales = []
    for i in range(frames):
        theta = math.pi * i / (frames - 1)   # 0 → π
        scale = 1 - amplitude * math.sin(theta)
        scales.append(round(scale, 4))
    return scales

if __name__ == "__main__":
    FILENAME = "icon512.png"
    ROOT = "../images/icon"
    BASE_PIC = f"{ROOT}/default"
    BASE_UNAVAILABLE_PIC = f"{ROOT}/unavailable"
    BASE_EFFECT_PIC = f"{ROOT}/effect"

    convert_to_grayscale(f"{BASE_PIC}/{FILENAME}", f"{BASE_UNAVAILABLE_PIC}/{FILENAME}")
    resize_image(f"{BASE_PIC}/{FILENAME}", BASE_PIC)
    resize_image(f"{BASE_UNAVAILABLE_PIC}/{FILENAME}", BASE_UNAVAILABLE_PIC)

    #effect
    scales = breathing_scales(10, 0.15)
    generate_images(f"{BASE_PIC}/{FILENAME}", BASE_EFFECT_PIC, scales=scales)
    for i in range(1, len(scales)+1):
        resize_image(f"{BASE_EFFECT_PIC}/{i}/{FILENAME}", f"{BASE_EFFECT_PIC}/{i}")