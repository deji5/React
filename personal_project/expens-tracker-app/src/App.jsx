import React, { useState } from "react";
import Header from "./Header";
import AddExpenseForm from "./AddExpensiveForm";
import CategoryFilter from "./CategoryFilter";
import ExpenseStats from "./ExpensiveStats";
import ExpenseList from "./ExpenseList";
import "./ExpenseTracker.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updatedExpense } : exp))
    );
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  return (
    <div className="expense-tracker">
      <Header />
      <AddExpenseForm addExpense={addExpense} />
      <CategoryFilter filter={filter} setFilter={setFilter} />
      <ExpenseStats expenses={expenses} />
      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
    </div>
  );
};

export default App;
