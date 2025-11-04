import React from "react";

export default function Header() {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="header">
      <h1>💰 Expense Tracker</h1>
      <small>{today}</small>
    </header>
  );
}

