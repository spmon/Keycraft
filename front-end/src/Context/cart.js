import React, {createContext, useReducer, useContext } from 'react'; 

const CartStateContext = createContext();
const CartDispatchContext = createContext(); 

const reducer = (state, action) =>{
  switch(action.type){
    case "ADD":
      const existingItemIndex = state.findIndex(item => item.product._id === action.product._id);
      if (existingItemIndex !== -1) {
        const updatedState = state.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: (item.quantity + action.quantity > item.product.stock) ? item.product.stock : item.quantity + action.quantity
            };
          }
          return item;
        });
        return updatedState;
      } else {
        return [...state, {product: action.product, quantity: action.quantity}];
    }
    case "DELETE":
      return [...state].filter(((c) => c.product._id !== action.product._id))
    default: 
      console.log("Error in Reducer")
  }
}

export const CartProvider =({children}) =>{
  const[state, dispatch] = useReducer(reducer,[])
  return(
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export const useCart = () => useContext(CartStateContext); 
export const useDispatchCart = () => useContext(CartDispatchContext);