import * as BaseAPI from './BaseAPI';

export const getAllBusOfCompany = async (busId) => {
    return await BaseAPI.getItems(seatServices.getSeatOfBus, busId);
}


const seatServices = {
    getSeatOfBus: 'seats/getAll'
}