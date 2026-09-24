import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* HEADER */}

      <header className="home-header">
        <Link to="/" className="home-logo">
          <span className="logo-mark">✓</span>
          <span>F3 Task Manager</span>
        </Link>

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
        {/* HERO */}

        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              ✦ Simple · Fast · Full-Stack
            </div>

            <h1>
              Organize your work.
              <br />
              <span>Get things done.</span>
            </h1>

            <p className="hero-description">
              F3 Task Manager gives you a simple
              place to create, organize, and track
              your tasks so you can focus on what
              matters.
            </p>

            <div className="hero-buttons">
              <Link
                to="/register"
                className="primary-button"
              >
                Create Free Account →
              </Link>

              <Link
                to="/login"
                className="secondary-button"
              >
                Login
              </Link>
            </div>

            <p className="hero-note">
              No complicated setup. Just create an
              account and start.
            </p>
          </div>

          {/* HERO PREVIEW */}

          <div className="hero-preview">
            <div className="preview-window">
              <div className="preview-topbar">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span>F3 Task Manager</span>
              </div>

              <div className="preview-body">
                <div className="preview-welcome">
                  <div>
                    <small>YOUR TASKS</small>
                    <h3>Welcome back 👋</h3>
                  </div>

                  <div className="preview-avatar">
                    U
                  </div>
                </div>

                <div className="preview-stats">
                  <div>
                    <strong>6</strong>
                    <small>Total Tasks</small>
                  </div>

                  <div>
                    <strong>3</strong>
                    <small>In Progress</small>
                  </div>

                  <div>
                    <strong>3</strong>
                    <small>Completed</small>
                  </div>
                </div>

                <div className="preview-task completed-preview">
                  <span className="preview-check">
                    ✓
                  </span>

                  <div>
                    <strong>Finish project</strong>
                    <small>Completed</small>
                  </div>
                </div>

                <div className="preview-task">
                  <span className="preview-circle"></span>

                  <div>
                    <strong>Study JavaScript</strong>
                    <small>In progress</small>
                  </div>
                </div>

                <div className="preview-task">
                  <span className="preview-circle"></span>

                  <div>
                    <strong>Read a book</strong>
                    <small>In progress</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className="features-section">
          <div className="section-heading home-section-heading">
            <p className="hero-label">WHY F3?</p>

            <h2>
              Everything you need to manage tasks
            </h2>

            <p>
              A complete full-stack task manager
              designed to keep your work simple and
              organized.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>

              <h3>Task Management</h3>

              <p>
                Create tasks, add descriptions,
                complete them, edit them, and remove
                them when you're finished.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>

              <h3>Secure Accounts</h3>

              <p>
                Create your own account and keep your
                tasks separated from other users.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☁</div>

              <h3>Persistent Data</h3>

              <p>
                Your tasks are stored in PostgreSQL,
                so your work remains available after
                refreshing the page.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="cta-section">
          <div className="cta-content">
            <span className="section-label">
              GET STARTED
            </span>

            <h2>
              Ready to get organized?
            </h2>

            <p>
              Create your account and start managing
              your tasks today.
            </p>

            <Link
              to="/register"
              className="primary-button"
            >
              Create Free Account →
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="home-footer">
        <div>
          <strong>F3 Task Manager</strong>
          <span>Full-Stack Web Application</span>
        </div>

        <p>
          Built with React · Node.js · Express ·
          Prisma · PostgreSQL
        </p>
      </footer>
    </div>
  );
}

export default Home;