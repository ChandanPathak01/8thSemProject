import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

function ApplyLeave() {
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    from: "",
    to: "",
    totalDays: 0,
    reason: "",
    noticeNo: "", // Added field: Notice No.
    addressDuringLeave: "", // Added field: Address during the leave
    additionalDutyArrangement: "" // Added field: Arrangement of additional duty
  });

  const [isDateValid, setIsDateValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Added state for form submission
  const [Mobile, setMobile] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "from" && value) {
      const currentDate = new Date().toISOString().split("T")[0];
      if (value < currentDate) {
        alert("Invalid date selection. Please select a date from today or onwards.");
        return;
      }
    }
    setLeaveData({
      ...leaveData,
      [name]: value
    });
    if (name === "from" || name === "to") {
      setIsDateValid(true);
    }
  };

  let navigate = useNavigate();

  const calculateTotalDays = () => {
    const { from, to } = leaveData;
    if (from && to) {
      const startDate = new Date(from);
      const endDate = new Date(to);

      if (endDate >= startDate) {
        const timeDifference = endDate.getTime() - startDate.getTime();
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        setLeaveData({
          ...leaveData,
          totalDays
        });
        setIsDateValid(true);
      } else {
        setIsDateValid(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    // Check if any field is empty
    if (!leaveData.leaveType || !leaveData.from || !leaveData.to || !leaveData.reason) {
      return;
    }

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    axios
      .post("/leaveApply", leaveData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        alert(response.data.message);
        if (role === "Faculty") {
          navigate("/faculty-home");
        } else if (role === "HOD") {
          navigate("/hod-home");
        } else {
          navigate("/principal-home");
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const isReasonValid = leaveData.reason.trim().split(/\s+/).length <= 100;
  const isSubmitDisabled =
    !leaveData.leaveType ||
    !leaveData.from ||
    !leaveData.to ||
    !leaveData.reason ||
    !isDateValid;

  return (
    <div>
      <nav className="navbar">
        <h3 className="logo">LMS</h3>
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to="/faculty-home" className="skills" key="home">
            <li>Home</li>
          </Link>
          <Link to="/LeaveHistory" className="home" key="leave-history">
            <li>Leave History</li>
          </Link>
          <Link to="/" className="skills" onClick={handleLogout} key="logout">
            <li>Logout</li>
          </Link>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
      <div className="form-container">
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="leaveType">Type of Leave:</label>
            <select
              id="leaveType"
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleInputChange}
              required // Added required attribute
            >
              <option value="">Select Leave Type</option>
              <option value="sick">SL</option>
              <option value="annual">DL</option>
              <option value="personal">Casual Leave (CL)</option>
              <option value="compansatory">Compansatory Leave (CL)</option>
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
              min={new Date().toISOString().split("T")[0]}
              required // Added required attribute
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
              min={leaveData.from || new Date().toISOString().split("T")[0]}
              required // Added required attribute
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
              required // Added required attribute
            ></textarea>
            {!isReasonValid && isFormSubmitted && (
              <div className="error-message">
                Reason should not exceed 100 words.
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="noticeNo">Notice No:</label> {/* Added field: Notice No */}
            <input
              type="text"
              id="noticeNo"
              name="noticeNo"
              value={leaveData.noticeNo}
              onChange={handleInputChange}
               // Added required attribute
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressDuringLeave">Address during the leave:</label> {/* Added field: Address during the leave */}
            <input
              type="text"
              id="addressDuringLeave"
              name="addressDuringLeave"
              value={leaveData.addressDuringLeave}
              onChange={handleInputChange}
                // Added required attribute
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalDutyArrangement">Arrangement of additional duty:</label> {/* Added field: Arrangement of additional duty */}
            <input
              type="text"
              id="additionalDutyArrangement"
              name="additionalDutyArrangement"
              value={leaveData.additionalDutyArrangement}
              onChange={handleInputChange}
               // Added required attribute
            />
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitDisabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
