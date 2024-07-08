
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Id: 0,
    Name: '',
    Description: '',
    TotalSeats: '',
    status: 0,
};

const typebusSlice = createSlice({
    name: 'typebus',
    initialState,
    reducers: {
        setTypeBus: (state, action) => {
            state.Id = action.payload.id;
            state.Name = action.payload.name;
            state.Description = action.payload.description;
            state.TotalSeats = action.payload.totalSeats;
            state.status = action.payload.status;
        },
        resetTypeBus: (state) => {
            return {
                Id: 0,
                Name: '',
                Description: '',
                TotalSeats: '',
                status: 0,
            };
        },
    },
});

export const { setTypeBus, resetTypeBus } = typebusSlice.actions;
export default typebusSlice.reducer;
