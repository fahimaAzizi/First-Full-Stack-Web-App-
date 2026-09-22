import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="logo">
          F3 Task Manager
        </div>

        <nav className="home-nav">
          <Link to="/login">Login</Link>

          <Link
            to="/register"
            className="nav-register"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-label">
              SIMPLE · FAST · FULL-STACK
            </p>

            <h1>
              Organize your work.
              <br />
              Get things done.
            </h1>

            <p className="hero-description">
              F3 Task Manager helps you create,
              organize, and track your tasks in
              one simple place.
            </p>

            <div className="hero-buttons">
              <Link
                to="/register"
                className="primary-button"
              >
                Create Free Account
              </Link>

              <Link
                to="/login"
                className="secondary-button"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <p className="hero-label">
              FEATURES
            </p>

            <h2>
              Everything you need to manage tasks
            </h2>

            <p>
              A simple task manager built as a
              complete full-stack application.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                ✓
              </div>

              <h3>Task Management</h3>

              <p>
                Create tasks, add descriptions,
                complete them, and delete them when
                they're no longer needed.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🔒
              </div>

              <h3>Secure Accounts</h3>

              <p>
                Every user has their own account,
                and authentication keeps personal
                tasks protected.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                ☁
              </div>

              <h3>Persistent Data</h3>

              <p>
                Your tasks are stored in a real
                PostgreSQL database, so your data
                remains available after refreshing.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>
            Ready to organize your tasks?
          </h2>

          <p>
            Create your account and start managing
            your work today.
          </p>

          <Link
            to="/register"
            className="primary-button"
          >
            Get Started
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <p>
          F3 Task Manager · Full-Stack Web App
        </p>

        <p>
          Built with React, Node.js, Express,
          Prisma & PostgreSQL
        </p>
      </footer>
    </div>
  );
}

export default Home;