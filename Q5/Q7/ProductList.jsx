import React from 'react';
import { Link } from 'react-router-dom';
import productsData from './products.json';
import { useCart } from './CartContext';
import useWishlist from './useWishlist';
const ProductList = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWished } = useWishlist();
  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>All Products</h2>
      <ul>
        {productsData.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <Link to={`/products/${product.id}`}>
              <strong>{product.title}</strong>
            </Link>
            <div>Price: ${product.price}</div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => toggleWishlist(product.id)}>
              {isWished(product.id) ? '💖' : '🤍'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
