import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();  
    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post("/login", credentials);
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
  return (
    <>

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
