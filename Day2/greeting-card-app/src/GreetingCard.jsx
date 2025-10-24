import React from 'react'

function GreetingCard({ name, message, color="lightblue"}) {
    const cardStyle = {
        backgroundColor : color,
        padding: "20px",
        borderRadius: "10px",
        color: "#fff",
        textAlign: "center",
        margin: "10px 0",
    };
  return (
    <div style={cardStyle}>
        <h2>Hello, {name}!</h2>
        <p>{message}</p>
    </div>
  );
}

export default GreetingCard;