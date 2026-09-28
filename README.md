# F3 Task Manager

A full-stack task management web application built for the **F3 · First Full-Stack Web App** project.

Users can create an account, log in, and manage their tasks with full CRUD functionality.

## 🚀 Features

* User registration and login
* JWT authentication
* Create, view, edit, and delete tasks
* Mark tasks as completed
* PostgreSQL data persistence
* Protected API routes
* Responsive UI
* React frontend + Express backend

## 🛠️ Tech Stack

**Frontend:** React, Vite, JavaScript, CSS
**Backend:** Node.js, Express.js, JWT, bcrypt
**Database:** PostgreSQL, Neon, Prisma
**Tools:** Git, GitHub, npm

## 📁 Project Structure

```text
F3-task-manager/
├── client/
│   └── src/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── index.css
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── lib/
│   └── prisma/
│
└── README.md
```

## 🔐 Authentication

Passwords are securely hashed with **bcrypt**.

After login or registration, the server creates a **JWT token** which is used to access protected task routes.

## 📋 API

### Authentication

| Method | Endpoint             | Purpose        |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Create account |
| POST   | `/api/auth/login`    | Login          |

### Tasks

| Method | Endpoint         | Purpose     |
| ------ | ---------------- | ----------- |
| GET    | `/api/tasks`     | Get tasks   |
| POST   | `/api/tasks`     | Create task |
| PUT    | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## ⚙️ Run Locally

### 1. Clone the project

```bash
git clone https://github.com/fahimaAzizi/First-Full-Stack-Web-App-.git
cd F3-task-manager
```

### 2. Install dependencies

**Client:**

```bash
cd client
npm install
```

**Server:**

```bash
cd ../server
npm install
```

### 3. Environment variables

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Create `server/.env`:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
PORT=5000
```

### 4. Setup Prisma

From the `server` folder:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the application

**Backend:**

```bash
npm start
```

**Frontend:**

```bash
cd ../client
npm run dev
```

Open:

```text
http://localhost:5173
```

## 🧪 Tested

* Registration
* Login
* Authentication
* Create task
* Edit task
* Complete / undo task
* Delete task
* Database persistence
* Protected routes
* Frontend ↔ backend communication
* Responsive design

## 🚧 Deployment

Deployment was **skipped** because the selected hosting provider required a payment card.

The application is fully functional and tested in the local development environment.

## 📚 What I Learned

* Building a React frontend
* Creating an Express REST API
* Connecting PostgreSQL with Prisma
* Implementing JWT authentication
* Building CRUD functionality
* Working with Git and GitHub
* Debugging full-stack applications

---

**F3 · First Full-Stack Web App**

Built with **React · Node.js · Express · Prisma · PostgreSQL**
