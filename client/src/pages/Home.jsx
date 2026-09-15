import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to F3 Task Manager</h1>

      <p>
        Organize your tasks and keep track of your work.
      </p>

      <div className="button-group">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;