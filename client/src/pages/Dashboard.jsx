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

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

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
        title: title.trim(),
        description: description.trim(),
      });

      setTasks((currentTasks) => [data, ...currentTasks]);

      setTitle("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    } finally {
      setAdding(false);
    }
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setError("");
  }

  function cancelEditing() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  }

  async function saveEdit(taskId) {
    if (!editTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = await updateTask(token, taskId, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? data : task
        )
      );

      cancelEditing();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    try {
      setError("");

      const data = await updateTask(token, task.id, {
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id ? data : currentTask
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await removeTask(token, taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      setError(error.message);
    }
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="dashboard">
      {/* HEADER */}

      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">TASK MANAGER</p>

          <h1>Welcome back, {user?.name || "User"} 👋</h1>

          <p className="dashboard-subtitle">
            Stay organized and keep moving forward.
          </p>
        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        {/* STATS */}

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📋</span>
            <div>
              <strong>{tasks.length}</strong>
              <span>Total Tasks</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <div>
              <strong>{pendingTasks}</strong>
              <span>In Progress</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div>
              <strong>{completedTasks}</strong>
              <span>Completed</span>
            </div>
          </div>
        </section>

        {/* ADD TASK */}

        <section className="task-form-section">
          <div className="section-heading">
            <div>
              <span className="section-label">CREATE</span>
              <h2>Add a New Task</h2>
            </div>
          </div>

          <form onSubmit={handleAddTask}>
            <div className="form-group">
              <label htmlFor="task-title">Task title</label>

              <input
                id="task-title"
                type="text"
                placeholder="What do you need to do?"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-description">
                Description
              </label>

              <textarea
                id="task-description"
                placeholder="Add some details..."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </div>

            <button
              className="add-task-button"
              type="submit"
              disabled={adding}
            >
              {adding ? "Adding..." : "+ Add Task"}
            </button>
          </form>
        </section>

        {/* ERROR */}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* TASKS */}

        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <span className="section-label">YOUR WORK</span>
              <h2>My Tasks</h2>
            </div>

            {tasks.length > 0 && (
              <span className="task-count">
                {tasks.length}{" "}
                {tasks.length === 1 ? "task" : "tasks"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="loading-spinner"></div>
              <p>Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>
                Add your first task above and start
                getting things done.
              </p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task.id}
                >
                  {editingTaskId === task.id ? (
                    /* EDIT MODE */

                    <div className="task-edit-form">
                      <span className="section-label">
                        EDIT TASK
                      </span>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(event) =>
                          setEditTitle(
                            event.target.value
                          )
                        }
                        placeholder="Task title"
                      />

                      <textarea
                        value={editDescription}
                        onChange={(event) =>
                          setEditDescription(
                            event.target.value
                          )
                        }
                        placeholder="Task description"
                      />

                      <div className="task-actions">
                        <button
                          className="save-button"
                          onClick={() =>
                            saveEdit(task.id)
                          }
                          disabled={saving}
                        >
                          {saving
                            ? "Saving..."
                            : "Save Changes"}
                        </button>

                        <button
                          className="cancel-button"
                          onClick={cancelEditing}
                          disabled={saving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* NORMAL MODE */

                    <>
                      <div className="task-info">
                        <div className="task-title-row">
                          <button
                            className={`complete-circle ${
                              task.completed
                                ? "checked"
                                : ""
                            }`}
                            onClick={() =>
                              toggleTask(task)
                            }
                            aria-label={
                              task.completed
                                ? "Mark incomplete"
                                : "Mark complete"
                            }
                          >
                            {task.completed ? "✓" : ""}
                          </button>

                          <h3>{task.title}</h3>
                        </div>

                        {task.description && (
                          <p>{task.description}</p>
                        )}

                        <span className="task-status">
                          {task.completed
                            ? "✓ Completed"
                            : "○ In progress"}
                        </span>
                      </div>

                      <div className="task-actions">
                        <button
                          className="complete-button"
                          onClick={() =>
                            toggleTask(task)
                          }
                        >
                          {task.completed
                            ? "Undo"
                            : "Complete"}
                        </button>

                        <button
                          className="edit-button"
                          onClick={() =>
                            startEditing(task)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
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