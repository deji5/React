import React from "react";

const TodoFilter = ({ current, setFilter }) => {
  const filters = ["All", "Active", "Completed"];

  return (
    <div style={styles.container}>
      <p>Filter:</p>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            ...styles.button,
            background: current === f ? "#008751" : "#f0dcdcff",
            color: current === f ? "#fff" : "#000",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "15px",
  },
  button: {
    margin: "0 4px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TodoFilter;

