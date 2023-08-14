import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "/changePassword", // Your API endpoint
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      alert(response.data.message);
      // Redirect or handle success as needed
      navigate(-1);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.log(error);
       
    }
  };

  return (
    <div>
       
      <div className="container mt-5">
        <div className="card p-4">
          <h2 className="mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
          <p className="text-danger mt-3">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
