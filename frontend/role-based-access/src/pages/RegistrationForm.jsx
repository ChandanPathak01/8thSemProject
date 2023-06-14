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
	 const token= localStorage.getItem('token')
		axios.post('http://localhost:8000/userReg/register', data, {
			headers:{
				'Content-Type': 'application/json',
				'Authorization':`Bearer ${token}`
			}
		  }) //yha pe add user ka api hoga
		.then(response => {
			navigate('/admin-home')
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
