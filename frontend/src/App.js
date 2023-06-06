import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UserRegistrationForm from './components/UserRegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/user/login" element={<UserLogin/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/registration" element={<UserRegistrationForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
