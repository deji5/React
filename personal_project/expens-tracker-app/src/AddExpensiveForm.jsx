import React, { useState } from "react";

const AddExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || amount <= 0) return alert("Enter valid expense details");

    const newExpense = {
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split("T")[0],
    };
    addExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Others</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;