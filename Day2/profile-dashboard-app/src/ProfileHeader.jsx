// ProfileHeader.jsx
import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, title, avatar }) => {
  return (
    <div className="profile-header">
      <img className="avatar" src={avatar} alt={`${name}'s avatar`} />
      <h2>{name}</h2>
      <p>{title}</p>
    </div>
  );
};
  export default ProfileHeader