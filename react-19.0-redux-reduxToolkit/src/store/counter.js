import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 1,
        showCounter: true
    },
    reducers: {
        INCREMENT(state) {
            state.counter++;
        },
        DECREMENT(state) {
            state.counter--;
        },
        INCREMENTBYX(state, action) {
            state.counter = state.counter + action.payload.amount;
        },
        TOGGLECOUNTER(state) {
            state.showCounter = !state.showCounter;
        }
    }
});
export const counterActions = counterSlice.actions;
export default counterSlice;