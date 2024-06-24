# SneakerHunt
- **A website for sneakerheads where you can search for the best price of your favourite sneaker over the internet**

1. Implemented a web-scraper that extracts data from prominent sneaker selling websites.

2. Currently integrated 3 websites namely *Superkicks.in*, *VegNonVeg.com*, *Nike.com*. Keeping the project open for contributions for more websites integration.

3. Integrated a scheduler batch file that runs the scraper on scheduled intervals to update the present data in the database.

4. Information regarding APIs & usage given below. 

### Tech Stack Used:
1. JavaScript
2. Python
3. Node.js
4. Express.js
5. MongoDB
6. BeautifulSoup
7. Selenium

## High Level Design:

1. Simple high level design of the project and its working.
![High Level Design](./docs/SneakerHunt%20HLD.png)

## Installation & Setup:

1. Clone the repository locally:
```
git clone https://github.com/SCube27/SneakerHunt.git
```

2. Install the dependencies:
```
npm install
```

3. Install python libraries:
```
pip install -r requirements.txt
```

4. Start the server:
```
npm run dev
```

### Configurations:
1. Refer the `template.env` and setup a `.env` file accordingly for the requiered environment variables for the project.

## APIs (Enpoints) & Usage:

### Sneaker Data APIs
1. ***Get the Sneaker Data***:
    - *API*: ```localhost:<PORT>/api/v1/sneakers/```
    - *Req Type*: **POST**
    - *Requires*: Reqest Body with Sneaker Name String
    - *Response*: 
        ```
        // Dummy Response
        [
            {
                name: sneaker name (string),
                price: price of sneaker (number),
                link: url to buy the sneaker (string),
                image: image url (string)  
            },
        ]
        ```

2. ***Update Sneaker Data in DB***: (Not for users to access)
    - *API*: ```localhost:<PORT>/api/v1/sneakers/update_details```
    - *Req Type*: **PATCH**
    - *Requires*: No requirement
    - *Response*: 
        ```
        {
            success: true,
            message: "updated the data successfully"
        }
        ```

### Auth User APIs
1. ***Sign Up User***:
    - *API*: ```localhost:<PORT>/api/v1/auth/signup```
    - *Req Type*: **POST**
    - *Requires*: Request body with username, email and password of user
    - *Response*:
        ```
        {
            username: username of the signed up user,
            email: email of the user
        }
        ```

2. ***Log In User***:
    - *API*: ```localhost:<PORT>/api/v1/auth/login```
    - *Req Type*: **POST**
    - *Requires*: Request body with username and password of user
    - *Response*:
        ```
        {
            username: username of the signed up user,
            email: email of the user
        }
        ```

3. ***Log Out User***:
    - *API*: ```localhost:<PORT>/api/v1/auth/logout```
    - *Req Type*: **POST**
    - *Requires*: No requirements
    - *Response*:
        ```
        {
            message: "Logged Out Successfully"
        }
        ```

[**NOTE**] The update sneaker data API is used by the scheduler file to update the sneaker data, its not suppose to be accessed on client side.

## Setting Up Automation:

- To automate the collection of prices from this software simply run the ```scheduler/main.py``` file at your desired increment while the python flask backend is running.

### Windows
- I have created a simple ```.bat``` script called ```win.bat``` that you can schedule to execute using the Windows Task Scheduler that will automatically run the backend api and send the appropriate request to it.

### Contributions:
- The project is open for contribution according to the issues present in the issues tab.
