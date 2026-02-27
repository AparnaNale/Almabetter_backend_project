
# 🛒 E-Commerce Backend API

A RESTful backend API for an E-Commerce application built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🛍 Product APIs
- 🛒 Cart Management
- ❤️ Wishlist / Favorites
- 📦 MongoDB Database Integration
- 📘 API Documentation using Swagger

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Swagger (API Documentation)

---

## 📂 Project Structure
```
backend/
│
├── config/
│ └── db.js
├── controllers/
├── Middleware/
├── models/
├── routes/
├── .env
├── .gitignore
├── app.js
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── swagger-output.json
├── swagger.js

```

---

## ⚙️ Installation

1 Clone the Repository
```bash
git clone https://github.com/your-username/backend.git
```
cd backend

2 Install Dependencies:
```
npm install
```
3 Create .env File :
```
PORT=1000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Generate Swagger Docs :
```
npm run swagger
```

Start Server :
```
nodemon index.js
```
📘 API Documentation
Swagger UI available at:
http://localhost:1000/api-docs

---

## 👩‍💻 Author
### Aparna Nale

📧 Email: aparna.nale099@gmail.com