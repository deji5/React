import React from "react";

const Header = () => {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <p>{today}</p>
    </header>
  );
};

export default Header;