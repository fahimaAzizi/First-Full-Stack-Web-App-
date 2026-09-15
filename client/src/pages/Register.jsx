import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="page">
      <h1>Create Account</h1>

      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Register;