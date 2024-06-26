
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    TicketRouteDetailEndId: 0,
    TicketRouteDetailStartId: 0,
    itemsRequest: [],
    ToltalPrice: 0,
    timeCheckout: Date.now() + 1000 + 60 * 5,
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
        setTotalPrice: (state, action) => {
            state.ToltalPrice = action.payload;
        },
        setTimeCheckout: (state, action) => {
            state.timeCheckout = action.payload;
        },
        resetCheckoutState: (state) => {
            return {
                TicketRouteDetailEndId: 0,
                TicketRouteDetailStartId: 0,
                itemsRequest: [],
                ToltalPrice: 0,
                timeCheckout: Date.now() + 1000 + 60 * 5,
            };
        },
    },
});

export const { setDetail, setTotalPrice, setTimeCheckout, resetCheckoutState } = checkoutSlice.actions;
export default checkoutSlice.reducer;