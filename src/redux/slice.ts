import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/products';
import { initialState, Product } from './types';

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
                state.products = action.payload ?? [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch Products';
            });
    },
});
export const { toggleLiked } = Productslice.actions;
export default Productslice.reducer;