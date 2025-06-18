import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productsData from './products.json';
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const found = productsData.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);
  if (!product) return <p>Loading...</p>;
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      {/* Breadcrumb */}
      <nav>
        <Link to="/">Home</Link> &gt; <span>{product.title}</span>
      </nav>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width={150} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p>{product.description}</p>
      <p><strong>In Stock:</strong> {product.stock}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};
export default ProductDetail;
