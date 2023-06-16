import React, { useState } from "react";
import Navbar from "./Navbar";

const PeopleOnLeave = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [leaveData, setLeaveData] = useState([]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/leaveList?date=${selectedDate}`);
      const data = await response.json();
      setLeaveData(data.pplList);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="filter-container">
        <form className="date-filter-form" onSubmit={handleSubmit}>
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input
            type="date"
            id="dateFilter"
            name="dateFilter"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button type="submit" className="filter-button">
            Apply
          </button>
        </form>
      </div>
      <div className="people-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((person) => (
              <tr key={person._id}>
                <td>{person.name}</td>
                <td>{person.department}</td>
                <td>{person.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeopleOnLeave;
