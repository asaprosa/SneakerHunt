import sys
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from nike_scraper import nike_scrape_shoes
from superkicks_scraper import superkicks_scrape_shoes
from vegnonveg_scraper import vegnonveg_scrape_shoes

def automation_script(shoes):
    driver_path = 'chromedriver-win64\\chromedriver.exe'  # Ensure correct path handling

    results = {}

    scrape_functions = {
        'Nike': nike_scrape_shoes,
        'Superkicks': superkicks_scrape_shoes,
        'VegNonVeg': vegnonveg_scrape_shoes
    }

    with ThreadPoolExecutor(max_workers=3) as executor:
        future_to_site = {executor.submit(func, shoes, driver_path): site for site, func in scrape_functions.items()}

        for future in as_completed(future_to_site):
            site = future_to_site[future]
            try:
                results[site] = future.result()
            except Exception as e:
                print(f"Error scraping {site}: {e}", file=sys.stderr)

    all_items = {}
    for site, items in results.items():
        all_items.update(items)

    sorted_items = sorted(all_items.items(), key=lambda x: x[1]['price'])

    output = [{'name': item[0], 'price': item[1]['price'], 'link': item[1]['link'], 'image': item[1]['image']} for item in sorted_items]
    
    return json.dumps(output)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        shoes = sys.argv[1]
        result = automation_script(shoes)
        print(result)  # Output the result
    else:
        print("No shoe name provided", file=sys.stderr)
