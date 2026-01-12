from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance, ImageFilter
import random

ROOT = Path(r"e:\Projects\websites\big model test 20x credits")
SEAL_PATH = ROOT / "A Dump" / "eshsealnobg.png"
OUTPUT_PATH = ROOT / "A Dump" / "paper_seal_preview.png"

WIDTH, HEIGHT = 2550, 3300  # 8.5x11 at 300dpi

BANDS = [
    {"label": "Emerald Resume Paper", "color": (214, 234, 224), "mode": "emerald_fiber"},
    {"label": "Linen Resume Paper", "color": (243, 242, 235), "mode": "linen"},
    {"label": "Bright White Cardstock", "color": (250, 250, 248), "mode": "bright_cardstock"},
    {"label": "Green Cardstock", "color": (202, 224, 192), "mode": "green_cardstock"},
    {"label": "Ivory Parchment", "color": (240, 230, 214), "mode": "parchment"},
    {"label": "Recycled Kraft", "color": (210, 190, 160), "mode": "kraft"},
    {"label": "Pastel Blue", "color": (222, 233, 245), "mode": "pastel"},
    {"label": "Gray Matte", "color": (220, 222, 224), "mode": "matte"},
]


def add_noise_overlay(base: Image.Image, base_color, amplitude, opacity, contrast=1.0):
    w, h = base.size
    noise = Image.effect_noise((w, h), amplitude)
    if contrast != 1.0:
        noise = ImageEnhance.Contrast(noise).enhance(contrast)
    low = tuple(max(0, min(255, int(c - amplitude / 2))) for c in base_color)
    high = tuple(max(0, min(255, int(c + amplitude / 2))) for c in base_color)
    noise_rgb = ImageOps.colorize(noise, low, high)
    noise_rgba = noise_rgb.convert("RGBA")
    noise_rgba.putalpha(opacity)
    base.alpha_composite(noise_rgba)


def make_texture(color, size, mode):
    band = Image.new("RGBA", size, color + (255,))
    w, h = size

    if mode == "emerald_fiber":
        add_noise_overlay(band, color, amplitude=40, opacity=60, contrast=1.4)
        for _ in range(160):
            x = random.randint(0, w)
            length = random.randint(int(h * 0.2), int(h * 0.8))
            offset = random.randint(-int(h * 0.2), int(h * 0.2))
            alpha = random.randint(25, 45)
            shade = tuple(max(0, min(255, c + random.randint(-20, 20))) for c in color)
            fiber = Image.new("RGBA", size, (0, 0, 0, 0))
            ImageDraw.Draw(fiber).line((x, 0, x + offset, length), fill=shade + (alpha,), width=1)
            band.alpha_composite(fiber)

    elif mode == "linen":
        add_noise_overlay(band, color, amplitude=35, opacity=45, contrast=1.2)
        spacing = max(6, h // 120)
        linen_overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        linen_draw = ImageDraw.Draw(linen_overlay)
        light = tuple(max(0, min(255, c + 12)) for c in color)
        dark = tuple(max(0, min(255, c - 18)) for c in color)
        for y in range(0, h, spacing):
            linen_draw.line((0, y, w, y), fill=light + (55,), width=1)
        for x in range(0, w, spacing):
            linen_draw.line((x, 0, x, h), fill=dark + (40,), width=1)
        band.alpha_composite(linen_overlay)

    elif mode == "bright_cardstock":
        add_noise_overlay(band, color, amplitude=20, opacity=30, contrast=1.1)

    elif mode == "green_cardstock":
        add_noise_overlay(band, color, amplitude=35, opacity=50, contrast=1.3)

    elif mode == "parchment":
        add_noise_overlay(band, color, amplitude=50, opacity=70, contrast=1.5)
        swirl = Image.effect_noise((w, h), 80).convert("L").filter(ImageFilter.GaussianBlur(radius=8))
        swirl_rgb = ImageOps.colorize(
            swirl,
            tuple(max(0, c - 25) for c in color),
            tuple(min(255, c + 15) for c in color),
        ).convert("RGBA")
        swirl_rgb.putalpha(35)
        band.alpha_composite(swirl_rgb)

    elif mode == "kraft":
        add_noise_overlay(band, color, amplitude=45, opacity=80, contrast=1.2)
        speck_overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        speck_draw = ImageDraw.Draw(speck_overlay)
        for _ in range(w * h // 4500):
            x = random.randint(0, w - 1)
            y = random.randint(0, h - 1)
            radius = random.randint(0, 1)
            shade = random.randint(-25, 10)
            speck_color = tuple(max(0, min(255, c + shade)) for c in color)
            speck_draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=speck_color + (120,))
        band.alpha_composite(speck_overlay)

    elif mode == "pastel":
        add_noise_overlay(band, color, amplitude=28, opacity=45, contrast=1.1)

    elif mode == "matte":
        add_noise_overlay(band, color, amplitude=22, opacity=35, contrast=1.0)
        gradient = Image.linear_gradient("L").resize(size)
        gradient = ImageEnhance.Contrast(gradient).enhance(0.7)
        gradient = ImageOps.colorize(
            gradient,
            tuple(max(0, c - 20) for c in color),
            tuple(min(255, c + 15) for c in color),
        ).convert("RGBA")
        gradient.putalpha(50)
        band.alpha_composite(gradient)

    return band


def main():
    if not SEAL_PATH.exists():
        raise FileNotFoundError(f"Seal not found: {SEAL_PATH}")

    sheet = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    band_height = HEIGHT // len(BANDS)

    for idx, info in enumerate(BANDS):
        y0 = idx * band_height
        y1 = HEIGHT if idx == len(BANDS) - 1 else y0 + band_height
        segment_height = y1 - y0
        band_img = make_texture(info["color"], (WIDTH, segment_height), info["mode"])
        sheet.paste(band_img, (0, y0), band_img)
        label_y = y0 + 40
        draw.rectangle((60, label_y - 20, 620, label_y + 30), fill=(255, 255, 255, 160))
        draw.text((70, label_y - 10), info["label"], fill=(40, 40, 40, 255), font=font)

    seal = Image.open(SEAL_PATH).convert("RGBA")
    max_band_height = band_height
    scale = min((max_band_height * 0.8) / seal.height, (WIDTH * 0.35) / seal.width)
    seal_resized = seal.resize((int(seal.width * scale), int(seal.height * scale)), Image.LANCZOS)

    for idx in range(len(BANDS)):
        y0 = idx * band_height
        y1 = HEIGHT if idx == len(BANDS) - 1 else y0 + band_height
        segment_height = y1 - y0
        paste_x = (WIDTH - seal_resized.width) // 2
        paste_y = y0 + (segment_height - seal_resized.height) // 2
        sheet.paste(seal_resized, (paste_x, paste_y), seal_resized)

    sheet.convert("RGB").save(OUTPUT_PATH, dpi=(300, 300))
    print(f"Created preview: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
