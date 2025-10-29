import React, { useState } from "react";

const categoryColors = {
  Food: "#f3e7e7ff",
  Transport: "#d3dce6ff",
  Bills: "#eee9d7ff",
  Entertainment: "#e5ddecff",
  Others: "#b7d4b7ff",
};

const ExpenseItem = ({ expense, deleteExpense, editExpense }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(expense.description);
  const [amt, setAmt] = useState(expense.amount);

  const saveEdit = () => {
    if (!desc || amt <= 0) return alert("Invalid input");
    editExpense(expense.id, { description: desc, amount: amt });
    setIsEditing(false);
  };

  return (
    <div
      className="expense-item"
      style={{ backgroundColor: categoryColors[expense.category] }}
    >
      {isEditing ? (
        <>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input
            type="number"
            value={amt}
            onChange={(e) => setAmt(parseFloat(e.target.value))}
          />
          <button onClick={saveEdit}>💾</button>
        </>
      ) : (
        <>
          <p><strong>{expense.description}</strong></p>
          <p>₦{expense.amount.toLocaleString()}</p>
          <p>{expense.category}</p>
          <p>{expense.date}</p>
          <div className="item-actions">
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => deleteExpense(expense.id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseItem;