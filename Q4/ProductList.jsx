import React from 'react';
import { Link } from 'react-router-dom';
import productsData from './products.json';
const ProductList = () => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Product List</h2>
      <ul>
        {productsData.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <strong>{product.title}</strong> - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
