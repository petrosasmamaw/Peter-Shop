import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk("products/fetchProductsByCategory", async (category) => {
  const response = await axios.get(`${URL}/category/${category}`);
  return response.data;
});

export const fetchProductsById = createAsyncThunk("products/fetchProductsById", async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // category
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      // single product
      .addCase(fetchProductsById.pending, (state) => {
        state.status = "loading";
        state.selectedProduct = null;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state) => state.products.items;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
