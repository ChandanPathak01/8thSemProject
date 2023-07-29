import React from "react";
import { Link } from "react-router-dom";
import PeopleLeave from "./PeopleLeave";
import NavbarPri from "../Layout/NavbarPri";
 

function HodHome() {
    return (
      <div>
          <NavbarPri/>
        <h1 class="center-heading">Welcome to Principal Dashboard</h1>
        <div className="button-container">
        <Link to="/hodRequest" className="apply-button">
          HOD Leave Request
        </Link>
        <Link to="/hodApproved" className="apply-button">
          Faculty Leave Request
        </Link>
         <PeopleLeave/>
    </div>
    </div>
  );
 }
export default HodHome;
