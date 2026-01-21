import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Redux/authSlice";

function Header() {


  /*
  const [email, setEmail] = useState(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.email;

    }
    return null;
  })
  */
  const email = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "#1f1f22" }}
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          <img src="/favicon.png" alt="Book Review" style={{ height: "40px" }} />
        </NavLink>
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

            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/recommendation">
                Book Recommendation
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2">
            {email && (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white">Welcome {email}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
              </div>

            )
              // ) : (
              //   <>
              //     <NavLink className="btn btn-outline-light" to="/login">
              //       Login
              //     </NavLink>
              //     <NavLink className="btn btn-outline-light" to="/register">
              //       Register
              //     </NavLink>
              //   </>
              // )
            }

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
