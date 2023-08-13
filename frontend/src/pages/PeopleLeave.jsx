import React, { useEffect, useState } from "react";
 

function PeopleLeave(){
    const [showList, setShowList] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const toggleList = () => {
    setShowList(!showList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/leaveList";
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
  return(
<div className="leave-list">
          <button onClick={toggleList}>People on Leave</button>
          {showList && (
            <div className="leave-list-container">
              <h2>List of People on Leave</h2>
              <div className="filter-container">
                <input
                  type="date"
                  id="dateFilter"
                  value={selectedDate}
                  onChange={event => setSelectedDate(event.target.value)}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
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
  )
}

export default PeopleLeave;


 