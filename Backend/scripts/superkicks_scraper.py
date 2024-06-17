from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
import time

service = Service('../../chromedriver-win64/chromedriver.exe')
options = webdriver.ChromeOptions()
options.add_argument("--headless")  
driver = webdriver.Chrome(service=service, options=options)

shoes = input('What shoes do you want to search for? ')

url = f"https://www.superkicks.in/search?q={shoes}"
driver.get(url)

WebDriverWait(driver, 20).until(
    EC.presence_of_element_located((By.CLASS_NAME, "st-pagination"))
)
time.sleep(2)

page_source = driver.page_source
doc = BeautifulSoup(page_source, "html.parser")

page_text = doc.find_all(class_="page-item")

# Check if we have at least two page items to access the second last one
if len(page_text) > 1:
    pages = int(page_text[-2].text)
else:
    pages = 1

items_found = {} # will store all the shoe data in here

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
        
        try:
            price = grand_parent.find(class_=["new-price only-price", "new-price", "only-price", "old-price"]).text
            items_found[item] = {"price": float(price.replace("₹", "").replace(",", "").strip()), "link": link}
        except:
            pass

driver.quit()

sorted_items = sorted(items_found.items(), key=lambda x: x[1]['price'])

for item in sorted_items:
    print(item[0])
    print(f"${item[1]['price']}")
    print(item[1]['link'])
    print("---------------------------------------")
