import React from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import UserNavbar from '../../Components/UserNavbar';

export default function EditUser() {
    let navigate = useNavigate();
    const {id} = useParams()
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      birthday: "",
    });
  
    const { username, email, password, birthday } = user;
    const onInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    useEffect(()=>{
        loadUser()
    }, [])

    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/user/${id}`, user);
      navigate(`/viewUser/${id}`);
    };

    const loadUser = async (e) => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }
  
    return (
      <div>
        <UserNavbar username={username}/>
        <div>
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit User</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Username
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
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
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
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
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
                <label htmlFor="birthday" className="form-label">
                  Birthday
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link to="/home" className="btn btn-outline-danger mx-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}