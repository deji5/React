// SkillBadge.jsx
import React from 'react';
import './SkillBadge.css';

const levelColors = {
  Beginner: '#6c757d',      // Gray
  Intermediate: '#0d6efd',  // Blue
  Expert: '#1c4230ff',        // Green
};

const SkillBadge = ({ skill, level }) => {
  const color = levelColors[level] || '#6c757d';
  return (
    <span className="skill-badge" style={{ backgroundColor: color }}>
      {skill} - {level}
    </span>
  );
};

export default SkillBadge;
