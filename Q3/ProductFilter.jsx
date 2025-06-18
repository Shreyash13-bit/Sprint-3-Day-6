import React, { useEffect, useState, useRef } from 'react';
import productsData from './products.json';
const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const searchRef = useRef();
  useEffect(() => {
    setProducts(productsData);
    setFiltered(productsData);
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      let result = products.filter(p => {
        return (
          (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
          (!category || p.category === category) &&
          (!minPrice || p.price >= parseFloat(minPrice)) &&
          (!maxPrice || p.price <= parseFloat(maxPrice))
        );
      });
      setFiltered(result);
    }, 400);
    return () => clearTimeout(handler);
  }, [search, category, minPrice, maxPrice, products]);
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Product List</h2>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} defaultValue="">
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home">Home</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <ul>
        {filtered.map(p => (
          <li key={p.id}>
            {p.name} - {p.category} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductFilter;
