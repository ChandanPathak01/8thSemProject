import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const PeopleOnLeave = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch the leave data from your data source and set it in the leaveData state variable
    // For example:
    // const fetchData = async () => {
    //   const response = await fetch("your-api-endpoint");
    //   const data = await response.json();
    //   setLeaveData(data);
    // };
    // fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter the leave data based on the selected date
    const filtered = leaveData.filter((item) => item.date === selectedDate);
    setFilteredData(filtered);
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
        {filteredData.map((person) => (
          <div key={person.id}>{person.name}</div>
          // Render the list of people on leave based on the filteredData array
        ))}
      </div>
    </div>
  );
};

export default PeopleOnLeave;
