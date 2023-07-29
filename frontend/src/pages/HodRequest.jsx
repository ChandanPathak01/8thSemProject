import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im"
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
  const navigate = useNavigate();
  
    const [Mobile, setMobile] = useState(false)

     
     
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/Login');
    }

  return (
    <>
    <nav className='navbar'>
    <h3 className='logo'>LMS</h3>
    {/*
    if large screen ma xa bhane Mobile add huxa
    if mobile screen ma xa bhane nav-links-mobile add huxa
    */}
    <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
    <Link to='/principal-home' className='skills'>
        <li>Home</li>
      </Link>
      <Link to='/ProfilePri' className='skills' onClick={handleLogout}>
        <li>Profile</li>
      </Link>
      <Link to='/' className='skills' onClick={handleLogout}>
        <li>Logout</li>
      </Link>
       
    </ul>
    {/* 
    whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
    */}
    <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
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
                    style={{ backgroundColor: "lightgreen" , color:"white"}}
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
