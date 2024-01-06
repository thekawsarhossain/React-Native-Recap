import { createSlice } from "@reduxjs/toolkit";
import { cartItem } from "./cartInterface";

const initialState: cartItem[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { cartProduct } = action.payload || {};

            const isItemExists = state.find(item => item.id === cartProduct.id);

            if (isItemExists) {
                return state.map(item => item.id === cartProduct.id ? { ...item, ...cartProduct } : item)
            } else return [...state, { ...cartProduct }]
        },
        removeFromCart: (state, action) => {
            const { payload } = action || {};

            return state.filter(item => item.id !== payload.id)
        },
        reset: () => initialState
    }
})

export const { addToCart, removeFromCart, reset } = cartSlice.actions;

export default cartSlice.reducer;