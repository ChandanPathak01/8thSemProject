import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
  const [data, setData] = useState({
    name: '',
    role: '',
    hod: '',
    department: '',
    contact: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('role', data.role);
    formdata.append('hod', data.hod);
    formdata.append('department', data.department);
    formdata.append('contact', data.contact);
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:8000/userReg/register', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate('/admin-home');
      })
      .catch((err) => console.log(err));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    let updatedHod = '';
    let updatedDepartment = '';

    if (selectedRole === 'Faculty' || selectedRole === 'HOD') {
      updatedHod = data.hod;
      updatedDepartment = data.department;
    }

    setData({ ...data, role: selectedRole, hod: updatedHod, department: updatedDepartment });
  };

  const handleHodChange = (e) => {
    setData({ ...data, hod: e.target.value });
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add User</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputName' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputName'
            placeholder='Enter Name'
            autoComplete='off'
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputRole' className='form-label'>
            Designation
          </label>
          <select
            className='form-select'
            id='inputRole'
            value={data.role}
            onChange={handleRoleChange}
          >
            <option value=''>Select Role</option>
            <option value='Principal'>Principal</option>
            <option value='HOD'>HOD</option>
            <option value='Faculty'>Faculty</option>
          </select>
        </div>
        {(data.role === 'Faculty' || data.role === 'HOD') && (
          <div className='col-12'>
            <label htmlFor='inputDepartment' className='form-label'>
              Department
            </label>
            <select
              className='form-select'
              id='inputDepartment'
              value={data.department}
              onChange={(e) => setData({ ...data, department: e.target.value })}
            >
              <option value=''>Select Department</option>
              <option value='IT'>IT</option>
              <option value='ECE'>ECE</option>
              <option value='EE'>EE</option>
              <option value='ME'>ME</option>
              <option value='CE'>CE</option>
              <option value='LT'>LT</option>
              <option value='B.Pharm'>B.Pharm</option>
            </select>
          </div>
        )}
        {data.role === 'Faculty'  && (
          <div className='col-12'>
            <label htmlFor='inputHod' className='form-label'>
              Department's HOD
            </label>
            <input
              type='text'
              className='form-control'
              id='inputHod'
              placeholder='Enter HOD'
              autoComplete='off'
              value={data.hod}
              onChange={handleHodChange}
            />
          </div>
        )}
        <div className='col-12'>
          <label htmlFor='inputPhoneNo' className='form-label'>
            Contact
          </label>
          <input
            type='number'
            className='form-control'
            id='inputPhoneNo'
            placeholder='Enter contact number'
            autoComplete='off'
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputEmail4' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail4'
            placeholder='Enter Email'
            autoComplete='off'
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputPassword4' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='inputPassword4'
            placeholder='Enter Password'
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
