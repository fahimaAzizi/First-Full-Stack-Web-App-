# F3 Task Manager

A full-stack task management web application built as part of the **F3 · First Full-Stack Web App** project.

The application allows users to create an account, log in securely, and manage their personal tasks with full CRUD functionality.

## 🚀 Features

* User registration
* User login and authentication
* JWT-based authentication
* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* PostgreSQL database persistence
* Protected task API routes
* Responsive and modern user interface
* React frontend connected to an Express backend

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* REST API
* JWT
* bcrypt

### Database

* PostgreSQL
* Neon PostgreSQL
* Prisma ORM

### Development Tools

* Git
* GitHub
* npm

## 📁 Project Structure

```text
F3-task-manager/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   │
│   │   └── server.js
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔐 Authentication

Users can register and log in using their email and password.

Passwords are hashed using **bcrypt** before being stored in the database.

After successful registration or login, the server generates a **JWT token**. The frontend stores the token and sends it with protected task requests.

Protected requests use:

```text
Authorization: Bearer <token>
```

## 📋 Task CRUD

The application supports complete CRUD operations.

| Operation   | Method | Endpoint         |
| ----------- | ------ | ---------------- |
| Get tasks   | GET    | `/api/tasks`     |
| Create task | POST   | `/api/tasks`     |
| Update task | PUT    | `/api/tasks/:id` |
| Delete task | DELETE | `/api/tasks/:id` |

Authentication endpoints:

| Operation | Method | Endpoint             |
| --------- | ------ | -------------------- |
| Register  | POST   | `/api/auth/register` |
| Login     | POST   | `/api/auth/login`    |

## 🗄️ Database

The project uses **PostgreSQL** with **Prisma ORM**.

The database is hosted using Neon PostgreSQL during development.

Prisma is responsible for:

* Database schema
* Migrations
* Database queries
* Prisma Client generation

The database stores user accounts and tasks persistently, meaning tasks remain available after refreshing the application.

## ⚙️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/fahimaAzizi/First-Full-Stack-Web-App-.git
cd F3-task-manager
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Configure frontend environment

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure backend environment

Create:

```text
server/.env
```

Add your PostgreSQL database connection and JWT secret:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
PORT=5000
```

### 6. Generate Prisma Client

From the `server` folder:

```bash
npx prisma generate
```

### 7. Run database migrations

```bash
npx prisma migrate dev
```

### 8. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 9. Start the frontend

From the `client` folder:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🧪 Testing

The following functionality was tested locally:

* Registration
* Login
* JWT authentication
* Creating tasks
* Viewing tasks
* Editing tasks
* Completing tasks
* Undoing completed tasks
* Deleting tasks
* Refreshing the page while keeping database data
* Protected task routes
* Frontend-to-backend communication
* PostgreSQL persistence

## 📱 Responsive Design

The interface was designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile screens

The application includes responsive layouts for the home page, authentication pages, and dashboard.

## 🚧 Deployment Status

Deployment was **not completed**.

The selected free hosting provider required a payment card for deployment, and a card was not available.

The application is therefore currently tested and functional in the **local development environment**.

All other major F3 requirements were completed:

* ✅ Frontend
* ✅ Backend
* ✅ API connection
* ✅ Database
* ✅ Authentication
* ✅ CRUD
* ✅ Persistent data
* ✅ Responsive UI
* ⏭️ Deployment skipped

## 📚 What I Learned

During this project I learned how different parts of a full-stack application work together.

Key areas I practiced:

* Building a React frontend
* Creating an Express backend
* Designing REST API routes
* Connecting a frontend to a backend
* Working with PostgreSQL
* Using Prisma ORM
* Creating database migrations
* Implementing JWT authentication
* Hashing passwords with bcrypt
* Protecting API routes
* Implementing CRUD operations
* Using environment variables
* Debugging frontend and backend errors
* Using Git and GitHub

## 💡 Challenges

One of the main challenges was connecting all parts of the application together.

I had to troubleshoot issues involving:

* API connection
* CORS
* Environment variables
* PostgreSQL connection
* Prisma migrations
* Authentication
* Git configuration
* Frontend and backend communication

Solving these problems helped me understand that building a full-stack application involves connecting many separate technologies and debugging the communication between them.

## 🎯 F3 Project Goal

The goal of this project was to move from basic frontend development toward building a complete full-stack application.

The final application demonstrates the complete local flow:

```text
React Frontend
      ↓
Express REST API
      ↓
JWT Authentication
      ↓
Prisma ORM
      ↓
PostgreSQL Database
```

---

**F3 · First Full-Stack Web App**

Built with React, Node.js, Express, Prisma, and PostgreSQL.
