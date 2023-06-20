import React, { useState } from 'react';
import './UserPage.css';



const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    const newUser = { ...formData };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '' });
  };

  const handleUpdateUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...formData };
    setUsers(updatedUsers);
    setFormData({ name: '', email: '' });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className="user-page">
      <h2>User Page</h2>

      <form className="user-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>

        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>

      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index}>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="user-actions">
              <button
                type="button"
                className="user-action-button update"
                onClick={() => handleUpdateUser(index)}
              >
                Update
              </button>
              <button
                type="button"
                className="user-action-button delete"
                onClick={() => handleDeleteUser(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
