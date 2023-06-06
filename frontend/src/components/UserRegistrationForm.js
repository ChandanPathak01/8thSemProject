import React, { useState } from 'react';
import axios from 'axios';

const UserRegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Faculty');
  const [hod, setHod] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleHodChange = (e) => {
    setHod(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/userReg/register', {
        name,
        email,
        password,
        role,
        hod,
      });

      // Handle successful registration (e.g., display success message, clear form fields)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
            <option value="Principal">Principal</option>
            <option value="HOD">HOD</option>
          </select>
        </div>
        {role === 'Faculty' && (
          <div>
            <label>HOD:</label>
            <input type="text" value={hod} onChange={handleHodChange} required />
          </div>
        )}
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
