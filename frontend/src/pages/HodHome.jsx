import React from "react";
<<<<<<< Updated upstream
import { Link } from "react-router-dom";
import PeopleLeave from "./PeopleLeave";
import NavbarHod from "../Layout/NavbarHod";
 

function HodHome() {
=======
import { useState, useEffect    } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import axios from "axios";
 

function HodHome() {
     
    const navigate = useNavigate();
  
    
    const handleLogout = async() => {
      const token = localStorage.getItem("token");
      axios
      .post(
        `http://localhost:8000/logout`,
        { },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem('token');

      navigate('/');
      })
      .catch((error) => {
        console.error("Error in logout:", error);
      });
      
    }
    const [showList, setShowList] = useState(false);
    const [leaveData, setLeaveData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [Mobile, setMobile] = useState(false)

     
    const toggleList = () => {
      setShowList(!showList);
    };
    
  
     
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let url = "http://localhost:8000/leaveList";
          if (selectedDate) {
            url += `?date=${selectedDate}`;
          }
          const response = await fetch(url);
          const data = await response.json();
          setLeaveData(data.pplList);
        } catch (error) {
          console.error("Error fetching leave data:", error);
        }
      };
  
      fetchData();
    }, [selectedDate]);

>>>>>>> Stashed changes
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
