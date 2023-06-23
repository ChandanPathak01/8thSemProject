import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const onLogin = async () => {
    const credentials = {
      email,
      password,
    };

    await axios
      .post("http://localhost:8000/login", credentials)
      .then((response) => {
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('role',response.data.role);
        if (response.data.role=== "Admin") {
          navigate("/admin-home");
        } else if (response.data.role === "Faculty") {
          navigate("/faculty-home");
        }
        else if (response.data.role === "HOD") {
          navigate("/hod-home");
        }
        else if (response.data.role === "Principal") {
          navigate("/principal-home");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  {/* EMAIL INPUT */}
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="/" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={onLogin}
                  >
                    Login
                  </button>
                   
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2023. All rights reserved to MIT Muzaffarpur .
          </div>

          {/* <div>
            <a href="/" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="/" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Login;


// import React from 'react';
// import { useState } from 'react';
// import validator from 'validator';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   let navigate = useNavigate();

//   const onLogin = async () => {
//     const isValidEmail = validator.isEmail(email);
//     const isValidPassword =
//       validator.isLength(password, { min: 6 }) &&
//       /[A-Z]/.test(password) &&
//       /[a-z]/.test(password) &&
//       /[!@#$%^&*]/.test(password);

//     if (!isValidEmail) {
//       setEmailError('Please enter a valid email address.');
//       return;
//     }

//     if (!isValidPassword) {
//       setPasswordError(
//         'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.'
//       );
//       return;
//     }

//     setEmailError('');
//     setPasswordError('');

//     const credentials = {
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/login', credentials);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('role', response.data.role);
//       if (response.data.role === 'Admin') {
//         navigate('/admin-home');
//       } else if (response.data.role === 'Faculty') {
//         navigate('/faculty-home');
//       } else if (response.data.role === 'HOD') {
//         navigate('/hod-home');
//       } else if (response.data.role === 'Principal') {
//         navigate('/principal-home');
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <section className="vh-100">
//         <div className="container-fluid h-custom">
//           <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
//             <div className="col-md-9 col-lg-6 col-xl-5">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                 className="img-fluid"
//                 alt=""
//               />
//             </div>
//             <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//               <form>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="email"
//                     id="form3Example3"
//                     className={`form-control form-control-lg ${emailError && 'is-invalid'}`}
//                     placeholder="Enter a valid email address"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   {emailError && <div className="invalid-feedback">{emailError}</div>}
//                 </div>

//                 <div className="form-outline mb-3">
//                   <input
//                     type="password"
//                     id="form3Example4"
//                     className={`form-control form-control-lg ${passwordError && 'is-invalid'}`}
//                     placeholder="Enter password"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   {passwordError && <div className="invalid-feedback">{passwordError}</div>}
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="form-check mb-0">
//                     <input
//                       className="form-check-input me-2"
//                       type="checkbox"
//                       value=""
//                       id="form2Example3"
//                     />
//                     <label className="form-check-label" htmlFor="form2Example3">
//                       Remember me
//                     </label>
//                   </div>
//                   <a href="/" className="text-body">
//                     Forgot password?
//                   </a>
//                 </div>

//                 <div className="text-center text-lg-start mt-4 pt-2">
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg"
//                     style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
//                     onClick={onLogin}
//                     disabled={!email || !password}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//           <div className="text-white mb-3 mb-md-0">
//             Copyright © 2023. All rights reserved to Aditi .
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;
