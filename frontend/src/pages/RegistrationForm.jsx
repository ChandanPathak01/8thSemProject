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
    biometricId: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!data.name.trim()) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    if (!data.role) {
      formIsValid = false;
      newErrors.role = 'Role is required';
    }

    if ((data.role === 'Faculty' || data.role === 'HOD') && !data.department) {
      formIsValid = false;
      newErrors.department = 'Department is required';
    }

    if (data.role === 'Faculty' && !data.hod.trim()) {
      formIsValid = false;
      newErrors.hod = 'HOD is required';
    }

    if (!data.contact.trim()) {
      formIsValid = false;
      newErrors.contact = 'Contact is required';
    }

    if (!data.email.trim()) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formIsValid = false;
      newErrors.email = 'Enter a valid email address';
    }

    if (!data.password.trim()) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[A-Z])/.test(data.password)) {
      formIsValid = false;
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[a-z])/.test(data.password)) {
      formIsValid = false;
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
      formIsValid = false;
      newErrors.password = 'Password must contain at least one special character';
    }

    if (!data.biometricId.trim()) {
      formIsValid = false;
      newErrors.biometricId = 'Biometric ID is required';
    } else if (!/^\d+$/.test(data.biometricId)) {
      formIsValid = false;
      newErrors.biometricId = 'Biometric ID should be a number';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
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
    }
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
            className={`form-control ${errors.name && 'is-invalid'}`}
            id='inputName'
            placeholder='Enter Name'
            autoComplete='off'
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>
        <div className='col-12'>
          <label htmlFor='inputRole' className='form-label'>
            Designation
          </label>
          <select
            className={`form-select ${errors.role && 'is-invalid'}`}
            id='inputRole'
            value={data.role}
            onChange={handleRoleChange}
          >
            <option value=''>Select Role</option>
            <option value='Principal'>Principal</option>
            <option value='HOD'>HOD</option>
            <option value='Faculty'>Faculty</option>
          </select>
          {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
        </div>
        {(data.role === 'Faculty' || data.role === 'HOD') && (
          <div className='col-12'>
            <label htmlFor='inputDepartment' className='form-label'>
              Department
            </label>
            <select
              className={`form-select ${errors.department && 'is-invalid'}`}
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
            {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
          </div>
        )}
        {data.role === 'Faculty' && (
          <div className='col-12'>
            <label htmlFor='inputHod' className='form-label'>
              Department's HOD
            </label>
            <input
              type='text'
              className={`form-control ${errors.hod && 'is-invalid'}`}
              id='inputHod'
              placeholder='Enter HOD'
              autoComplete='off'
              value={data.hod}
              onChange={handleHodChange}
            />
            {errors.hod && <div className='invalid-feedback'>{errors.hod}</div>}
          </div>
        )}
        <div className='col-12'>
          <label htmlFor='inputPhoneNo' className='form-label'>
            Contact
          </label>
          <input
            type='number'
            className={`form-control ${errors.contact && 'is-invalid'}`}
            id='inputPhoneNo'
            placeholder='Enter contact number'
            autoComplete='off'
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          {errors.contact && <div className='invalid-feedback'>{errors.contact}</div>}
        </div>
        <div className='col-12'>
          <label htmlFor='inputEmail' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className={`form-control ${errors.email && 'is-invalid'}`}
            id='inputEmail'
            placeholder='Enter email'
            autoComplete='off'
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
        </div>
        <div className='col-12'>
          <label htmlFor='inputBiometricId' className='form-label'>
            Biometric ID
          </label>
          <input
            type='Number'
            className={`form-control ${errors.biometricId && 'is-invalid'}`}
            id='inputBiometricId'
            placeholder='Enter biometric ID'
            autoComplete='off'
            onChange={(e) => setData({ ...data, biometricId: e.target.value })}
          />
          {errors.biometricId && <div className='invalid-feedback'>{errors.biometricId}</div>}
        </div>
        <div className='col-12'>
          <label htmlFor='inputPassword' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className={`form-control ${errors.password && 'is-invalid'}`}
            id='inputPassword'
            placeholder='Enter password'
            autoComplete='off'
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
