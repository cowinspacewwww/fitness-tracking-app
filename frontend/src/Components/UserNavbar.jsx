import React from "react";
import { Link } from "react-router-dom";

export default function UserNavbar({id, username}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger navbar-dark px-5 d-flex justify-content-between">
        <Link className="navbar-brand" to={`/${id}/sessions`}>
          <strong>Fitness App</strong>
        </Link>
        <div>
        <Link to={`/viewUser/${id}`}>
          <button className="btn btn-outline-light me-2">{username}</button>
        </Link>
        <Link to={`/${id}/sessions`}>
        <button className="btn btn-outline-* text-white">Dashboard</button>

        </Link>
        <Link to={"/login"}>
          <button className="btn btn-outline-* text-white">Logout</button>
        </Link>
        
        </div>

      </nav>
    </div>
  );
}
