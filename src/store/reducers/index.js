import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
export default combineReducers({
  productsReducer,
  cartReducer,
});