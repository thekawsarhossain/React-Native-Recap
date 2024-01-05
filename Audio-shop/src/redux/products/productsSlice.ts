import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsAPI";
import { Product } from "./productsInterface";

interface InitState {
    products: Product[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}

const initialState: InitState = {
    products: [],
    status: "idle",
    error: null
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const products = await getProducts();
    return products;
})

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = null;
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.error = null;
                state.status = "success";
                state.products = action.payload?.products ?? []
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error?.message as string;
                state.status = "failed";
                state.products = []
            })
    },
});

export default productsSlice.reducer;