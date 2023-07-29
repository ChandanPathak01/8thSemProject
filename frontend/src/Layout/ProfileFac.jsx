import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarFac from './NavbarFac';

 

function ProfileFac() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/userProfile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setProfileData(res.data.details[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  }, [profileData]);

  return (
    <>
       <NavbarFac/>

      <div className="profile-page">
  <h2>Profile Page</h2>
  {loading ? (
    <div className="loading-message">Loading profile data...</div>
  ) : (
    profileData && (
      <div className="profile-details">
        <div className="profile-field">
          <span className="field-label">Name:</span>
          <div className="field-value-box">
            <span className="field-value">{profileData.name}</span>
          </div>
        </div>
        <div className="profile-field">
          <span className="field-label">Department:</span>
          <div className="field-value-box">
            <span className="field-value">{profileData.department}</span>
          </div>
        </div>
        <div className="profile-field">
          <span className="field-label">Email:</span>
          <div className="field-value-box">
            <span className="field-value">{profileData.email}</span>
          </div>
        </div>
        <div className="profile-field">
          <span className="field-label">Role:</span>
          <div className="field-value-box">
            <span className="field-value">{profileData.role}</span>
          </div>
        </div>
        <div className="profile-field">
          <span className="field-label">Contact:</span>
          <div className="field-value-box">
            <span className="field-value">{profileData.contact}</span>
          </div>
        </div>
      </div>
    )
  )}
</div>

    </>
  );
}

export default ProfileFac;
