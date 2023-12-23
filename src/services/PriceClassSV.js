import * as BaseAPI from './BaseAPI';

export const createPriceSV = async (data) => {
    return await BaseAPI.postItem(priceClassSV.create, data);
}
export const getAllInCompany = async (params) => {
    return await BaseAPI.getItems(priceClassSV.getInCompany, params);
}

const priceClassSV = {
    create: 'PriceClassifications/Create',
    getInCompany: 'PriceClassifications/getInCompany'
}