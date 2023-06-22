import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [disabledRows, setDisabledRows] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/hodRequest", {
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
    const updatedRequests = leaveRequests.map((request) => {
      if (request._id === id) {
        return { ...request, hodStatus: action };
      }
      return request;
    });

    setDisabledRows((prevDisabledRows) => [...prevDisabledRows, id]);

    axios
      .put(
        `http://localhost:8000/verify`,
        { status: action, id: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLeaveRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error updating leave status:", error);
      });
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
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.department}</td>
              <td>
                <div>
                  <button
                    onClick={() => handleAction(request._id, "Verified")}
                    disabled={disabledRows.includes(request._id)}
                    style={{ backgroundColor: "green" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(request._id, "Denied")}
                    disabled={disabledRows.includes(request._id)}
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
