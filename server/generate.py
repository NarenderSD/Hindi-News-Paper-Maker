import sys
from PIL import Image, ImageDraw, ImageFont

def generate_image(title, article, caption, image_paths, template, date, edition, columns, font, headline_style, background):
    img = Image.new('RGB', (700, 1000), color='white')  # Larger canvas
    draw = ImageDraw.Draw(img)
    font_title = ImageFont.truetype("NotoSansDevanagari.ttf", 48)
    font_text = ImageFont.truetype("NotoSansDevanagari.ttf", 24)
    font_bold = ImageFont.truetype("NotoSansDevanagari.ttf", 26)  # Bold effect ke liye bada size

    # Background
    if background == 'newsprint1':
        bg = Image.open('newsprint1.jpg').resize((700, 1000))
        img.paste(bg)
    elif background == 'newsprint2':
        bg = Image.open('newsprint2.jpg').resize((700, 1000))
        img.paste(bg)
    elif background == 'newsprint3':
        bg = Image.open('newsprint3.jpg').resize((700, 1000))
        img.paste(bg)

    # Template
    if template == 'dainik':
        draw.rectangle([(0, 0), (700, 1000)], outline='black', width=3)
    elif template == 'hindustan':
        img = Image.new('RGB', (700, 1000), color='#f0f0f0')

    # Header
    draw.text((20, 10), f"{date} | {edition}", font=font_text, fill='black')
    draw.line([(20, 40), (680, 40)], fill='black', width=1)

    # Title with style
    title_y = 50
    if headline_style == 'italic':
        draw.text((20, title_y), title, font=font_title, fill='black', direction='ltr', features=['ital'])
    elif headline_style == 'underline':
        draw.text((20, title_y), title, font=font_title, fill='black')
        draw.line([(20, title_y + 55), (680, title_y + 55)], fill='black', width=2)
    else:
        draw.text((20, title_y), title, font=font_title, fill='black')

    # Images
    y_pos = 120
    image_list = image_paths.split(',')
    for i, img_path in enumerate(image_list):
        news_img = Image.open(img_path.strip()).resize((400, 300))  # Larger image
        img.paste(news_img, (150, y_pos))
        if i == 0:
            draw.text((150, y_pos + 320), caption, font=font_text, fill='black')
        y_pos += 350

    # Article with first 2-3 words bold
    article_text = article if article else "लेख यहाँ"
    words = article_text.split(' ')
    bold_words = ' '.join(words[:3])  # Pehle 3 words
    rest_words = ' '.join(words[3:])
    bold_width = draw.textlength(bold_words, font=font_bold)
    draw.text((20, y_pos), bold_words, font=font_bold, fill='black')
    draw.text((20 + bold_width + 5, y_pos), rest_words, font=font_text, fill='black')
    y_pos += 30
    article_lines = rest_words.split('\n')[1:]  # Agar multiple lines hain toh baaki ko normal font mein
    for line in article_lines:
        draw.text((20, y_pos), line, font=font_text, fill='black')
        y_pos += 30

    output = "output.png"
    img.save(output, dpi=(300, 300))
    return output

if __name__ == "__main__":
    title, article, caption, images, template, date, edition, columns, font, headline_style, background = sys.argv[1:12]
    print(generate_image(title, article, caption, images, template, date, edition, columns, font, headline_style, background))