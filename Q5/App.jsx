import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import { CartProvider, useCart } from './CartContext';
const CartStatus = () => {
  const { cart } = useCart();
  return (
    <Link to="/cart" style={{ float: 'right' }}>
      🛒 Cart ({cart.length})
    </Link>
  );
};
const App = () => (
  <CartProvider>
    <Router>
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link>
        <CartStatus />
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </CartProvider>
);
export default App;
