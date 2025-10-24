import React from 'react'


function StateCard({ state, capital, region, population, isPopular }) {
  const regionColors = {
    'North': '#8B4513',
    'South': '#008751', 
    'East': '#FFD700',
    'West': '#4169E1'
  };
  
  return (
    <div 
      className={`state-card ${isPopular ? 'popular' : ''}`}
      style={{ borderLeft: `4px solid ${regionColors[region]}` }}
    >
      <h3>{state}</h3>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Population:</strong> {population.toLocaleString()} people</p>
      {isPopular && <div className="popular-badge">🌟 Popular Destination</div>}
    </div>
  );
}


export default StateCard