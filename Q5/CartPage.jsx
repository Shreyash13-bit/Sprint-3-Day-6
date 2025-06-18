import React from 'react';
import { useCart } from './CartContext';
const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  if (cart.length === 0) return <h3>Your cart is empty.</h3>;
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.title}</strong> - ${item.price}
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};
export default CartPage;
