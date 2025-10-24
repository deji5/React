import React, { useState } from "react";

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo..."
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.button}>
        Add
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    marginLeft: "8px",
    padding: "8px 12px",
    background: "#4169E1",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TodoInput;
