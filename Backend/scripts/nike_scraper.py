from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import re
import time

def scrape_shoes(shoes, driver_path):
    service = Service(driver_path)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)

    url = f"https://www.nike.com/in/w?q={shoes}&vst={shoes}"
    driver.get(url)

    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)  # wait for new items to load

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    page_source = driver.page_source
    doc = BeautifulSoup(page_source, "html.parser")

    items_found = {}

    div = doc.find(class_="product-grid__items css-hvew4t")

    if div:
        items = div.find_all(string=re.compile(shoes, re.IGNORECASE))
        for item in items:
            parent = item.find_parent('figure').find('a')
            if not parent or parent.name != 'a':
                continue
            link = parent['href']
            
            grand_parent = item.find_parent('figure')
            try:
                price_text = grand_parent.find(class_="product-price in__styling is--current-price css-11s12ax").text
                
                price = float(re.sub(r'[^\d.]', '', price_text))
                image = grand_parent.find(class_="product-card__hero-image css-1fxh5tw").get('src')
                items_found[item.text] = {
                    "price": price,
                    "link": link,
                    "image": image
                }
            except:
                pass
    else:
        pass

    driver.quit()
    return items_found

def main():
    shoes = input('What shoes do you want to search for? ')
    driver_path = '../../chromedriver-win64/chromedriver.exe'

    items_found = scrape_shoes(shoes, driver_path)
    
    sorted_items = sorted(items_found.items(), key=lambda x: x[1]['price'])

    for item in sorted_items:
        print(item[0])
        print(f"{item[1]['price']}")
        print(item[1]['link'])
        print(item[1]['image'])
        print("---------------------------------------")
    

if __name__ == "__main__":
    main()
