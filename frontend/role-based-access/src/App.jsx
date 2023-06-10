import "./App.css";

import {  Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
 
import FacultyHome from "./pages/FacultyHome";
import { useState } from "react";
 
const [userData, setUserData] = useState();

function App() {
  return (
     
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData}/>} />
        <Route path="/admin-home" element={<AdminHome userData={userData} />} />
        <Route path="/faculty-home" element={<FacultyHome />} />
        
      </Routes>
    
  );
}

export default App;
