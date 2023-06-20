import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
import axios from "axios";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/leaveHistory", {
            headers: {
              'Content-Type': 'application/json',
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

  return (
    <div>
      {/* <Navbar /> */}
      <div className="leave-history-container">
        <h2>Leave History</h2>
        {loading ? (
          <div className="loading-message">Loading leave history...</div>
        ) : (
          <table className="leave-history-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Date Range</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>
                    {leave.from.slice(0,10).split('-').reverse().join('-')} to {leave.to.slice(0,10).split('-').reverse().join('-')}
                  </td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
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
