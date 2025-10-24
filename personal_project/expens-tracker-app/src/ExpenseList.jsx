import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses yet</p>
      ) : (
        expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        ))
      )}
    </div>
  );
};

export default ExpenseList;