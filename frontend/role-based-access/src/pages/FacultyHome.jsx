import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const FacultyHome = () => {
  return (
  <div>
    <Navbar/>
    <h1 class="center-heading">Welcome to Faculty Dashboard</h1>
    <div className="button-container">
        <Link to="/ApplyLeave" className="apply-button">
          Apply for Leave
        </Link>
        <Link to="/PeopleOnLeave" className="apply-button">
          People on Leave
        </Link>
      </div>
    </div>
    );
};

export default FacultyHome;
