import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Layout/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUser(props) {
  const navigate = useNavigate();
  // const { user } = props;
  const [user, setUser] = useState();
  const location = useLocation();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [biometricId, setBiometricId] = useState();

  useEffect(() => {
    console.log(location?.state?.user);
    setUser(location?.state?.user);
  },[location])

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setContact(user?.contact);
    setBiometricId(user?.biometricId);
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/editUser/${user._id}`,
        {
          name,
          email,
          contact,
          biometricId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      // Redirect or handle success as needed
      navigate(-1);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-5 py-3">
        <div className="d-flex justify-content-center mt-2">
          <h3 style={{ fontWeight: "bold" }}>Edit User Details</h3>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="biometricId" className="form-label">
              Biometric ID
            </label>
            <input
              type="text"
              className="form-control"
              id="biometricId"
              value={biometricId}
              onChange={(e) => setBiometricId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
