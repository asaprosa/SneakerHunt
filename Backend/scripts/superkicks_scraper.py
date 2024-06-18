from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
import time

def superkicks_scrape_shoes(shoes, driver_path):
    service = Service(driver_path)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)

    url = f"https://www.superkicks.in/search?q={shoes}"
    driver.get(url)

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CLASS_NAME, "st-pagination"))
    )
    time.sleep(2)

    page_source = driver.page_source
    doc = BeautifulSoup(page_source, "html.parser")

    page_text = doc.find_all(class_="page-item")
    if len(page_text) > 1:
        pages = int(page_text[-2].text)
    else:
        pages = 1

    items_found = {}  # will store all the shoe data in here

    for page in range(1, pages + 1):
        url = f"https://www.superkicks.in/search?q={shoes}&p={page}"
        driver.get(url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "st-pagination"))
        )
        time.sleep(2)

        page_source = driver.page_source
        doc = BeautifulSoup(page_source, "html.parser")
        div = doc.find(class_="st-row st-cols-2 st-cols-sm-3 st-cols-md-3 st-product-wrapper")

        if not div:
            continue  

        items = div.find_all(string=re.compile(shoes, re.IGNORECASE))
        for item in items:
            parent = item.parent
            if parent.name != "a":
                continue

            link = parent['href']
            grand_parent = item.find_parent(class_="st-product-details")
            great_parent = item.find_parent(class_="st-product")
            try:
                price = grand_parent.find(class_=["new-price only-price", "new-price", "only-price", "old-price"]).text
                image = great_parent.find(class_="st-product-media").find("img").get("src")
                items_found[item] = {
                    "price": float(price.replace("₹", "").replace(",", "").strip()),
                    "link": link,
                    "image": image
                }
            except:
                pass

    driver.quit()
    return items_found
