# Mini User Management System

**Backend Developer Intern Assessment – Purple Merit Technologies**

The **Mini User Management System** is a full-stack web application designed to manage user accounts with secure authentication and role-based access control (RBAC). The system allows users to register, authenticate, and manage their own profiles, while administrators can manage all users through activation, deactivation, and deletion features.

The primary objective of this project is to demonstrate backend development skills, including authentication flows, role-based authorization, secure API design, database modeling, clean architectural patterns, and a functional frontend interface.

## Live Deployment URLs

- Frontend Application: https://backend-intern-assessment-bhushan-v.vercel.app
- Backend API: https://backend-intern-assessment-bhushan.onrender.com
- API Documentation (Postman): https://documenter.getpostman.com/view/49633286/2sBXVbJEac#642449ad-642d-4107-99c8-d8c861d2f515

## Overview

The **Mini User Management System** enables:

- Secure user authentication
- User profile management
- Role-based access control (RBAC)
- Admin-level user management


## Features

### User Features
- User registration and login
- Secure JWT-based authentication using HTTP-only cookies
- View and update personal profile
- Secure password change functionality

### Admin Features
- Fetch all users with pagination
- Activate and deactivate users
- Delete users
- Restricted access enforced via role-based middleware

### Testing & Reliability
- Unit and integration tests using Jest
- API testing with Supertest
- In-memory MongoDB for isolated and repeatable test execution


## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT (JSON Web Tokens)
- bcrypt
- Cookie-based Authentication

### Frontend
- React (Hooks)
- Tailwind CSS
- Zustand
- Axios
- React Router DOM

### Testing
- Jest
- Supertest

### Deployment
- Backend: Render  
- Frontend: Vercel  
- Database: MongoDB Atlas  


## Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- npm
- MongoDB Atlas account


## Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
APP_NAME=UserManagement
NODE_ENV=test | production
```

3. Start the backend server:
```bash
npm run dev     # Development
npm start       # Production
```

Backend runs at:
```bash
http://localhost:5000
```

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the frontend:
```bash
npm run dev
```

Frontend runs at:
```bash
http://localhost:5173
```


## API Documentation

### Authentication Routes

| Method | Endpoint | Description |
|------:|----------|------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current logged-in user |

---

### User Routes

| Method | Endpoint | Description |
|------:|----------|------------|
| GET | `/api/users/me` | Fetch user profile |
| PUT | `/api/users/me` | Update profile |
| PUT | `/api/users/me/password` | Change password |


### Admin Routes (Admin Only)

| Method | Endpoint | Description |
|------:|----------|------------|
| GET | `/api/admin/users` | Fetch all users (paginated) |
| PATCH | `/api/admin/users/:id/activate` | Activate user |
| PATCH | `/api/admin/users/:id/deactivate` | Deactivate user |
| DELETE | `/api/admin/users/:id` | Delete user |


## Testing

Backend tests are implemented using **Jest** and **Supertest**.

Run tests:
```bash
cd backend
npm test
```

### Test Coverage Includes:
- Authentication success and failure cases
- User profile access and updates
- Admin-level user management actions
- In-memory MongoDB for isolated testing


## Deployment Instructions

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect the GitHub repository
3. Add required environment variables
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend Deployment (Vercel)
1. Import the frontend project into Vercel
2. Set the environment variable `VITE_API_BASE_URL`
3. Deploy the application


## Author

**Bhushan Bachewar**  
