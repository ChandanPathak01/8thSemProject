import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApplyLeave() {
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
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      setLeaveData({
        ...leaveData,
        totalDays
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role);
    // console.log(token);
    axios
      .post('http://localhost:8000/leaveApply', leaveData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        alert(response.data.message);
        if (role === 'Faculty') {
          navigate('/faculty-home');
        } else if (role === 'HOD') {
          navigate('/hod-home');
        } else {
          navigate('/principal-home');
        }
      });
  };

  const isReasonValid = leaveData.reason.trim().split(/\s+/).length <= 100;

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
              className={!isReasonValid ? "invalid" : ""}
            ></textarea>
            {!isReasonValid && (
              <div className="error-message">
                Reason should not exceed 100 words.
              </div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
