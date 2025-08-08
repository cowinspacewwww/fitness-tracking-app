import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import UserNavbar from "../../Components/UserNavbar";

export default function AddExercise() {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    exercise_name: "",
    repetitions: 0,
    sets: 0,
    date_of_exercise: "",
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    birthday: "",
  });
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state

  const { exercise_name, repetitions, sets, date_of_exercise } = exercise;
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };
  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!exercise_name || !repetitions || !sets || !date_of_exercise) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    setErrorMessage(""); // Reset error message if fields are not empty


    const formattedDate = new Date(exercise.date_of_exercise)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const session_id = `${id}${formattedDate}`;

    await axios.post(`http://localhost:8080/${id}/addExercise`, {
      ...exercise,
      session_id: session_id,
    });

    const response = await axios.post(
      `http://localhost:8080/${id}/addSession`,
      {
        user_id: id,
        exercise_session_id: session_id,
        session_date: date_of_exercise,
      }
    );
    navigate(`/${id}/sessions`);
  };

  return (
    <div className="">
      <UserNavbar id={id} username={user.username} />
      <div className="">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Exercise</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          {errorMessage && (
              <div className="alert alert-danger mb-3" role="alert">
                {errorMessage}
              </div>
            )}
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
              to={`/${id}/sessions`}
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
