import React from "react";

export default function ExpenseStats({ expenses }) {
  if (expenses.length === 0) return <div className="stats">No expenses yet.</div>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highest = Math.max(...expenses.map((e) => e.amount));
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div className="stats">
      <p><strong>Total:</strong> ₦{total.toLocaleString()}</p>
      <p><strong>Count:</strong> {expenses.length}</p>
      <p><strong>Highest:</strong> ₦{highest.toLocaleString()}</p>
      
    </div>
  );
}
