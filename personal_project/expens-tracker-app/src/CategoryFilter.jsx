import React from "react";

const categories = ["All", "Food", "Transport", "Bills", "Entertainment", "Others"];

const CategoryFilter = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={filter === cat ? "active" : ""}
          onClick={() => setFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;