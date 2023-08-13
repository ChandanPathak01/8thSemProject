import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Layout/Navbar";

function AdminHome() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.userDetails);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteUser/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setData((prev) => prev.filter((item) => item._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler = (user) => {
    navigate('/UpdateUser', {state: { user: user }})
  }

  return (
    <div>
      <Navbar />
      <div className="px-5 py-3">
        <div className="d-flex justify-content-center mt-2">
          <h3 style={{ fontWeight: "bold" }}>User List</h3>
        </div>
        <Link to="/RegistrationForm" className="btn btn-add">
          Add User
        </Link>
        <div className="mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editHandler(user)}
                    >
                      edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
