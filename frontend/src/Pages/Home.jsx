import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    const formattedUsers = result.data.map((user) => ({
      ...user,
      birthday: formatDate(user.birthday),
    }));
    setUsers(formattedUsers);
  };

  return (
    <div>
      <div className="container">
        <div className="py-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Birthday</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.birthday}</td>
                  <td className="d-flex gap-2">
                    <Link to={`/viewUser/${user.id}`}>
                      <button className="btn btn-outline-primary">View</button>
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                    <Link to={`/editUser/${user.id}`}>
                      <button className="btn btn-outline-success">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
}
