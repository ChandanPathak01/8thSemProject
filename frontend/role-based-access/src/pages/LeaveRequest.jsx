import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/facultyRequest", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLeaveRequests(response.data.details);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
      });
  }, []);

  const handleAction = (id, action) => {
    setIsButtonDisabled(true); // Disable both buttons

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
              <td>{request.name}</td>
              <td>{request.department}</td>
              <td>
                <div>
                  <button
                    onClick={() => handleAction(request.id, "approved")}
                    disabled={isButtonDisabled}
                    style={{ backgroundColor: "green" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(request.id, "denied")}
                    disabled={isButtonDisabled}
                    style={{ backgroundColor: "red" }}
                  >
                    Deny
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestTable;
