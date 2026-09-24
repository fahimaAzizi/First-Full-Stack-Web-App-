const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "F3 Task Manager API is running",
  });
});

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// =========================
// 404
// =========================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});