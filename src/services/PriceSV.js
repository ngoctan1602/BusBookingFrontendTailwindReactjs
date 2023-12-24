import * as BaseAPI from './BaseAPI';

export const createPrice = async (data) => {
    return await BaseAPI.postItem(priceSV.create, data);
}
export const getAllInCompany = async (params) => {
    return await BaseAPI.getItems(priceSV.getInCompany, params);
}
export const getAll = async (params) => {
    return await BaseAPI.getItems(priceSV.getAll, params);
}
export const ChangeIsActive = async (params) => {
    return await BaseAPI.putItem(priceSV.ChangeIsActive, null, params);
}
export const ChangeIsWaiting = async (params) => {
    return await BaseAPI.putItem(priceSV.ChangeIsWaiting, null, params);
}

const priceSV = {
    create: 'Prices/Create',
    getInCompany: 'Prices/getInCompany',
    getAll: 'Prices/getAll',
    ChangeIsActive: 'Prices/ChangeIsActive',
    ChangeIsWaiting: 'Prices/ChangeIsWaiting'
}