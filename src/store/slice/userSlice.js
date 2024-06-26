
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    previousUrl: '',
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            console.log('State after login:', state);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            console.log('State after login:', state);
        },
        setPreviousUrl: (state, action) => {
            state.previousUrl = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        resetUserState: (state) => {
            return {
                isLoggedIn: false,
                previousUrl: '',
                role: '',
            };
        },
    },
});

export const { login, logout, setPreviousUrl, setRole, resetUserState } = userSlice.actions;
export default userSlice.reducer;
