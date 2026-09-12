const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./prisma");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "F3 Task Manager API is running",
  });
});

// Database test
app.get("/api/test-db", async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    res.json({
      message: "Database connection works!",
      users: userCount,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Task routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});