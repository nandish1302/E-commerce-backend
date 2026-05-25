# E-Commerce Backend System

A secure and scalable E-Commerce Backend built using Spring Boot and MySQL.

This project implements JWT Authentication, Spring Security, Role-Based Access Control (RBAC), Cart Management, Order Management, and Product APIs.

---

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Product Management APIs
- Cart Management
- Order Management
- BCrypt Password Encryption
- Spring Security Integration
- Global Exception Handling
- DTO-based Response Handling
- Swagger API Documentation

---

## Tech Stack

- Java
- Spring Boot
- Spring Security
- JWT
- MySQL
- Hibernate/JPA
- Maven

---

## Roles

### ROLE_USER
- View Products
- Add to Cart
- Place Orders

### ROLE_ADMIN
- Add Products
- Delete Products
- Manage Product APIs

---

## Authentication Flow

1. User logs in using email and password
2. JWT token is generated
3. Client sends token in Authorization header
4. JwtFilter validates token
5. Spring Security authorizes request based on roles

---

## API Endpoints

### Auth APIs
- POST /auth/register
- POST /auth/login

### Product APIs
- GET /products
- POST /products (ADMIN only)

### Cart APIs
- POST /cart/add
- GET /cart

### Order APIs
- POST /orders
- GET /orders

---

## Project Structure

src/main/java/com/nandish/ecommerce

├── controller  
├── service  
├── repository  
├── entity  
├── security  
├── config  
├── dto  
├── exception  
├── util  
└── enums  

---

## Setup Instructions

1. Clone the repository
2. Configure MySQL database
3. Update application.properties
4. Run Maven install
5. Start Spring Boot application

---

## Future Improvements

- Refresh Token Authentication
- Payment Gateway Integration
- Redis Caching
- Docker Deployment
- Microservices Architecture
