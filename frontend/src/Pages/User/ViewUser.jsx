import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../Components/UserNavbar";
export default function ViewUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    birthday: "",
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  const deleteUser = async () => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    navigate("/login"); // Redirect to home after successful deletion
  };
  const handleDeleteConfirmation = () => {
    console.log("delete button clicked");
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  const handleDeleteConfirm = () => {
    deleteUser();
    setShowModal(false);
  };
  return (
    <div className="">
      <UserNavbar id={id} username={user.username} />

      <div className="">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mt-2 mb-3">
            <span style={{ color: "red" }}>{user.username}'s</span> details
          </h2>
          <div className="card mb-4">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Username:</b> {user.username}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {user.email}
                </li>
                <li className="list-group-item">
                  <b>Birthday:</b> {user.birthday}
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link className="btn btn-primary my-2 me-2" to={`/${id}/sessions`}>
              Back to dashboard
            </Link>
            <div>
              <Link
                className="btn btn-outline-success my-2 me-2"
                to={`/editUser/${id}`}
              >
                Edit Profile
              </Link>
              <Link
                className="btn btn-outline-success my-2 me-2"
                to={`/${id}/sessions`}
              >
                View exercises
              </Link>
              <button
                className="btn btn-outline-danger"
                onClick={handleDeleteConfirmation}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete your account?</p>
            <div>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes</button>
              <button className="btn btn-outline-primary" onClick={handleDeleteCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
