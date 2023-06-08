import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ManageUser() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getuser')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>User List</h3>
      </div>
      <Link to="/RegistrationForm" className='btn btn-success'>Add User</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNo</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.PhoneNo}</td>
                  <td>{user.Department}</td>
                  <td>{user.Designation}</td>
                  <td>{user.Password}</td>
                  <td>
                    <Link to={`/userEdit/`+user.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(user.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser;