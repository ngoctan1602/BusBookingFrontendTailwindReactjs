import * as BaseAPI from './BaseAPI';

export const createBill = async (data) => {
    return await BaseAPI.postItem(billServices.createBill, data);
}

export const getAllBillinUser = async (pageSize) => {
    return await BaseAPI.getItems(billServices.getAll, pageSize);
}

export const getAllInDeleteStatus = async (pageSize) => {
    return await BaseAPI.getItems(billServices.isDelete, pageSize);
}

export const getAllInCompleteStatus = async (pageSize) => {
    return await BaseAPI.getItems(billServices.isComplete, pageSize);
}

export const getAllInWaitingStatus = async (pageSize) => {
    return await BaseAPI.getItems(billServices.isWaiting, pageSize);
}

const billServices = {
    createBill: "bills/create",
    getAll: "bills/getAll",
    isDelete: "bills/getAllInDeleteStatus",
    isComplete: "bills/getAllInCompleteStatus",
    isWaiting: "bills/getAllInWaitingStatus",
}