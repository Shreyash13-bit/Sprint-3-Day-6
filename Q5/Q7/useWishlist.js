import { useEffect, useState } from 'react';
const WISHLIST_KEY = 'wishlist';
const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };
  const isWished = (id) => wishlist.includes(id);
  return { wishlist, toggleWishlist, isWished };
};
export default useWishlist;
