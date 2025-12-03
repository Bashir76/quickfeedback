// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">QuickFeedback</Link>
        <Link to="/items" className="nav-link">Items</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.username}</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
