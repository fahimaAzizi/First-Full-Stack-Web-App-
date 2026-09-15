import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>

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