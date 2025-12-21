import React from "react";
import { NavLink } from "react-router-dom";

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
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
              {/* <a className="nav-link active" href="#">
                Home
              </a> */}
            </li>
          </ul>
          <div className="d-flex gap-2">
            <NavLink className="btn btn-outline-light" to="/login">
              Login
            </NavLink>
            <NavLink className="btn btn-outline-light" to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
