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

  // =========================
  // CREATE TASK
  // =========================

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

  // =========================
  // START EDITING
  // =========================

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setError("");
  }

  // =========================
  // CANCEL EDITING
  // =========================

  function cancelEditing() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  }

  // =========================
  // SAVE EDIT
  // =========================

  async function saveEdit(taskId) {
    if (!editTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = await updateTask(
        token,
        taskId,
        {
          title: editTitle.trim(),
          description: editDescription.trim(),
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? data
            : task
        )
      );

      cancelEditing();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // COMPLETE / INCOMPLETE
  // =========================

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

  // =========================
  // DELETE TASK
  // =========================

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
      {/* HEADER */}

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

        {/* ADD TASK */}

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
              {adding
                ? "Adding..."
                : "Add Task"}
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

                  {editingTaskId === task.id ? (

                    /* EDIT MODE */

                    <div className="task-edit-form">

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
                          onClick={() =>
                            saveEdit(task.id)
                          }
                          disabled={saving}
                        >
                          {saving
                            ? "Saving..."
                            : "Save"}
                        </button>

                        <button
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

                        <h3>
                          {task.title}
                        </h3>

                        {task.description && (
                          <p>
                            {task.description}
                          </p>
                        )}

                        <small>
                          {task.completed
                            ? "Completed"
                            : "In progress"}
                        </small>

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
                            startEditing(task)
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteTask(
                              task.id
                            )
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