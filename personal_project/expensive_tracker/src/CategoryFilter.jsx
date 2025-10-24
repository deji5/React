import React from "react";

export default function CategoryFilter({ current, onChange }) {
  const categories = ["All", "Food", "Transport", "Bills", "Entertainment", "Others"];

  return (
    <div className="filters">
      {categories.map((cat) => (
        <button
          key={cat}
          className={current === cat ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

