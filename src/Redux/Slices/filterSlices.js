import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  Sort: {
    name: 'популярности', // popularity
    sortProperty: 'rating',
  },
};

const filterSlices = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.Sort = action.payload;
    },
    // The missing reducers should be placed inside the `reducers` object.
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.Sort = action.payload.Sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

// Selectors
export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.Sort;

// Exporting the actions and reducer
export const { setCategoryId, setSort, setCurrentPage, setFilter, setSearchValue } =
  filterSlices.actions;

export default filterSlices.reducer;
