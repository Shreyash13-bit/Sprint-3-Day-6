import WishlistPage from './WishlistPage';
const App = () => (
  <CartProvider>
    <Router>
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> | <Link to="/wishlist">Wishlist</Link>
        <CartStatus />
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Router>
  </CartProvider>
);
