// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const isAuthenticated = () => {
//   // Implement your own authentication logic here
//   // Check if the user has a valid token stored in localStorage
//   const token = localStorage.getItem('token');
//   return token !== null && token !== undefined;
// };

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const isUserAuthenticated = isAuthenticated();
//   const userRole = localStorage.getItem('role');

//   if (!isUserAuthenticated) {
//     return <Navigate to="/Login" replace />;
//   }

//   // Check the user's role and redirect accordingly
//   if (userRole === 'Admin' && rest.path !== '/admin-home') {
//     return <Navigate to="/admin-home" replace />;
//   }

//   if (userRole === 'Faculty' && rest.path !== '/faculty-home') {
//     return <Navigate to="/faculty-home" replace />;
//   }

//   if (userRole === 'HOD' && rest.path !== '/hod-home') {
//     return <Navigate to="/hod-home" replace />;
//   }

//   if (userRole === 'Principal' && rest.path !== '/principal-home') {
//     return <Navigate to="/principal-home" replace />;
//   }

//   return <Route {...rest} element={<Component />} />;
// };

// export default ProtectedRoute;
