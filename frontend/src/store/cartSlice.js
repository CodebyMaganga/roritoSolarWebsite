import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity: []
    },
    reducers:{
        addItem(state,action){
            const newItem = action.payload
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (!existingItem) {
                state.items.push({ ...newItem, quantity: 1 });
                state.totalQuantity++;
              } else {
                existingItem.quantity++;
              }
        },
        removeItem(state,action){
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                  state.items = state.items.filter(item => item.id !== id);
                  state.totalQuantity--;
                } else {
                  existingItem.quantity--;
                }
              }
        }
    }
})

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;