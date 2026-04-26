# 🔗 URL Shortener API

A lightweight and production-ready URL Shortener API built using Node.js, Express, and MongoDB.

This service allows users to convert long URLs into short, manageable links, track usage statistics, and handle redirections efficiently.

---

# 🚀 Features

* Shorten long URLs into compact links
* Redirect short URLs to original URLs
* Track click count for each URL
* Get analytics for each shortened link
* Input validation for URLs
* RESTful API design

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* NanoID (for short code generation)

---

# 📂 Project Structure

```
url-shortener/
│
├── config/
│   └── db.js
├── models/
│   └── urlModel.js
├── controllers/
│   └── urlController.js
├── routes/
│   └── urlRoutes.js
├── utils/
│   └── generateShortCode.js
│
├── app.js
├── server.js
├── .env
└── README.md
```

---

# ⚙️ Setup Instructions

## 1. Clone the repository

```
git clone <your-repo-url>
cd url-shortener
```

## 2. Install dependencies

```
npm install
```

## 3. Create `.env` file

```
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
BASE_URL=http://localhost:8080
```

## 4. Start the server

```
npm run dev
```

---

# 📡 API Endpoints

---

## 🔹 1. Create Short URL

**POST** `/api/shorten`

### Request Body:

```json
{
  "original_url": "https://google.com"
}
```

### Response:

```json
{
  "short_url": "http://localhost:8080/abc123"
}
```

---

## 🔹 2. Redirect to Original URL

**GET** `/:shortCode`

### Example:

```
http://localhost:8080/abc123
```

### Behavior:

* Redirects to original URL
* Increments click count

---

## 🔹 3. Get URL Statistics

**GET** `/api/stats/:shortCode`

### Response:

```json
{
  "original_url": "https://google.com",
  "shortCode": "abc123",
  "createdAt": "2026-04-26T10:00:00.000Z",
  "click_count": 5
}
```

---

# 🧬 Database Schema

```
{
  originalUrl: String,
  shortCode: String (unique),
  clickCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

# 🧠 Short Code Generation Logic

The application uses the **NanoID** library to generate a unique 6-character alphanumeric string.

To avoid collisions:

* The system checks if the generated code already exists
* If yes, it regenerates until a unique code is found

---

# 🧪 Testing the API

## Using curl

### Create short URL

```
curl -X POST http://localhost:8080/api/shorten \
-H "Content-Type: application/json" \
-d '{"original_url":"https://google.com"}'
```

### Get stats

```
curl http://localhost:8080/api/stats/abc123
```

---

# ❗ Error Handling

* Invalid URL → 400 Bad Request
* URL not found → 404 Not Found
* Server errors → 500 Internal Server Error


# 👨‍💻 Author

Rohit Lamba
