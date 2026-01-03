# 🛒 E-Commerce Admin Dashboard

A **modern, server-rendered admin dashboard** built with **Next.js App Router** for managing products, inventory, sales, and administrators.  
Designed with a **professional dark UI**, role-based access control, real-time analytics, and interactive charts.

---

## 🚀 Project Overview

This project is a **full-featured admin portal** for an e-commerce system where administrators can:

- Manage products (Create, Read, Update, Delete)
- Track inventory and stock levels
- Record and visualize sales
- Monitor low-stock alerts
- Manage multiple admins with different roles
- View analytics via interactive charts
- Secure access using authentication & authorization

The dashboard is **server-rendered where possible** for performance and SEO, while interactive parts use **client-side React components**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure login using **NextAuth**
- Session-based authentication
- Role-based access control:
  - **SUPER_ADMIN**
  - **ADMIN**

### 👥 Admin Management
- SUPER_ADMIN can:
  - Add new admins
  - Delete admins
  - Assign roles
- ADMIN can:
  - Access dashboard & products
  - Cannot manage other admins
- Safety checks to prevent unauthorized actions

---

## 📦 Product Management (CRUD)

### ✅ Create
- Add new products with:
  - Name
  - Description
  - Price
  - Stock quantity
  - Category
  - Image URL

### 📖 Read
- View all products in a clean UI
- Filter by category
- Search products by name
- Stock count displayed per product

### ✏️ Update
- Edit existing product details
- Update price, stock, category, and image

### 🗑️ Delete
- Delete products with confirmation
- Protected routes to prevent unauthorized deletion

---

## 💰 Sales & Inventory System

### 🛒 Sell Products
- Sell products directly from the dashboard
- Quantity-based selling
- Automatic stock reduction
- Prevents selling more than available stock

### 📉 Low Stock Alerts
- Automatically detects low-stock products
- Visual alert component for admins

---

## 📊 Dashboard Analytics

### 📌 Animated Stat Cards
- Total Products
- Total Stock
- Low Stock Items
- Total Categories
- Smooth **animated counters**
- Trend arrows (up/down indicators)

### 📈 Interactive Charts
- **Inventory by Category** (Pie Chart)
- **Monthly Sales** (Line Chart)
- **Sales by Product** (Bar Chart)
- **Stock by Product** (Bar Chart)
- Hover tooltips
- Responsive charts

### 🧾 Recent Sales Table
- Displays latest sales by product
- Easy-to-read tabular format
- Styled for dark UI

---

## 🎨 UI / UX Design

- Modern **dark theme**
- Glassmorphism panels
- Gradient stat cards
- Styled buttons:
  - 🟢 Sell (Green)
  - 🔴 Delete (Red)
  - ⚪ Edit (Neutral)
- Responsive sidebar & navbar
- Smooth hover effects and transitions

---

## 🧱 Tech Stack

### Frontend
- **Next.js 14+ (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (Charts & graphs)

### Backend
- **Next.js API Routes**
- **MongoDB**
- **Mongoose**

### Authentication
- **NextAuth.js**
- Credential-based login
- Session handling

### Tooling
- ESLint
- Prettier
- Turbopack (Next.js dev server)

---

## 🗂️ Project Structure

ecommerce-admin/
│
├── app/
│ ├── (protected)/
│ │ ├── dashboard/
│ │ ├── products/
│ │ ├── admins/
│ │ └── layout.tsx
│ ├── api/
│ ├── login/
│ └── layout.tsx
│
├── components/
│ ├── ProductCard.tsx
│ ├── SellButton.tsx
│ ├── Sidebar.tsx
│ ├── Navbar.tsx
│ ├── StatCard.tsx
│ ├── CategoryStockChart.tsx
│ └── LowStockAlert.tsx
│
├── lib/
│ ├── auth.ts
│ └── db.ts
│
├── models/
│ ├── Product.ts
│ ├── Admin.ts
│ └── Sale.ts
│
├── globals.css
└── README.md

---

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ecommerce-admin.git
cd ecommerce-admin
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Environment Variables
Create a .env.local file:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
4️⃣ Run the Development Server
bash
Copy code
npm run dev
Open in browser:

arduino
Copy code
http://localhost:3000
🛡️ Security Considerations
Protected routes using server-side session checks

Role-based permission checks on API routes

Prevents unauthorized CRUD actions

Safe admin deletion rules

🚀 Future Enhancements
Export sales reports (CSV / PDF)

Role-based dashboard views

Real-time updates

Image upload support (Cloudinary / S3)

Audit logs for admin actions

Notifications system

🧠 Learning Outcomes
Real-world Next.js App Router usage

Server vs Client components

Secure admin system design

Data visualization dashboards

Clean UI architecture

Scalable project structure

📜 License
This project is intended for learning and demonstration purposes.





