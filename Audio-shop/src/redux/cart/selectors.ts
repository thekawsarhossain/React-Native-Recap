import { CartState } from "./cartInterface";

export const selectCartLength = (state: CartState) => state.cart.length;

export const selectCart = (state: CartState) => state.cart;

export const selectTotalAmount = (state: CartState) => state.cart.reduce((acc: any, item: { quantityPrice: any; }) => acc + item.quantityPrice, 0);
