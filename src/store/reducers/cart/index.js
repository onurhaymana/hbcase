import { ADD_TO_CART, REMOVE_FROM_CART } from "../../../app-consts";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
const cartReducer = (state = initialState, action) => {
  var cart;
  switch (action.type) {
    case ADD_TO_CART:
      cart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart,
      };
    case REMOVE_FROM_CART:
      cart = state.cart.filter((product) => product.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart,
      };
    default:
      return state;
  }
};
export default cartReducer;
