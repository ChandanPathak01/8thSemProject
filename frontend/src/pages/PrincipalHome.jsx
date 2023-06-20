import React from "react";
import { useRef,useState, useEffect    } from "react";
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
        <header>
          <h3>LMS</h3>
          <nav ref={navRef}>
            {/* <Link to="/">Leave History</Link> */}
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
