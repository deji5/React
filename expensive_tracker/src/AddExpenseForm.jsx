import React, { useState } from "react";

export default function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ description: "", amount: "", category: "Food" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || form.amount <= 0)
      return alert("Please fill in valid expense details!");

    onAdd({
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
    });

    setForm({ description: "", amount: "", category: "Food" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="Expense description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount (₦)"
        value={form.amount}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Others</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
