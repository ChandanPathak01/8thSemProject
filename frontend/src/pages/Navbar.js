import React, { useState } from "react"
import "./navbar.css"
 
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false)

  const navigate = useNavigate();
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
          <Link to='/' className='home'>
            <li>People On Leave</li>
          </Link>
           
          <Link to='/skills' className='skills' onClick={handleLogout}>
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
    </>
  )
}
export default Navbar