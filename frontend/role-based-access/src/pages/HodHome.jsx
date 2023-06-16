import React from "react";
import { useRef,useState    } from "react";
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
    const [showList, setShowList] = useState(false);
    const [leaveData, setLeaveData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
  
    const toggleList = () => {
      setShowList(!showList);
    };
    
  
    const handleFilter = () => {
      // Perform filtering based on the selected date
      const filteredData = leaveData.filter(person => {
        // Assuming each person has a 'date' property representing the leave date
        return person.date === selectedDate;
      });
  
      // Update the leaveData state with the filtered data
      setLeaveData(filteredData);
    };
    
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
        <Link to="/LeaveRequest" className="apply-button">
          Leave Request
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
