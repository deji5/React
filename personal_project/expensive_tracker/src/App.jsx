import React, { useState } from "react";
import Header from "./components/Header";
import AddExpenseForm from "./components/AddExpenseForm";
import CategoryFilter from "./components/CategoryFilter";
import ExpenseStats from "./components/ExpenseStats";
import ExpenseList from "./components/ExpenseList";
import "./ExpenseTracker.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now(), date: new Date().toISOString().split("T")[0] }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, ...updatedExpense } : exp)));
  };

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((exp) => exp.category === filter);

  return (
    <div className="expense-tracker">
      <Header />
      <AddExpenseForm onAdd={addExpense} />
      <CategoryFilter current={filter} onFilter={setFilter} />
      <ExpenseStats expenses={filteredExpenses} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />
    </div>
  );
}


export default App
