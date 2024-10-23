import { configureStore } from '@reduxjs/toolkit';
import cart from './Slices/cartSlices';
import filter from './Slices/filterSlices';
import pizza from './Slices/pizzaSlice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});
