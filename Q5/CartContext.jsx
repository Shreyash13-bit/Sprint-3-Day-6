import React, { createContext, useReducer, useContext } from 'react';
const CartContext = createContext();
const initialState = {
  items: []
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { items: [...state.items, action.payload] };
    case 'REMOVE':
      return { items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = item => dispatch({ type: 'ADD', payload: item });
  const removeFromCart = id => dispatch({ type: 'REMOVE', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  return (
    <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
