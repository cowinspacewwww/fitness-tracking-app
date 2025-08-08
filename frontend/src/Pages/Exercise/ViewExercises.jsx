import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExerciseComponent from "../../Components/ExerciseComponent";
import UserNavbar from "../../Components/UserNavbar";
export default function ViewExercises() {
  const [exercises, setExercises] = useState([]);
  const [username, setUsername] = useState("");
  const [sessionDate, setSessionDate] = useState(""); // New state for session date
  const [measures, setMeasures] = useState({});
  const [editableMeasures, setEditableMeasures] = useState({
    weight: "",
    height: "",
  });
  const { user_id, session_id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getMeasures();
  }, [session_id]);

  const getMeasures = async () => {
    const res = await axios.get(
      `http://localhost:8080/${user_id}/${session_id}/getMeasurements`
    );
    setMeasures(res.data);
    setEditableMeasures({
      weight: res.data.weight.toString(),
      height: res.data.height.toString(),
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMeasures({
      ...editableMeasures,
      [name]: value,
    });
  };
  const getUser = async () => {
    const res = await axios.get(`http://localhost:8080/user/${user_id}`);
    setUsername(res.data.username);
  };
  useEffect(() => {
    loadExercises();
  }, []);

  const deleteExercise = async (user_id, exercise_id) => {
    await axios.delete(
      `http://localhost:8080/${user_id}/exercise/${exercise_id}`
    );
    loadExercises();
  };

  const loadExercises = async () => {
    const result = await axios.get(
      `http://localhost:8080/${user_id}/${session_id}`
    );
    setExercises(result.data);
    const extractedDate = session_id.substring(user_id.length); // Assuming user_id is at the beginning
    const formattedDate = `${extractedDate.substring(
      0,
      4
    )}-${extractedDate.substring(4, 6)}-${extractedDate.substring(6)}`;
    setSessionDate(formattedDate);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleUpdateClick = async () => {
    try {
      const updatedMeasures = {
        ...measures,
        weight: parseFloat(editableMeasures.weight),
        height: parseFloat(editableMeasures.height),
      };

      await axios.put(
        `http://localhost:8080/${user_id}/${session_id}/updateMeasurements`,
        updatedMeasures
      );

      // Update local measures state
      setMeasures(updatedMeasures);
    } catch (error) {
      console.error("Error updating measurements:", error);
    }
  };

  return (
    <>
      <div>
        <UserNavbar id={user_id} username={username} />

        <div className="mx-5 my-3">
          <h1 className="mb-2">
            Your exercises on{" "}
            <span className="text-danger">
              {exercises.length > 0
                ? formatDate(exercises[0].date_of_exercise)
                : formatDate(sessionDate)}
            </span>
          </h1>
          <Link
            className="btn btn-outline-primary mb-4"
            to={`/${user_id}/addExercise`}
          >
            Add exercise
          </Link>
          {Object.keys(measures).length === 0 && (
            <Link
              className="btn btn-outline-success mb-4 mx-3"
              to={`/${user_id}/${session_id}/setMeasurements`}
            >
              Set your measurements for {formatDate(sessionDate)}
            </Link>
          )}

          {exercises.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {exercises.map((exercise) => (
                  <div className="col mb-4" key={exercise.exercise_id}>
                    <ExerciseComponent
                      exercise={exercise}
                      onDelete={() =>
                        deleteExercise(user_id, exercise.exercise_id)
                      }
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>You have no exercises on {formatDate(sessionDate)}</p>
          )}
          <div>
            <h3>Your measurements for today:</h3>
            {Object.keys(measures).length === 0 ? (
              <p>You have not set your measurements for today yet.</p>
            ) : (
              <div
                className="card p-3 "
                style={{
                  width: "40vw",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="d-flex gap-3 ">
                <div className="d-flex gap-2 align-items-center">
                    <label className="mb-1">
                    <small><strong>Weight (kg): </strong></small>
                    </label>
                    <input
                      className="form-control"
                      style={{ width: "5vw" }}
                      type="number"
                      defaultValue={editableMeasures.weight}
                      onChange={(e) =>
                        setEditableMeasures({
                          ...editableMeasures,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <label className="d-flex">
                      <small><strong>Height (m): </strong></small>
                    </label>
                    <input
                      className="form-control"
                      style={{ width: "5vw" }}
                      type="number"
                      defaultValue={editableMeasures.height}
                      onChange={(e) =>
                        setEditableMeasures({
                          ...editableMeasures,
                          height: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    onClick={handleUpdateClick}
                    className="btn btn-outline-primary"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
