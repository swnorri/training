import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        notification: null
    },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        setNotification(state, action){
            //payload expects status,title,message
            state.notification = { ...action.payload };
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;