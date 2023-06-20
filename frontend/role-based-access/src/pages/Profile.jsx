import React, { useEffect, useState } from 'react';
import axios from 'axios';
 

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:8000/userProfile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setProfileData(res.data.details);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      {profileData ? (
        <div className="profile-details">
          <div className="profile-field">
            <span>Name:</span>
            <span>{profileData.name}</span>
          </div>
          <div className="profile-field">
            <span>Department:</span>
            <span>{profileData.department}</span>
          </div>
          <div className="profile-field">
            <span>Email Id:</span>
            <span>{profileData.email}</span>
          </div>
          <div className="profile-field">
            <span>Role:</span>
            <span>{profileData.role}</span>
          </div>
          <div className="profile-field">
            <span>Contact No:</span>
            <span>{profileData.contactNo}</span>
          </div>
           
        </div>
      ) : (
        <div className="loading-message">Loading profile data...</div>
      )}
    </div>
  );
}

export default ProfilePage;
