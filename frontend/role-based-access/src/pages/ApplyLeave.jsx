import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function ApplyLeave  ()  {
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    from: "",
    to: "",
    totalDays: 0,
    reason: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLeaveData({
      ...leaveData,
      [name]: value
    });
  };
  let navigate = useNavigate();

  const calculateTotalDays = () => {
    const { from, to } = leaveData;
    if (from && to) {
      const startDate = new Date(from);
      const endDate = new Date(to);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setLeaveData({
        ...leaveData,
        totalDays
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  
    
    try {
      const response = await fetch("http://localhost:8000/leaveApply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });
  
      if (response.ok) {
        // Leave application successful, perform any necessary actions (e.g., show success message, redirect, etc.)
      } else {
        // Leave application failed, handle the error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error applying for leave:", error);
    
  };

  return (
    <div>
     

      <div className="form-container">
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="leaveType">Type of Leave:</label>
            <select
              id="leaveType"
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleInputChange}
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="from">From:</label>
            <input
              type="date"
              id="from"
              name="from"
              value={leaveData.from}
              onChange={handleInputChange}
              onBlur={calculateTotalDays}
            />
          </div>
          <div className="form-group">
            <label htmlFor="to">To:</label>
            <input
              type="date"
              id="to"
              name="to"
              value={leaveData.to}
              onChange={handleInputChange}
              onBlur={calculateTotalDays}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalDays">Total Days:</label>
            <input
              type="number"
              id="totalDays"
              name="totalDays"
              value={leaveData.totalDays}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              name="reason"
              value={leaveData.reason}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
}
export default ApplyLeave;
