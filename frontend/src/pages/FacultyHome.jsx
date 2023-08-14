import React  from "react";
import { Link } from "react-router-dom";
import NavbarFac from "../Layout/NavbarFac";
 
import PeopleLeave from "./PeopleLeave";

function FacultyHome() {
  return (
    <div>
      <NavbarFac />
      <h1 className="center-heading">Welcome to Faculty Dashboard</h1>
      <div className="button-container">
        <Link to="/ApplyLeave" className="apply-button">
          Apply for Leave
        </Link>
         <PeopleLeave/>
      </div>
    </div>
  );
}

export default FacultyHome;

 