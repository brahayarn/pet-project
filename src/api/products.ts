import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../redux/types";
import { BASE_URL } from "./config";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (search: string = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/items`, {
        params: search ? { title: search.toLowerCase() } : {},
      });
      return response.data as Product[];
    } catch (error: any) {
      if (error.response?.status === 404) {
        return rejectWithValue("Sorry, no matching products were found.");
      }
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);