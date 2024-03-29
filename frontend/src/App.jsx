import "./App.css";
import React from 'react';
import {Routes, Route, BrowserRouter } from "react-router-dom";
import AdminHome from './pages/AdminHome';
import UserPage from './pages/UserPage';
import ProfileFac from "./Layout/ProfileFac";
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
import Navbar from './Layout/Navbar';
import NavbarFac from "./Layout/NavbarFac";
// import ProtectedRoute from './ProtectedRoute';
import ProfileHod from './Layout/ProfileHod';
import HodLeaveHistory from './pages/HodLeaveHistory';
import ApplyLeaveHod from './pages/ApplyLeaveHod';
import ProfilePri from './Layout/ProfilePri';
import PeopleOnLeave from "./pages/PeopleOnLeave";
import PeopleLeave from "./pages/PeopleLeave";
import NavbarHod from "./Layout/NavbarHod";
import NavbarPri from "./Layout/NavbarPri";
import UpdateUser from "./pages/UpdateUser";
import ChangePass from './pages/ChangePass';

 

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
        <Route path="/PeopleOnLeave" element={<PeopleOnLeave/>}/> 
        <Route path='/leaveHistory' element={<LeaveHistory/>}/>
        <Route path='/hod-home'  element={<HodHome/>}/>
        <Route path='/principal-home'  element={<PrincipalHome/>}/>
        <Route path='/FacultyRequest' element={<FacultyRequest/>}/>
        <Route path='/hodRequest' element={<HodRequest/>}/>
        <Route path='/hodApproved' element={<HodApproved/>}/>
        <Route path="/ProfileFac" element={<ProfileFac/>}/>
        <Route path="/ProfileHod" element={<ProfileHod/>}/>
        <Route path="/HodLeaveHistory" element={<HodLeaveHistory/>}/>
        <Route path="/ProfilePri" element={<ProfilePri/>}/>
        <Route path="/ApplyLeaveHod" element={<ApplyLeaveHod/>}/>
        <Route path="/PeopleLeave" element={<PeopleLeave/>}/>
        <Route path="/NavbarHod" element={<NavbarHod/>}/>
        <Route path="/NavbarPri" element={<NavbarPri/>}/>
        <Route path="/UpdateUser" element={<UpdateUser/>}/>
        <Route path="/change-pass" element={<ChangePass/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
