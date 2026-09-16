import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServerMessage } from "../services/api";

function Home() {
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function connectToServer() {
      try {
        const data = await getServerMessage();
        setServerMessage(data.message);
      } catch (error) {
        setError("Could not connect to the backend server.");
      }
    }

    connectToServer();
  }, []);

  return (
    <div className="page">
      <h1>Welcome to F3 Task Manager</h1>

      <p>
        Organize your tasks and keep track of your work.
      </p>

      {serverMessage && (
        <p>
          <strong>Backend:</strong> {serverMessage}
        </p>
      )}

      {error && <p>{error}</p>}

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