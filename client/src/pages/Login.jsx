import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="page">
      <h1>Login</h1>

      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Login;