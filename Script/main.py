import requests
from bs4 import BeautifulSoup

# Function to scrape a website
def scrape_website(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup.title.string  # Example: Extract and return the title of the page
    else:
        return None

# Example usage
url = 'http://example.com'
page_title = scrape_website(url)
print(f"Page title: {page_title}")
