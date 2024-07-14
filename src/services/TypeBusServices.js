import * as BaseAPI from './BaseAPI';

export const getAllTypeBus = async () => {
    return await BaseAPI.getItems(typeBusServices.getAllTypeBus);
}

export const getAllTypeBusParams = async (params) => {
    return await BaseAPI.getItems(typeBusServices.getAllTypeBus, params);
}

export const createTypeBus = async (data) => {
    return await BaseAPI.postItem(typeBusServices.createTypeBus, data);
}
export const updateTypeBus = async (data) => {
    return await BaseAPI.putItem(typeBusServices.updateTypeBus, data);
}
export const find = async (params) => {
    return await BaseAPI.getItems(typeBusServices.find, params);
}

export const statistical = async () => {
    return await BaseAPI.getItems(typeBusServices.statistical, null);
}

export const statisticalByAdmin = async () => {
    return await BaseAPI.getItems(typeBusServices.statisticalByAdmin, null);
}
const typeBusServices = {
    getAllTypeBus: 'bustypes/getAll',
    createTypeBus: 'bustypes/admin/create',
    updateTypeBus: 'bustypes/admin/update',
    find: 'bustypes/find',
    statistical: 'bustypes/companies/statistical',
    statisticalByAdmin: 'bustypes/admin/statistical',
}