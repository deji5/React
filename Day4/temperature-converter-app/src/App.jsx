import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  const addTodo = (text) => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; 
  });

  const total = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div style={styles.container}>
      <h2>My Todo List</h2>

      <TodoInput addTodo={addTodo} />

      <TodoFilter current={filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      <div style={styles.footer}>
        <p>
          Total: {total} tasks | Completed: {completedCount}
        </p>
        <button onClick={clearCompleted} style={styles.clearBtn}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "40px auto",
    padding: "20px",
    background: "linear-gradient(90deg, rgba(237, 221, 83, 1)0%, rgba(87, 199, 133, 1) 50%,rgba(42, 123, 155, 1) 100% )",
    opacity: 0.9,
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  footer: {

    marginTop: "15px",
    fontSize: "14px",
  },
  clearBtn: {
    marginTop: "8px",
    padding: "5px 10px",
    background: "#ff6961",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


export default App
