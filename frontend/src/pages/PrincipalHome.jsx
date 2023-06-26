import React from "react";
import { useState, useEffect    } from "react";
import { FaBars} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
 
import { ImCross } from "react-icons/im"
 

function HodHome() {
     
    const navigate = useNavigate();
  
    const [Mobile, setMobile] = useState(false)

     
     
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/Login');
    }
    const [showList, setShowList] = useState(false);
    const [leaveData, setLeaveData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
  
    const toggleList = () => {
      setShowList(!showList);
    };
    
  
    const handleFilter = async () => {
      try {
        const response = await fetch(`http://localhost:8000/leaveList?date=${selectedDate}`);
        const data = await response.json();
        setLeaveData(data.pplList);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/leaveList");
          const data = await response.json();
          setLeaveData(data.pplList);
        } catch (error) {
          console.error("Error fetching leave data:", error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <div>
         <nav className='navbar'>
        <h3 className='logo'>LMS</h3>
        {/*
        if large screen ma xa bhane Mobile add huxa
        if mobile screen ma xa bhane nav-links-mobile add huxa
        */}
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
        <Link to='/ProfilePri' className='skills'>
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
        <h1 class="center-heading">Welcome to Principal Dashboard</h1>
    <div className="button-container">
        <Link to="/hodRequest" className="apply-button">
          HOD Leave Request
        </Link>
        <Link to="/hodApproved" className="apply-button">
          Faculty Leave Request
        </Link>
         

  
    <div className="leave-list">
      <button onClick={toggleList}>People on Leave</button>
      {showList && (
        <div className="leave-list-container">
          <h2>List of People on Leave</h2>
          <div className="filter-container">
            <label htmlFor="dateFilter">Filter by Date:</label>
            <input
              type="date"
              id="dateFilter"
              value={selectedDate}
              onChange={event => setSelectedDate(event.target.value)}
            />
            <button onClick={handleFilter}>Apply</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name </th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map(person => (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td>{person.department}</td>
                  <td>{person.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
  );
              }
export default HodHome;
