import React, { useState } from "react";

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [tempDesc, setTempDesc] = useState(expense.description);
  const [tempAmt, setTempAmt] = useState(expense.amount);

  const colors = {
    Food: "#FFEECC",
    Transport: "#C9E9FF",
    Bills: "#FFDADA",
    Entertainment: "#E1C8FF",
    Others: "#E8E8E8",
  };

  const saveEdit = () => {
    onEdit(expense.id, {
      ...expense,
      description: tempDesc,
      amount: Number(tempAmt),
    });
    setEditing(false);
  };

  return (
    <div className="expense" style={{ backgroundColor: colors[expense.category] }}>
      {editing ? (
        <>
          <input value={tempDesc} onChange={(e) => setTempDesc(e.target.value)} />
          <input
            type="number"
            value={tempAmt}
            onChange={(e) => setTempAmt(e.target.value)}
          />
          <button onClick={saveEdit}>💾</button>
        </>
      ) : (
        <>
          <span>{expense.description}</span>
          <span>₦{expense.amount.toLocaleString()}</span>
          <span>{expense.category}</span>
          <span>{expense.date}</span>
          <div className="actions">
            <button onClick={() => setEditing(true)}>✏️</button>
            <button onClick={() => onDelete(expense.id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}
