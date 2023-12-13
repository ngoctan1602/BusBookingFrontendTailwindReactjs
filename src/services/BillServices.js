import * as BaseAPI from './BaseAPI';

export const getAllBusStation = async (data) => {
    return await BaseAPI.postItem(billServices.createBill, data);
}


const billServices = {
    createBill: "bills/create"
}