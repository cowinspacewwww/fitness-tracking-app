import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import UserNavbar from "../../Components/UserNavbar";

export default function AddMeasurements() {
  let navigate = useNavigate();
  const { user_id, session_id } = useParams();
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [measurements, setMeasurements] = useState({
    height: 0.0,
    weight: 0.0,
  });

  const { weight, height } = measurements;
  const onInputChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8080/user/${user_id}`);
    setUsername(res.data.username);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button clicked");
    if (!measurements.weight || !measurements.height) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    setErrorMessage("");
  
    try {

      const extractedDate = session_id.substring(user_id.length); // Assuming user_id is at the beginning
      const formattedDate = `${extractedDate.substring(0, 4)}-${extractedDate.substring(4, 6)}-${extractedDate.substring(6)}`;
      
      const measuredDetails = {
        user_id,
        session_id,
        measured_date: formattedDate,
        height,
        weight
      }
            console.log("Data to be sent:", measuredDetails);

      
      const response = await axios.post(`http://localhost:8080/${user_id}/${session_id}/setMeasurements`, measuredDetails)
  
      if (response.status === 201) {
        console.log("response: " + response.data);
        navigate(`/${user_id}/${session_id}`);
      }
    } catch (error) {
      setErrorMessage(error.response || "An error occurred.");
    }
  };
  

  return (
    <div>
      <UserNavbar id={user_id} username={username}/>

      <div>
        <div className="col-md-4 offset-md-4 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-3">Set Measurements</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-2">
              <label htmlFor="Weight" className="form-label mb-1">
                <small>Weight in kilograms (kg)</small>{" "}
              </label>
              <input
                type="number"
                className="form-control"
                placeholder= "Your weight in kg"
                name="weight"
                value={weight}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="Height" className="form-label mb-1">
                <small>Height in centimeters (cm)</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Your height in meters"
                name="height"
                value={height}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
            <button onClick={onSubmit} className="btn btn-outline-primary btn-block mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
