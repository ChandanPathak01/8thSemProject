import React from "react";
import PeopleLeave from "./PeopleLeave";
import NavbarHod from "../Layout/NavbarHod";
import { Link} from "react-router-dom";
 


function HodHome() {
     

 
    return (
      <div>
         <NavbarHod/>
        <h1 class="center-heading">Welcome to HOD Dashboard</h1>
    <div className="button-container">
        <Link to="/ApplyLeaveHod" className="apply-button">
          Apply for Leave
        </Link>
        <Link to="/FacultyRequest" className="apply-button">
          Faculty Leave Request 
        </Link>
         <PeopleLeave/>
    </div>
    </div>
  );
 }
export default HodHome;
