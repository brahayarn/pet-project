import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../redux/types";
import { apiClient } from "./helpers";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ search = "", page = 1 }: { search?: string; page?: number; }) => {
    try {
      const response = await apiClient.get('/items', {
        params: { page, limit: 10, ...(search ? { title: search.toLowerCase() } : {}) },
      });
      return response.data as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);
