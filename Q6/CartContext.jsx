const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE':
      return {
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'INCREMENT':
      return {
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case 'DECREMENT':
      return {
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
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
  const increment = id => dispatch({ type: 'INCREMENT', payload: id });
  const decrement = id => dispatch({ type: 'DECREMENT', payload: id });
  return (
    <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, clearCart, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
};
