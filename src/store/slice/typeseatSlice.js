
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    type: '',
    description: '',
    price: '',
    status: 0,
};

const typeSeateSlice = createSlice({
    name: 'typeseat',
    initialState,
    reducers: {
        setTypeSeat: (state, action) => {
            state.id = action.payload.id;
            state.type = action.payload.type;
            state.description = action.payload.description;
            state.price = action.payload.price;
            state.status = action.payload.status;
        },
        resetTypeSeat: (state) => {
            return {
                id: 0,
                type: '',
                description: '',
                price: '',
                status: 0,
            };
        },
    },
});

export const { setTypeSeat, resetTypeSeat } = typeSeateSlice.actions;
export default typeSeateSlice.reducer;
