const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "F3 Task Manager API is running",
  });
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});