import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [applicationForm, setApplicationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
  });

  // Mock job data
  const jobs = [
    {
      id: 1,
      position: "Frontend Developer Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$3,000 - $5,000/month",
      description: "We are looking for a React intern to join our team.",
      deadline: "2023-12-15",
      type: "Internship",
    },
    {
      id: 2,
      position: "UX Design Intern",
      company: "DesignHub",
      location: "Remote",
      salary: "$2,500 - $4,000/month",
      description: "Join our design team to create beautiful interfaces.",
      deadline: "2023-11-30",
      type: "Internship",
    },
    {
      id: 3,
      position: "Backend Engineer",
      company: "DataSystems",
      location: "New York, NY",
      salary: "$110,000 - $140,000/year",
      description: "Node.js and database expert needed.",
      deadline: "2023-12-31",
      type: "Full-time",
    },
    {
      id: 4,
      position: "Product Management Intern",
      company: "InnovateCo",
      location: "Chicago, IL",
      salary: "$3,500 - $4,500/month",
      description: "Learn product management with our experienced team.",
      deadline: "2023-12-10",
      type: "Internship",
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationForm((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted!");
    setShowLogin(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted!");
    setShowRegister(false);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      job: selectedJob,
      applicant: applicationForm,
      date: new Date().toLocaleDateString(),
      status: "Submitted",
    };
    setApplications([...applications, newApplication]);
    alert("Application submitted successfully!");
    setShowApplicationForm(false);
    setSelectedJob(null);
    setApplicationForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
    });
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span>📞 +1 (123) 456-7890</span>
              <span>✉️ contact@jobportal.com</span>
            </div>
            <div className="auth-buttons">
              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="logo">JobPortal</div>
            <div className="nav-links">
              <button
                className={activeTab === "home" ? "active" : ""}
                onClick={() => setActiveTab("home")}
              >
                Home
              </button>
              <button
                className={activeTab === "jobs" ? "active" : ""}
                onClick={() => setActiveTab("jobs")}
              >
                Jobs
              </button>
              <button
                className={activeTab === "applications" ? "active" : ""}
                onClick={() => setActiveTab("applications")}
              >
                My Applications
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === "home" && (
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>
                Find Your Dream <span>Internship</span> Today
              </h1>
              <p>
                Browse through hundreds of internship opportunities from top
                companies
              </p>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search for internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setActiveTab("jobs")}>Search</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <h2>Login to Your Account</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="primary-btn">
                Login
              </button>
            </form>
            <div className="form-footer">
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowRegister(true);
                    setShowLogin(false);
                  }}
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegister(false)}>
              &times;
            </span>
            <h2>Create an Account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={registerForm.firstName}
                  onChange={handleRegisterChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={registerForm.lastName}
                  onChange={handleRegisterChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="primary-btn">
                Register
              </button>
            </form>
            <div className="form-footer">
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setShowRegister(false);
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Section */}
      {activeTab === "jobs" && (
        <section className="jobs-section">
          <div className="container">
            <div className="section-header">
              <h2>Available Internships & Jobs</h2>
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select>
                  <option>All Types</option>
                  <option>Internship</option>
                  <option>Full-time</option>
                </select>
              </div>
            </div>

            <div className="jobs-list">
              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  <p>No jobs found matching your search criteria.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-type">{job.type}</div>
                    <div className="job-content">
                      <h3>{job.position}</h3>
                      <p className="company">{job.company}</p>
                      <div className="job-details">
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary}</span>
                        <span>⏰ Apply before {job.deadline}</span>
                      </div>
                      <p className="description">{job.description}</p>
                      <button
                        className="apply-btn"
                        onClick={() => handleApplyClick(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="modal">
          <div className="modal-content application-modal">
            <span
              className="close"
              onClick={() => setShowApplicationForm(false)}
            >
              &times;
            </span>
            <h2>Apply for {selectedJob.position}</h2>
            <p className="company-name">{selectedJob.company}</p>

            <form onSubmit={handleApplicationSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={applicationForm.firstName}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={applicationForm.lastName}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Upload Resume (PDF or DOC)</label>
              </div>
              <div className="form-group">
                <label>Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Applications Section */}
      {activeTab === "applications" && (
        <section className="applications-section">
          <div className="container">
            <h2>My Applications</h2>
            {applications.length === 0 ? (
              <div className="no-applications">
                <p>You haven't submitted any applications yet.</p>
                <button
                  className="primary-btn"
                  onClick={() => setActiveTab("jobs")}
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map((app, index) => (
                  <div key={index} className="application-card">
                    <div className="application-header">
                      <h3>{app.job.position}</h3>
                      <span className={`status ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="company">{app.job.company}</p>
                    <div className="application-details">
                      <span>Applied on: {app.date}</span>
                      <span>Location: {app.job.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>JobPortal</h3>
              <p>
                Connecting talented students with the best internship
                opportunities worldwide.
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <button onClick={() => setActiveTab("home")}>Home</button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("jobs")}>
                    Internships
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("applications")}>
                    My Applications
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <button>About Us</button>
                </li>
                <li>
                  <button>Contact</button>
                </li>
                <li>
                  <button>Privacy Policy</button>
                </li>
                <li>
                  <button>Terms of Service</button>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <button>FB</button>
                <button>TW</button>
                <button>IG</button>
                <button>LI</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
