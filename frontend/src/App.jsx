import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";
import ViewUser from "./Pages/User/ViewUser";
import AddExercise from "./Pages/Exercise/AddExercise";
import ViewExercises from "./Pages/Exercise/ViewExercises";
import { ViewExercise } from "./Pages/Exercise/ViewExercise";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import SessionDashboard from "./Pages/Session/SessionDashboard";
import EditExercise from "./Pages/Exercise/EditExercise";
import AddMeasurements from "./Pages/Measurements/AddMeasurements";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          {/* <Route path="/home" element={<Home />}></Route> */}
          <Route path="/:id/sessions" element={<SessionDashboard />}></Route>
          <Route path="/editUser/:id" element={<EditUser />}></Route>
          <Route path="/viewUser/:id" element={<ViewUser />}></Route>
          <Route path="/:id/addExercise" element={<AddExercise />}></Route>
          <Route path="/:user_id/:session_id" element={<ViewExercises />}></Route>
          <Route
            path="/:user_id/exercise/:exercise_id"
            element={<ViewExercise />}
          ></Route>
          <Route path="/:user_id/editExercise/:exercise_id" element={<EditExercise />}></Route>
          <Route path="/:user_id/:session_id/setMeasurements" element={<AddMeasurements />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
