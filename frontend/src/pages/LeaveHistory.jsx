import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/leaveHistory", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaveHistory(response.data.details);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  const renderColumns = () => {
    if (userRole === "Faculty") {
      return (
        <>
          <th>Leave Type</th>
          <th>Date Range</th>
          <th>Reason</th>
          <th>HOD Status</th>
          <th>Principal Status</th>
        </>
      );
    } else if (userRole === "HOD") {
      return (
        <>
          <th>Leave Type</th>
          <th>Date Range</th>
          <th>Reason</th>
          <th>Status</th>
        </>
      );
    } else {
      return null;
    }
  };

  const renderStatus = (leave) => {
    if (userRole === "Faculty") {
      return (
        <>
          <td>{leave.hodStatus}</td>
          <td>{leave.status}</td>
        </>
      );
    } else if (userRole === "HOD") {
      return <td>{leave.status}</td>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className="leave-history-container">
        <h2>Leave History</h2>
        {loading ? (
          <div className="loading-message">Loading leave history...</div>
        ) : (
          <table className="leave-history-table">
            <thead>
              <tr>
                {renderColumns()}
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>
                    {leave.from.slice(0, 10).split("-").reverse().join("-")} to{" "}
                    {leave.to.slice(0, 10).split("-").reverse().join("-")}
                  </td>
                  <td>{leave.reason}</td>
                  {renderStatus(leave)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;
