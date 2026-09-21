import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as removeTask,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

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
        error.message === "Authentication required" ||
        error.message === "Authentication token missing"
      ) {
        logout();
        return;
      }

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAddTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const data = await createTask(token, {
        title,
        description,
      });

      setTasks((currentTasks) => [
        data,
        ...currentTasks,
      ]);

      setTitle("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    } finally {
      setAdding(false);
    }
  }

  async function toggleTask(task) {
    try {
      setError("");

      const data = await updateTask(
        token,
        task.id,
        {
          completed: !task.completed,
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id
            ? data
            : currentTask
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      setError("");

      await removeTask(token, taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>F3 Task Manager</h1>

          <p>
            Welcome, {user?.name || "User"}!
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <section className="task-form-section">
          <h2>Add New Task</h2>

          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />

            <textarea
              placeholder="Task description (optional)"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />

            <button
              type="submit"
              disabled={adding}
            >
              {adding ? "Adding..." : "Add Task"}
            </button>
          </form>
        </section>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <section className="tasks-section">
          <h2>My Tasks</h2>

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>
              No tasks yet. Add your first task!
            </p>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed
                      ? "completed"
                      : ""
                  }`}
                  key={task.id}
                >
                  <div className="task-info">
                    <h3>{task.title}</h3>

                    {task.description && (
                      <p>{task.description}</p>
                    )}
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() =>
                        toggleTask(task)
                      }
                    >
                      {task.completed
                        ? "Mark Incomplete"
                        : "Complete"}
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteTask(task.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;