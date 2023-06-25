import "./App.css";
import React from 'react';
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import AdminHome from './pages/AdminHome';
import UserPage from './pages/UserPage';
import Profile from './pages/Profile';
import ProfileFac from "./pages/ProfileFac";
import ManageUser from './pages/ManageUser';
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Login';
import FacultyHome from './pages/FacultyHome';
import ApplyLeave from './pages/ApplyLeave';
import LeaveHistory from './pages/LeaveHistory';
import HodHome from './pages/HodHome';
import FacultyRequest from './pages/FacultyRequest';
import HodRequest from './pages/HodRequest';
import HodApproved from './pages/HodApproved';
import PrincipalHome from './pages/PrincipalHome';
import Navbar from "./pages/Navbar";
import NavbarFac from "./pages/NavbarFac";
// import ProtectedRoute from './ProtectedRoute';
 

 

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/ManageUser" element={<ManageUser />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/faculty-home" element={<FacultyHome />} />
        <Route path="/NavbarFac" element={<NavbarFac/>}/>
        <Route path="/ApplyLeave" element={<ApplyLeave />} />
        {/* <Route path="/PeopleOnLeave" element={<PeopleOnLeave/>}/>  */}
        <Route path='/leaveHistory' element={<LeaveHistory/>}/>
        <Route path='/hod-home'  element={<HodHome/>}/>
        <Route path='/principal-home'  element={<PrincipalHome/>}/>
        <Route path='/FacultyRequest' element={<FacultyRequest/>}/>
        <Route path='/hodRequest' element={<HodRequest/>}/>
        <Route path='/hodApproved' element={<HodApproved/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path="/ProfileFac" element={<ProfileFac/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
