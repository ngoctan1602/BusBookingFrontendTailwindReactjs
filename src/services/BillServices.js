import * as BaseAPI from './BaseAPI';

export const reserve = async (data) => {
    return await BaseAPI.postItem(billServices.reserve, data);
}

export const getAllBillinUser = async (pageSize) => {
    return await BaseAPI.getItems(billServices.getAll, pageSize);
}

export const changeIsDelete = async (id) => {
    return await BaseAPI.putItem(billServices.changeIsDelete, null, id);
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
export const getRevenueStatistics = async (year) => {
    return await BaseAPI.getItems(billServices.revenueStatistics, year);
}

export const paymentDirec = async (data) => {
    return await BaseAPI.postItem(billServices.paymentDirect, data);
}

export const paymentPaypal = async (data) => {
    return await BaseAPI.postItem(billServices.paymentPaypal, data);
}
const billServices = {
    reserve: "bills/reserve",
    getAll: "bills/getAll",
    changeIsDelete: 'bills/changeIsDelete',
    isDelete: "bills/getAllInDeleteStatus",
    isComplete: "bills/getAllInCompleteStatus",
    isWaiting: "bills/getAllInWaitingStatus",
    revenueStatistics: "bills/RevenueStatistics",
    paymentDirect: "bills/paymentDirect",
    paymentPaypal: "bills/paymentPaypal",
}