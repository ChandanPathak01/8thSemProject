import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Fetch name and department data from the route
    axios.get("http://localhost:8000/facultyRequest",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        setLeaveRequests(response.data.details);
      })
      .catch(error => {
        console.error("Error fetching leave requests:", error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

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
              <td>{request.name}</td>
              <td>{request.department}</td>
              <td>
                 
                  <div>
                    <button onClick={() => handleAction(request.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(request.id, "denied")}>
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
