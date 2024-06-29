import * as BaseAPI from './BaseAPI';

export const createPriceSV = async (data) => {
    return await BaseAPI.postItem(priceClassSV.create, data);
}
export const getAllInCompany = async (params) => {
    return await BaseAPI.getItems(priceClassSV.getInCompany, params);
}
export const getActiveInCompany = async (params) => {
    return await BaseAPI.getItems(priceClassSV.getActiveInCompany, params);
}
export const getAll = async (params) => {
    return await BaseAPI.getItems(priceClassSV.getAll, params);
}

export const ChangeIsActive = async (params) => {
    return await BaseAPI.putItem(priceClassSV.ChangeIsActive, null, params);
}
export const ChangeIsWaiting = async (params) => {
    return await BaseAPI.putItem(priceClassSV.ChangeIsWaiting, null, params);
}
export const Find = async (params) => {
    return await BaseAPI.getItems(priceClassSV.find, params);
}
const priceClassSV = {
    create: 'PriceClassifications/Create',
    getInCompany: 'PriceClassifications/getInCompany',
    getAll: 'PriceClassifications/GetAll', // của admin
    getActiveInCompany: "PriceClassifications/getActiveInCompany",
    ChangeIsActive: 'PriceClassifications/ChangeIsActive',
    ChangeIsWaiting: 'PriceClassifications/ChangeIsWaiting',
    find: 'PriceClassifications/find'
}