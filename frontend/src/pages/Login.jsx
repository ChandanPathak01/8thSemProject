import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showFullText, setShowFullText] = useState(false);

  let navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8000/login", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "Admin") {
        navigate("/admin-home");
      } else if (response.data.role === "Faculty") {
        navigate("/faculty-home");
      } else if (response.data.role === "HOD") {
        navigate("/hod-home");
      } else if (response.data.role === "Principal") {
        navigate("/principal-home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // const toggleReadMore = () => {
  //   setShowFullText((prev) => !prev);
  // };

  return (
    <>
      {/* <div className="login-page"> */}
      {/* <div className="background-image"  >
          <h1>Leave Management System</h1>
          {showFullText ? (
           <>  
            <p>
              In today's fast-paced world, managing leaves efficiently 
              is crucial to ensure seamless operations and maintain a harmonious work environment. This project aims to provide
              a user-friendly and responsive solution for faculty, Heads of Departments (HODs), and the Principal, empowering 
              them to manage leave applications, track leave history, and monitor the availability of staff on leave.
              The Leave Management System is a web-based application designed to revolutionize the leave application 
              and approval process within educational institutions. In today's fast-paced world, managing leaves efficiently 
              is crucial to ensure seamless operations and maintain a harmonious work environment...
            </p>
            <span className="read-more" onClick={toggleReadMore}>
              Read Less
            </span>
          </>
          ) : (
            <>
             
              <p>
                The Leave Management System is a web-based application designed to revolutionize the leave application 
                and approval process within educational institutions.  
              </p>
              <span className="read-more" onClick={toggleReadMore}>
                Read More
              </span>
            </>
             
             
          )} */}
        {/* </div> */}

        
        <div className="login-form-container">
          <div className="login-form">
            <h3>Welcome to Login Page</h3>
            <form onSubmit={onLogin}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter your Email Id"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
       
    </>
  );
};

export default Login;
