# Capstone Express ORM (Pinterest) – Backend API

Backend API cho project Pinterest clone, xây dựng bằng **Node.js + Express + Sequelize ORM**, sử dụng **MySQL** và **JWT Authentication**.

---

## 🔧 Tech Stack
- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors

---

## ⚙️ Setup & Run Backend

### 1️⃣ Create Database
sql
CREATE DATABASE pinterest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### 2️⃣ Create .env file
PORT=4000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=pinterest_db
DB_USER=root
DB_PASS=your_password

JWT_SECRET=capstone_pinterest_secret

## Postman Collection

Toàn bộ API được test và tổ chức bằng Postman:

👉 Postman Collection (Public):
https://www.postman.com/hoang-jobboard-backend/workspace/node-53/collection/32388371-7feceddb-dfe6-4e05-b1c1-da4be352c218?action=share

## Frontend Repository

Frontend (React + Vite) được triển khai riêng tại:

👉 GitHub Frontend Source:
https://github.com/DangNguyenVuHoang/pinterest_frontend.git
