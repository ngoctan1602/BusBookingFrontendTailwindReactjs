
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stationStart: 0,
    stationEnd: 0,
    dateTime: null,
    companyIds: [],
    timeInDays: [],
    priceIsDesc: true,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.stationStart = action.payload.stationStart;
            state.stationEnd = action.payload.stationEnd;
            state.dateTime = action.payload.dateTime;
            state.companyIds = action.payload.companyIds;
            state.timeInDays = action.payload.timeInDays;
            state.priceIsDesc = action.payload.priceIsDesc;
        },
        setSort: (state, action) => {
            state.companyIds = action.payload.companyIds;
            state.timeInDays = action.payload.timeInDays;
            state.priceIsDesc = action.payload.priceIsDesc;
        },
        resetSearch: (state) => {
            return {
                stationStart: 0,
                stationEnd: 0,
                dateTime: null,
                companyIds: [],
                timeInDays: [],
                priceIsDesc: true,
            };
        },
    },
});

export const { setSearch, setSort } = searchSlice.actions;
export default searchSlice.reducer;