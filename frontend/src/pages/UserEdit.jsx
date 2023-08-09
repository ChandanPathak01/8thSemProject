import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/' + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put('http://localhost:8000/users/' + id, data)
      .then((res) => {
        alert("Data updated successfully!");
        navigate('/admin-home');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>ID:</label>
            <input
              type='text'
              disabled
              name='name'
              value={data._id || ''}
              className='form-control'
            />
          </div>
          <div>
          <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className='form-control'
              id="inputName"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
             
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPhoneNo" className="form-label">
              Contact
            </label>
            <input
              type="number"
              className='form-control'
              id="inputPhoneNo"
              placeholder="Enter contact number"
              autoComplete="off"
              onChange={(e) => setData({ ...data, contact: e.target.value })}
            />
             
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className='form-control'
              id="inputEmail"
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
             
          </div>
          <div className="col-md-6">
            <label htmlFor="inputBiometricId" className="form-label">
              Biometric ID
            </label>
            <input
              type="Number"
              className='form-control'
              id="inputBiometricId"
              placeholder="Enter biometric ID"
              autoComplete="off"
              onChange={(e) => setData({ ...data, biometricId: e.target.value })}
            />
             
          </div>
          <br />
          <button className='btn btn-info'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;