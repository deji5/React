
import React from "react";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul style={styles.list}>
      {todos.map((todo) => (
        <li key={todo.id} style={styles.item}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            style={{
              ...styles.text,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#888" : "#000",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
  },
  text: {
    flex: 1,
    marginLeft: "10px",
    textAlign: "left",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default TodoList;
