// ProfileStats.jsx
import React from 'react';
import './ProfileStats.css';

const ProfileStats = ({ projects, followers, following }) => {
  return (
    <div className="profile-stats">
      <span className="stat" title="Projects">Projects: {projects}</span>
      <span className="stat" title="Followers">Followers: {followers}</span>
      <span className="stat" title="Following">Following: {following}</span>
    </div>
  );
};

export default ProfileStats;
