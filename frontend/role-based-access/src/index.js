import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AdminHome from './pages/AdminHome';
import reportWebVitals from './reportWebVitals';
import UserPage from './pages/UserPage';
 
import ManageUser from './pages/ManageUser';
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Login';
import FacultyHome from './pages/FacultyHome';
import ApplyLeave from './pages/ApplyLeave';
// import PeopleOnLeave from './pages/PeopleOnLeave';
import LeaveHistory from './pages/LeaveHistory';
import HodHome from './pages/HodHome';
import LeaveRequest from './pages/LeaveRequest';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/ManageUser" element={<ManageUser />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/faculty-home" element={<FacultyHome />} />
        <Route path="/ApplyLeave" element={<ApplyLeave />} />
        {/* <Route path="/PeopleOnLeave" element={<PeopleOnLeave/>}/>  */}
        <Route path='/LeaveHistory' element={<LeaveHistory/>}/>
        <Route path='/HodHome'  element={<HodHome/>}/>
        <Route path='/LeaveRequest' element={<LeaveRequest/>}/>
         
           
           
           
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
