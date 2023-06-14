import React from "react";
import { useRef,    } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HodHome() {
    const navRef = useRef();
    const navigate = useNavigate();
  
    const showNavbar = () => {
      navRef.current.classList.toggle("responsive_nav");
    };
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/Login');
    }
  
    return (
      <div>
        <header>
          <h3>LMS</h3>
          <nav ref={navRef}>
            <Link to="/">Leave History</Link>
            <a href="/" onClick={handleLogout}  >
              Logout
            </a>
            <button
              className="nav-btn nav-close-btn"
              onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
        <h1 class="center-heading">Welcome to HOD Dashboard</h1>
    <div className="button-container">
        <Link to="/ApplyLeave" className="apply-button">
          Apply for Leave
        </Link>
        <Link to="/" className="apply-button">
          Leave Request
        </Link>
        <Link to="/PeopleOnLeave" className="apply-button">
          People on Leave
        </Link>
      </div>
        </div>
    );
    }

export default HodHome;
