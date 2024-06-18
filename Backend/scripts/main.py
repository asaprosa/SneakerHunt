from concurrent.futures import ThreadPoolExecutor, as_completed
from nike_scraper import nike_scrape_shoes
from superkicks_scraper import superkicks_scrape_shoes
from vegnonveg_scraper import vegnonveg_scrape_shoes

def main():
    shoes = input('What shoes do you want to search for? ')
    driver_path = '../../chromedriver-win64/chromedriver.exe'

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
                print(f"Completed scraping {site}")
            except Exception as e:
                print(f"Error scraping {site}: {e}")

    all_items = {}
    for site, items in results.items():
        all_items.update(items)

    sorted_items = sorted(all_items.items(), key=lambda x: x[1]['price'])

    for item in sorted_items:
        print(item[0])
        print(f"{item[1]['price']}")
        print(item[1]['link'])
        print(item[1]['image'])
        print("---------------------------------------")

if __name__ == "__main__":
    main()
