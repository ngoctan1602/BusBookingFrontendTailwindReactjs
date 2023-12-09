import * as BaseAPI from './BaseAPI';

export const getAllProvinces = async () => {
    return await BaseAPI.getItems(addressServices.allProvinces);
}

export const getDistricts = async (id) => {
    return await BaseAPI.getItems(addressServices.getDistricts, id)
}
export const getWards = async (id) => {
    return await BaseAPI.getItems(addressServices.getWards, id)
}
export const getWardById = async (id) => {
    return await BaseAPI.getItems(addressServices.getWardById, id)
}
const addressServices = {
    allProvinces: 'provinces/getAll',
    getDistricts: 'provinces/getById',
    getWards: 'districts/getById',
    getWardById: 'wards/getById'
}