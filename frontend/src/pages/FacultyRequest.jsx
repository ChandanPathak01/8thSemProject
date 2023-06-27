import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link ,useNavigate} from "react-router-dom";

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [disabledRows, setDisabledRows] = useState([]);
  const token = localStorage.getItem("token");
  const [Mobile, setMobile] = useState(false);
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
  }, );

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  let navigate = useNavigate();

  return (
    <>
    <nav className="navbar">
        <h3 className="logo">LMS</h3>
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to="/hod-home" className="skills" key="home">
            <li>Home</li>
          </Link>
          <Link to="/HodLeaveHistory" className="home" key="leave-history">
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
    <div className="leave-request-table">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Department</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.department}</td>
              <td>{request.reason}</td>
              <td>
                <div>
                  <button
                    onClick={() => handleAction(request._id, "Verified")}
                    disabled={disabledRows.includes(request._id)}
                    style={{ backgroundColor: "lightgreen"  , color:"white"}}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(request._id, "Denied")}
                    disabled={disabledRows.includes(request._id)}
                    style={{ backgroundColor: "lightred", color:"white" }}
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
    </>
  );
}

export default LeaveRequestTable;
