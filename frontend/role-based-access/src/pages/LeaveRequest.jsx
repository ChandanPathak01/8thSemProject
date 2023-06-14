// import React, { useState } from "react";

// function LeaveRequestTable() {
//   const [leaveRequests, setLeaveRequests] = useState([]);

//   // Example leave requests data
//   const initialData = [
//     {
//       id: 1,
//       facultyName: "John Doe",
//       department: "Computer Science",
//       status: "pending",
//     },
//     {
//       id: 2,
//       facultyName: "Jane Smith",
//       department: "Mathematics",
//       status: "pending",
//     },
//     // Add more leave requests as needed
//   ];

//   useState(() => {
//     setLeaveRequests(initialData);
//   }, []);

//   const handleAction = (id, action) => {
//     // Update the status of the leave request with the provided ID
//     const updatedRequests = leaveRequests.map((request) => {
//       if (request.id === id) {
//         return { ...request, status: action };
//       }
//       return request;
//     });

//     setLeaveRequests(updatedRequests);
//   };

//   return (
//     <div>
//       <h2>Leave Requests</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Faculty Name</th>
//             <th>Department</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveRequests.map((request) => (
//             <tr key={request.id}>
//               <td>{request.facultyName}</td>
//               <td>{request.department}</td>
//               <td>
//                 {request.status === "pending" ? (
//                   <div>
//                     <button onClick={() => handleAction(request.id, "approved")}>
//                       Approve
//                     </button>
//                     <button onClick={() => handleAction(request.id, "denied")}>
//                       Deny
//                     </button>
//                   </div>
//                 ) : (
//                   <span>{request.status}</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LeaveRequestTable;






import React, { useState, useEffect } from "react";
import axios from "axios";
 
 


function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/leave-requests") // Replace with your backend route URL
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAction = (id, action) => {
    // Update the status of the leave request with the provided ID
    const updatedRequests = leaveRequests.map((request) => {
      if (request.id === id) {
        return { ...request, status: action };
      }
      return request;
    });

    setLeaveRequests(updatedRequests);
  };

  return (
    <div className="leave-request-table">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.facultyName}</td>
              <td>{request.department}</td>
              <td>
                {request.status === "pending" ? (
                  <div>
                    <button onClick={() => handleAction(request.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(request.id, "denied")}>
                      Deny
                    </button>
                  </div>
                ) : (
                  <span>{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestTable;
