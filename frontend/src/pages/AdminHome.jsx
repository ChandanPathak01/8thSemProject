import React from "react";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from 'axios';
import Navbar from '../Layout/Navbar';

function AdminHome() {
   
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get('http://localhost:8000/users',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        setData(res.data.userDetails);
      })
      .catch(err => console.log(err));
  }, );
  
  
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteUser/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      alert(response.data.message);
      // Refresh the data after successful deletion
      
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
       <Navbar/>
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center mt-2'>
          <h3 style={{fontWeight: 'bold'}}>User List </h3>
        </div>
        <Link to="/RegistrationForm" className='btn btn-add '>Add User</Link>
        <div className='mt-3'>
        <table className='table table-bordered'>
          <thead>
            <tr>
               
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>
                    <Link
                      to={`/UserEdit/${user.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <Link
                        onClick={() => handleDelete(user._id)}
                      className="btn btn-danger btn-sm me-1"
                    >
                      Delete
                    </Link>
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