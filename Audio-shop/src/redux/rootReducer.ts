import { combineReducers } from 'redux';
import productsReducer from "./products/productsSlice";

export const rootReducer = combineReducers({
    products: productsReducer
});