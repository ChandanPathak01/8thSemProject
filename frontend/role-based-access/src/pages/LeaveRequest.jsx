
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);
<<<<<<< Updated upstream
  const navigate = useNavigate();
=======
  const token = localStorage.getItem("token");
>>>>>>> Stashed changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem("role");
    axios
<<<<<<< Updated upstream
      .get("http://localhost:8000/facultyRequest",leaveRequests, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }) // Replace with your backend route URL
      .then(response => {
        alert(response.data.message);
        if (role==='Faculty'){
        navigate('/faculty-home');
      }
      else if (role==='HOD'){
        navigate('/hod-home');
      }
      else {
        navigate('/principal-home');
      }
=======
      .get("http://localhost:8000/facultyRequest",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }) // Replace with your backend route URL
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
>>>>>>> Stashed changes
      });
  }, []);

  const handleAction = (id, action) => {
    // Update the status of the leave request with the provided ID
    const updatedRequests = leaveRequests.map((request) => {
      if (request.id === id) {
        return { ...request, status: action };
      }
      return request;
    });

    setLeaveRequests(updatedRequests);
  };

  return (
    <div className="leave-request-table">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.facultyName}</td>
              <td>{request.department}</td>
              <td>
                {request.status === "pending" ? (
                  <div>
                    <button onClick={() => handleAction(request.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(request.id, "denied")}>
                      Deny
                    </button>
                  </div>
                ) : (
                  <span>{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestTable;
