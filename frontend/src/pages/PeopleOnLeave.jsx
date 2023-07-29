import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PeopleOnLeave() {
  const [leaveData, setLeaveData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const generatePDFContent = async () => {
  const tableElement = document.querySelector("table");
  const canvas = await html2canvas(tableElement);

  const pdf = new jsPDF("p", "pt", "a4");
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 500; // Adjust this value to fit your table size
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 40, 40, imgWidth, imgHeight);
  pdf.save("people_on_leave.pdf");
  };

  // Function to trigger the PDF download
  const downloadPDF = () => {
    generatePDFContent();
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

  // Function to generate the CSV content from leaveData
  const generateCSVContent = () => {
    let csvContent = "Name,Department,Role\n"; // CSV header
    leaveData.forEach((person) => {
      csvContent += `${person.name},${person.department},${person.role}\n`;
    });
    return csvContent;
  };

  // Function to trigger the download
  const downloadCSV = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "people_on_leave.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <Navbar />
      <div className="leave-list-container">
        <h2>List of People on Leave</h2>
        <div className="filter-container">
          <input
            type="date"
            id="dateFilter"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
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
            {leaveData.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.department}</td>
                <td>{person.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add the download button */}
      <div className="download-button">
        <button onClick={downloadCSV}>Download as CSV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
}

export default PeopleOnLeave;
