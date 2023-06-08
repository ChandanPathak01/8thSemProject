import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">LMS</a>
        <div
          className={`navbar-mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={handleMobileMenuToggle}
        >
          <span className="navbar-mobile-menu-toggle-line"></span>
          <span className="navbar-mobile-menu-toggle-line"></span>
          <span className="navbar-mobile-menu-toggle-line"></span>
        </div>
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <li className="navbar-menu-item"><Link to="/faculty-home">Home</Link></li>
          <li className="navbar-menu-item"><Link to="/LeaveHistory">Leave History</Link></li>
          <li className="navbar-menu-item"><Link to="/">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
