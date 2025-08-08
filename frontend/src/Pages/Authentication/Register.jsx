import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
  });

  const { username, email, password, birthday } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any input field is empty
    if (!username || !email || !password || !birthday) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/addUser", user);
  
      if (response.status === 201) {
        console.log("response: " + response.data);
        const user_id = response.data.id;
        navigate(`/${user_id}/sessions`);
      }
    } catch (error) {
      // Display specific error message for server-side validation or other errors
      setErrorMessage(error.response.data || "An error occurred.");
    }
  };
  

  return (
    <div>
      <Navbar />

      <div className="">
        <div className="col-md-4 offset-md-4 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-3">Register User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-2">
              <label htmlFor="Username" className="form-labeform-label mb-1">
                <small>Username</small>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="Email" className="form-label mb-1">
                <small>Email</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="Password" className="form-label mb-1">
                <small>Password</small>{" "}
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label mb-1">
                <small>Birthday</small>{" "}
              </label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                value={birthday}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn-outline-primary mb-3 col-12">
              Register
            </button>
          </form>
          <small>
            Already have an account? Login
            <span>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "red" }}
              >
                {" "}
                here
              </Link>
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}
