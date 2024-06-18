from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
import time

def vegnonveg_scrape_shoes(shoes, driver_path):
    service = Service(driver_path)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)

    url = f"https://www.vegnonveg.com/search?q={shoes}"
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

    div = doc.find(class_="st-row st-cols-3 st-cols-sm-4 st-cols-md-4 st-product-wrapper")

    if div:
        items = div.find_all(string=re.compile(shoes, re.IGNORECASE))
        for item in items:
            parent = item.find_parent(class_="st-product st-double-image-card").find("a")
            
            if parent.name != "a":
                continue
            link = parent['href'] 

            grand_parent = item.find_parent(class_="st-product-details")
            great_parent = item.find_parent(class_="st-product st-double-image-card")
            try:
                price = grand_parent.find(class_=['new-price']).text
                image = great_parent.find(class_="st-product-media").find("img").get("src")
                items_found[item] = {
                    "price": float(price.replace("₹", "").replace(",", "").strip()),
                    "link": link,
                    "image": image
                }
            except:
                pass
    else:
        pass
    
    driver.quit()
    return items_found
