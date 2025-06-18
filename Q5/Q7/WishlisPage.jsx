import React from 'react';
import productsData from './products.json';
import useWishlist from './useWishlist';
import { Link } from 'react-router-dom';
const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const wishedProducts = productsData.filter(p => wishlist.includes(p.id));
  if (wishedProducts.length === 0) return <h3>No items in your wishlist.</h3>;
  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>Wishlist</h2>
      <ul>
        {wishedProducts.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <Link to={`/products/${product.id}`}><strong>{product.title}</strong></Link> — ${product.price}
            <button onClick={() => toggleWishlist(product.id)} style={{ marginLeft: '1rem' }}>Remove ❤️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WishlistPage;
