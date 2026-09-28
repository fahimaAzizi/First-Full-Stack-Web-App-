# F3 Task Manager

A modern full-stack task management application built with **React, Node.js, Express, Prisma, and PostgreSQL**.

F3 Task Manager allows users to securely create an account, manage personal tasks, track completion, and keep their data stored persistently in a PostgreSQL database.

---

## Overview

F3 Task Manager was built as a full-stack development project to practice building and connecting a complete web application.

The application includes:

* User authentication
* Protected API routes
* Full task CRUD functionality
* Persistent PostgreSQL storage
* Responsive user interface
* Frontend-to-backend API communication

---

## Features

### Authentication

* User registration and login
* Secure password hashing with bcrypt
* JWT-based authentication
* Protected task routes

### Task Management

* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Persistent task data

### User Interface

* Clean and responsive design
* Dashboard with task statistics
* Mobile-friendly layout
* Search and task filtering

---

## Technology Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Frontend         | React, Vite, JavaScript |
| Styling          | CSS                     |
| Backend          | Node.js, Express.js     |
| Authentication   | JWT, bcrypt             |
| Database         | PostgreSQL              |
| ORM              | Prisma                  |
| Database Hosting | Neon                    |
| Version Control  | Git, GitHub             |

---

## Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Node.js + Express
     │
     │ Prisma ORM
     ▼
PostgreSQL
```

Authentication is handled using JWT tokens, while passwords are securely hashed with bcrypt.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | Authenticate a user |

### Tasks

| Method   | Endpoint         | Description         |
| -------- | ---------------- | ------------------- |
| `GET`    | `/api/tasks`     | Retrieve user tasks |
| `POST`   | `/api/tasks`     | Create a task       |
| `PUT`    | `/api/tasks/:id` | Update a task       |
| `DELETE` | `/api/tasks/:id` | Delete a task       |

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL database or Neon account

### Installation

Clone the repository:

```bash
git clone https://github.com/fahimaAzizi/First-Full-Stack-Web-App-.git
cd F3-task-manager
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### Environment Variables

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

> Keep `.env` files private and never commit your secrets to GitHub.

### Database Setup

From the `server` directory:

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Application

Start the backend:

```bash
npm start
```

Then start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

---

## Testing

The following functionality has been tested locally:

* User registration
* User login
* JWT authentication
* Protected API routes
* Task creation
* Task editing
* Task completion
* Task deletion
* Database persistence
* Frontend and backend communication
* Responsive interface

---

## Project Status

**Status: Completed — Local Development**

The complete application is functional and tested locally.

Deployment was not completed because the selected hosting provider required a payment card. The project remains available for local development and testing.

---

## Key Learning Outcomes

This project provided practical experience with:

* Full-stack application architecture
* React development
* REST API design
* Express.js
* PostgreSQL
* Prisma ORM
* JWT authentication
* Password security
* CRUD operations
* Database migrations
* Environment variables
* Git and GitHub
* Debugging frontend/backend integration

---

## Repository

**GitHub:**
https://github.com/fahimaAzizi/First-Full-Stack-Web-App-

---

**F3 · First Full-Stack Web App**

*Built with React · Node.js · Express · Prisma · PostgreSQL*
