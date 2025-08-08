import React from "react";
import { Link } from "react-router-dom";

export default function ExerciseComponent({ exercise, onDelete }) {
  return (
    <div className="card" style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div className="card-body">
        <h3 className="card-title">
          {exercise.exercise_name}
        </h3>
        <p className="mb-0">
          <strong>Sets: </strong>
          {exercise.sets}
        </p>
        <p>
          <strong>Repetitions: </strong>
          {exercise.repetitions}
        </p>
        <Link to={`/${exercise.user_id}/editExercise/${exercise.exercise_id}`}>
          <button className="btn btn-outline-primary">Update exercise</button>
        </Link>{" "}
        <button onClick={() => onDelete(exercise.user_id, exercise.exercise_id)} className="btn btn-outline-danger">Delete</button>

      </div>
    </div>
  );
}
