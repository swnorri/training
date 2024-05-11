import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthed: false
    },
    reducers: {
        LOGIN(state) {
            state.isAuthed = true;
        },
        LOGOUT(state) {
            state.isAuthed = false;
        }
    }
});
export const authActions = authSlice.actions;
export default authSlice;