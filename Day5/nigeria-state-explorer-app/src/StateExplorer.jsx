import React, { useState } from "react";

const StatesExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const states = [
    { name: "Lagos", capital: "Ikeja", region: "South West" },
    { name: "Kano", capital: "Kano", region: "North West" },
    { name: "Rivers", capital: "Port Harcourt", region: "South South" },
    { name: "Anambra", capital: "Awka", region: "South East" },
    { name: "Plateau", capital: "Jos", region: "North Central" },
    { name: "Kaduna", capital: "Kaduna", region: "North West" },
    { name: "Oyo", capital: "Ibadan", region: "South West" },
    { name: "Enugu", capital: "Enugu", region: "South East" },
    { name: "Delta", capital: "Asaba", region: "South South" },
    { name: "Benue", capital: "Makurdi", region: "North Central" },
  ];

  // Filter states based on search and region
  const filteredStates = states.filter((state) => {
    const matchSearch =
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRegion =
      regionFilter === "All" || state.region.includes(regionFilter);
    return matchSearch && matchRegion;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Nigerian States Explorer</h2>

      <input
        type="text"
        placeholder="Search by state or capital..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "60%",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setRegionFilter("All")}>All</button>
        <button onClick={() => setRegionFilter("North")}>North</button>
        <button onClick={() => setRegionFilter("South")}>South</button>
        <button onClick={() => setRegionFilter("East")}>East</button>
        <button onClick={() => setRegionFilter("West")}>West</button>
      </div>

      {filteredStates.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredStates.map((state, index) => (
            <li
              key={index}
              style={{
                background: "#dab3b3ff",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{state.name}</strong> — Capital: {state.capital} (
              {state.region})
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "red" }}>No results found</p>
      )}

      <p>
        Showing {filteredStates.length} of {states.length} states
      </p>
    </div>
  );
};

export default StatesExplorer;
