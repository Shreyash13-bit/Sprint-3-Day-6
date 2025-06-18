import React from 'react';
import { Link } from 'react-router-dom';
import productsData from './products.json';
import { useCart } from './CartContext';
const ProductList = () => {
  const { addToCart } = useCart();
  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>All Products</h2>
      <ul>
        {productsData.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', fontSize: '1.2rem' }}>
              <strong>{product.title}</strong>
            </Link>
            <div>Price: ${product.price}</div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
