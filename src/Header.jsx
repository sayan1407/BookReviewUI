import React from "react";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "#1f1f22" }}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Book Review
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
          </ul>
          <div className="d-flex gap-2">
            <a className="btn btn-outline-light" href="#">
              Login
            </a>
            <a className="btn btn-primary" href="#">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
