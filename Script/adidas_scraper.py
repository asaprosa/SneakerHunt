from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

def scrape_adidas_sneakers(url):
    options = Options()
    options.headless = True
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    driver.get(url)
    
    try:
        WebDriverWait(driver, 30).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'gl-product-card'))
        )
    except Exception as e:
        print(f"Error waiting for page to load: {e}")
        driver.quit()
        return []
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    sneakers = []

    for item in soup.select('.glass-product-card'):
        name_element = item.select_one('.gl-product-card__name')
        price_element = item.select_one('.glass-product-card__title')
        image_element = item.select_one('img.glass-product-card__image')
        link_element = item.select_one('.glass-product-card__assets-link')

        # Check if the required elements exist before accessing their attributes
        if name_element and price_element and image_element and link_element:
            name = name_element.text.strip()
            price = price_element.text.strip()
            image = image_element['src']
            link = link_element['href']
            sneakers.append({
                'name': name,
                'price': price,
                'image': image,
                'link': f"https://www.adidas.co.in{link}"
            })
    
    driver.quit()
    return sneakers

# Example usage
if __name__ == "__main__":
    url = 'https://www.adidas.co.in/men-shoes'
    sneakers = scrape_adidas_sneakers(url)
    for sneaker in sneakers:
        print(f"Name: {sneaker['name']}, Price: {sneaker['price']}, Image: {sneaker['image']}, Link: {sneaker['link']}")
