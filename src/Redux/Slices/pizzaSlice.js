import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle', // idle | loading | success | error
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;

  // Properly format category and search parameters
  const categoryParam = category ? `&category=${category}` : '';
  const searchParam = search ? `&search=${search}` : '';

  // API call
  const { data } = await axios.get(
    `https://6691760b26c2a69f6e8fcf51.mockapi.io/items?page=${currentPage}&limit=4${categoryParam}&sortBy=${sortBy}&order=${order}${searchParam}`,
  );
  return data;
});

// Function to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error';
        state.items = [];
        console.error('Fetch failed: ', action.error.message); // Log the error for debugging
      });
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
