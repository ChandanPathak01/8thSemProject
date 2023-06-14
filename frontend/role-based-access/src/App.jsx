import "./App.css";

import {  Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
 
import FacultyHome from "./pages/FacultyHome";
 
 
 

function App() {
  return (
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome  />} />
        <Route path="/faculty-home" element={<FacultyHome />} />
        
      </Routes>
    
  );
}

export default App;
