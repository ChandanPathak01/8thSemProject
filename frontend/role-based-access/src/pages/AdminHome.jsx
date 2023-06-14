import React from "react";
import { useRef,useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminHome() {
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(res => {
        setData(res.data.userDetails);
      })
      .catch(err => console.log(err));
  }, []);
  


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  }

  return (
    <div>
      <header>
        <h3>LMS</h3>
        <nav ref={navRef}>
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
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center mt-2'>
          <h3>User List</h3>
        </div>
        <Link to="/RegistrationForm" className='btn btn-success'>Add User</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* <th>PhoneNo</th>
                <th>Designation</th>
                <th>Department</th> */}
                <th>Role</th>
                {/* <th>Password</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    {/* <td>{user.PhoneNo}</td>
                    <td>{user.Department}</td>
                    <td>{user.Designation}</td> */}
                    {/* <td>{user.Password}</td> */}
                    <td>
                      <Link to={`/userEdit/${user.id}`} className='btn btn-primary btn-sm me-2'>edit</Link>
                       
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
