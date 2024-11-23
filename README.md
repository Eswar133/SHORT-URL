# Short URL Service

A simple URL shortener service built with **Express**, **Mongoose**, and **ShortID**.

---

## Installation

### Prerequisites:
* Install [Node.js](https://nodejs.org) (v14 or later)
* Install [MongoDB](https://www.mongodb.com/try/download/community)

### Steps to Install:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Eswar133/SHORT-URL.git
2. **Navigate to the project folder:**
   ```bash
   cd SHORT-URL
3. **Install dependencies:**
   ```bash
   npm install express mongoose shortid
4. **Start the server:**
   ```bash
   npm start
### API EndPoints
1. **Shorten URL**
* Endpoint:
  * POST http://127.0.0.1:3000/url/
  * Request Format:
    ```json
    {
    "url": "https://youtube.com"
    }
  * Response Format:
    ```json
    {
    "id": "HGRIghVIs"
    }
2. **Redirect to Original URL**
* Endpoint:
  * GET http://127.0.0.1:3000/{short_id}/
  * Sample Request : http://127.0.0.1:3000/HGRIghVIs/
  * Response:
      * Redirects to https://youtube.com.

### File Structure
* index.js: Main server file.
* models/url.js: MongoDB model for storing URLs.
* routes/url.js: Contains API route logic.

### How It Works
* Shorten URL:

- The POST /url/ endpoint generates a unique short_id for the given URL.
- The short_id is stored in the MongoDB database along with the original URL.
- Redirect to Original URL:

- The GET /{short_id}/ endpoint looks up the short_id in the database.
- If found, it redirects the user to the corresponding original URL.

    
