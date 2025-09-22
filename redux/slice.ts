import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
}
interface Productstate {
    products: Product[];
    liked: Product[];
    loading: boolean;
    error: string | null;
}
const initialState: Productstate = {
    products: [],
    liked: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://662b75c2de35f91de1585780.mockapi.io/items');
    return response.data as Product[];
});
const Productslice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleLiked: (state, action) => {
            const product = action.payload as Product;
            const index = state.liked.findIndex((p) => p.id === product.id);
            if (index >= 0) {
                state.liked.splice(index, 1);
            } else {
                state.liked.push(product);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch Products';
            });
    },
});
export const { toggleLiked } = Productslice.actions;
export default Productslice.reducer;