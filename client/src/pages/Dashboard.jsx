import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";


function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      async function loadTasks() {
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const data = await getTasks(token);

    setTasks(data);
  } catch (error) {
    if (
      error.message === "Invalid or expired token" ||
      error.message === "Authentication required"
    ) {
      logout();
      return;
    }

    setError(error.message);
  } finally {
    setLoading(false);
  }
}

      <p>Welcome to your task manager.</p>

      <h2>My Tasks</h2>

      <p>No tasks yet.</p>

      <button>Add Task</button>

      <br />
      <br />

      <Link to="/">Logout</Link>
    </div>
  );
}

export default Dashboard;