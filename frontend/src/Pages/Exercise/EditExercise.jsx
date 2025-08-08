import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import UserNavbar from "../../Components/UserNavbar";

export default function EditExercise() {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    exercise_name: "",
    repetitions: 0,
    sets: 0,
    date_of_exercise: "",
  });
  const { user_id, exercise_id } = useParams();
  const { exercise_name, repetitions, sets, date_of_exercise } = exercise;
  const [updatedSessionID, setUpdatedSessionID] = useState("");

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
    updateSessionID(e.target.value);
  };
  const updateSessionID = (newDate) => {
    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return dateString.match(regex) !== null;
    };
  
    if (isValidDate(newDate)) {
      const formattedDate = new Date(newDate)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      const newSessionID = `${user_id}${formattedDate}`;
      console.log("New Session ID:", newSessionID);
  
      if (newDate !== exercise.date_of_exercise) {
        setUpdatedSessionID(newSessionID);
      } else {
        setUpdatedSessionID(exercise.session_id);
      }
    } else {
      console.error("Invalid date format");
    }
  };
  
  const [user, setUser] = useState({
    username: "",
    email: "",
    birthday: "",
  });

  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${user_id}`);
    setUser(result.data);
  };

  useEffect(() => {
    console.log("Exercise changed:", exercise);
  }, [exercise]);

  useEffect(() => {
    console.log("Updated id:", updatedSessionID);
  }, [updatedSessionID]);

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    const result = await axios.get(
      `http://localhost:8080/${user_id}/exercise/${exercise_id}`
    );
    setExercise(result.data);
    // updateSessionID(result.data.date_of_exercise); // Update session ID when loading exercise
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8080/${user_id}/exercise/${exercise_id}`,
      {
        ...exercise,
        session_id: updatedSessionID,
      }
    );

    const response = await axios.post(
      `http://localhost:8080/${user_id}/addSession`,
      {
        user_id: user_id,
        exercise_session_id: updatedSessionID,
        session_date: date_of_exercise,
      }
    );
    navigate(`/${user_id}/sessions`);
  };

  console.log(user);
  return (
    <div>
      <UserNavbar username={user.username}/>
      <div>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Exercise</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Exercise" className="form-label">
                Exercise Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter exercise"
                name="exercise_name"
                value={exercise_name}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="d-flex gap-4 w-100">
              <div className="mb-3">
                <label htmlFor="Sets" className="form-label">
                  Sets
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter number of sets"
                  name="sets"
                  value={sets}
                  onChange={(e) => onInputChange(e)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="Repetitions" className="form-label">
                  Repetitions
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter number of repetitions per set"
                  name="repetitions"
                  value={repetitions}
                  onChange={(e) => onInputChange(e)}
                ></input>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exercise_date" className="form-label">
                Date of Exercise
              </label>
              <input
                type="date"
                className="form-control"
                name="date_of_exercise"
                value={date_of_exercise}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link
              to={`/${user_id}}/sessions`}
              className="btn btn-outline-danger mx-2"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}