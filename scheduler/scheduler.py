from requests import post

URL = "http://localhost:7000/api/v1/sneakers/update_details"

if __name__ == "__main__":
    print("Sending request to", URL)
    response = post(URL)
    print("Status code:", response.status_code)