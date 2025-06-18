import React, { useState } from 'react';
import { useCart } from './CartContext';
const CartPage = () => {
  const { cart, removeFromCart, clearCart, increment, decrement } = useCart();
  const [loadingId, setLoadingId] = useState(null);
  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (cart.length === 0) return <h3>Your cart is empty.</h3>;
  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.title}</strong> — ${item.price} × {item.quantity}
            <div style={{ marginTop: '0.5rem' }}>
              <button
                onClick={() => {
                  setLoadingId(item.id);
                  decrement(item.id);
                  setTimeout(() => setLoadingId(null), 300);
                }}
                disabled={item.quantity === 1 || loadingId === item.id}
              >
                -
              </button>
              <button
                onClick={() => {
                  setLoadingId(item.id);
                  increment(item.id);
                  setTimeout(() => setLoadingId(null), 300);
                }}
                disabled={loadingId === item.id}
                style={{ marginLeft: '0.5rem' }}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: '1rem' }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotal().toFixed(2)}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};
export default CartPage;
