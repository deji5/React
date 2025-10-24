import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Jollof Rice', price: 1500, quantity: 2 },
    { id: 2, name: 'Plantain', price: 500, quantity: 1 },
    { id: 3, name: 'Zobo Drink', price: 300, quantity: 3 },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  return (
    <div style={styles.container}>
      <h2>🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={styles.item}>
            <span>
              {item.name} - ₦{item.price.toLocaleString()} x {item.quantity} = ₦
              {(item.price * item.quantity).toLocaleString()}
            </span>
            <div style={styles.buttons}>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      <hr />

      <h3>Total: ₦{getTotal().toLocaleString()}</h3>

      {cartItems.length > 0 && (
        <button onClick={clearCart} style={styles.clearBtn}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  item: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    
  },
  buttons: {
    marginTop: '5px',
    display: 'flex',
    gap: '5px',
  },
  clearBtn: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ShoppingCart