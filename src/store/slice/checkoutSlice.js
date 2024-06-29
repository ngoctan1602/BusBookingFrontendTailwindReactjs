
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    TicketRouteDetailEndId: 0,
    TicketRouteDetailStartId: 0,
    itemsRequest: [],
    ToltalPrice: 0,
    timeCheckout: Date.now() + 1000 * 60 * 5,
    nameItems: [],
    timeItems: [],
    nameStations: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setDetail: (state, action) => {
            state.TicketRouteDetailEndId = action.payload.TicketRouteDetailEndId;
            state.TicketRouteDetailStartId = action.payload.TicketRouteDetailStartId;
            state.itemsRequest = action.payload.itemsRequest;
        },
        setNameItem: (state, action) => {
            state.nameItems = action.payload;
        },
        setTimeItem: (state, action) => {
            state.timeItems = action.payload;
        },
        setNameStation: (state, action) => {
            state.nameStations = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.ToltalPrice = action.payload;
        },
        setTimeCheckout: (state) => {
            state.timeCheckout = Date.now() + 1000 * 60 * 5;
            localStorage.setItem("TimeCheckout", Date.now() + + 1000 * 60 * 5);
        },
        setTimeCheckoutPayload: (state, action) => {
            state.timeCheckout = action.payload;
        },
        resetCheckoutState: (state) => {
            localStorage.setItem("TimeCheckout", Date.now());
            return {
                TicketRouteDetailEndId: 0,
                TicketRouteDetailStartId: 0,
                itemsRequest: [],
                ToltalPrice: 0,
                timeCheckout: Date.now(),
                nameItems: [],
                nameStations: [],
                timeItems: [],
            };
        },
    },
});

export const { setDetail, setTotalPrice, setTimeCheckout, resetCheckoutState, setTimeCheckoutPayload, setNameItem, setTimeItem, setNameStation } = checkoutSlice.actions;
export default checkoutSlice.reducer;