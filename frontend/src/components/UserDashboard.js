import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {userData.name && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          {userData.role === 'Faculty' && <p>HOD: {userData.hod}</p>}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserDashboard;
