import { combineReducers } from 'redux';
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice"

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});