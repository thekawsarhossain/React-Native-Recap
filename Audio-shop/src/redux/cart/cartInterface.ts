export interface CartState {
    cart: cartItem[];
}

export interface cartItem {
    id: number;
    name: string;
    price: number;
    featured_image: string;
    quantityPrice: number;
    amount: number;
}