import { useDispatch, useSelector } from "react-redux";

export const CheckCheckout = () => {
    const Order = useSelector((state) => state.checkout)
    const timeCheckout = localStorage.getItem("TimeCheckout");
    const login = useSelector((state) => state.user.isLoggedIn)
    if (login && Order.TicketRouteDetailEndId !== 0 && Order.TicketRouteDetailStartId !== 0
        && Order.itemsRequest.length !== 0
        && timeCheckout > Date.now()) {
        return true;
    }
    return false;
}

export default CheckCheckout;