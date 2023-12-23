import * as BaseAPI from './BaseAPI';

export const createPrice = async (data) => {
    return await BaseAPI.postItem(priceSV.create, data);
}
export const getAllInCompany = async (params) => {
    return await BaseAPI.getItems(priceSV.getInCompany, params);
}

const priceSV = {
    create: 'Prices/Create',
    getInCompany: 'Prices/getInCompany'
}