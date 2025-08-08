import React from "react";
import { Link } from "react-router-dom";
export default function SessionCard({ date, session, onDelete }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className="date-card rounded d-flex align-items-center border border-red px-5 py-2 justify-content-between mb-4"
      style={{ width: "80vw", height: "14vh", borderWidth: "6px" }}
    >
      <div
        className="date-text"
        style={{
          fontSize: "20px",
          width: "60%",
          textDecoration: "none",
          color: "black",
        }}
      >
        <p> {formattedDate}</p>
      </div>{" "}
      <div className="buttons-container">
        <Link to={`/${session.user_id}/${session.exercise_session_id}`}>
          <button
            className="btn btn-outline-primary me-2"
          >
            View
          </button>
        </Link>
        <button
          className="btn btn-outline-danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
