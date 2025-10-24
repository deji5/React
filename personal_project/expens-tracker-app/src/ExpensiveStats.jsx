import React from "react";

const ExpenseStats = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highest = expenses.length ? Math.max(...expenses.map((e) => e.amount)) : 0;
  const count = expenses.length;

  const breakdown = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div className="stats">
      <h3>📈 Statistics</h3>
      <p>Total Spent: ₦{total.toLocaleString()}</p>
      <p>Number of Expenses: {count}</p>
      <p>Highest Expense: ₦{highest.toLocaleString()}</p>
      <h4>Breakdown:</h4>
      <ul>
        {Object.entries(breakdown).map(([cat, amt]) => (
          <li key={cat}>
            {cat}: ₦{amt.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseStats;