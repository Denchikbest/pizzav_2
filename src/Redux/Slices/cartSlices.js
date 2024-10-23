import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

// Функция для пересчета общей суммы
const calculateTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const findItem = state.items.find((obj) => obj.id === item.id);

      if (typeof item.price === 'number') {
        if (findItem) {
          findItem.count++;
        } else {
          state.items.push({
            ...item,
            count: 1,
          });
        }

        // Пересчет общей суммы
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        // Пересчет общей суммы после уменьшения количества
        state.totalPrice = calculateTotalPrice(state.items);
      } 
    },

    removeItem(state, action) {
      // Удаляем товар по ID
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      // Пересчет общей суммы после удаления
      state.totalPrice = calculateTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const  selectCart = (state) => state.cart
export const selectCartItemById =(id) => (state) =>
  state.cart.items.find((obj) => obj.id === id)
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
