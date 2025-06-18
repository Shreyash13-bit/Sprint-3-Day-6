import React, { useEffect, useState, useRef, useCallback } from 'react';
const API_URL = 'https://fakestoreapi.com/products';
const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
const PaginatedProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const fetchProducts = async () => {
    setLoading(true);
    const limit = 6;
    const url =
      category === 'all'
        ? `${API_URL}?limit=${limit}&skip=${(page - 1) * limit}`
        : `https://fakestoreapi.com/products/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    const newProducts = category === 'all' ? data : data.slice((page - 1) * limit, page * limit);
    setProducts(prev => (page === 1 ? newProducts : [...prev, ...newProducts]));
    setHasMore(newProducts.length === limit);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [page, category]);
  const changeCategory = (cat) => {
    setProducts([]);
    setPage(1);
    setCategory(cat);
    window.scrollTo(0, 0);
  };
  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>Paginated Products</h2>
      <div style={{ marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            style={{
              marginRight: '0.5rem',
              background: category === cat ? '#333' : '#ccc',
              color: '#fff',
              padding: '0.4rem 0.8rem'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul>
        {products.map((product, idx) => (
          <li
            key={product.id}
            ref={idx === products.length - 1 ? lastItemRef : null}
            style={{
              padding: '1rem',
              borderBottom: '1px solid #ddd',
              listStyle: 'none'
            }}
          >
            <strong>{product.title}</strong><br />
            <img src={product.image} alt="" width="100" /><br />
            ${product.price}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to show.</p>}
    </div>
  );
};
export default PaginatedProductList;
