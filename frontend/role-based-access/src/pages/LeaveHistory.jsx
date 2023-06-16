import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    // Fetch the leave history data for the current user from your data source
    // and set it in the leaveHistory state variable
    // For example:
    // const fetchLeaveHistory = async () => {
    //   const response = await fetch("your-api-endpoint");
    //   const data = await response.json();
    //   setLeaveHistory(data);
    // };
    // fetchLeaveHistory();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="leave-history-container">
        <h2>Leave History</h2>
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
                <td>{leave.dateFrom} - {leave.dateTo}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
