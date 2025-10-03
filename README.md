# ecommerce

e-commerce application using react and node js

🛍️ Ecommerce App
A full-stack Ecommerce Web Application built with React (frontend) and Node.js + Express (backend).
Users can browse products, add items to the cart, and place orders with user details.

# Features

Product Listing with details (title, price, image)
Shopping Cart (Add, Remove, Update Quantity)
Checkout Page with user details form
Loading State with custom loader animation
Responsive UI with TailwindCSS
Context API for state management
Deployed on Vercel (Frontend + Backend)

# Home Page

Products displayed with add-to-cart option.

# Cart

View, update, and remove items.

# Checkout

Submit order with user details.

# Tech Stack

- Frontend:

React

TypeScript

React Router DOM

Context API

TailwindCSS

- Backend:

Node.js

Express.js

REST APIs

# Installation

Fronted
cd client
npm install
npm start || npm run dev

backend
cd server
npm install
npm run dev

# API Endpoints

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| `GET`  | `/api/product`          | Fetch all products |
| `POST` | `/api/order/take-order` | Place new order    |

# Deployment

Frontend: [Vercel](https://ecommerce-five-sable-91.vercel.app/)

Backend: [Vercel](https://ecommerce-vqay.vercel.app/)
