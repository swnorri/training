import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQty: 0,
        initialize : false
    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQty = action.payload.totalQty || 0;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const oldItem = state.items.find(item => item.id === newItem.id);

            state.initialize = true;
            state.totalQty++;

            if (!oldItem) {
                state.items.push({
                    name: newItem.title,
                    id: newItem.id,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    qty: 1
                });
            }
            else {
                oldItem.qty++;
                oldItem.totalPrice = oldItem.totalPrice + newItem.price;
            }
        },
        delItemFmCart(state, action) {
            const itemId = action.payload;
            const oldItem = state.items.find(item => item.id === itemId);
            
            state.initialize = true;
            state.totalQty--;

            if (oldItem.qty === 1) {
                state.items = state.items.filter(item => item.id !== itemId);
            }
            else {
                oldItem.qty--;
                oldItem.totalPrice = oldItem.totalPrice - oldItem.price;
            }
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice;