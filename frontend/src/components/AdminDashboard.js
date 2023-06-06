import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserRegistrationForm from './UserRegistrationForm';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating the admin login state
  useEffect(() => {
    // Check if the admin is logged in (you can replace this with your own logic)
    const isAdminLoggedIn = true; // Replace with your authentication check
    setIsLoggedIn(isAdminLoggedIn);
  }, []);

  if (!isLoggedIn) {
    // Navigate to login page if admin is not logged in
    return <Navigate to="/admin/login" />;
  }

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <UserRegistrationForm />
    </div>
  );
};

export default AdminDashboard;
