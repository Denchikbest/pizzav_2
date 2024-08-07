import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Slices/filterSlices';

export const store = configureStore({
  reducer: { filter: filterReducer }
});
