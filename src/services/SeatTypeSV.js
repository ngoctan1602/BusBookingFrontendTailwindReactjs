import * as BaseAPI from './BaseAPI';

export const getAllSeatTypes = async (pageSize) => {
    return await BaseAPI.getItems(seatTypeSV.getAllSeatTypes, pageSize);
}
export const createSeatType = async (data) => {
    return await BaseAPI.postItem(seatTypeSV.createSeatType, data);
}
export const updateSeatTypesAdmin = async (data) => {
    return await BaseAPI.putItem(seatTypeSV.updateSeatTypesAdmin, data);
}
export const changeIsActive = async (id) => {
    return await BaseAPI.putItem(seatTypeSV.changeIsActive, null, id);
}
export const changeToDisable = async (id) => {
    return await BaseAPI.putItem(seatTypeSV.changeToDisable, null, id);
}
export const find = async(param) => {
    return await BaseAPI.getItems(seatTypeSV.find, param);
}

const seatTypeSV = {
    getAllSeatTypes: 'seatTypes/getAll',
    createSeatType: 'seatTypes/admin/create',
    updateSeatTypesAdmin: 'seatTypes/admin/update',
    changeIsActive: 'seatTypes/changeIsActive',
    changeToDisable: 'seatTypes/changeToDisable',
    find: 'seatTypes/find'
}