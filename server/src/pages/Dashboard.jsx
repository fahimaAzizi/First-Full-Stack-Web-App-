import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const user = storedUser ? JSON.parse(storedUser) : null;

  // Load tasks
  async function loadTasks() {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }

        throw new Error(data.message || "Failed to load tasks");
      }

      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  async function handleAddTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

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

  // Toggle completed
  async function toggleTask(task) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

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

  // Delete task
  async function deleteTask(taskId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
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
            <p>No tasks yet. Add your first task!</p>
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
                        deleteTask(task.id)
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