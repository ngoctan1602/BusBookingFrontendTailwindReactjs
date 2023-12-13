import * as BaseAPI from './BaseAPI';

export const createBill = async (data) => {
    return await BaseAPI.postItem(billServices.createBill, data);
}

export const getAllBillinUser = async (pageSize) => {
    return await BaseAPI.getItems(billServices.getAll, pageSize);
}

const billServices = {
    createBill: "bills/create",
    getAll: "bills/getAll",
}