import React, { useState } from 'react';
import './Counter.css'; // CSS file for styling

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <h2>Count: {count}</h2>
      <div className="button-group">
        <button onClick={increment}>+</button>
        <button onClick={decrement} disabled={count === 0}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
