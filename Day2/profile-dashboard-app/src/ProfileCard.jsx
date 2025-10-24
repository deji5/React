// ProfileCard.jsx
import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ children }) => {
  return (
    <div className="profile-card">
      {children}
    </div>
  );
};

export default ProfileCard;
