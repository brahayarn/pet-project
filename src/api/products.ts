import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../redux/types";
import { BASE_URL } from "./config";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data as Product[];
});