import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger navbar-dark px-5 d-flex justify-content-between">
        <Link className="navbar-brand" to="/register">
          <strong>Fitness App</strong>
        </Link>
        <Link to="/register">
          <button className="btn btn-outline-light">Register</button>
        </Link>
      </nav>
    </div>
  );
}
