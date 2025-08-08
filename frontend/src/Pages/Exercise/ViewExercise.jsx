import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../../Components/UserNavbar";

export const ViewExercise = () => {
  const [exercise, setExercise] = useState({});
  const [username, setUsername] = useState("");

  const { user_id, exercise_id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8080/user/${user_id}`);
    setUsername(res.data.username);
  };
  useEffect(() => {
    loadExercise();
  }, []);
  const loadExercise = async () => {
    const result = await axios.get(
      `http://localhost:8080/${user_id}/exercise/${exercise_id}`
    );
    setExercise(result.data);
  };
  console.log(exercise);

  return (
    
    <div>
          <UserNavbar id={id} username={username} />

      <h1>{username}'s exercises</h1>

      <h1>
        Exercise: {exercise.exercise_name} on {exercise.date_of_exercise}
      </h1>
      <p>Sets: {exercise.sets}</p>
      <p>Reps: {exercise.repetitions}</p>
    </div>
  );
};
