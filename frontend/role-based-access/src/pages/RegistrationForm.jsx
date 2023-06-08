// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNo:'',
//     designation:'',
//     department:''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData); // You can perform form submission or validation here
//   };

//   return (
//     <div className="registration-form-container">
//       <form className="registration-form" onSubmit={handleSubmit}>
//         <h2>Registration User</h2>
//         <div className="form-group">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phoneno">PhoneNo:</label>
//           <input
//             type="phoneno"
//             id="phoneno"
//             name="phoneno"
//             value={formData.phoneNo}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="designation">Designation:</label>
//           <input
//             type="designation"
//             id="designation"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="department">Department:</label>
//           <input
//             type="department"
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
	const [data, setData] = useState({
		name: '',
		email: '',
    password: '',
    // phoneNo:'',
    role:''
    // department:''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		// formdata.append("phoneNo", data.phoneNo);
		formdata.append("role", data.role);
    // formdata.append("department",data.department);
	// 	formdata.append("image", data.image);
		axios.post('http://localhost:8000/userReg/register', formdata, {
			withCredentials: true // Include credentials in the request
		  }) //yha pe add user ka api hoga
		.then(res => {
			navigate('/ManageUser')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add User</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				{/* <div class="col-12">
					<label for="inputPhoneNo" class="form-label">Phone No</label>
					<input type="Number" class="form-control" id="inputPhoneNo" placeholder="Enter PhoneNo" autoComplete='off'
					onChange={e => setData({...data, phoneNo: e.target.value})}/>
				</div> */}
				<div class="col-12">
					<label for="inputRole" class="form-label">Role</label>
					<input type="text" class="form-control" id="inputRole" placeholder="Enter your Designation" autoComplete='off'
					onChange={e => setData({...data, role: e.target.value})}/>
				</div>
        {/* <div class="col-12">
					<label for="inputDepartment" class="form-label">Department</label>
					<input type="text" class="form-control" id="inputDepartment" placeholder="Enter your Department" autoComplete='off'
					onChange={e => setData({...data, department: e.target.value})}/>
				</div> */}
				{/* <div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div> */}
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default AddUser;
