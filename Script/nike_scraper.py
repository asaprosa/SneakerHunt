import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

def scrape_nike_sneakers(url):
    options = Options()
    options.headless = True
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    driver.get(url)
    time.sleep(5)  # Waiting for the page to load
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    sneakers = []
    for item in soup.select('.product-card__body'):
        name = item.select_one('.product-card__title').text.strip()
        price = item.select_one('.product-price').text.strip()
        image = item.select_one('img.product-card__hero-image')
        if image:
            image_url = image['src']
            # to handle the relative URLs
            if image_url.startswith('/'):
                image_url = f"https://www.nike.com{image_url}"
            # to handle the lazy-loaded images
            elif image_url.startswith('data:image'):
                image_url = image.get('data-src')
        else:
            image_url = None
        link = item.select_one('.product-card__link-overlay')['href']
        sneakers.append({
            'name': name,
            'price': price,
            'image': image_url,
            'link': f"https://www.nike.com{link}"
        })
    
    driver.quit()
    return sneakers

# Example usage
url = 'https://www.nike.com/in/w/mens-shoes-nik1zy7ok'
sneakers = scrape_nike_sneakers(url)
for sneaker in sneakers:
    print(f"Name: {sneaker['name']}, Price: {sneaker['price']}, Image: {sneaker['image']}, Link: {sneaker['link']}")
